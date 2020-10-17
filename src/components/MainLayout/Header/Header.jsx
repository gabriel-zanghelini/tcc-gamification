import React from "react";

import { observer } from "mobx-react";
import useCurrentUserStore from "stores/CurrentUserStore";

import UserCard from "components/MainLayout/UserCard";

import APPLogo from "assets/images/applogo.png";
import { SITE_NAME } from "configs/site";
import * as Styled from "./styled";

const Header = () => {
  const currentUserStore = useCurrentUserStore();
  
  return (
    <Styled.Header>
      <Styled.Content>
        <img src={APPLogo} alt="APPLogo" width={45} />
        <Styled.Title>{SITE_NAME}</Styled.Title>
        {currentUserStore.isLoggedIn ? <UserCard /> : null}
      </Styled.Content>
      <Styled.LangSelector />
    </Styled.Header>
  );
};

export default observer(Header);
