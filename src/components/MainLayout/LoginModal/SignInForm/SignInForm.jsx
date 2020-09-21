import React, { useEffect, useState } from "react";
import { Button, Typography } from "antd";
import { useLocalStore, observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import CurrentUserStore from "stores/CurrentUserStore";
import { FormInput } from "../FormInput.jsx/FormInput";
import axios from "axios";

const { Title } = Typography;

const fetcher = axios.create({
  baseURL: "/api",
});

const SignInForm = ({ onOk }) => {
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

  useEffect(() => {
    setLoading(true);
    fetcher
      .get("login/token")
      .then(({ data }) => onLogin(data))
      .catch(() => setLoading(false));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const cleanForm = () => {
    formState.email.error = null;
    formState.email.dirty = false;

    formState.password.error = null;
    formState.password.dirty = false;
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

  const onLogin = (user) => {
    console.log("onLogin", user);
    CurrentUserStore.setUser(user);
    setLoading(false);
    onOk();
  };

  return (
    <div style={{ width: "45%", marginRight: "48px" }}>
      <Title level={4}>{t("login.sign_in")}</Title>
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
      <Button
        type="primary"
        icon={loading ? "loading" : "play-circle"}
        disabled={loading}
        onClick={onSubmit}
      >
        {t("login.button")}
      </Button>
    </div>
  );
};

export default observer(SignInForm);
