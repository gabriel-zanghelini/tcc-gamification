import React from "react";
import { Tabs, Typography } from "antd";

import LoginForm from "components/MainLayout/LoginForm";
import ProjectForm from "components/Project/ProjectForm";
import ProjectTable from "components/MainLayout/ProjectTable";
import { ContentTabs, FlexDiv } from "styles/components";

import useCurrentUserStore from "stores/CurrentUserStore";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";

const { Title } = Typography;

const HomeView = () => {
  const { t } = useTranslation();
  const currentUserStore = useCurrentUserStore();

  return (
    <>
      <ContentTabs>
        {currentUserStore.isLoggedIn ? (
          <Tabs.TabPane
            tab={t("menus.home.tabs.projects")}
            key="projects"
            style={{ display: "flex" }}
          >
            <>
              <FlexDiv width="40%" column={true}>
                <ProjectForm />
              </FlexDiv>
              <FlexDiv width="60%" column={true}>
                <Title
                  level={3}
                  style={{ marginBottom: "25px", marginLeft: "10%" }}
                >
                  {t("menus.home.tabs.created_projects")}
                </Title>
                <ProjectTable style={{ width: "80%", alignSelf: "center" }} />
              </FlexDiv>
            </>
          </Tabs.TabPane>
        ) : (
          <Tabs.TabPane
            tab={t("login.title")}
            key="login"
            style={{ display: "flex" }}
          >
            <FlexDiv width="100%" justifyContent="center">
              <LoginForm />
            </FlexDiv>
          </Tabs.TabPane>
        )}
      </ContentTabs>
    </>
  );
};

export default observer(HomeView);
