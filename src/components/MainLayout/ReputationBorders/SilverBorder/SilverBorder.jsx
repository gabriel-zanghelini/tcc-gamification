import { Icon } from "antd";
import React from "react";
import Border from "../Border";

const SilverBorder = ({ children }) => {
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
      title="Prata"
      borderIcon={icon}
    >
      {children}
    </Border>
  );
};

export default SilverBorder;
