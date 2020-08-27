import { Tabs } from "antd";

import styled from "@emotion/styled";

export const ContentWrapper = styled.div`
  padding: var(--sm-pad);

  background: var(--main-white);
`;

export const ContentTabs = styled(Tabs)`
  padding: var(--sm-pad);
  padding-top: 0;

  background: var(--main-white);
`;
