import React, { useMemo } from "react";

import { Layout, Menu, Icon } from "antd";
import { Link, useRouteMatch, Redirect } from "react-router-dom";

import { MENUS, DEFAULT_PATH } from "configs/menus";

import { useTranslation } from "react-i18next";

const Sider = () => {
  const { t } = useTranslation();

  const siderMenus = useMemo(
    () => MENUS.map((menu) => ({ ...menu, name: t(menu.name) })),
    [t]
  );

  const match = useRouteMatch("/:mainPath");

  if (!match) {
    return <Redirect to={DEFAULT_PATH} />;
  }

  return (
    <Layout.Sider theme="light" collapsible>
      <Menu selectedKeys={[match.url]} mode="inline">
        {siderMenus.map(({ name, icon, path }) => (
          <Menu.Item key={path}>
            <Link to={(location) => ({ ...location, pathname: path })}>
              <Icon type={icon} />
              <span>{name}</span>
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    </Layout.Sider>
  );
};

export default Sider;
