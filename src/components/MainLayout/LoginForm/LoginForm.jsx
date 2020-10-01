import React, { useEffect, useState } from "react";
import axios from "axios";

import { Divider, Spin } from "antd";
import { observer } from "mobx-react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import { ContentWrapper } from "styles/components";
import CurrentUserStore from "stores/CurrentUserStore";

const fetcher = axios.create({
  baseURL: "/api",
});

const LoginForm = ({ onOk, ...props }) => {
  useEffect(() => {
    fetcher
      .get("login/token")
      .then(({ data }) => {
        console.log("onLogin", data);
        CurrentUserStore.setUser(data);
      })
      .catch((e) => console.error);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ContentWrapper cardStyle={true} width="60%" justifyContent="center">
      <SignInForm />
      <Divider style={{ height: "15em", marginTop: "24px" }} type="vertical" />
      <SignUpForm />
    </ContentWrapper>
  );
};

export default observer(LoginForm);
