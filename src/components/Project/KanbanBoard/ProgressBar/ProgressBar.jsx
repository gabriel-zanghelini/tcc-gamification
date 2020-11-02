import React, { useEffect, useState } from "react";
import axios from "axios";
import { Icon, List, Popover, Progress, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { getDateString, PT_DATE_FORMAT } from "configs/language";

const { Text } = Typography;

const fetcher = axios.create({
  baseURL: "/api/project",
});

const ProgressBar = ({ boardStatus, projectInfo }) => {
  const { t } = useTranslation();

  // console.log(
  //   "PROGRESS BAR",
  //   boardStatus,
  //   boardStatus.todoCnt,
  //   boardStatus.doingCnt,
  //   boardStatus.doneCnt
  // );

  const popoverContent = (
    <div>
      <List
        size="small"
        header={null}
        footer={null}
        bordered
        dataSource={[
          t("kanban_board.progress_bar.tooltipTodo", {
            count: boardStatus.todoCnt || 0,
          }),
          t("kanban_board.progress_bar.tooltipDoing", {
            count: boardStatus.doingCnt || 0,
          }),
          t("kanban_board.progress_bar.tooltipDone", {
            count: boardStatus.doneCnt || 0,
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
      }}
    >
      <span>
        <span>
          <Icon type="home" style={{ marginRight: 5 }} />
          <Text strong>{projectInfo?.title}</Text>
        </span>
        <span style={{ float: "right", marginRight: 40 }}>
          <Text strong style={{ marginRight: 5 }}>
            {projectInfo?.deadline
              ? getDateString(new Date(projectInfo?.deadline))
              : ""}
          </Text>
          <Icon type="flag" />
        </span>
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
          percent={boardStatus.percent?.toFixed(0) || 0}
          successPercent={boardStatus.donePercent?.toFixed(0) || 0}
        />
      </Popover>
    </span>
  );
};

export default ProgressBar;
