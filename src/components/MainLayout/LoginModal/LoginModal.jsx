import React, { useEffect, useState } from "react";

import { Modal, Button, Input, Form, Icon } from "antd";
import axios from "axios";
import { useLocalStore, observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import CurrentUserStore from "stores/CurrentUserStore";

const fetcher = axios.create({
  baseURL: "/api/login",
});

const LoginModal = ({ onOk, ...props }) => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const formState = useLocalStore(() => ({
    username: {
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
    formState.username.error = null;
    formState.username.dirty = false;

    formState.password.error = null;
    formState.password.dirty = false;
  };

  const onLogin = (user) => {
    CurrentUserStore.setUser(user);
    setLoading(false);
    onOk();
  };

  const onSubmit = async () => {
    setLoading(true);
    cleanForm();
    try {
      const { data } = await fetcher.post("credentials", {
        username: formState.username.value,
        password: formState.password.value,
      });
      onLogin(data);
    } catch ({ response }) {
      setLoading(false);
      switch (response.data) {
        case "Incorrect Password":
          formState.password.error = "login.error.wrong_password";
          break;
        case "Incorrect Username":
          formState.password.error = "login.error.wrong_username";
          break;
        default:
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    fetcher
      .get("token")
      .then(({ data }) => onLogin(data))
      .catch(() => setLoading(false));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Modal
      title={t("login.title")}
      closable
      centered
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
      <FormInput
        formState={formState}
        name="username"
        icon="user"
        type="username"
        placeholder={t("login.labels.username")}
      />
      <FormInput
        formState={formState}
        name="password"
        icon="lock"
        type="password"
        placeholder={t("login.labels.password")}
      />
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
