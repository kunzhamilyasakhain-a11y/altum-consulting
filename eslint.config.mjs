import js from "@eslint/js";
import tseslint from "typescript-eslint";
import jsxA11y from "eslint-plugin-jsx-a11y";
export default tseslint.config(
  { ignores: ["node_modules/**", ".next/**", "out/**", ".openai/**"] },
  js.configs.recommended,
  { rules: { "no-irregular-whitespace": ["error", { skipJSXText: true }] } },
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: Object.fromEntries(
        [
          "console",
          "process",
          "Buffer",
          "fetch",
          "Response",
          "Request",
          "URL",
          "AbortController",
          "AbortSignal",
          "Headers",
          "setTimeout",
          "clearTimeout",
        ].map((key) => [key, "readonly"]),
      ),
    },
  },
  {
    files: ["**/*.tsx"],
    plugins: { "jsx-a11y": jsxA11y },
    rules: { ...jsxA11y.configs.recommended.rules },
  },
);
