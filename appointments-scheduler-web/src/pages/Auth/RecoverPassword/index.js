import React from 'react';
// Components
import RecoverPasswordForm from '@components/Auth/RecoverPasswordForm';
import AuthLayout from '@layouts/Auth';

const RecoverPassword = () => {
  return (
    <AuthLayout>
      <div className="recover-password-page">
        <RecoverPasswordForm />
      </div>
    </AuthLayout>
  );
};

export default RecoverPassword;
