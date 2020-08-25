import React from "react";

import { Tabs } from "antd";

import { ContentTabs } from "styles/components";

const HomeView = () => {
  return (
    <ContentTabs>
      <Tabs.TabPane tab="Tab 1" key="Tab 1">
        First Tab
      </Tabs.TabPane>
    </ContentTabs>
  );
};

export default HomeView;
