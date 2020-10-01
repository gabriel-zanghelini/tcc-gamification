import React, { useEffect, useState } from "react";
import axios from "axios";

import { Button } from "antd";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import LoginModal from "components/MainLayout/LoginForm";
import UserCard from "components/MainLayout/UserCard";

import APPLogo from "assets/images/applogo.png";

import { SITE_NAME } from "configs/site";

import CurrentUserStore from "stores/CurrentUserStore";

import * as Styled from "./styled";

const fetcher = axios.create({
  baseURL: "/api",
});

const Header = () => {
  const { t } = useTranslation();

  // const [modalLoading, setModalLoading] = useState(false);
  // const [modalVisible, setModalVisible] = useState(false);

  // useEffect(() => {
  //   setModalLoading(true);
  //   fetcher
  //     .get("login/token")
  //     .then(({ data }) => {
  //       console.log("onLogin", data);
  //       CurrentUserStore.setUser(data);
  //       setModalLoading(false);
  //       setModalVisible(false);
  //     })
  //     .catch(() => {
  //       setModalLoading(false);
  //       setModalVisible(true);
  //     });
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // const openModal = () => {
  //   setModalVisible(true);
  // };
  // const closeModal = () => {
  //   setModalVisible(false);
  // };
  console.log("LOGGED HEADER", CurrentUserStore.isLoggedIn);

  return (
    <Styled.Header>
      <Styled.Content>
        <img src={APPLogo} alt="APPLogo" width={45} />
        <Styled.Title>{SITE_NAME}</Styled.Title>
        {
          CurrentUserStore.isLoggedIn ? <UserCard /> : null
          // <Button type="primary" onClick={openModal}>
          //   {t("login.button")}
          // </Button>
        }
      </Styled.Content>
      <Styled.LangSelector />
    </Styled.Header>
  );
};

export default observer(Header);
