import React from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// Utils
import { PRIVATE_PAGES_ROUTES } from '@utils/constants';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const location = useLocation();
  const isAuth = useSelector(state => state.user.isAuth);

  const isPrivatePage = PRIVATE_PAGES_ROUTES.includes(rest.path);
  const isViewComponent = isPrivatePage ? isAuth : !isAuth;
  const redirectTo = isPrivatePage ? '/sign-in' : '/';

  return (
    <Route {...rest}>
      { isViewComponent ? (
        <Component />
      ) : (
        <Redirect to={{ pathname: redirectTo, state: { from: location } }} />
      )}
    </Route>
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
};

export default PrivateRoute;
