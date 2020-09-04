import React from "react";

import { Tabs, Layout, Typography, Input, Button } from "antd";
import { ContentTabs, ContentWrapper } from "styles/components";
import * as Styled from "./styled";

const { Title, Text } = Typography;

const HomeView = () => {
  return (
    <ContentTabs>
      <Tabs.TabPane tab="Projetos" key="projects" style={{ display: "flex" }}>
        <ContentWrapper width="40%" column={true}>
          <Title level={3} style={{ marginLeft: "20%", marginBottom: "25px" }}>Criar projeto</Title>
          <Styled.ProjectInput size="large" placeholder="Título" />
          <Styled.ProjectInput size="large" placeholder="Descrição" />

          <ContentWrapper justifyContent={"flex-end"}>
            <Text strong style={{ fontSize: "20px", marginRight: "10px", marginTop: "4px" }}>Criar</Text>
            <Styled.CreateProjectButton
              type="primary"
              shape="round"
              icon="arrow-right"
              size={"large"}
              style={{ marginRight: "20%" }}
            />
          </ContentWrapper>
        </ContentWrapper>
        <ContentWrapper width="60%" column={true}>
          <Title level={3} style={{ marginLeft: "10%", marginBottom: "25px" }}>Projetos criados</Title>
        </ContentWrapper>
      </Tabs.TabPane>
    </ContentTabs>
  );
};

export default HomeView;
