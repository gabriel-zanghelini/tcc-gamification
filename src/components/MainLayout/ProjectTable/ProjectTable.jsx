import React, { useEffect, useState } from "react";
import { Button, Divider, Table, Tabs, Tooltip, Typography } from "antd";
import axios from "axios";

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
    },
    {
      tooltip: "Editar",
      icon: "edit",
    },
    {
      tooltip: "Excluir",
      icon: "delete",
    },
  ];

  const columns = [
    {
      title: "Id",
      dataIndex: "key",
      key: "id",
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
      title: "Team",
      dataIndex: "team",
      key: "team",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "action",
      render: (text, record) => {
        return (
          <span>
            {actions.map((a, i) => {
              return (
                <>
                  <Tooltip title={a.tooltip}>
                    <Button type="link" icon={a.icon} />
                  </Tooltip>
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
