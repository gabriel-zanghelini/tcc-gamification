import { Button } from "antd";

import styled from "@emotion/styled";

export const CardButton = styled(Button)`
  height: 100%;

  border-radius: 0;

  & > *:not(:last-child) {
    margin-right: var(--md-pad);
  }
`;
