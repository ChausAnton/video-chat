import React from 'react';
// Components
import SignInForm from '@components/Auth/SignInForm';
import AuthLayout from '@layouts/Auth';

const SignIn = () => {
  return (
    <AuthLayout>
      <div className="sign-in-page">
        <SignInForm />
      </div>
    </AuthLayout>
  );
};

export default SignIn;
