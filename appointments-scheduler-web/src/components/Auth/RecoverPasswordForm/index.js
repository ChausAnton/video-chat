import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Components
import { Row, Col, Form, Input, Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';
//Utils
import validateMessages from '@utils/validateMessages';
import { addFormError } from '@utils/formUtils';
import { FirebaseClient } from '../../../services/firebaseAuth';

const RecoverPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isMailSent, setIsMailSent] = useState(false);

  const [form] = Form.useForm();

  const onFinish = async formData => {
    setIsLoading(true);

    try {
      await FirebaseClient.passwordReset(formData);
      setIsMailSent(true);

    } catch (e) {
      addFormError(form, e, 'fireBase');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Row>
      <Col
        className="recover-password-form"
      >
        <h1>
          Recover password
        </h1>
        { isMailSent ? (
          <h3 className="mb-6">
            The letter with instructions has been sent to your e-mail.
            Please check you e-mail and&nbsp;
            <Link to='/sign-in'>
              sign in.
            </Link>
          </h3>
        ) : (
          <div>
            <h3 className="mb-6">
              Enter your email address below to reset the password for your account.
            </h3>
            <Form
              name="recover-password"
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

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="recover-password-form__submit"
                  loading={isLoading}
                >
                  Send instructions
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </Col>
    </Row>
  );
};

export default RecoverPasswordForm;
