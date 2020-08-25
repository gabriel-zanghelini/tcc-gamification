import { Layout } from "antd";

import styled from "@emotion/styled";

import LocaleSelector from "components/MainLayout/LocaleSelector";

export const Header = styled(Layout.Header)`
  display: grid;
  grid-template-columns: 1fr auto;

  padding: 0 var(--xl-pad);
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;

  gap: var(--xl-pad);
  align-items: center;

  height: 100%;
  padding: 0 var(--xl-pad);

  color: var(--main-white);
`;

export const Title = styled.h1`
  margin: 0 var(--xl-pad);

  font-size: var(--h2-fs);
  font-weight: normal;

  color: var(--main-white);
`;

export const LangSelector = styled(LocaleSelector)`
  margin: auto 0;

  .ant-select-selection {
    background: transparent;
    border: 0;
  }

  .ant-select-arrow {
    color: var(--main-white);
  }
`;
