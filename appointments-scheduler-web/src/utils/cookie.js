import Cookies from 'js-cookie';

export const getToken = () => {
  return Cookies.get('accessToken');
};

export const setCookie = (name, value) => {
  Cookies.set(name, value);
};

export const removeCookie = name => {
  Cookies.remove(name);
};

export const isAuthenticated = () => {
  return Boolean(getToken());
};
