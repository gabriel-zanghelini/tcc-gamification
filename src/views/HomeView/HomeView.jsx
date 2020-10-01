import React, { useEffect, useState } from "react";

import { Tabs, Typography } from "antd";
import { ContentTabs, ContentWrapper } from "styles/components";
import * as Styled from "./styled";
import axios from "axios";
import ProjectTable from "components/MainLayout/ProjectTable";
import CurrentUserStore from "stores/CurrentUserStore";
import LoginForm from "components/MainLayout/LoginForm";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";

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
    .catch((err) => console.error);
};

const HomeView = () => {
  const { t } = useTranslation();

  return (
    <>
      <ContentTabs>
        {CurrentUserStore.isLoggedIn ? (
          <Tabs.TabPane
            tab={t("menus.home.tabs.projects")}
            key="projects"
            style={{ display: "flex" }}
          >
            <>
              <ContentWrapper width="40%" column={true}>
                <Title
                  level={3}
                  style={{ marginLeft: "20%", marginBottom: "25px" }}
                >
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
                <Title
                  level={3}
                  style={{ marginBottom: "25px", marginLeft: "10%" }}
                >
                  Projetos criados
                </Title>
                <ProjectTable style={{ width: "80%", alignSelf: "center" }} />
              </ContentWrapper>
            </>
          </Tabs.TabPane>
        ) : (
          <Tabs.TabPane
            tab={t("login.title")}
            key="login"
            style={{ display: "flex" }}
          >
            <ContentWrapper width="100%" justifyContent="center">
              <LoginForm />
            </ContentWrapper>
          </Tabs.TabPane>
        )}
      </ContentTabs>
    </>
  );
};

export default observer(HomeView);
