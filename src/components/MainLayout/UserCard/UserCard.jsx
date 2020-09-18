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
  console.log(currentUser);
  return (
    <>
      <Styled.CardButton type="primary" onClick={() => setDrawerVisible(true)}>
        <span>
          <strong>{t("user_card.greeting")}, </strong>
          {currentUser.name}
        </span>
        <Avatar
          style={{ backgroundColor: "#7265e6", verticalAlign: "middle" }}
          size="large"
          children={currentUser.name}
        />
      </Styled.CardButton>
      <UserDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
      />
    </>
  );
};

export default observer(UserCard);
