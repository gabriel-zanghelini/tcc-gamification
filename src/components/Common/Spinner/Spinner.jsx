import React from "react";

import { Spin } from "antd";

import * as Styled from "./styled";

const Spinner = ({ fixed, children, ...spinProps }) => {
  if (children) {
    return <Spin {...spinProps}>{children}</Spin>;
  }

  return (
    <Styled.Wrapper fixed={fixed}>
      <Spin {...spinProps} />
    </Styled.Wrapper>
  );
};

export default Spinner;
