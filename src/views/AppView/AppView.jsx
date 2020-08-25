import React from "react";

import { Layout } from "antd";

import Content from "components/MainLayout/Content";
import Footer from "components/MainLayout/Footer";
import Header from "components/MainLayout/Header";
import Sider from "components/MainLayout/Sider";

import * as Styled from "./styled";

const AppView = () => {
  return (
    <Styled.Main>
      <Header title="Site Name" />
      <Layout>
        <Sider />
        <Styled.Scrollable>
          <Content />
          <Footer />
        </Styled.Scrollable>
      </Layout>
    </Styled.Main>
  );
};

export default AppView;
