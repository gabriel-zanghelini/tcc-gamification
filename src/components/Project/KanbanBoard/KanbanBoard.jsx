import React, { useEffect, useState } from "react";
import { Button } from "antd";

import Board, { addColumn } from "@lourenci/react-kanban";
import KanbanCard from "./KanbanCard";
import AddTaskModal from "./AddTaskModal";

import axios from "axios";
import { useTranslation } from "react-i18next";

import "@lourenci/react-kanban/dist/styles.css";
import "./kanban_style.css";

const fetcher = axios.create({
  baseURL: "/api",
});

const KanbanBoard = ({
  allowRemoveCard,
  allowAddCard,
  projectId,
  columns = ["todo", "doing", "done"],
}) => {
  const { t } = useTranslation();
  // const [todo, setTodo] = useState([]);
  // const [doing, setDoing] = useState([]);
  // const [done, setDone] = useState([]);
  const [board, setBoard] = useState({ columns: [] });
  const [modalVisible, setModalVisible] = useState(false);

  const updateColumn = async (status) => {
    console.log(status);
    let { data } = await fetcher
      .get(`/project/${projectId}/task/${status}`)
      .catch((err) => {
        console.error(`Can't get ${status} tasks: ${err}`);
      });

    // .then(({ data }) => {
    //   console.log("LOADING ", status, data);
    //   switch (status) {
    //     case "todo":
    //       setTodo(data);
    //       break;
    //     case "doing":
    //       setDoing(data);
    //       break;
    //     case "done":
    //       setDone(data);
    //       break;
    //     default:
    //       break;
    //   }
    // })

    console.log("COLUMN DATA", data);
    return data;
  };

  useEffect(() => {
    columns.map(async (c) => {
      let newColumn = {
        id: c,
        key: c,
        title: t(`kanban_board.${c}`),
        cards: await updateColumn(c),
      };

      const newBoard = addColumn(board, newColumn);
      setBoard(newBoard);
    });
  }, []);

  const onNewCardConfirm = (draftCard) => ({
    id: new Date().getTime(),
    ...draftCard,
  });

  const addTask = (title, difficulty, status) => {
    let task = {
      title,
      difficulty,
      status,
      points_required: 10,
      project_id: projectId,
    };

    fetcher.post(`/project/${projectId}/task`, task).then((result) => {
      console.log(result);
      updateColumn(result.status); //TODO: use react-kanban functions
    });

    // switch (status) {
    //   case "todo":
    //     let newTodo = [...todo];
    //     console.log("newTODO", newTodo);
    //     newTodo.push(task);
    //     setTodo(newTodo);
    //     break;
    //   case "doing":
    //     let newDoing = [...doing];
    //     newDoing.push(task);
    //     setDoing(newDoing);
    //     break;
    //   case "done":
    //     let newDone = [...done];
    //     newDone.push(task);
    //     setDone(newDone);
    //     break;
    //   default:
    //     break;
    // }

    setModalVisible(false);
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
          allowRemoveCard={allowRemoveCard}
          allowAddCard={allowAddCard ? { on: "top" } : false}
          renderCard={(task, { removeCard, dragging }) => (
            <KanbanCard
              task={task}
              removeCard={removeCard}
              dragging={dragging}
            />
          )}
          onCardNew={console.log}
          onCardRemove={console.log}
          onNewCardConfirm={onNewCardConfirm}
        >
          {board}
        </Board>
      ) : null}
    </>
  );
};

export default KanbanBoard;
