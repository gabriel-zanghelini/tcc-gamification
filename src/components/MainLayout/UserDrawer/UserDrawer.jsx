import React from "react";

import { Drawer } from "antd";
import { observer } from "mobx-react";

import { useTranslation } from "react-i18next";

import * as Styled from "./styled";
import ProfileBorder from "../ProfileBorder";

const UserDrawer = ({ visible, onClose }) => {
  const { t } = useTranslation();

  return (
    <Drawer
      width={400}
      placement="right"
      closable
      visible={visible}
      onClose={onClose}
      style={{ display: "block", margin: "auto" }}
    >
      <Styled.Title>{t("user_drawer.profile")}</Styled.Title>
      <ProfileBorder />
    </Drawer>
  );
};

export default observer(UserDrawer);
