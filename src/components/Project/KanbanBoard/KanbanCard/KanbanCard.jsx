import React from "react";
import {
  Badge,
  Button,
  Card,
  Icon,
  Rate,
  Statistic,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import { ContentWrapper } from "styles/components";
import { useTranslation } from "react-i18next";

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
      <ContentWrapper width="20%" justifyContent="center" padding="0" column>
        <Tooltip title={t("kanban_card.reputation_points_awarded")}>
          <Tag color="magenta">
            <span>
              {task.points_rewarded}
              &nbsp;
              <Icon type="up-circle" />
            </span>
          </Tag>
        </Tooltip>
      </ContentWrapper>
    </ContentWrapper>
  );
};

const CardExtra = ({ removeCard }) => {
  return (
    <Button
      type="link"
      size="small"
      onClick={removeCard}
      style={{ color: "#fff" }}
      children={<Icon type="close" />}
    />
  );
};

const CardContent = ({ task }) => {
  const pointsStyle = { fontSize: 12, color: "#faad14" };

  return (
    <ContentWrapper width="100%" padding="0">
      <ContentWrapper width="90%" padding="5px">
        <span>{task.description}</span>
      </ContentWrapper>
      {/* <ContentWrapper
      width="30%"
      justifyContent="flex-end"
      padding="5px 0"
      column
    >
      <ContentWrapper justifyContent="flex-start" padding="5px 0">
        <Rate
          disabled
          defaultValue={task.difficulty}
          style={{ fontSize: "10px", marginRight: "2px" }}
        />
      </ContentWrapper>
      <ContentWrapper column justifyContent="flex-start" padding="5px 0">
        <Statistic
          valueStyle={{ color: "#fff" }}
          value={task.points_rewarded}
          suffix="pts"
        />
      </ContentWrapper>
    </ContentWrapper> */}
    </ContentWrapper>
  );
};

const KanbanCard = ({ task, dragging, removeCard }) => {
  // console.log("KanbanCard", task, dragging, removeCard);
  return (
    // <Badge
    //   style={{ backgroundColor: "#52c41a" }}
    //   count={task.points_rewarded}
    //   // count={
    //   //   <span>
    //   //     {task.points_rewarded}
    //   //     <Icon type="clock-circle" />
    //   //   </span>
    //   // }
    // >
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
      style={{ width: 300, color: "#fff", padding: 5 }}
      extra={<CardExtra removeCard={removeCard} />}
    >
      <CardContent task={task} />
    </Card>
    // </Badge>
  );
};

export default KanbanCard;
