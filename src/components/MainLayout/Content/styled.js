import { Layout } from "antd";

import styled from "@emotion/styled";

export const Content = styled(Layout.Content)`
  height: max-content;
  min-height: 100%;

  width: 100%;
  min-width: 100%;
  max-width: 100%;

  padding: var(--lg-pad);
  padding-bottom: 0;

  display: grid;

  & > div {
    width: 100%;
    min-width: 100%;
    max-width: 100%;

    height: 100%;
    min-height: 100%;
    max-height: 100%;
  }
`;
