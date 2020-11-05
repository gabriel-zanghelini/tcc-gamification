import React from "react";
import { Alert, Icon, Popover, Tag } from "antd";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  let icon =
    action === "plus"
      ? "double-left"
      : action === "minus"
      ? "double-right"
      : "crown";

  let plusContent = (
    <PopoverContent
      infoMsg={t("reputation_tag.plus.info_message", { points })}
      alertMsg={t("reputation_tag.plus.alert_message", { points })}
    />
  );

  let minusContent = (
    <PopoverContent
      infoMsg={null}
      alertMsg={t("reputation_tag.minus.alert_message", { points })}
    />
  );

  let defaultContent = (
    <PopoverContent
      infoMsg={t("reputation_tag.default.info_message", { points })}
      alertMsg={null}
    />
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
