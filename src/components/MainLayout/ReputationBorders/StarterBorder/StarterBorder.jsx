import { Icon } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import Border from "../Border";

const StarterBorder = ({ children }) => {
  const { t } = useTranslation();
  let icon = <Icon type="smile" style={{ fontSize: 16 }} />;

  return (
    <Border
      mainColor="#966F33"
      secondaryColor="#966f3366"
      title={t("border.titles.starter")}
      borderIcon={icon}
    >
      {children}
    </Border>
  );
};

export default StarterBorder;
