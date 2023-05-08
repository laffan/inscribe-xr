module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: ["eslint:recommended", "google"],
  parserOptions: {
    ecmaVersion: 2021, // lets it deal with arrow functions
  },
  rules: {
    quotes: ["error", "double"],
    indent: "off",
    "object-curly-spacing": "off",
    "no-unused-vars": "off",
    "quote-props": "off",
  },
};
