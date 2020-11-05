import React from "react";
import {
  Button,
  Card,
  Icon,
  Modal,
  Rate,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import { FlexDiv } from "styles/components";
import { useTranslation } from "react-i18next";
import RepPointsTag from "components/Common/RepPointsTag";
import { getDateString } from "configs/language";

const { Text } = Typography;

const CardHeader = ({ task }) => {
  const { t } = useTranslation();

  const rateColors = {
    1: "#58D68D",
    2: "#5DADE2",
    3: "#F4D03F",
    4: "#f50",
    5: "#E74C3C",
  };

  return (
    <FlexDiv padding="0">
      <FlexDiv width="80%" justifyContent="flex-start" padding="0">
        <Tag color={rateColors[task.difficulty]}>
          <Rate
            disabled
            count={task.difficulty}
            defaultValue={task.difficulty}
            style={{
              fontSize: 13,
              height: "20px",
              marginRight: "2px",
              color: "#fff",
            }}
          />
        </Tag>
      </FlexDiv>
      <FlexDiv width="20%" justifyContent="flex-end" padding="0">
        <Tooltip
          title={t("kanban_card.reputation_points_awarded")}
          placement="top"
        >
          <RepPointsTag points={task.points_rewarded} action="plus" />
        </Tooltip>
      </FlexDiv>
    </FlexDiv>
  );
};

const CardExtra = ({ task, removeCard }) => {
  const { t } = useTranslation();
  const { confirm } = Modal;

  let pointsLost = task.points_rewarded / 2;
  let confirmContent = (
    <span>
      <span>{t("kanban_card.remove_task_pop_up.description")}</span>
      &nbsp;
      <RepPointsTag points={pointsLost} />
    </span>
  );

  function showConfirm() {
    confirm({
      title: t("kanban_card.remove_task_pop_up.title"),
      content: confirmContent,
      onOk() {
        removeCard();
      },
      onCancel() {},
      okText: (
        <span>
          OK &nbsp;
          <RepPointsTag points={pointsLost} action="minus" />
        </span>
      ),
    });
  }

  if (task.status === "done") {
    return (
      <span style={{ margin: "5px", color: "#52c41a" }}>
        <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
      </span>
    );
  } else {
    return (
      <Button
        type="link"
        size="small"
        onClick={showConfirm}
        style={{ color: "#fff" }}
        children={<Icon type="close" />}
      />
    );
  }
};

const CardContent = ({ task }) => {
  let deadlineColor = task.isDelayed ? "red" : "geekblue";

  return (
    <FlexDiv width="100%" padding="5px">
      <FlexDiv padding="0px" width="80%">
        <span>{task.description}</span>
      </FlexDiv>
      {task.deadline ? (
        <FlexDiv padding="0px" width="20%" style={{ alignItems: "flex-start" }}>
          <Tag color={deadlineColor} style={{ borderRadius: 2 }}>
            {getDateString(new Date(task.deadline))}
          </Tag>
        </FlexDiv>
      ) : (
        ""
      )}
    </FlexDiv>
  );
};

const KanbanCard = ({ task, dragging, removeCard }) => {
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  let deadline = new Date(task.deadline);

  if (today.getTime() > deadline.getTime()) task["isDelayed"] = true;
  else task["isDelayed"] = false;

  // console.log("KanbanCard", task, dragging, removeCard);
  return (
    <Card
      title={<CardHeader task={task} />}
      size="small"
      dragging={dragging ? dragging : undefined}
      className="react-kanban-card"
      headStyle={{
        color: "#fff",
        paddingRight: "0",
        backgroundColor: "#8f5ca5",
        borderBottom: "0",
      }}
      bodyStyle={{ padding: "5px" }}
      style={{ color: "#fff", padding: 5 }}
      extra={<CardExtra task={task} removeCard={removeCard} />}
    >
      <CardContent task={task} />
    </Card>
    // </Badge>
  );
};

export default KanbanCard;
