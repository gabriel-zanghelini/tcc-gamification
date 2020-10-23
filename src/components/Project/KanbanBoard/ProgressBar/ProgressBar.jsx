import React, { useEffect } from "react";
import { Progress, Tooltip } from "antd";
import useKanbanBoardStore from "stores/KanbanBoardStore";

const ProgressBar = () => {
  const kanbanBoardStore = useKanbanBoardStore();

  // console.log(kanbanBoardStore.done, kanbanBoardStore.todoColumn);
  return (
    <Tooltip title="3 done / 3 in progress / 4 to do">
      <Progress
        strokeWidth={20}
        strokeLinecap="square"
        percent={60}
        successPercent={
          kanbanBoardStore.done ? kanbanBoardStore.done.length : 0
        }
        // strokeColor="#d2d2d2"
        style={{ margin: "0 0 30px 0" }}
      />
    </Tooltip>
  );
};

export default ProgressBar;
