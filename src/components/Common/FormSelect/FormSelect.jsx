import React from "react";

import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { Form, Icon, Input, Select } from "antd";

const { Option } = Select;

export const FormSelect = observer(
  ({ formState, name, icon, options, ...props }) => {
    const { t } = useTranslation();

    const { value, error, dirty } = formState[name];

    const showError = !dirty && error;

    const status = showError ? "error" : undefined;
    const errorMessage = showError ? t(error) : undefined;

    const onChange = (value) => {
      formState[name].value = value;
      formState[name].dirty = true;
    };

    return (
      <Form.Item validateStatus={status} help={errorMessage}>
        <Select value={value} style={{ width: 120 }} onChange={onChange}>
          {options.map((opt) => (
            <Option value={opt.key}>{opt.value}</Option>
          ))}
        </Select>
      </Form.Item>
    );
  }
);
