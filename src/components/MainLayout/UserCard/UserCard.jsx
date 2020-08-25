import React, { useState } from "react";

import { Avatar } from "antd";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import UserDrawer from "components/MainLayout/UserDrawer";

import CurrentUserStore from "stores/CurrentUserStore";

import * as Styled from "./styled";

const UserCard = () => {
  const { t } = useTranslation();

  const { currentUser } = CurrentUserStore;

  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <>
      <Styled.CardButton type="primary" onClick={() => setDrawerVisible(true)}>
        <span>
          <strong>{t("user_card.greeting")}, </strong>
          {currentUser.fullName}
        </span>
        <Avatar icon="user" src={currentUser.picture} />
      </Styled.CardButton>
      <UserDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
      />
    </>
  );
};

export default observer(UserCard);
