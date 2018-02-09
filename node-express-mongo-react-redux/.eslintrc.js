/**
 * ESLint rules by which to lint the JavaScript files.
 * http://eslint.org/docs/rules
 */
const path = require('path');

module.exports = {
  "extends": [
    "standard",
    "react-app"
  ],

  "plugins": [
    "import",
    "promise"
  ],

  "env": {
    "browser": true,
    "es6": true,
    "mocha": true,
    "jest": true
  },

  "globals": {
    "document": true,
    "window": true,
    "expect": true
  },

  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "impliedStrict": true,
      "experimentalObjectRestSpread": true
    }
  },

  "root": true,

  "settings": {
    "import/resolver": {
      "node": {
        "paths": [path.join(__dirname, "/src")]
      }
    }
  },

  "rules": {
    // Possible Errors
    "no-console": "off",

    // Strict Mode
    "strict": "off",

    // Stylistic Issues
    "comma-dangle": ["warn", {
        "arrays": "always-multiline",
        "objects": "always-multiline",
        "imports": "ignore",
        "exports": "always-multiline",
        "functions": "ignore",
    }],
    "eol-last": "off",
    "func-names": "off",
    "indent": ["warn", 2, { "SwitchCase": 1 }],
    "max-depth": ["warn", 6],
    "max-len": ["warn", 120],
    "newline-before-return": "off",
    "no-bitwise": "off",
    "no-mixed-operators": "off",
    "no-plusplus": "off",
    "no-trailing-spaces": "warn",
    "quotes": ["warn", "single"],
    "no-lonely-if": "off",

    // ECMAScript 6
    "arrow-parens": ["warn", "always"],
    "arrow-spacing": "warn",
    "arrow-body-style": ["error", "as-needed"],
    "no-duplicate-imports": "error",
    "no-useless-constructor": "warn",

    // Deviations from our baseline coding standards
    "object-curly-spacing": ["warn", "always"],
    "no-underscore-dangle": ["warn", {"allow": ["_args", "_rawDBType"]}], // Required by dashdash and pg-promise
    "linebreak-style": "off",
    "class-methods-use-this": "off",
    "no-param-reassign": "off",
    "no-else-return": "off",
    "new-cap": "off",

    // React
    "react/prefer-stateless-function": "off",
    "react/sort-comp": [1, {
      "order": [
        "lifecycle",
        "everything-else",
        "static-methods",
        "render"
      ],
    }],
    "react/jsx-filename-extension": [1, { "extensions": [".js"] }],
    "space-infix-ops": ["warn", { "int32Hint": false }],
    "jsx-quotes": ["warn", "prefer-single"],

    // Deviations
    "comma-spacing": ["warn", { "before": false, "after": true }],
    "import/prefer-default-export": "off",
    "func-style": ["error", "expression"],
  }
};