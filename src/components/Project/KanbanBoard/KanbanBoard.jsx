import React from "react";
import Board from "@lourenci/react-kanban";
import axios from "axios";
import { useTranslation } from "react-i18next";

import "@lourenci/react-kanban/dist/styles.css";
import "./kanban_style.css";
import { Button } from "antd";

const KanbanBoard = ({
  allowRemoveCard,
  allowAddCard,
  projectId,
  // columns = ["todo", "doing", "done"]
  columns,
}) => {
  const { t } = useTranslation();

  const fetcher = axios.create({
    baseURL: "/api/task",
  });

  const board = {
    columns: columns.map((c) => {
      fetcher.get();
      return {
        id: c,
        title: t(`kanban_board.${c}`),
        cards: [
          {
            id: 1,
            title: "Card title 1",
            description: "Card content",
          },
          {
            id: 2,
            title: "Card title 2",
            description: "Card content",
          },
          {
            id: 3,
            title: "Card title 3",
            description: "Card content",
          },
        ],
      };
    }),
  };

  const boardExample = {
    columns: [
      {
        id: "todo",
        title: t("kanban_board.todo"),
        cards: [
          {
            id: 1,
            title: "Card title 1",
            description: "Card content",
          },
          {
            id: 2,
            title: "Card title 2",
            description: "Card content",
          },
          {
            id: 3,
            title: "Card title 3",
            description: "Card content",
          },
        ],
      },
      {
        id: "doing",
        title: t("kanban_board.doing"),
        cards: [
          {
            id: 9,
            title: "Card title 9",
            description: "Card content",
          },
        ],
      },
      {
        id: "done",
        title: t("kanban_board.done"),
        cards: [
          {
            id: 12,
            title: "Card title 12",
            description: "Card content",
          },
          {
            id: 13,
            title: "Card title 13",
            description: "Card content",
          },
        ],
      },
    ],
  };

  const onNewCardConfirm = (draftCard) => ({
    id: new Date().getTime(),
    ...draftCard,
  });

  return (
    <>
      <Button
        onClick={() =>
          board.columns[0].cards.push({
            id: 4,
            title: "Card title 3",
            description: "Card content",
          })
        }
      >
        ADD
      </Button>
      <Board
        initialBoard={board}
        disableColumnDrag
        allowRemoveCard={allowRemoveCard}
        allowAddCard={allowAddCard ? { on: "top" } : false}
        onCardRemove={console.log}
        onNewCardConfirm={onNewCardConfirm}
        onCardNew={console.log}
      />
    </>
  );
};

export default KanbanBoard;
