import React from "react";

import { useTranslation } from "react-i18next";

import { SITE_NAME as siteName } from "configs/site";

import * as Styled from "./styled";

const Footer = () => {
  const { t } = useTranslation();

  return <Styled.Footer>{t("footer.copyright", { siteName })}</Styled.Footer>;
};

export default Footer;
