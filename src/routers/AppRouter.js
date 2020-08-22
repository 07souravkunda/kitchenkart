import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import * as ROUTES from 'constants/routes';

import Dashboard from 'views/admin/dashboard';
import Products from 'views/admin/products';
import Users from 'views/admin/users';
import Orders from 'views/admin/orders';
import EditProduct from 'views/admin/edit_product';
import AddProduct from 'views/admin/add_product';

import ProductSearch from 'components/product/ProductSearch';
import SignUp from 'views/auth/signup';
import SignIn from 'views/auth/signin';
import ForgotPassword from 'views/auth/forgot_password';
import UserAccount from 'views/account/user_account';
import EditAccount from 'views/account/edit_account';
import Home from 'views/home';
import CheckOutStep1 from 'views/checkout/step1';
import CheckOutStep2 from 'views/checkout/step2';
import CheckOutStep3 from 'views/checkout/step3';
import PageNotFound from 'views/error/PageNotFound';
import ScrollToTop from 'components/ui/ScrollToTop';
import ClientRoute from './ClientRoute';
import PublicRoute from './PublicRoute';
import AdminRoute from './AdminRoute';
import UserOrdersTab from 'views/account/tab/UserOrdersTab';

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <Route
        component={ScrollToTop(ProductSearch)}
        exact
        path={ROUTES.SEARCH}
      />
      <PublicRoute component={Home} exact path={ROUTES.HOME} />
      <PublicRoute component={ScrollToTop(SignUp)} path={ROUTES.SIGNUP} />
      <PublicRoute component={ScrollToTop(SignIn)} path={ROUTES.SIGNIN} />
      <PublicRoute
        component={ScrollToTop(ForgotPassword)}
        path={ROUTES.FORGOT_PASSWORD}
      />
      <ClientRoute
        component={ScrollToTop(UserAccount)}
        exact
        path={ROUTES.ACCOUNT}
      />
      <ClientRoute
        component={ScrollToTop(UserOrdersTab)}
        exact
        path={ROUTES.ORDER_PAGE}
      />
      <ClientRoute
        component={ScrollToTop(EditAccount)}
        exact
        path={ROUTES.ACCOUNT_EDIT}
      />
      <ClientRoute
        component={ScrollToTop(CheckOutStep1)}
        path={ROUTES.CHECKOUT_STEP_1}
      />
      <ClientRoute
        component={ScrollToTop(CheckOutStep2)}
        path={ROUTES.CHECKOUT_STEP_2}
      />
      <ClientRoute
        component={ScrollToTop(CheckOutStep3)}
        path={ROUTES.CHECKOUT_STEP_3}
      />
      <AdminRoute
        component={ScrollToTop(Dashboard)}
        exact
        path={ROUTES.ADMIN_DASHBOARD}
      />
      <AdminRoute
        component={ScrollToTop(Products)}
        path={ROUTES.ADMIN_PRODUCTS}
      />
      <AdminRoute
        component={ScrollToTop(AddProduct)}
        path={ROUTES.ADD_PRODUCT}
      />
      <AdminRoute
        component={ScrollToTop(EditProduct)}
        path={`${ROUTES.EDIT_PRODUCT}/:id`}
      />
      <AdminRoute component={ScrollToTop(Users)} path={`/admin/users`} />
      <AdminRoute component={ScrollToTop(Orders)} path={`/admin/orders`} />
      <PublicRoute component={ScrollToTop(PageNotFound)} />
    </Switch>
  </Router>
);

export default AppRouter;
