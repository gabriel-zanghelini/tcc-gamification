import React, { useState } from "react";

import { Button } from "antd";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import LoginModal from "components/MainLayout/LoginModal";
import UserCard from "components/MainLayout/UserCard";

import APPLogo from 'assets/images/applogo.png';

import { SITE_NAME } from "configs/site";

import CurrentUserStore from "stores/CurrentUserStore";

import * as Styled from "./styled";

const Header = () => {
  const { t } = useTranslation();

  const [modalVisible, setModalVisible] = useState(true);

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <Styled.Header>
      <LoginModal
        onOk={closeModal}
        onCancel={closeModal}
        visible={modalVisible}
        closable
      />
      <Styled.Content>
        <img src={APPLogo} alt="APPLogo" width={45} />
        <Styled.Title>{SITE_NAME}</Styled.Title>
        {CurrentUserStore.isLoggedIn ? (
          <UserCard />
        ) : (
            <Button type="primary" onClick={openModal}>
              {t("login.button")}
            </Button>
          )}
      </Styled.Content>
      <Styled.LangSelector />
    </Styled.Header>
  );
};

export default observer(Header);
