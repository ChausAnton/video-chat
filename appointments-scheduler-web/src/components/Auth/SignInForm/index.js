import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  GoogleAuthProvider,
} from 'firebase/auth';
// Components
import { Link } from 'react-router-dom';
import { Row, Col, Form, Input, Button } from 'antd';
import { LockOutlined, MailOutlined, GoogleOutlined } from '@ant-design/icons';
// Store
import { logIn } from '@store/userSlice';
//Utils
import validateMessages from '@utils/validateMessages';
import { addFormError } from '@utils/formUtils';
// Styles
import './index.scss';
import { FirebaseClient } from '../../../services/firebaseAuth';

const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const logInUser = payload => dispatch(logIn(payload));

  const [form] = Form.useForm();

  const googleSignIn = async() => {
    setIsLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      const user = await FirebaseClient.signInPopup(provider);

      onLogInSuccess(user);
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };

  const onLogInSuccess = ({ accessToken, displayName: name, email}) => {
    logInUser({
      token: accessToken,
      user: {
        name,
        email,
      },
    });
  };

  const onFinish = async formData => {
    setIsLoading(true);

    try {
      const user = await FirebaseClient.signInEmail(formData);

      onLogInSuccess(user);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      addFormError(form, e, 'fireBase');
    }
  };

  return (
    <Row>
      <Col
        className="sign-in-form"
      >
        <h1>Sign in</h1>
        <div className="mb-5 sign-in-form__other-way">
          New user?&nbsp;
          <Link to='/sign-up'>
            Sign up
          </Link>
        </div>
        <Form
          name="signIn"
          form={form}
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name="email"
            rules={[{
              type: 'email',
              required: true,
            }]}
            validateTrigger="onSubmit"
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{
              required: true,
              min: 4,
              max: 256,
            }]}
            validateTrigger="onSubmit"
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Link to='/recover-password'>
              Forgot password
            </Link>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="sign-in-form__submit"
              loading={isLoading}
            >
              Sign in
            </Button>
          </Form.Item>
          <div className="sign-in-form__social-auth">
            <div
              className="sign-in-form__social-auth--title mb-4"
            >
              Or
            </div>
            <Button
              type="transparent"
              className="sign-in-form__submit"
              loading={isLoading}
              onClick={googleSignIn}
            >
              <GoogleOutlined />
              Sign in with google
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default SignInForm;
