import React from "react";
import { Icon, Table, Tabs } from "antd";

import LoginForm from "components/MainLayout/LoginForm";
import KanbanBoard from "components/Project/KanbanBoard";
import { ContentTabs, ContentWrapper } from "styles/components";

import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useCurrentUserStore from "stores/CurrentUserStore";
import { observer } from "mobx-react";
import ProgressBar from "components/Project/KanbanBoard/ProgressBar";

const ProjectView = () => {
  const { t } = useTranslation();
  let { id } = useParams();
  const currentUserStore = useCurrentUserStore();

  // const KanbanTab = () => {
  //   return (

  //   );
  // };

  // const RankingTab = () => {
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  //   return (

  //   );
  // };

  if (currentUserStore.isLoggedIn) {
    return (
      <ContentTabs tabBarStyle={{ marginBottom: "0" }}>
        <Tabs.TabPane
          tab={
            <span>
              <Icon type="inbox" />
              {t("menus.project_view.tasks")}
            </span>
          }
          key="tasks"
          style={{ display: "flex" }}
        >
          <ContentWrapper width="100%" column={true} padding="var(--xs-pad)">
            <KanbanBoard allowAddCard allowRemoveCard projectId={id} />
          </ContentWrapper>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <Icon type="trophy" />
              {t("menus.project_view.rankings")}
            </span>
          }
          key="ranking"
          style={{ display: "flex" }}
        >
          <ContentWrapper width="100%" column={true} padding="var(--xs-pad)">
            <Table dataSource={dataSource} columns={columns} />
          </ContentWrapper>
        </Tabs.TabPane>
      </ContentTabs>
    );
  } else {
    return (
      <ContentTabs tabBarStyle={{ marginBottom: "0" }}>
        <Tabs.TabPane
          tab={t("login.title")}
          key="login"
          style={{ display: "flex" }}
        >
          <ContentWrapper width="100%" justifyContent="center">
            <LoginForm />
          </ContentWrapper>
        </Tabs.TabPane>
      </ContentTabs>
    );
  }
};

export default observer(ProjectView);
