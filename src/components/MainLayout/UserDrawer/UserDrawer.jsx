import React from "react";

import { Drawer, Avatar, Divider } from "antd";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import CurrentUserStore from "stores/CurrentUserStore";

import * as Styled from "./styled";

const UserDrawer = ({ visible, onClose }) => {
  const { t } = useTranslation();

  const { currentUser } = CurrentUserStore;

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
        <Avatar size={128} icon={"user"} src={currentUser.picture} />
      </Styled.Avatar>
      <Divider />
      <Styled.SubTitle>{t("user_drawer.personal_data")}</Styled.SubTitle>
      <Styled.Division>
        <Entry
          label={t("user_drawer.labels.name")}
          value={currentUser.name}
        />
        <Entry
          label={t("user_drawer.labels.login")}
          value={currentUser.login}
        />
        <Entry
          label={t("user_drawer.labels.email")}
          value={currentUser.email}
        />
        <Entry
          label={t("user_drawer.labels.phone")}
          value={currentUser.phone}
        />
        <Entry
          label={t("user_drawer.labels.country")}
          value={currentUser.country}
        />
        <Entry label={t("user_drawer.labels.city")} value={currentUser.city} />
      </Styled.Division>

      <Divider />
      <Styled.SubTitle>{t("user_drawer.company_data")}</Styled.SubTitle>
      <Styled.Division>
        <Entry
          label={t("user_drawer.labels.company")}
          value={currentUser.company}
        />
        <Entry
          label={t("user_drawer.labels.division")}
          value={currentUser.division}
        />
        <Entry
          label={t("user_drawer.labels.department")}
          value={currentUser.department}
          span={2}
        />
        <Entry
          label={t("user_drawer.labels.section")}
          value={currentUser.section}
          span={2}
        />
        <Entry
          label={t("user_drawer.labels.manager")}
          value={currentUser.manager}
        />
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
