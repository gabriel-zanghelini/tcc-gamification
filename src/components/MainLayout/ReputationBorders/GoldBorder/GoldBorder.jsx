import { Icon, Tag } from "antd";
import React from "react";
import ReactBorderWrapper from "react-border-wrapper";

const GoldBorder = ({ children }) => {
  return (
    <ReactBorderWrapper
      style={{ background: "linear-gradient(315deg, #fbb034 0%, #ffdd00 74%)" }}
      borderColour="#eab92f"
      borderWidth="12px"
      borderRadius="5px"
      borderType="solid"
      innerPadding="20px"
      rightGap="4px"
      bottomElement={
        <Tag color="#eab92f" style={{ margin: "0 3px" }}>
          <Icon type="crown" style={{ fontSize: 18 }} />
          <Icon type="crown" style={{ fontSize: 25 }} />
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

export default GoldBorder;
