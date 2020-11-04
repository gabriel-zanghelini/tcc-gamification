import React, { useEffect, useState } from "react";
import { Button, Divider, Icon, Table, Tooltip } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const fetcher = axios.create({
  baseURL: "/api/project",
});

const ProjectTable = ({ style }) => {
  const { t } = useTranslation();
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    fetcher
      .get("")
      .then(({ data }) => {
        setDataSource(
          data
            ?.filter((p) => p.status === "open")
            ?.map((p) => {
              return {
                key: p.id,
                title: p.title,
                description: p.description,
                leader: p.leader_id,
                team: p.team_id,
                status: p.status,
              };
            })
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const actions = [
    {
      tooltip: "Abrir",
      icon: "folder-open",
      route: "/project/",
    },
    {
      tooltip: "Editar",
      icon: "edit",
      route: "/edit/project/",
    },
    {
      tooltip: "Excluir",
      icon: "delete",
      route: "/project",
    },
  ];

  const columns = [
    {
      title: t("project_table.columns.id"),
      dataIndex: "key",
      key: "id",
    },
    {
      title: t("project_table.columns.title"),
      dataIndex: "title",
      key: "title",
      render: (text, record) => {
        return (
          <Tooltip title={t("project_table.actions.open")}>
            <Link
              to={(location) => ({
                ...location,
                pathname: `/project/${record.key}`,
              })}
            >
              {text}
            </Link>
          </Tooltip>
        );
      },
    },
    {
      title: t("project_table.columns.description"),
      dataIndex: "description",
      key: "description",
    },
    {
      title: t("project_table.columns.leader"),
      dataIndex: "leader",
      key: "leader",
    },
    {
      title: t("project_table.columns.actions"),
      dataIndex: "",
      key: "action",
      render: (text, record) => {
        return (
          <span>
            <span key={1}>
              <Tooltip title={t("project_table.actions.open")}>
                <Link
                  to={(location) => ({
                    ...location,
                    pathname: `/project/${record.key}`,
                  })}
                >
                  <Icon type="folder-open" />
                </Link>
              </Tooltip>
              <Divider type="vertical" />
            </span>
            <span key={2}>
              <Tooltip title={t("project_table.actions.edit")}>
                <Link
                  to={(location) => ({
                    ...location,
                    pathname: `/edit/project/${record.key}`,
                  })}
                >
                  <Icon type="edit" />
                </Link>
              </Tooltip>
              <Divider type="vertical" />
            </span>
            {/* <span key={3}>
              <Tooltip title={t("project_table.actions.delete")}>
                <Button
                  type="link"
                  icon="delete"
                  size="small"
                  onClick={async () => {
                    console.log(record.key);
                    await fetcher.delete(`/${record.key}`);
                  }}
                  style={{ width: 14, height: 19 }}
                />
              </Tooltip>
            </span> */}
          </span>
        );
      },
    },
  ];

  return <Table dataSource={dataSource} columns={columns} style={style} />;
};

export default ProjectTable;
