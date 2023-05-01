import { cloneDeep } from 'lodash';

export const removeEmptyProps = obj => {
  const localObj = cloneDeep(obj);

  Object.keys(localObj).forEach(key => {
    if (((!localObj[key] && localObj[key] !== 0) || localObj[key] === -1 || localObj[key] === '')
      || localObj[key].length === 0) {
      delete localObj[key];
    }
  });

  return localObj;
};
