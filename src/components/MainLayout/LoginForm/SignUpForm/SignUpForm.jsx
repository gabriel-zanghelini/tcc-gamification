import React, { useState } from "react";
import { Button, Typography } from "antd";
import { useLocalStore, observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import useCurrentUserStore from "stores/CurrentUserStore";
import FormInput from "components/Common/FormInput/FormInput";
import axios from "axios";

const { Title } = Typography;

const fetcher = axios.create({
  baseURL: "/api",
});

const SignUpForm = ({ onOk }) => {
  const { t } = useTranslation();
  const currentUserStore = useCurrentUserStore();

  const [loading, setLoading] = useState(false);
  const formState = useLocalStore(() => ({
    name: {
      value: "",
      error: null,
      dirty: false,
    },
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
    formState.name.error = null;
    formState.name.dirty = false;

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
        .post("signup", {
          name: formState.name.value,
          email: formState.email.value,
          password: formState.password.value,
        })
        .then(({ data }) => {
          console.log("SIGN UP", data);
          onLogin(data);
        });
    } catch ({ response }) {
      setLoading(false);
      switch (response.data) {
        case "Email Already In Use":
          formState.email.error = "login.error.email_in_use";
          break;
        default:
      }
    }
  };

  const onLogin = (user) => {
    console.log("onLogin", user);
    currentUserStore.setUser(user);
    setLoading(false);
    onOk();
  };

  return (
    <div style={{ width: "45%", margin: "0 48px 0 48px" }}>
      <Title level={4}>{t("login.sign_up")}</Title>
      <FormInput
        formState={formState}
        name="name"
        icon="user"
        type="name"
        placeholder={t("login.labels.name")}
      />
      <FormInput
        formState={formState}
        name="email"
        icon="mail"
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

export default observer(SignUpForm);
