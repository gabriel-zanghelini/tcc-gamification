import React, { useEffect, useState } from "react";
import { Divider, Icon, Table, Tooltip } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";

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
      title: "Id",
      dataIndex: "key",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => {
        return (
          <Tooltip title={actions[0].tooltip}>
            <Link
              to={(location) => ({
                ...location,
                pathname: actions[0].route + record.key,
              })}
            >
              {text}
            </Link>
          </Tooltip>
        );
      },
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
                <span>
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
                </span>
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
