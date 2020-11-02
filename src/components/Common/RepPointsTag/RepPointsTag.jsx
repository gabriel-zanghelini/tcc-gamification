import React from "react";
import { Alert, Icon, Popover, Tag } from "antd";

const PopoverContent = ({ infoMsg, alertMsg }) => {
  const alertStyle = { marginBottom: 10 };
  return (
    <div>
      {infoMsg ? (
        <Alert showIcon type="info" message={infoMsg} style={alertStyle} />
      ) : null}
      {alertMsg ? (
        <Alert showIcon type="warning" message={alertMsg} style={alertStyle} />
      ) : null}
    </div>
  );
};

const RepPointsTag = ({ points, action, style, color }) => {
  let icon =
    action === "plus"
      ? "double-left"
      : action === "minus"
      ? "double-right"
      : "crown";

  let plusContent = (
    <PopoverContent
      infoMsg={`Você irá ganhar ${points} pontos ao realizar essa ação.`}
      alertMsg={`Você precisa ter ao menos ${points} de Reputação para realizar essa ação.`}
    />
  );

  let minusContent = (
    <PopoverContent
      infoMsg={null}
      alertMsg={`Você irá perder ${points} pontos se realizar essa ação.`}
    />
  );

  let defaultContent = (
    <PopoverContent infoMsg={`${points} Pontos de Reputação`} alertMsg={null} />
  );

  let tooltipText =
    action === "plus"
      ? plusContent
      : action === "minus"
      ? minusContent
      : defaultContent;

  return (
    <Popover content={tooltipText}>
      <Tag
        color={color ? color : "#FF7043"}
        style={{ marginRight: "0", pointerEvents: "all", ...style }}
      >
        <span>
          {points}
          &nbsp;
          <Icon
            type={icon}
            style={{ color: "#fff" }}
            rotate={action ? 90 : 0}
          />
        </span>
      </Tag>
    </Popover>
  );
};

export default RepPointsTag;
