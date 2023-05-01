import { message } from 'antd';

export const showMessage = (
  {
    status = 'error',
    text = 'Something went wrong',
    duration = 5,
  }
) => {
  message[status]({
    content: text,
    style: {
      marginTop: '20vh',
    },
  }, duration);
};
