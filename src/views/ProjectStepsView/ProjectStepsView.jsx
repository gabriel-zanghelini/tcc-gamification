import React, { useState } from "react";
import { Tabs, Typography, Steps } from "antd";
import { useTranslation } from "react-i18next";

const { Step } = Steps;

const ProjectStepsView = () => {
  const { t } = useTranslation();

  const steps = [
    {
      title: 'First',
      content: 'First-content',
    },
    {
      title: 'Second',
      content: 'Second-content',
    },
    {
      title: 'Last',
      content: 'Last-content',
    },
  ];

  return (
    <Steps current={1}>
      <Step
        key="1"
        title={t("project_steps_view.step_1.title")}
        description={t("project_steps_view.step_1.description")}
      />
      <Step
        key="2"
        title={t("project_steps_view.step_2.title")}
        subTitle={t("project_steps_view.step_2.sub_title")}
        description={t("project_steps_view.step_2.description")}
      />
      <Step
        key="3"
        title={t("project_steps_view.step_3.title")}
        description={t("project_steps_view.step_3.description")}
      />
    </Steps>
  );
};

export default ProjectStepsView;
