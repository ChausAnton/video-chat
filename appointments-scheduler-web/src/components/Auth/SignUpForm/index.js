import React, { useState } from 'react';
// Components
import { Link, useHistory } from 'react-router-dom';
import { Form, Input, Button, Row, Col } from 'antd';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
//Utils
import validateMessages from '@utils/validateMessages';
import { FirebaseClient } from '../../../services/firebaseAuth';

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const onFinish = async formData => {
    setIsLoading(true);

    try {
     
      await FirebaseClient.signUp(formData);
      history.push('/sign-in');
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  return (
    <Row>
      <Col
        className="sign-up-form"
      >
        <h1>Sign up</h1>
        <div className="mb-5 sign-up-form__other-way">
          Do you have an account?&nbsp;
          <Link to='/sign-in'>
            Sign in
          </Link>
        </div>
        <Form
          name="sign-up"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name="displayName"
            rules={[{ required: true }]}
            validateTrigger="onSubmit"
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              name="displayName"
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{
              type: 'email',
              required: true,
            }]}
            validateTrigger="onSubmit"
            autoComplete="new-password"
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              name="email"
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
              name="password"
              type="password"
              placeholder="Password"
              autoComplete="new-password"
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            rules={[{
                required: true,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
            validateTrigger="onSubmit"
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="sign-up-form__submit"
              loading={isLoading}
            >
              Sign up
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default SignUpForm;
