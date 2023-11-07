const path = require('path');

module.exports = {
  '*.{js,jsx,mjs}': ['npx eslint --fix', 'prettier --write'],
  '*.{json,md,yaml}': ['prettier --write'],
  '*.svg': ['svgo --quiet'],
};
