import React from 'react';
//Components
import DefaultLayout from '../../../layouts/Default';
import Basic from '@components/Scheduler';
// Styles
import './index.scss';

const Scheduler = () => {
  return (
    <DefaultLayout>
      <div className="scheduler-page">
        <h1>Scheduler</h1>
        <Basic />
      </div>
    </DefaultLayout>
  );
};

export default Scheduler;
