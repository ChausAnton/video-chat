import QueryString from 'query-string';
// Utils
import { removeEmptyProps } from './common';

export const getStringifyParams = params => {
  return QueryString.stringify(params);
};

export const getParsedParams = string => {
  return QueryString.parse(string);
};

export const getNewLocation = (location, params, path = '') => {
  return {
    pathname: path ? path : location.pathname,
    search: getStringifyParams(removeEmptyProps({
      ...getParsedParams(location.search),
      ...params,
    })),
    state: {
      update: true,
    },
  };
};
