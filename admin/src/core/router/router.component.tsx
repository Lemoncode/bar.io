import { Route, HashRouter as Router, Switch } from 'react-router-dom';
import React from 'react';
import { switchRoutes } from './routes';
import {
  BarInfoScene,
  CategoriesListScene,
  DashboardScene,
  EditProductScene,
  LoginScene,
  ProductListScene,
} from 'scenes/restaurant/admin';

export const RouterComponent: React.FunctionComponent = () => {
  return (
    <Router>
      <Switch>
        <Route exact={true} path={[switchRoutes.root, switchRoutes.login]} component={LoginScene} />
        <Route exact={true} path={switchRoutes.dashboard} component={DashboardScene} />
        <Route exact={true} path={switchRoutes.barInfo} component={BarInfoScene} />
        <Route exact={true} path={switchRoutes.categoriesList} component={CategoriesListScene} />
        <Route exact={true} path={switchRoutes.productList} component={ProductListScene} />
        <Route exact={true} path={switchRoutes.editProduct} component={EditProductScene} />
      </Switch>
    </Router>
  );
};
