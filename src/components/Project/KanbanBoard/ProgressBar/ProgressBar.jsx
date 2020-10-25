import { Button, Icon, List, Popover, Progress, Result, Tooltip } from "antd";
import RepPointsTag from "components/Common/RepPointsTag";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const ProgressBar = ({ boardStatus }) => {
  const { t } = useTranslation();
  console.log(
    "PROGRESS BAR",
    boardStatus,
    boardStatus.columns,
    boardStatus.todoCnt,
    boardStatus.doingCnt,
    boardStatus.doneCnt
  );

  const popoverContent = (
    <div>
      <List
        size="small"
        header={null}
        footer={null}
        bordered
        dataSource={[
          t("kanban_board.progress_bar.tooltipTodo", {
            count: boardStatus.todoCnt,
          }),
          t("kanban_board.progress_bar.tooltipDoing", {
            count: boardStatus.doingCnt,
          }),
          t("kanban_board.progress_bar.tooltipDone", {
            count: boardStatus.doneCnt,
          }),
        ]}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
    </div>
  );

  return (
    <span
      style={{
        padding: "2px 2px 2px 10px",
        width: "90%",
        marginBottom: "15px",
        // backgroundColor: "#ccc",
        // borderRadius: "3px",
      }}
    >
      <span>
        <Icon type="home" />
        <Icon type="flag" style={{ float: "right", marginRight: "40px" }} />
      </span>
      <Popover
        content={popoverContent}
        placement="bottomLeft"
        style={{ padding: 0 }}
      >
        <Progress
          status={boardStatus.status}
          strokeWidth={25}
          strokeColor="orange"
          strokeLinecap="square"
          className="kanban-progress"
          // format={(percent, successPercent) => {
          //   if (boardStatus.status === "success") {
          //     return <ConcludeButton />;
          //   }
          //   return (percent - boardStatus.doingPercent).toFixed(0) + "%";
          // }}
          // style={{ backgroundColor: "#f5f5f5" }}
          percent={boardStatus.percent?.toFixed(0)}
          successPercent={boardStatus.donePercent?.toFixed(0)}
        />
      </Popover>
    </span>
  );
};

export default ProgressBar;
