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
  ProductPortionTypesScene,
  EditPortionsScene,
} from 'scenes/restaurant/admin';
import { QrCodeScene } from 'scenes/restaurant/admin/qrcode.scene';

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
        <Route exact={true} path={switchRoutes.qrCode} component={QrCodeScene} />
        <Route
          exact={true}
          path={switchRoutes.productPortionTypes}
          component={ProductPortionTypesScene}
        />
        <Route exact={true} path={switchRoutes.editPortions} component={EditPortionsScene} />
      </Switch>
    </Router>
  );
};
