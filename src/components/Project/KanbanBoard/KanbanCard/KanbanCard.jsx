import React from "react";
import { Button, Card, Icon } from "antd";

const KanbanCard = ({ task, dragging, removeCard }) => {
  console.log(task);
  return (
    <Card
      title="title"
      size="small"
      dragging={dragging}
      className="react-kanban-card"
      headStyle={{ color: "#fff" }}
      style={{ width: 300, color: "#fff", padding: 5 }}
      extra={
        <Button
          type="ghost"
          size="small"
          onClick={removeCard}
          style={{ color: "#fff" }}
          children={
            <Icon type="delete" theme="filled" style={{ color: "#fff" }} />
          }
        />
      }
    >
      {task.description}
    </Card>
  );
};

export default KanbanCard;
