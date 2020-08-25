import React, { Suspense } from "react";

import { Trans } from "react-i18next";
import { Switch, Route, Redirect } from "react-router-dom";

import Spinner from "components/Common/Spinner";

import { MENUS, DEFAULT_PATH } from "configs/menus";

import * as Styled from "./styled";

const Content = () => {
  return (
    <Styled.Content>
      <Suspense
        fallback={
          <Spinner size="large" tip={<Trans i18nKey="spinner.loading" />} />
        }
      >
        <Switch>
          {MENUS.map(({ path, view }) => (
            <Route key={path} path={path} component={view} />
          ))}
          <Redirect to={DEFAULT_PATH} />
        </Switch>
      </Suspense>
    </Styled.Content>
  );
};

export default Content;
