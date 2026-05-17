import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...nextVitals,
  {
    ignores: ["coverage/**", "node_modules/**"]
  }
];

export default eslintConfig;
