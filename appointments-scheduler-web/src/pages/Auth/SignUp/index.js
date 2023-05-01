import React from 'react';
//Components
import SignUpForm from '@components/Auth/SignUpForm';
import AuthLayout from '@layouts/Auth';

const SignUp = () => {
  return (
    <AuthLayout>
      <div className="sign-up-page">
        <SignUpForm />
      </div>
    </AuthLayout>
  );
};

export default SignUp;
