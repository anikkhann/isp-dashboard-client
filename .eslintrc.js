module.exports = {
  plugins: ["@typescript-eslint"],
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      tsx: true,
      js: true,
      ts: true
    },
    ecmaVersion: 12,
    sourceType: "module"
  },
  rules: {
    // I suggest you add those two rules:
    "@typescript-eslint/no-unused-vars": "error"
    // "@typescript-eslint/no-explicit-any": "error"
  },
  ignorePatterns: ["lint-staged.config.js"]
};
