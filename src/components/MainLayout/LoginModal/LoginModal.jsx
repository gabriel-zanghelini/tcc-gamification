import React, { useEffect, useState } from "react";

import { Modal, Button, Input, Form, Icon } from "antd";
import axios from "axios";
import { useLocalStore, observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import CurrentUserStore from "stores/CurrentUserStore";

const fetcher = axios.create({
  baseURL: "/api",
});

const LoginModal = ({ onOk, ...props }) => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const formState = useLocalStore(() => ({
    email: {
      value: "",
      error: null,
      dirty: false,
    },
    password: {
      value: "",
      error: null,
      dirty: false,
    },
  }));

  const cleanForm = () => {
    formState.email.error = null;
    formState.email.dirty = false;

    formState.password.error = null;
    formState.password.dirty = false;
  };

  const onLogin = (user) => {
    console.log("onLogin", user);
    CurrentUserStore.setUser(user);
    setLoading(false);
    onOk();
  };

  const onSubmit = async () => {
    setLoading(true);
    cleanForm();
    try {
      await fetcher
        .post("login", {
          email: formState.email.value,
          password: formState.password.value,
        })
        .then(({ user }) => {
          console.log(user);
          onLogin(user);
        });
    } catch ({ response }) {
      setLoading(false);
      switch (response.data) {
        case "Incorrect Password":
          formState.password.error = "login.error.wrong_password";
          break;
        case "Incorrect Email":
          formState.password.error = "login.error.wrong_email";
          break;
        default:
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    fetcher
      .get("login/token")
      .then(({ data }) => onLogin(data))
      .catch(() => setLoading(false));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //  height: ${({ height }) => (height ? height : "100%")};
  return (
    <Modal
      title={t("login.title")}
      closable
      centered
      width="60%"
      {...props}
      footer={
        <Button
          type="primary"
          icon={loading ? "loading" : "play-circle"}
          disabled={loading}
          onClick={onSubmit}
        >
          {t("login.button")}
        </Button>
      }
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: "48%" }}>
          <FormInput
            formState={formState}
            name="email"
            icon="user"
            type="email"
            placeholder={t("login.labels.email")}
          />
          <FormInput
            formState={formState}
            name="password"
            icon="lock"
            type="password"
            placeholder={t("login.labels.password")}
          />
        </div>
        <div style={{ width: "48%" }}>
          <FormInput
            formState={formState}
            name="email"
            icon="user"
            type="email"
            placeholder={t("login.labels.email")}
          />
          <FormInput
            formState={formState}
            name="password"
            icon="lock"
            type="password"
            placeholder={t("login.labels.password")}
          />
        </div>
      </div>
    </Modal>
  );
};

export default observer(LoginModal);

const FormInput = observer(({ formState, name, icon, ...props }) => {
  const { t } = useTranslation();

  const { value, error, dirty } = formState[name];

  const showError = !dirty && error;

  const status = showError ? "error" : undefined;
  const errorMessage = showError ? t(error) : undefined;

  const onChange = ({ target }) => {
    formState[name].value = target.value;
    formState[name].dirty = true;
  };

  return (
    <Form.Item validateStatus={status} help={errorMessage}>
      <Input
        name={name}
        prefix={<Icon type={icon} />}
        {...props}
        value={value}
        onChange={onChange}
      />
    </Form.Item>
  );
});
