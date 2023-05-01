import React from 'react';
import { Layout } from 'antd';
const { Content } = Layout;
import PropTypes from 'prop-types';
// Components
import Header from '@components/Common/Header';
// Styles
import './index.scss';

const DefaultLayout = ({ children }) => {
  return (
    <Layout className="default-layout">
      <Header />
      <Content className="default-layout__content">{children}</Content>
    </Layout>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
