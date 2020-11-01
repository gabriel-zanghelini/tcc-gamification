import React from "react";

import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { Form, DatePicker } from "antd";

const FormDatePicker = ({
  formState,
  name,
  icon,
  label,
  formItemStyle,
  ...props
}) => {
  const { t } = useTranslation();

  const { value, error, dirty } = formState[name];

  const showError = !dirty && error;

  const status = showError ? "error" : undefined;
  const errorMessage = showError ? t(error) : undefined;

  const onChange = (date, dateString) => {
    console.log(dateString);
    formState[name].value = date;
    formState[name].dirty = true;
  };

  return (
    <Form.Item
      validateStatus={status}
      help={errorMessage}
      label={label}
      style={formItemStyle}
    >
      <DatePicker
        name={name}
        onChange={onChange}
        value={value}
        format="DD/MM/YYYY"
        {...props}
      />
    </Form.Item>
  );
};

export default observer(FormDatePicker);
