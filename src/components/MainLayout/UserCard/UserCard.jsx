import React, { useState } from "react";
import { observer } from "mobx-react";

import UserDrawer from "components/MainLayout/UserDrawer";
import RepPointsTag from "components/Common/RepPointsTag";

import useCurrentUserStore from "stores/CurrentUserStore";

import * as Styled from "./styled";

const UserCard = () => {
  const currentUserStore = useCurrentUserStore();
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <>
      <Styled.CardButton type="primary" onClick={() => setDrawerVisible(true)}>
        {/* <Avatar
          style={{ backgroundColor: "#7265e6", verticalAlign: "middle" }}
          size="default"
          children={currentUserStore.currentUser?.name?.charAt(0)}
        /> */}
        {currentUserStore.currentUser?.name}
        <RepPointsTag points={currentUserStore.currentUser?.reputation_points} />
      </Styled.CardButton>
      <UserDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
      />
    </>
  );
};

export default observer(UserCard);
