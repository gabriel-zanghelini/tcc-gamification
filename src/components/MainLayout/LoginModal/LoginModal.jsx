import React from "react";

import { Divider, Modal } from "antd";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const LoginModal = ({ onOk, ...props }) => {
  const { t } = useTranslation();

  return (
    <Modal
      title={t("login.title")}
      closable
      centered
      width="50%"
      {...props}
      footer={null}
    >
      <div style={{ display: "flex", justifyContent: "center", paddingBottom: "24px" }}>
        <SignInForm onOk={onOk} />
        <Divider style={{ height: "15em", marginTop: "24px" }} type="vertical" />
        <SignUpForm onOk={onOk} />
      </div>
    </Modal>
  );
};

export default observer(LoginModal);
