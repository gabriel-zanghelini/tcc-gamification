import React, { useEffect, useState } from "react";
import { Button } from "antd";

import Board, {
  addColumn,
  addCard,
  changeColumn,
  removeCard,
} from "@lourenci/react-kanban";
import KanbanCard from "./KanbanCard";
import AddTaskModal from "./AddTaskModal";

import axios from "axios";
import { useTranslation } from "react-i18next";

import "@lourenci/react-kanban/dist/styles.css";
import "./kanban_style.css";

const fetcher = axios.create({
  baseURL: "/api",
});

const TASK_POINTS = {
  0: 10,
  1: 20,
  2: 30,
  3: 40,
  4: 50,
};

const KanbanBoard = ({
  allowRemoveCard,
  allowAddCard,
  projectId,
  columns = ["todo", "doing", "done"],
}) => {
  const { t } = useTranslation();
  const [todo, setTodo] = useState([]);
  const [doing, setDoing] = useState([]);
  const [done, setDone] = useState([]);
  const [board, setBoard] = useState({ columns: [] });
  const [modalVisible, setModalVisible] = useState(false);

  const updateColumn = async (status) => {
    await fetcher
      .get(`/project/${projectId}/task/${status}`)
      .then(({ data }) => {
        console.log("LOADING ", status, data);
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

  useEffect(() => {
    const STATUS = "todo";

    let column = board.columns.find((c) => c.id === STATUS);
    if (column) {
      let newColumn = column;
      newColumn.cards = todo;
      console.log(column, newColumn);

      const newBoard = changeColumn(board, column, newColumn);
      setBoard(newBoard);
    } else {
      let newColumn = {
        id: STATUS,
        key: STATUS,
        title: t(`kanban_board.${STATUS}`),
        cards: todo,
      };

      const newBoard = addColumn(board, newColumn);
      setBoard(newBoard);
    }
  }, [todo]);

  useEffect(() => {
    const STATUS = "doing";

    let column = board.columns.find((c) => c.id === STATUS);
    if (column) {
      let newColumn = column;

      newColumn.cards = doing;
      console.log(column, newColumn);

      const newBoard = changeColumn(board, column, newColumn);
      setBoard(newBoard);
    } else {
      let newColumn = {
        id: STATUS,
        key: STATUS,
        title: t(`kanban_board.${STATUS}`),
        cards: doing,
      };

      const newBoard = addColumn(board, newColumn);
      setBoard(newBoard);
    }
  }, [doing]);

  useEffect(() => {
    const STATUS = "done";

    let column = board.columns.find((c) => c.id === STATUS);
    if (column) {
      let newColumn = column;

      newColumn.cards = done;
      console.log(column, newColumn);

      const newBoard = changeColumn(board, column, newColumn);
      setBoard(newBoard);
    } else {
      let newColumn = {
        id: STATUS,
        key: STATUS,
        title: t(`kanban_board.${STATUS}`),
        cards: done,
      };

      const newBoard = addColumn(board, newColumn);
      setBoard(newBoard);
    }
  }, [done]);

  useEffect(() => {
    columns.map(async (c) => {
      await updateColumn(c);
    });
  }, []);

  // useEffect(() => {
  //   columns.map(async (c) => {
  //     // let newColumn = {
  //     //   id: c,
  //     //   key: c,
  //     //   title: t(`kanban_board.${c}`),
  //     // };

  //     switch (c) {
  //       case "todo":
  //         // await updateColumn(c);
  //         // newColumn.cards = todo;
  //         break;
  //       case "doing":
  //         // await updateColumn(c);
  //         // newColumn.cards = doing;
  //         break;
  //       case "done":
  //         // await updateColumn(c);
  //         // newColumn.cards = done;
  //         break;
  //       default:
  //         break;
  //     }
  //     console.log("CREATING COLUMNS", newColumn);
  //     const newBoard = addColumn(board, newColumn);
  //     setBoard(newBoard);
  //   });
  // }, []);

  const addTask = (description, difficulty, status) => {
    let task = {
      description,
      difficulty,
      status,
      points_rewarded: TASK_POINTS[difficulty],
      project_id: projectId,
    };

    fetcher.post(`/project/${projectId}/task`, task).then(({ data }) => {
      console.log("task added", data, board);

      let column = board.columns.find((c) => c.id === status);
      addCard(board, column, data, { on: "bottom" });
      updateColumn(status);
    });

    setModalVisible(false);
  };

  const removeTask = async (board, fromColumn, task) => {
    console.log(board, fromColumn, task);
    const newBoard = removeCard(board, fromColumn, task);
    setBoard(newBoard);

    await fetcher
      .delete(`/task/${task.id}`)
      .then((result) => console.log("task deleted", result))
      .catch((err) => console.error(err));
  };

  const onCancel = () => {
    console.log("CANCEL");
    setModalVisible(false);
  };

  console.log("BOARD", board);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button style={{ width: 330 }} onClick={() => setModalVisible(true)}>
          ADD
        </Button>
        <AddTaskModal
          visible={modalVisible}
          onAdd={addTask}
          onCancel={onCancel}
          status="todo"
        />
      </div>
      {board ? (
        <Board
          // initialBoard={board}
          disableColumnDrag
          // disableCardDrag
          allowRemoveCard={allowRemoveCard}
          allowAddCard={allowAddCard ? { on: "top" } : false}
          renderCard={(task, { dragging }) => (
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
          )}
          onCardDragEnd={(board, card, source, destination) => {
            console.log("onCardDragEnd", board, card, source, destination);
          }}
          onCardNew={console.log}
          // onNewCardConfirm={onNewCardConfirm}
        >
          {board}
        </Board>
      ) : null}
    </>
  );
};

export default KanbanBoard;
