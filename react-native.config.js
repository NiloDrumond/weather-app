const blacklist = require('metro-config/src/defaults/blacklist');

module.exports = {
  projects: {
    ios: {},
    android: {},
  },
  assets: ['./assets/fonts/'],
  resolver: {
    blacklistRE: blacklist([/react-native\/local-cli\/core\/__fixtures__.*/]),
  },
};
