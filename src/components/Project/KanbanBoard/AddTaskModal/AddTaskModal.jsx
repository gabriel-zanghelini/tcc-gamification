import React from "react";
import { Button, Modal } from "antd";
import { observer, useLocalStore } from "mobx-react";
import { useTranslation } from "react-i18next";

import FormInput from "components/Common/FormInput";
import { FormTaskRate } from "components/Common/FormTaskRate/FormTaskRate";

const AddTaskModal = ({ visible, onAdd, onCancel, status, projectId }) => {
  const { t } = useTranslation();

  //description, status, difficulty, points_required, project_id
  const formState = useLocalStore(() => ({
    description: {
      value: "",
      error: null,
      dirty: false,
    },
    difficulty: {
      value: -1,
      error: null,
      dirty: false,
    },
  }));

  return (
    <Modal
      visible={visible}
      title="New Task"
      // onOk={onAdd}
      // onCancel={onCancel}
      footer={[
        <Button
          key="back"
          onClick={() => {
            formState.description.value = "";
            formState.difficulty.value = -1;
            onCancel();
          }}
        >
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={() =>
            onAdd(
              formState.description.value,
              formState.difficulty.value,
              status
            )
          }
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
      {/* {formState.description.value}
      {formState.difficulty.value} */}
    </Modal>
  );
};

export default observer(AddTaskModal);
