import { cloneDeep } from 'lodash';

export const objectify = (object, [key, value]) => ({
  ...object,
  [key]: value,
});

export default model => (data = {}) => cloneDeep(Object.entries(model)
  .map(([key, value]) => [
    key,
    data[key] !== undefined ? data[key] : value,
  ])
  .reduce(objectify, {}));
