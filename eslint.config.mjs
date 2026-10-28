import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __dirname = dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Line spacing: a blank line before return, after a block of declarations, and around block statements
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "return" },
        { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
        { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"] },
        { blankLine: "always", prev: "*", next: ["if", "for", "while", "switch", "try"] },
        { blankLine: "always", prev: ["if", "for", "while", "switch", "try"], next: "*" },
        { blankLine: "always", prev: "directive", next: "*" },
      ],
      "lines-between-class-members": ["error", "always", { exceptAfterSingleLine: true }],
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0, maxBOF: 0 }],

      // Project style (see CLAUDE.md): early returns, no nested ternaries, no ?? / ??=
      "no-else-return": ["error", { allowElseIf: false }],
      "no-nested-ternary": "error",
      "no-unneeded-ternary": "error",
      "no-restricted-syntax": [
        "error",
        { selector: "LogicalExpression[operator='??']", message: "Use a default value, || or an if instead of ??." },
        { selector: "AssignmentExpression[operator='??=']", message: "Use a default value or an if instead of ??=." },
      ],
      "prefer-const": "error",
      "object-shorthand": ["error", "always"],
      curly: ["error", "multi-line"],
      eqeqeq: ["error", "always"],

      // React / Next
      "react/self-closing-comp": "error",
      "react/jsx-curly-brace-presence": ["error", { props: "never", children: "never" }],
      "react/jsx-no-useless-fragment": ["error", { allowExpressions: true }],
      "react/jsx-boolean-value": ["error", "never"],
      "@next/next/no-img-element": "error",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_", ignoreRestSiblings: true }],
    },
  },
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts"] },
];

export default eslintConfig;
