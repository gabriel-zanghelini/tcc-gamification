import { Tag } from "antd";
import React from "react";
import ReactBorderWrapper from "react-border-wrapper";

const Border = ({
  children,
  mainColor,
  secondaryColor,
  customBackground,
  title,
  borderIcon,
}) => {
  let topTag = (
    <Tag color={mainColor} style={{ margin: "0 3px" }}>
      <span style={{ fontSize: 16 }}>{title}</span>
    </Tag>
  );

  let bottomTag = (
    <Tag color={mainColor} style={{ margin: "0 3px" }}>
      {borderIcon}
    </Tag>
  );

  let style = {};
  if (secondaryColor) style.backgroundColor = secondaryColor;
  if (customBackground) style.background = customBackground;

  return (
    <ReactBorderWrapper
      style={style}
      borderColour={mainColor}
      borderWidth="12px"
      borderRadius="5px"
      borderType="solid"
      innerPadding="20px"
      rightGap="4px"
      topElement={topTag}
      bottomElement={bottomTag}
      bottomOffset="2px"
      bottomPosition={0.5}
      bottomGap="4px"
    >
      {children}
    </ReactBorderWrapper>
  );
};

export default Border;
