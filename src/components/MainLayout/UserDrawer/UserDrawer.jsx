import React from "react";

import { Drawer, Avatar, Divider } from "antd";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import useCurrentUserStore from "stores/CurrentUserStore";

import * as Styled from "./styled";

const UserDrawer = ({ visible, onClose }) => {
  const { t } = useTranslation();
  const currentUserStore = useCurrentUserStore();

  return (
    <Drawer
      width={540}
      placement="right"
      closable
      visible={visible}
      onClose={onClose}
    >
      <Styled.Title>{t("user_drawer.profile")}</Styled.Title>
      <Styled.Avatar>
        <Avatar
          size={128}
          style={{ backgroundColor: "#7265e6", verticalAlign: "middle" }}
          children={currentUserStore.currentUser?.name?.charAt(0)}
        />
      </Styled.Avatar>
      <Divider />
      <Styled.SubTitle>{t("user_drawer.personal_data")}</Styled.SubTitle>
      <Styled.Division>
        <Entry
          label={t("user_drawer.labels.name")}
          value={currentUserStore.currentUser?.name}
        />
        <Entry
          label={t("user_drawer.labels.email")}
          value={currentUserStore.currentUser?.email}
        />
        <Entry
          label={t("user_drawer.labels.reputation_points")}
          value={currentUserStore.currentUser?.reputationPoints}
        />
      </Styled.Division>

      <Divider />
      <Styled.SubTitle>{t("user_drawer.team_data")}</Styled.SubTitle>
      <Styled.Division>
        <Entry label={t("user_drawer.labels.team_name")} value={""} />
      </Styled.Division>

      <Divider />
    </Drawer>
  );
};

export default observer(UserDrawer);

const Entry = ({ label, value, span }) => (
  <Styled.Entry span={span}>
    <Styled.Label>{label}:</Styled.Label>
    <span>{value}</span>
  </Styled.Entry>
);
