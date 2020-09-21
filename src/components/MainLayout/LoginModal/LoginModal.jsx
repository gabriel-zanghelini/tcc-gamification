import React from "react";

import { Modal } from "antd";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import SignInForm from "./SignInForm";

const LoginModal = ({ onOk, ...props }) => {
  const { t } = useTranslation();

  //  height: ${({ height }) => (height ? height : "100%")};
  return (
    <Modal
      title={t("login.title")}
      closable
      centered
      width="40%"
      {...props}
      footer={null}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <SignInForm onOk={onOk} />
        {/* <div style={{ width: "45%" }}>
          <Title level={4}>{t("login.sign_up")}</Title>
          <FormInput
            formState={loginFormState}
            name="email"
            icon="user"
            type="email"
            placeholder={t("login.labels.email")}
          />
          <FormInput
            formState={loginFormState}
            name="password"
            icon="lock"
            type="password"
            placeholder={t("login.labels.password")}
          />
        </div> */}
      </div>
    </Modal>
  );
};

export default observer(LoginModal);
