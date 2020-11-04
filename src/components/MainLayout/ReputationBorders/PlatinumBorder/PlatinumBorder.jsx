import { Icon } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import Border from "../Border";

const PlatinumBorder = ({ children }) => {
  const { t } = useTranslation();
  let icon = (
    <span>
      <Icon type="crown" style={{ fontSize: 20, color: "#d01ba9" }} />
      <Icon type="crown" style={{ fontSize: 30, color: "#d01ba9" }} />
      <Icon type="crown" style={{ fontSize: 30, color: "#d01ba9" }} />
      <Icon type="crown" style={{ fontSize: 20, color: "#d01ba9" }} />
    </span>
  );

  return (
    <Border
      mainColor="#00ACC1"
      customBackground="linear-gradient(315deg, #3eadcf 0%, #abe9cd 74%)"
      title={t("border.titles.platinum")}
      borderIcon={icon}
    >
      {children}
    </Border>
  );
};

export default PlatinumBorder;
