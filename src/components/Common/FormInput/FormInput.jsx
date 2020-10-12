import React from "react";

import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { Form, Icon, Input } from "antd";

const FormInput = ({ formState, name, icon, label, formItemStyle, ...props }) => {
  const { t } = useTranslation();

  const { value, error, dirty } = formState[name];

  const showError = !dirty && error;

  const status = showError ? "error" : undefined;
  const errorMessage = showError ? t(error) : undefined;

  const onChange = ({ target }) => {
    formState[name].value = target.value;
    formState[name].dirty = true;
  };

  return (
    <Form.Item
      validateStatus={status}
      help={errorMessage}
      label={label}
      style={formItemStyle}
    >
      <Input
        name={name}
        prefix={<Icon type={icon} />}
        {...props}
        value={value}
        onChange={onChange}
      />
    </Form.Item>
  );
};

export default observer(FormInput);
