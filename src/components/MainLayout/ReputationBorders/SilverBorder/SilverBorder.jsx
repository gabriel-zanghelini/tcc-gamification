import { Icon, Tag } from "antd";
import React from "react";
import ReactBorderWrapper from "react-border-wrapper";

const SilverBorder = ({ children }) => {
  return (
    <ReactBorderWrapper
      style={{ backgroundColor: "#c0c0c066" }}
      borderColour="silver"
      borderWidth="12px"
      borderRadius="5px"
      borderType="solid"
      innerPadding="20px"
      rightGap="4px"
      bottomElement={
        <Tag color="silver" style={{ margin: "0 3px" }}>
          <Icon type="crown" style={{ fontSize: 18 }} />
          <Icon type="crown" style={{ fontSize: 18 }} />
        </Tag>
      }
      bottomOffset="2px"
      bottomPosition={0.5}
      bottomGap="4px"
    >
      {children}
    </ReactBorderWrapper>
  );
};

export default SilverBorder;
