import React from "react";

import { useTranslation } from "react-i18next";

import { SITE_NAME_TRN_KEY } from "configs/site";

import * as Styled from "./styled";

const Footer = () => {
  const { t } = useTranslation();
  let siteName = t(SITE_NAME_TRN_KEY);

  return <Styled.Footer>{t("footer.copyright", { siteName })}</Styled.Footer>;
};

export default Footer;
