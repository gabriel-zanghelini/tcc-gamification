import { Icon, Tag } from "antd";
import React from "react";
import ReactBorderWrapper from "react-border-wrapper";

const StarterBorder = ({ children }) => {
  return (
    <ReactBorderWrapper
      style={{ backgroundColor: "#bcaaa44d" }}
      borderColour="#BCAAA4"
      borderWidth="12px"
      borderRadius="5px"
      borderType="solid"
      innerPadding="20px"
      rightGap="4px"
      bottomElement={
        <Tag color="#BCAAA4" style={{ margin: "0 3px" }}>
          <Icon type="smile" style={{ fontSize: 16 }} />
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

export default StarterBorder;
