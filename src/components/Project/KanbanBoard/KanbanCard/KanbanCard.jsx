import React from "react";
import {
  Badge,
  Button,
  Card,
  Icon,
  Rate,
  Statistic,
  Tag,
  Typography,
} from "antd";
import { ContentWrapper } from "styles/components";

const { Text } = Typography;

const CardTitle = ({ task }) => {
  const pointsStyle = { fontSize: 12, color: "#faad14" };
  return (
    <ContentWrapper padding="0">
      <ContentWrapper width="70%" justifyContent="center" padding="0" column>
        <Rate
          disabled
          defaultValue={task.difficulty}
          count={task.difficulty}
          style={{ fontSize: 15, marginRight: "2px" }}
        />
      </ContentWrapper>
      <ContentWrapper width="30%" justifyContent="center" padding="0" column>
        <span>
          <Tag color="gold">
            {task.points_rewarded} <Icon type="up-circle" />
          </Tag>
        </span>
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
      title={<CardTitle task={task} />}
      size="small"
      dragging={dragging ? dragging : undefined}
      className="react-kanban-card"
      headStyle={{ color: "#fff" }}
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
