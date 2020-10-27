import React from "react";

import { Drawer, Avatar, Divider, Typography, Tag, Icon } from "antd";
import { observer } from "mobx-react";

import { useTranslation } from "react-i18next";
import useCurrentUserStore from "stores/CurrentUserStore";

import * as Styled from "./styled";
import RepPointsTag from "components/Common/RepPointsTag";
import StarterBorder from "../ReputationBorders/StarterBorder";
import GoldBorder from "../ReputationBorders/GoldBorder";
import SilverBorder from "../ReputationBorders/SilverBorder";
import BronzeBorder from "../ReputationBorders/BronzeBorder";
import PlatinumBorder from "../ReputationBorders/PlatinumBorder";
import DiamondBorder from "../ReputationBorders/DiamondBorder";

const { Text, Title } = Typography;

const ProfileBorder = ({ children }) => {
  const currentUserStore = useCurrentUserStore();
  const reputationBorders = {
    0: StarterBorder,
    250: BronzeBorder,
    750: SilverBorder,
    1500: GoldBorder,
    3000: PlatinumBorder,
    5000: DiamondBorder,
  };

  let Border = StarterBorder;

  Object.keys(reputationBorders).forEach((b) => {
    let repPoints = currentUserStore.currentUser.reputation_points;

    console.log(repPoints, parseInt(b));
    if (repPoints >= parseInt(b)) {
      Border = reputationBorders[b];
    }
  });
  console.log("border", Border);
  return <Border>{children}</Border>;
};

const UserDrawer = ({ visible, onClose }) => {
  const { t } = useTranslation();
  const currentUserStore = useCurrentUserStore();

  return (
    <Drawer
      width={400}
      placement="right"
      closable
      visible={visible}
      onClose={onClose}
      style={{ display: "block", margin: "auto" }}
    >
      <Styled.Title>{t("user_drawer.profile")}</Styled.Title>
      <ProfileBorder>
        <div style={{ width: 285 }}>
          <Styled.Avatar>
            <Avatar
              size={64}
              style={{ backgroundColor: "#7265e6", verticalAlign: "middle" }}
              children={currentUserStore.currentUser?.name?.charAt(0)}
            />
          </Styled.Avatar>
          <Divider />
          {/* <Styled.SubTitle>{t("user_drawer.personal_data")}</Styled.SubTitle> */}
          <Styled.Division>
            <Title level={3}>{currentUserStore.currentUser?.name}</Title>
          </Styled.Division>
          <Styled.Division>
            <Text type="secondary">{currentUserStore.currentUser?.email}</Text>
          </Styled.Division>
          <Styled.Division>
            <RepPointsTag
              style={{ fontSize: 16, padding: 3, marginTop: 30 }}
              points={currentUserStore.currentUser?.reputation_points}
            />
          </Styled.Division>
        </div>
      </ProfileBorder>
    </Drawer>
  );
};

export default observer(UserDrawer);

const Entry = ({ label, value, span }) => (
  <Styled.Entry span={span}>
    <Styled.Label>{label}:</Styled.Label>
    <span>{value}</span>
  </Styled.Entry>
);
