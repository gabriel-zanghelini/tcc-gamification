import React from "react";

import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { Form, DatePicker } from "antd";
import i18n, { EN_DATE_FORMAT, PT_DATE_FORMAT } from "configs/language";

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
        placeholder={t("add_task_modal.deadline_placeholder")}
        value={value}
        format={i18n.language === "pt-BR" ? PT_DATE_FORMAT : EN_DATE_FORMAT}
        {...props}
      />
    </Form.Item>
  );
};

export default observer(FormDatePicker);
