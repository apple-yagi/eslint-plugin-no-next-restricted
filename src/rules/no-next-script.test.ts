import { type TestContext, describe, it } from "node:test";
import type { Linter } from "eslint";
import { createESLint, formatLintResults } from "../__tests__/eslint.ts";

const config: Linter.Config = {
  rules: { "no-next-restricted/no-next-script": "error" },
};

describe("no-next-script", () => {
  it("should report error when using next/script", async (t: TestContext) => {
    const eslint = createESLint(config);
    const code = `
			import Script from 'next/script'
			 
			export default function Dashboard() {
			  return (
			    <>
			      <Script src="https://example.com/script.js" />
			    </>
			  )
			}
		`;
    const results = await eslint.lintText(code);

    t.assert.deepStrictEqual(formatLintResults(results), [
      {
        messages: [
          {
            column: 11,
            endColumn: 17,
            endLine: 2,
            line: 2,
            ruleId: "no-next-restricted/no-next-script",
            message: "Do not use next/script. Use standard <script> instead.",
          },
        ],
      },
    ]);
  });

  it("should not report error when not using next/script", async (t: TestContext) => {
    const eslint = createESLint(config);
    const code = `
			import Script from './script'
			 
			export default function Dashboard() {
			  return (
			    <>
			      <Script src="https://example.com/script.js" />
			    </>
			  )
			}
		`;
    const results = await eslint.lintText(code);

    t.assert.deepStrictEqual(formatLintResults(results), [
      {
        messages: [],
      },
    ]);
  });
});
