import React, { useState } from "react";
import { useParams, Redirect, Link } from "react-router-dom";
import { Steps, Button, message, Result } from "antd";
import { useTranslation } from "react-i18next";
import ProjectForm from "components/Project/ProjectForm";
import KanbanBoard from "components/Project/KanbanBoard";
import { observer } from "mobx-react";

const { Step } = Steps;

const ProjectStepsView = () => {
  const { t } = useTranslation();
  let { id } = useParams();
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    {
      key: 1,
      title: "project_steps_view.step_1.title",
      description: "project_steps_view.step_1.description",
      content: (
        <div style={{ width: "50%", marginLeft: "25%" }}>
          <ProjectForm />
        </div>
      ),
    },
    {
      key: 2,
      title: "project_steps_view.step_2.title",
      description: "project_steps_view.step_2.description",
      content: (
        <div style={{ width: "100%", marginLeft: "0" }}>
          <KanbanBoard allowRemoveCard projectId={id} columns={["todo"]} />
        </div>
      ),
    },
    {
      key: 3,
      title: "project_steps_view.step_3.title",
      description: "project_steps_view.step_3.description",
      content: (
        <Result
          status="success"
          title="Projeto criado com sucesso!"
          // subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
          // extra={[
          //   <Button type="primary" key="console">
          //     Go Console
          //   </Button>,
          //   <Button key="buy">Buy Again</Button>,
          // ]}
        />
      ),
    },
  ];

  const previous = () => {
    setCurrentStep(currentStep - 1);
  };

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  return (
    <div>
      <Steps
        current={currentStep}
        onChange={(curr) => setCurrentStep(curr)}
        style={{ minHeight: "0%", height: "70px", maxHeight: "70px" }}
      >
        {steps.map((item) => (
          <Step
            key={item.title}
            title={t(item.title)}
            description={t(item.description)}
            style={{ minHeight: "0%" }}
          />
        ))}
      </Steps>
      <div>{steps[currentStep].content}</div>
      <div className="steps-action">
        {currentStep > 0 && (
          <Button style={{ marginRight: 8 }} onClick={() => previous()}>
            {t("project_steps_view.actions.previous")}
          </Button>
        )}
        {currentStep === steps.length - 1 && (
          <Button type="primary" onClick={() => {}}>
            <Link
              to={(location) => ({
                ...location,
                pathname: "/project/" + id,
              })}
            >
              {t("project_steps_view.actions.done")}
            </Link>
          </Button>
        )}
        {currentStep < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            {t("project_steps_view.actions.next")}
          </Button>
        )}
      </div>
    </div>
  );
};

export default observer(ProjectStepsView);
