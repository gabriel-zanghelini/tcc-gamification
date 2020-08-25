import { Layout } from "antd";
import styled from "@emotion/styled";

export const Main = styled(Layout)`
  height: 100vh;
`;

export const Scrollable = styled(Layout)`
  display: grid;
  grid-template-rows: 1fr auto;

  height: 100%;

  overflow-y: auto;
  scroll-padding: var(--lg-pad);
`;
