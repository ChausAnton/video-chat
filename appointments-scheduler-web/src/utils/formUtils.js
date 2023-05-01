const fireBaseErrors = {
  'auth/user-not-found': {
    text: 'No user with such email',
    field: 'email',
  },
  'auth/wrong-password': {
    text: 'Incorrect password',
    field: 'password',
  },
};

const getFirebaseError = error => {
  return {
    name: fireBaseErrors[error.code].field,
    errors: [fireBaseErrors[error.code].text],
  };
};

const getErrorInfo = (error, type) => {
  if (type) {
    return getFirebaseError(error);
  }

  const {
    response: {
      data: {
        message: [
          {
            message,
            field,
          },
        ],
      },
    },
  } = error;

  return {
    name: field,
    errors: [message],
  };
};

export const addFormError = (form, error, type) => {
  if ((!error && type) || (!error.response?.data?.message[0]?.field && !type)) return;

  form.setFields([getErrorInfo(error, type)]);
};
