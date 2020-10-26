import React from "react";
import { Button, Card, Icon, Modal, Rate, Tag, Tooltip } from "antd";
import { ContentWrapper } from "styles/components";
import { useTranslation } from "react-i18next";
import RepPointsTag from "components/Common/RepPointsTag";

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
    <ContentWrapper padding="0">
      <ContentWrapper width="80%" justifyContent="flex-start" padding="0">
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
      </ContentWrapper>
      <ContentWrapper width="20%" justifyContent="flex-end" padding="0">
        <Tooltip
          title={t("kanban_card.reputation_points_awarded")}
          placement="top"
        >
          <RepPointsTag points={task.points_rewarded} action="plus" />
        </Tooltip>
      </ContentWrapper>
    </ContentWrapper>
  );
};

const CardExtra = ({ task, removeCard }) => {
  const { confirm } = Modal;
  let pointsLost = task.points_rewarded / 2;
  let confirmContent = (
    <span>
      {"Você perderá "}
      &nbsp;
      <RepPointsTag points={pointsLost} />
    </span>
  );

  function showConfirm() {
    confirm({
      title: "Tem certeza que deseja remover essa tarefa?",
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
      <span style={{margin: "5px", color: "#52c41a"}}>
        <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
      </span>
    )
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
  return (
    <ContentWrapper width="90%" padding="5px">
      <span>{task.description}</span>
    </ContentWrapper>
  );
};

const KanbanCard = ({ task, dragging, removeCard }) => {
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
