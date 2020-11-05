import React, { useEffect } from "react";
import axios from "axios";

import { Divider } from "antd";
import { observer } from "mobx-react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import { FlexDiv } from "styles/components";
import useCurrentUserStore from "stores/CurrentUserStore";

const fetcher = axios.create({
  baseURL: "/api",
});

const LoginForm = ({ onOk, ...props }) => {
  const currentUserStore = useCurrentUserStore();

  useEffect(() => {
    fetcher
      .get("login/token")
      .then(({ data }) => {
        currentUserStore.setUser(data);
      })
      .catch((e) => console.error);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <FlexDiv
      cardStyle={true}
      width="60%"
      justifyContent="center"
      style={{ background: "var(--main-white)" }}
    >
      <SignInForm />
      <Divider style={{ height: "15em", marginTop: "24px" }} type="vertical" />
      <SignUpForm />
    </FlexDiv>
  );
};

export default observer(LoginForm);
