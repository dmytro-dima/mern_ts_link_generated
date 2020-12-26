import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { LinksPage } from "../pages/links-page";
import { CreatePage } from "../pages/create-page";
import { DetailsPage } from "../pages/details-page";
import { AuthPage } from "../pages/auth-page";

export const userRouters = (isAuthenticated: boolean) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/links" exact>
          <LinksPage />
        </Route>
        <Route path="/create" exact>
          <CreatePage />
        </Route>
        <Route path="/detail/:id" exact>
          <DetailsPage />
        </Route>
        <Redirect to="/create" />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
