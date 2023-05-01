import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
// Pages
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import RecoverPassword from './pages/Auth/RecoverPassword';
import Scheduler from './pages/Scheduler/Main';
//Components
import PrivateRoute from './components/Common/PrivateRoute';
// Styles
import 'antd/dist/antd.min.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute exact path="/" component={Scheduler} />
        <PrivateRoute path="/sign-in" component={SignIn} />
        <PrivateRoute path="/sign-up" component={SignUp} />
        <PrivateRoute path="/recover-password" component={RecoverPassword} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
