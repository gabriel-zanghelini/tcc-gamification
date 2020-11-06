import React from "react";

import { Drawer, Avatar, Divider, Typography, Progress } from "antd";
import { observer } from "mobx-react";
import { REPUTATION_BORDERS } from "configs/borders";
import useCurrentUserStore from "stores/CurrentUserStore";
import StarterBorder from "../ReputationBorders/StarterBorder";
import RepPointsTag from "components/Common/RepPointsTag";

import * as Styled from "./styled";
import { FlexDiv } from "styles/components";

const { Text, Title } = Typography;

const ProfileBorder = ({ children }) => {
  const currentUserStore = useCurrentUserStore();

  let Border = StarterBorder;
  let reputation = currentUserStore.currentUser.reputation_points;
  let nextLevelReputation = 0;
  let percentNextLevel = 0;

  Object.keys(REPUTATION_BORDERS).forEach((b, i) => {
    if (reputation >= parseInt(b)) {
      Border = REPUTATION_BORDERS[b];
    }

    if (reputation < parseInt(b) && nextLevelReputation === 0) {
      nextLevelReputation = parseInt(b);
    }
  });

  percentNextLevel = ((reputation / nextLevelReputation) * 100).toFixed(0);

  return (
    <FlexDiv column="column">
      <span>
        <Border>
          <div style={{ width: 285 }}>
            <Styled.Avatar>
              <Avatar
                size={64}
                style={{ backgroundColor: "#7265e6", verticalAlign: "middle" }}
                children={currentUserStore.currentUser?.name?.charAt(0)}
              />
            </Styled.Avatar>
            <Divider />
            <Styled.Division>
              <Title level={3}>{currentUserStore.currentUser?.name}</Title>
            </Styled.Division>
            <Styled.Division>
              <Text type="secondary">
                {currentUserStore.currentUser?.email}
              </Text>
            </Styled.Division>
            <Styled.Division>
              <RepPointsTag
                style={{ fontSize: 16, padding: 3, marginTop: 30 }}
                points={currentUserStore.currentUser?.reputation_points}
              />
            </Styled.Division>
          </div>
        </Border>
      </span>
      <span style={{ width: "100%" }}>
        <Progress
          percent={percentNextLevel}
          className="kanban-progress"
          strokeWidth={12}
          strokeColor="orange"
          strokeLinecap="square"
        />
      </span>
    </FlexDiv>
  );
};

export default ProfileBorder;
