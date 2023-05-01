import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Menu } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
// Store
import { logOut } from '@store/userSlice';
// Libs
// Api
import { FirebaseClient } from '../../services/firebaseAuth';

const Header = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const logOutUser = () => dispatch(logOut());

  const handleLogOut = async() => {
    setIsLoading(true);

    try {
      await FirebaseClient.signOut();
      logOutUser();
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };

  return (
    <Menu mode="horizontal" className="header">
    <div className="header__actions">
      <Button
        type="transparent"
        className="header__actions--sign-out"
        loading={isLoading}
        onClick={handleLogOut}
      >
        <LogoutOutlined />
        Sign out
      </Button>
    </div>
    </Menu>
  );
};

export default Header;
