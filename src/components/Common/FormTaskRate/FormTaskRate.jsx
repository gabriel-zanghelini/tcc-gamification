import React from "react";

import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { Form, Rate } from "antd";

export const FormTaskRate = ({
  formState,
  name,
  label,
  formItemStyle,
  ...props
}) => {
  const { t } = useTranslation();

  const desc = [
    t("task_rate.very_easy"),
    t("task_rate.easy"),
    t("task_rate.medium"),
    t("task_rate.hard"),
    t("task_rate.very_hard"),
  ];

  const { value, error, dirty } = formState[name];

  const showError = !dirty && error;

  const status = showError ? "error" : undefined;
  const errorMessage = showError ? t(error) : undefined;

  const onChange = (rate) => {
    console.log(rate, name);
    formState[name].value = rate;
    formState[name].dirty = true;
  };

  return (
    <Form.Item
      validateStatus={status}
      help={errorMessage}
      label={label}
      style={formItemStyle}
    >
      <span>
        <Rate tooltips={desc} onChange={onChange} value={value} />
        {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ""}
      </span>
    </Form.Item>
  );
};

export default observer(FormTaskRate);
