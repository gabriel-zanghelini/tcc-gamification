import React from "react";
import { Icon, Tag } from "antd";

const RepPointsTag = ({ points, action }) => {
  let icon =
    action === "plus"
      ? "up-circle"
      : action === "minus"
      ? "down-circle"
      : "crown";
  return (
    <Tag color="magenta" style={{ marginRight: "0" }}>
      <span>
        {points}
        &nbsp;
        <Icon type={icon} />
      </span>
    </Tag>
  );
};

export default RepPointsTag;
