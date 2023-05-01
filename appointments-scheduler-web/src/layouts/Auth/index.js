import React from 'react';
//Styles
import './index.scss';
// Components
import { Layout } from 'antd';
const { Content } = Layout;

import PropTypes from 'prop-types';

const AuthLayout = ({ children }) => {
  return (
  <Layout className="auth-layout">
    <Content className="auth-layout__content">{children}</Content>
  </Layout>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
