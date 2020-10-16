import React from "react";
import { Tabs } from "antd";

import KanbanBoard from "components/Project/KanbanBoard";
import { ContentTabs, ContentWrapper } from "styles/components";

import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CurrentUserStore from "stores/CurrentUserStore";
import LoginForm from "components/MainLayout/LoginForm";

const ProjectView = () => {
  const { t } = useTranslation();
  let { id } = useParams();

  return (
    <ContentTabs>
      {CurrentUserStore.isLoggedIn ? (
        <Tabs.TabPane
          tab={t("menus.home.tabs.projects")}
          key="projects"
          style={{ display: "flex" }}
        >
          <ContentWrapper width="80%" column={true}>
            <KanbanBoard allowAddCard allowRemoveCard projectId={id} />
          </ContentWrapper>
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
  );
};

export default ProjectView;
