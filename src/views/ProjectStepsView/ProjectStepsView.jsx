import React, { useState } from "react";
import { Tabs, Typography, Steps, Button, message } from "antd";
import { useTranslation } from "react-i18next";
import ControlledBoard from "components/Project/ControlledBoard";

const { Step } = Steps;

const ProjectStepsView = () => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    {
      key: 1,
      title: "project_steps_view.step_1.title",
      description: "project_steps_view.step_1.description",
      content: "First-content",
    },
    {
      key: 2,
      title: "project_steps_view.step_2.title",
      description: "project_steps_view.step_2.description",
      content: "Second-content",
    },
    {
      key: 3,
      title: "project_steps_view.step_3.title",
      description: "project_steps_view.step_3.description",
      content: "Third-content",
    },
  ];

  return (
    <>
      <Steps current={currentStep} onChange={(curr) => setCurrentStep(curr)}>
        {steps.map((item) => (
          <Step
            key={item.title}
            title={t(item.title)}
            description={t(item.description)}
          />
        ))}
      </Steps>
      <div>{steps[currentStep].content}</div>
    </>
  );
};

export default ProjectStepsView;
