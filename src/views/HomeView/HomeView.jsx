import React from "react";

import { Tabs, Layout } from "antd";

import { ContentTabs, ContentWrapper } from "styles/components";

const { Content } = Layout;

const HomeView = () => {
  return (
    <ContentTabs>
      <Tabs.TabPane tab="Projetos" key="projects" style={{ display: "flex" }}>
        <ContentWrapper width="50%" style={{ border: "1px solid black" }}>
          Criar projeto
        </ContentWrapper>
        <ContentWrapper width="50%" style={{ border: "1px solid black" }}>
          Projetos criados
        </ContentWrapper>
      </Tabs.TabPane>
    </ContentTabs>
  );
};

export default HomeView;
