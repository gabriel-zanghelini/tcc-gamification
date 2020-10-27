import { Icon } from "antd";
import React from "react";
import Border from "../Border";

const StarterBorder = ({ children }) => {
  let icon = <Icon type="smile" style={{ fontSize: 16 }} />;

  return (
    <Border
      mainColor="#966F33"
      secondaryColor="#966f3366"
      title="Novato"
      borderIcon={icon}
    >
      {children}
    </Border>
  );
};

export default StarterBorder;
