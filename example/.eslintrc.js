module.exports = {
  "root": true,
  "extends": '@react-native-community',
  "env": {
    "node": true,
    "browser": true,
    "es6": true,
    "jest": true
  },
  "parser": "babel-eslint",
  "rules": {
    "comma-dangle": ["warn", "always-multiline"],
    "no-unused-vars": 1,
    "no-unreachable": 1,
    "prettier/prettier": [
      "warn",
      {
        "printWidth": 80,
        "semi": true,
        "singleQuote": true,
        "trailingComma": "es5",
        "arrowParens": "avoid"
      }
    ],
    "react/jsx-uses-vars": 1,
    "react/no-unknown-property": 0,
    "react/no-deprecated": 0,
    "semi": ["error", "always"],
    "semi-spacing": ["error", { "before": false, "after": true }]
  }
};
