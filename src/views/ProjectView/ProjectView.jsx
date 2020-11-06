import React, { useEffect, useState } from "react";
import axios from "axios";
import { Icon, Table, Tabs, Typography } from "antd";

import LoginForm from "components/MainLayout/LoginForm";
import KanbanBoard from "components/Project/KanbanBoard";
import { ContentTabs, FlexDiv } from "styles/components";

import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useCurrentUserStore from "stores/CurrentUserStore";
import { observer } from "mobx-react";
import ProfileBorder from "components/MainLayout/ProfileBorder";

const { Text } = Typography;

const fetcher = axios.create({
  baseURL: "/api",
});

const ProjectView = () => {
  let { id } = useParams();
  const { t } = useTranslation();
  const currentUserStore = useCurrentUserStore();
  const [dataSource, setDataSource] = useState([]);

  const getData = async () => {
    await fetcher
      .get(`pontuation/project/${id}`)
      .then(({ data }) => {
        let datasource = data
          ?.map((p) => {
            return {
              key: p.id,
              userId: p.user_id,
              userName: p.user_name,
              userEmail: p.user_email,
              projectId: p.project_id,
              pontuation: p.pontuation,
            };
          })
          .sort((a, b) => b.pontuation - a.pontuation);

        setDataSource(datasource);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const onTabClick = (key) => {
    if (key === "ranking") getData();
  };

  const columns = [
    {
      key: "icon",
      title: "#",
      dataIndex: "",
      align: "center",
      width: "100px",
      render: (text, record, index) => {
        if (index === 0) {
          return <Icon type="trophy" />;
        } else if (index === 1) {
          return <Icon type="crown" />;
        } else if (index === 2) {
          return <Icon type="star" />;
        }
        return <Icon type="user" />;
      },
    },
    {
      key: "user",
      title: t("project_view.project_ranking.columns.user"),
      dataIndex: "userName",
      align: "center",
    },
    {
      key: "pontuation",
      title: t("project_view.project_ranking.columns.pontuation"),
      dataIndex: "pontuation",
      align: "center",
    },
  ];

  if (currentUserStore.isLoggedIn) {
    return (
      <ContentTabs tabBarStyle={{ marginBottom: "0" }} onTabClick={onTabClick}>
        <Tabs.TabPane
          tab={
            <span>
              <Icon type="inbox" />
              {t("project_view.tasks")}
            </span>
          }
          key="tasks"
          style={{ display: "flex" }}
        >
          <FlexDiv width="100%" column={true} padding="var(--xs-pad)">
            <KanbanBoard allowAddCard allowRemoveCard projectId={id} />
          </FlexDiv>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <Icon type="trophy" />
              {t("project_view.rankings")}
            </span>
          }
          key="ranking"
          style={{ display: "flex" }}
        >
          <FlexDiv
            width="100%"
            justifyContent="space-around"
            padding="var(--xs-pad)"
          >
            <Table
              dataSource={dataSource}
              title={() => (
                <Text strong>{t("project_view.project_ranking.title")}</Text>
              )}
              columns={columns}
              rowKey="key"
              bordered
              style={{ width: "40%" }}
              rowClassName={(record, rowIndex) => {
                if (rowIndex === 0) {
                  return "row-rank-1";
                } else if (rowIndex === 1) {
                  return "row-rank-2";
                } else if (rowIndex === 2) {
                  return "row-rank-3";
                }
              }}
            />
            <FlexDiv width="384px" column="column">
              <Text strong>{t("project_view.profile_ranking")}</Text>
              <span>
                <ProfileBorder />
              </span>
            </FlexDiv>
          </FlexDiv>
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
          <FlexDiv width="100%" justifyContent="center">
            <LoginForm />
          </FlexDiv>
        </Tabs.TabPane>
      </ContentTabs>
    );
  }
};

export default observer(ProjectView);
