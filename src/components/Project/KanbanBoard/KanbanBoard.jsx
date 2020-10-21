/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Board, {
  addCard,
  moveCard,
  removeCard,
  addColumn,
  changeColumn,
} from "@lourenci/react-kanban";

import KanbanCard from "./KanbanCard";
import AddTaskModal from "./AddTaskModal";

import "@lourenci/react-kanban/dist/styles.css";
import "./kanban_style.css";
import useCurrentUserStore from "stores/CurrentUserStore";
import RepPointsTag from "components/Common/RepPointsTag";

const fetcher = axios.create({
  baseURL: "/api",
});

const TASK_POINTS = {
  1: 10,
  2: 20,
  3: 30,
  4: 40,
  5: 50,
};

const KanbanBoard = ({
  allowRemoveCard,
  allowAddCard,
  projectId,
  columns = ["todo", "doing", "done"],
}) => {
  const { t } = useTranslation();
  const [todo, setTodo] = useState(null);
  const [doing, setDoing] = useState(null);
  const [done, setDone] = useState(null);
  const [board, setBoard] = useState({ columns: [] });
  const [modalVisible, setModalVisible] = useState(false);
  const currentUserStore = useCurrentUserStore();

  const getTasksByStatus = async (status) => {
    console.log("LOADING ", status);
    await fetcher
      .get(`/project/${projectId}/task/${status}`)
      .then(({ data }) => {
        switch (status) {
          case "todo":
            setTodo(data);
            break;
          case "doing":
            setDoing(data);
            break;
          case "done":
            setDone(data);
            break;
          default:
            break;
        }
      })
      .catch((err) => {
        console.error(`Can't get ${status} tasks: ${err}`);
      });
  };

  const setColumnTasks = (status, key, tasks) => {
    let column = board.columns.find((c) => c.id === status);
    console.log(column, status, tasks);

    if (column) {
      let newColumn = { ...column };
      newColumn.cards = tasks;
      console.log(column, newColumn);

      const newBoard = changeColumn(board, column, newColumn); //update state
      setBoard(newBoard);
    } else {
      let newColumn = {
        id: status,
        key: key,
        title: t(`kanban_board.${status}`),
        cards: tasks,
      };

      const newBoard = addColumn(board, newColumn); //update state
      newBoard.columns.sort((a, b) => a.key - b.key);
      setBoard(newBoard);
    }
  };

  useEffect(() => {
    console.log("useEffect TODO", todo);
    if (todo) setColumnTasks("todo", 1, todo);
  }, [todo]);

  useEffect(() => {
    console.log("useEffect DOING", doing);
    if (doing) setColumnTasks("doing", 2, doing);
  }, [doing]);

  useEffect(() => {
    console.log("useEffect DONE", done);
    if (done) setColumnTasks("done", 3, done);
  }, [done]);

  useEffect(() => {
    columns.map(async (c) => {
      console.log("UPDATING COLUMNS", c);
      await getTasksByStatus(c);
    });
  }, []);

  const addTask = (description, difficulty, status) => {
    let task = {
      description,
      difficulty,
      status,
      points_rewarded: TASK_POINTS[difficulty],
      project_id: projectId,
    };

    fetcher
      .post(`/project/${projectId}/task`, task) //update database
      .then(({ data }) => {
        let column = board.columns.find((c) => c.id === status);

        console.log("task added", data, board);
        addCard(board, column, data, { on: "bottom" }); //update state
        getTasksByStatus(status);
      })
      .catch((err) => console.error(err));

    setModalVisible(false);
  };

  const removeTask = async (board, fromColumn, task) => {
    // console.log(board, fromColumn, task);

    await fetcher
      .delete(`/task/${task.id}`) //update database
      .then(async (result) => {
        try {
          let userId = currentUserStore.currentUser?.id;
          let userRepPoints = currentUserStore.currentUser?.reputationPoints;
          let pointsLost = task.points_rewarded / 2;
          let newRepPoints = userRepPoints - pointsLost;

          currentUserStore.currentUser.reputationPoints = newRepPoints;

          await fetcher
            .put(`/user/${userId}/points/${newRepPoints}`)
            .then(() => {
              let msg = (
                <span>
                  <span>Você perdeu </span>
                  <RepPointsTag points={pointsLost} />
                </span>
              );
              message.info(msg, 3);
            });
        } catch (err) {
          console.error(err);
        }

        const newBoard = removeCard(board, fromColumn, task); //update state
        setBoard(newBoard);
      })
      .catch((err) => console.error(err));
  };

  const moveTask = async (card, source, destination) => {
    // console.log("onCardDragEnd", card.description, source, destination);
    let userRepPoints = currentUserStore.currentUser.reputationPoints;
    let newStatus = destination.toColumnId;

    console.log(card.status, newStatus);
    if (card.status !== newStatus) {
      if (newStatus === "done") {
        if (userRepPoints < card.points_rewarded) {
          let msg = (
            <span>
              <span>Você precisa ter pelo menos </span>
              <RepPointsTag points={card.points_rewarded} />
              <span> para concluir essa tarefa!</span>
            </span>
          );
          message.error(msg, 3);
          return;
        } else {
          card.status = newStatus;

          await fetcher //update database
            .put("/task", card)
            .then(async (result) => {
              try {
                console.log("task updated", result);
                let userId = currentUserStore.currentUser.id;
                let newRepPoints = userRepPoints + card.points_rewarded;

                currentUserStore.currentUser.reputationPoints = newRepPoints;

                await fetcher
                  .put(`/user/${userId}/points/${newRepPoints}`)
                  .then(() => {
                    let msg = (
                      <span>
                        <span>Você ganhou </span>
                        <RepPointsTag points={card.points_rewarded} />
                      </span>
                    );
                    message.info(msg, 3);
                  });
              } catch (err) {
                console.error(err);
              }
            })
            .catch((err) => console.error(err));
        }
      }
    }

    const newBoard = moveCard(board, source, destination); //update state
    setBoard(newBoard);
  };

  const renderCard = (task, { dragging }) => (
    <KanbanCard
      task={task}
      removeCard={() =>
        removeTask(
          board,
          board.columns.find((c) => c.id === task.status),
          task
        )
      }
      dragging={dragging}
    />
  );

  const onCancel = () => {
    console.log("CANCEL");
    setModalVisible(false);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          type="primary"
          style={{ width: "400px" }}
          onClick={() => setModalVisible(true)}
        >
          {t("kanban_board.add_todo_task")}
        </Button>
        <AddTaskModal
          status="todo"
          onAdd={addTask}
          onCancel={onCancel}
          visible={modalVisible}
        />
      </div>
      {board ? (
        <Board
          // initialBoard={board}
          disableColumnDrag
          // disableCardDrag
          allowRemoveCard={allowRemoveCard}
          allowAddCard={allowAddCard ? { on: "top" } : false}
          renderCard={renderCard}
          onCardDragEnd={moveTask}
          // onCardNew={console.log}
          // onNewCardConfirm={onNewCardConfirm}
        >
          {board}
        </Board>
      ) : null}
    </>
  );
};

export default KanbanBoard;
