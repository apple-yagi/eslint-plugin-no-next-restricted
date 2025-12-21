import { type TestContext, describe, it } from "node:test";
import type { Linter } from "eslint";
import { createESLint, formatLintResults } from "../__tests__/eslint.ts";

const config: Linter.Config = {
  rules: { "no-next-restricted/no-next-font": "error" },
};

void describe("no-next-font", () => {
  void it("should report error when using next/font", async (t: TestContext) => {
    const eslint = createESLint(config);
    const code = `
			import { Inter } from 'next/font/google'
			
			const inter = Inter({
			  subsets: ['latin'],
			  display: 'swap',
			})
			
			export default function RootLayout({ children }) {
			  return (
			    <html lang="en" className={inter.className}>
			      <body>{children}</body>
			    </html>
			  )
			}
		`;
    const results = await eslint.lintText(code);

    t.assert.deepStrictEqual(formatLintResults(results), [
      {
        messages: [
          {
            column: 13,
            endColumn: 18,
            endLine: 2,
            line: 2,
            ruleId: "no-next-restricted/no-next-font",
            message: "Do not use next/font. Use CSS fonts instead.",
          },
        ],
      },
    ]);
  });

  void it("should not report error when not using next/font", async (t: TestContext) => {
    const eslint = createESLint(config);
    const code = `
			import Font from "./font-loader";

			export const inter = Font();
		`;
    const results = await eslint.lintText(code);

    t.assert.deepStrictEqual(formatLintResults(results), [
      {
        messages: [],
      },
    ]);
  });
});
