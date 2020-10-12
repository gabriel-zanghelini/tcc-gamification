import React from "react";

import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { Form, Rate } from "antd";

export const FormTaskRate = ({
  formState,
  name,
  icon,
  label,
  formItemStyle,
  ...props
}) => {
  const { t } = useTranslation();

  const desc = ["very easy", "easy", "medium", "hard", "very hard"];

  const { value, error, dirty } = formState[name];

  const showError = !dirty && error;

  const status = showError ? "error" : undefined;
  const errorMessage = showError ? t(error) : undefined;

  const onChange = (value) => {
    formState[name].value = value;
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
        <Rate tooltips={desc} onChange={onChange} value={value} {...props} />
        {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ""}
      </span>
    </Form.Item>
  );
};

export default observer(FormTaskRate);
