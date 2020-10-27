import { Icon } from "antd";
import React from "react";
import Border from "../Border";

const BronzeBorder = ({ children }) => {
  let icon = <Icon type="crown" style={{ fontSize: 18 }} />;

  return (
    <Border
      mainColor="#cd7f32"
      secondaryColor="#cd7f3299"
      title="Bronze"
      borderIcon={icon}
    >
      {children}
    </Border>
  );
};

export default BronzeBorder;
