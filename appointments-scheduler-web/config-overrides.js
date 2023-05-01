const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    '@components': 'src/components',
    '@utils': 'src/utils',
    '@pages': 'src/pages',
    '@api': 'src/api',
    '@layouts': 'src/layouts',
    '@services': 'src/services',
    '@store': 'src/store',
  })(config);

  return config;
};
