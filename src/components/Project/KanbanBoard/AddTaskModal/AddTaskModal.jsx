import React from "react";
import { Button, Modal } from "antd";
import { observer, useLocalStore } from "mobx-react";
// import { useTranslation } from "react-i18next";

import FormInput from "components/Common/FormInput";
import { FormTaskRate } from "components/Common/FormTaskRate/FormTaskRate";

const AddTaskModal = ({ visible, onAdd, onCancel, status, projectId }) => {
  // const { t } = useTranslation();

  const formState = useLocalStore(() => ({
    description: {
      value: "",
      error: null,
      dirty: false,
    },
    difficulty: {
      value: 0,
      error: null,
      dirty: false,
    },
  }));

  const cancel = () => {
    formState.description.value = "";
    formState.difficulty.value = 0;
    onCancel();
  };

  return (
    <Modal
      visible={visible}
      title="New Task"
      // onOk={onAdd}
      onCancel={cancel}
      footer={[
        <Button key="back" onClick={cancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={() => {
            onAdd(
              formState.description.value,
              formState.difficulty.value,
              status
            );
            formState.description.value = "";
            formState.difficulty.value = 0;
          }}
        >
          Add
        </Button>,
      ]}
    >
      <FormInput
        formState={formState}
        name="description"
        label="Description"
        formItemStyle={{ margin: "0 15%", width: "70%" }}
      />
      <FormTaskRate
        formState={formState}
        name="difficulty"
        label="Difficulty"
        formItemStyle={{ margin: "0 15%", width: "70%" }}
      />
      <span style={{display: "none"}}>{formState.description.value}</span>
      <span style={{display: "none"}}>{formState.difficulty.value}</span>
    </Modal>
  );
};

export default observer(AddTaskModal);
