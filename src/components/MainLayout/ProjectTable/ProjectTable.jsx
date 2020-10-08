import React, { useEffect, useState } from "react";
import { Button, Divider, Icon, Table, Tabs, Tooltip, Typography } from "antd";
import axios from "axios";
import { Link, useRouteMatch, Redirect } from "react-router-dom";

const fetcher = axios.create({
  baseURL: "/api/project",
});

const ProjectTable = ({ style }) => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    fetcher
      .get("")
      .then(({ data }) => {
        setDataSource(
          data?.map((p) => {
            return {
              key: p.id,
              title: p.title,
              description: p.description,
              leader: p.leader_id,
              team: p.team_id,
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
      route: "/project/open/",
    },
    {
      tooltip: "Editar",
      icon: "edit",
      route: "/project/edit/",
    },
    {
      tooltip: "Excluir",
      icon: "delete",
      route: "/project/delete/",
    },
  ];

  const columns = [
    {
      title: "Id",
      dataIndex: "key",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Leader",
      dataIndex: "leader",
      key: "leader",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "action",
      render: (text, record) => {
        return (
          <span>
            {actions.map((a, i) => {
              console.log(record);
              return (
                <>
                  <Tooltip title={a.tooltip}>
                    <Link
                      to={(location) => ({
                        ...location,
                        pathname: a.route + record.key,
                      })}
                    >
                      <Icon type={a.icon} />
                    </Link>
                  </Tooltip>
                  {/* <Button type="link" icon={a.icon} /> */}
                  {i < actions.length - 1 ? <Divider type="vertical" /> : null}
                </>
              );
            })}
          </span>
        );
      },
    },
  ];

  return <Table dataSource={dataSource} columns={columns} style={style} />;
};

export default ProjectTable;
