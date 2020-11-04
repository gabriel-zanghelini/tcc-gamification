import { Icon } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import Border from "../Border";

const SilverBorder = ({ children }) => {
  const { t } = useTranslation();
  let icon = (
    <span>
      <Icon type="crown" style={{ fontSize: 18 }} />
      <Icon type="crown" style={{ fontSize: 18 }} />
    </span>
  );

  return (
    <Border
      mainColor="silver"
      secondaryColor="#c0c0c066"
      title={t("border.titles.silver")}
      borderIcon={icon}
    >
      {children}
    </Border>
  );
};

export default SilverBorder;
