import React from "react";

import { observer } from "mobx-react";
import useCurrentUserStore from "stores/CurrentUserStore";

import UserCard from "components/MainLayout/UserCard";

import APPLogo from "assets/images/applogo.png";
import { SITE_NAME_TRN_KEY } from "configs/site";
import * as Styled from "./styled";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();
  const currentUserStore = useCurrentUserStore();

  return (
    <Styled.Header>
      <Styled.Content>
        <img src={APPLogo} alt="APPLogo" width={45} />
        <Styled.Title>{t(SITE_NAME_TRN_KEY)}</Styled.Title>
        {currentUserStore.isLoggedIn ? <UserCard /> : null}
      </Styled.Content>
      <Styled.LangSelector />
    </Styled.Header>
  );
};

export default observer(Header);
