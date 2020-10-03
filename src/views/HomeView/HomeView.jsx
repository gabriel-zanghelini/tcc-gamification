import React from "react";

import { Tabs, Typography } from "antd";
import { ContentTabs, ContentWrapper } from "styles/components";
import ProjectTable from "components/MainLayout/ProjectTable";
import CurrentUserStore from "stores/CurrentUserStore";
import LoginForm from "components/MainLayout/LoginForm";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";
import ProjectForm from "components/Project/ProjectForm";

const { Title } = Typography;

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
                <ProjectForm />
              </ContentWrapper>
              <ContentWrapper width="60%" column={true}>
                <Title
                  level={3}
                  style={{ marginBottom: "25px", marginLeft: "10%" }}
                >
                  {t("menus.home.tabs.created_projects")}
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
