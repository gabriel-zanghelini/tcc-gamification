import React from "react";
import { Icon, Tabs } from "antd";

import LoginForm from "components/MainLayout/LoginForm";
import KanbanBoard from "components/Project/KanbanBoard";
import { ContentTabs, ContentWrapper } from "styles/components";

import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useCurrentUserStore from "stores/CurrentUserStore";
import { observer } from "mobx-react";

const ProjectView = () => {
  const { t } = useTranslation();
  let { id } = useParams();
  const currentUserStore = useCurrentUserStore();

  console.log("PV", currentUserStore.isLoggedIn);
  return (
    <ContentTabs>
      {currentUserStore.isLoggedIn ? (
        <Tabs.TabPane
          tab={
            <span>
              <Icon type="inbox" />
              {t("menus.project_view.tasks")}
            </span>
          }
          key="projects"
          style={{ display: "flex" }}
        >
          <ContentWrapper width="100%" column={true}>
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

export default observer(ProjectView);
