import React from "react";

import { Tabs, Typography } from "antd";
import { ContentTabs, ContentWrapper } from "styles/components";
import * as Styled from "./styled";
import axios from "axios";
import ProjectTable from "components/MainLayout/ProjectTable";

const { Title, Text } = Typography;

const fetcher = axios.create({
  baseURL: "/api/user",
});

const onClick = async () => {
  await fetcher
    .get("")
    .then(({ data }) => {
      console.table(data);
    })
    .catch((err) => {
      console.error("EROOOO", err);
    });
};

const HomeView = () => {
  return (
    <ContentTabs>
      <Tabs.TabPane tab="Projetos" key="projects" style={{ display: "flex" }}>
        <ContentWrapper width="40%" column={true}>
          <Title level={3} style={{ marginLeft: "20%", marginBottom: "25px" }}>
            Criar projeto
          </Title>
          <Styled.ProjectInput size="large" placeholder="Título" />
          <Styled.ProjectInput size="large" placeholder="Descrição" />

          <ContentWrapper justifyContent={"flex-end"}>
            <Text
              strong
              style={{
                fontSize: "20px",
                marginRight: "10px",
                marginTop: "4px",
              }}
            >
              Criar
            </Text>
            <Styled.CreateProjectButton
              type="primary"
              shape="round"
              icon="arrow-right"
              size={"large"}
              style={{ marginRight: "20%" }}
              onClick={onClick}
            />
          </ContentWrapper>
        </ContentWrapper>
        <ContentWrapper width="60%" column={true}>
          <Title level={3} style={{ marginBottom: "25px", marginLeft: "10%" }}>
            Projetos criados
          </Title>
          <ProjectTable style={{ width: "80%", alignSelf: "center" }} />
        </ContentWrapper>
      </Tabs.TabPane>
    </ContentTabs>
  );
};

export default HomeView;
