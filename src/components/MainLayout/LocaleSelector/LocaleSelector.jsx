import React from "react";

import { Select } from "antd";
import { useTranslation } from "react-i18next";

import Flag from "components/MainLayout/Flag";

import { DEFAULT_LANGUAGE, LANGUAGES } from "configs/language";

const LocaleSelector = (props) => {
  const { i18n } = useTranslation();

  let language = i18n.language;
  if (!LANGUAGES.includes(language)) {
    language = DEFAULT_LANGUAGE;
    i18n.changeLanguage(DEFAULT_LANGUAGE);
  }

  return (
    <Select
      value={language}
      onChange={(lang) => i18n.changeLanguage(lang)}
      {...props}
    >
      {LANGUAGES.map((lang) => {
        const country = lang.split("-")[1];

        return (
          <Select.Option value={lang} key={lang}>
            <Flag country={country} />
          </Select.Option>
        );
      })}
    </Select>
  );
};

export default LocaleSelector;
