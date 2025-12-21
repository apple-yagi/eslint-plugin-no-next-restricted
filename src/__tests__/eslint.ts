/*
 * Reference: https://github.com/mizdra/css-modules-kit/blob/main/packages/eslint-plugin/src/test/eslint.ts
 * This code is adapted from the above repository.
 */
import { ESLint, type Linter } from "eslint";
import plugin from "../index.ts";

function filterMessage(warning: Linter.LintMessage) {
  return {
    line: warning.line,
    column: warning.column,
    endLine: warning.endLine,
    endColumn: warning.endColumn,
    ruleId: warning.ruleId,
    message: warning.message,
  };
}

function formatLintResult(lintResult: ESLint.LintResult) {
  return {
    messages: lintResult.messages.map(filterMessage),
  };
}

export function formatLintResults(results: ESLint.LintResult[]) {
  return results.map((result) => formatLintResult(result));
}

export function createESLint(config: Linter.Config) {
  return new ESLint({
    overrideConfigFile: true,
    baseConfig: [
      {
        languageOptions: {
          parserOptions: {
            ecmaFeatures: {
              jsx: true,
            },
          },
        },
        plugins: {
          "no-next-restricted": plugin,
        },
      },
      config,
    ],
  });
}
