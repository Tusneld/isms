module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react", "react-hooks"],
  rules: {
    "react/prop-types": "off", 
    "no-unused-vars": "warn",
    "no-restricted-globals": "off",
    "no-console": "warn",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};