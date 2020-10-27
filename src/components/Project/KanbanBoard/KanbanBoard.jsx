/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, message, Progress, Result, Tooltip } from "antd";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Board, {
  addCard,
  moveCard,
  removeCard,
  addColumn,
  changeColumn,
} from "@lourenci/react-kanban";

import KanbanCard from "./KanbanCard";
import ProgressBar from "./ProgressBar";
import AddTaskModal from "./AddTaskModal";
import RepPointsTag from "components/Common/RepPointsTag";

import { useTranslation } from "react-i18next";
import useCurrentUserStore from "stores/CurrentUserStore";

import "@lourenci/react-kanban/dist/styles.css";
import "./kanban_style.css";

const fetcher = axios.create({
  baseURL: "/api",
});

const TASK_POINTS = {
  1: 20,
  2: 40,
  3: 60,
  4: 80,
  5: 100,
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
  const [boardStatus, setBoardStatus] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const currentUserStore = useCurrentUserStore();

  const getTasksByStatus = async (status) => {
    // console.log("LOADING ", status);
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
    // console.log(column, status, tasks);

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
    // console.log("useEffect TODO", todo);
    if (todo) {
      setColumnTasks("todo", 1, todo);
    }
  }, [todo]);

  useEffect(() => {
    // console.log("useEffect DOING", doing);
    if (doing) {
      setColumnTasks("doing", 2, doing);
    }
  }, [doing]);

  useEffect(() => {
    // console.log("useEffect DONE", done);
    if (done) {
      setColumnTasks("done", 3, done);
    }
  }, [done]);

  useEffect(() => {
    if (board) {
      const todoCnt =
        board.columns?.find((c) => c.id === "todo")?.cards?.length || 0;
      const doingCnt =
        board.columns?.find((c) => c.id === "doing")?.cards?.length || 0;
      const doneCnt =
        board.columns?.find((c) => c.id === "done")?.cards?.length || 0;
      console.log(
        "EFFECT PROGRESS BAR",
        board.columns,
        todoCnt,
        doingCnt,
        doneCnt
      );

      let totalCnt = todoCnt + doingCnt + doneCnt;

      let percent = ((doingCnt + doneCnt) / totalCnt) * 100 || 0;
      let doingPercent = (doingCnt / totalCnt) * 100 || 0;
      let donePercent = (doneCnt / totalCnt) * 100 || 0;
      let status = donePercent === 100 ? "success" : "normal";

      setBoardStatus({
        percent,
        doingPercent,
        donePercent,
        status,
      });
    }
  }, [board.columns]);

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
          let userRepPoints = currentUserStore.currentUser?.reputation_points;
          let pointsLost = task.points_rewarded / 2;
          let newRepPoints = userRepPoints - pointsLost;

          currentUserStore.currentUser.reputation_points = newRepPoints;

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
    let userRepPoints = currentUserStore.currentUser.reputation_points;
    let newStatus = destination.toColumnId;

    console.log(`task "${card.description}" | ${card.status} -> ${newStatus}`);
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
        }
      }

      card.status = newStatus;

      await fetcher //update database
        .put("/task", card)
        .then(async (result) => {
          try {
            console.log("task updated", result);

            if (newStatus === "done") {
              let userId = currentUserStore.currentUser.id;
              let newRepPoints = userRepPoints + card.points_rewarded;

              currentUserStore.currentUser.reputation_points = newRepPoints;

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
            }
          } catch (err) {
            console.error(err);
          }
        })
        .catch((err) => console.error(err));
    }

    const newBoard = moveCard(board, source, destination); //update state
    setBoard(newBoard);
    console.log("newBoard", newBoard);
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

  const ProjectKanbanBoard = () => {
    return (
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
    );
  };

  const AddTaskButton = () => {
    return (
      <>
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
      </>
    );
  };
  console.log(boardStatus.status, "|", board);
  return (
    <>
      {boardStatus.status === "success" ? (
        <Result
          status="success"
          icon={<CompleteProjectButton id={projectId} />}
          title="Projeto Concluído!"
          // subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
        />
      ) : board ? (
        <>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ProgressBar boardStatus={boardStatus} />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <AddTaskButton />
          </div>
          <ProjectKanbanBoard />
        </>
      ) : null}
    </>
  );
};
const CompleteProjectButton = ({ id }) => {
  const [completed, setCompleted] = useState(false);
  const currentUserStore = useCurrentUserStore();
  let completeProjReputation = 500;
  const completeProject = async () => {
    await fetcher //update database
      .put(`/project/${id}/complete`)
      .then(async (result) => {
        try {
          console.log("project completed", result);
          let userId = currentUserStore.currentUser.id;
          let newRepPoints =
            currentUserStore.currentUser.reputation_points +
            completeProjReputation;
          currentUserStore.currentUser.reputation_points = newRepPoints;
          await fetcher
            .put(`/user/${userId}/points/${newRepPoints}`)
            .then(() => {
              let msg = (
                <span>
                  <span>Você ganhou </span>
                  <RepPointsTag points={completeProjReputation} />
                </span>
              );
              message.info(msg, 3);
              setCompleted(true);
            });
        } catch (err) {
          console.error(err);
        }
      })
      .catch((err) => console.error(err));
  };
  if (completed) {
    return <Redirect to="/home" />;
  } else {
    return (
      <Button
        type="primary"
        icon="check"
        size="large"
        onClick={() => completeProject(id)}
      >
        <RepPointsTag points={500} action="plus" />
      </Button>
    );
  }
};

export default KanbanBoard;