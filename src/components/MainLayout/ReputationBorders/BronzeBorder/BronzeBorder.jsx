import { Icon } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import Border from "../Border";

const BronzeBorder = ({ children }) => {
  const { t } = useTranslation();
  let icon = <Icon type="crown" style={{ fontSize: 18 }} />;

  return (
    <Border
      mainColor="#cd7f32"
      secondaryColor="#cd7f3299"
      title={t("border.titles.bronze")}
      borderIcon={icon}
    >
      {children}
    </Border>
  );
};

export default BronzeBorder;
