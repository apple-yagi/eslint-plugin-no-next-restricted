import { type TestContext, describe, it } from "node:test";
import type { Linter } from "eslint";
import { createESLint, formatLintResults } from "../__tests__/eslint.ts";

const config: Linter.Config = {
	rules: { "no-next-restricted/no-next-link": "error" },
};

describe("no-next-link", () => {
	it("should report error when using next/link", async (t: TestContext) => {
		const eslint = createESLint(config);
		const code = `
			import Link from "next/link";

			export const Component = () => <Link href="/about">About</Link>;
		`;
		const results = await eslint.lintText(code);

		t.assert.deepStrictEqual(formatLintResults(results), [
			{
				messages: [
					{
						column: 11,
						endColumn: 15,
						endLine: 2,
						line: 2,
						ruleId: "no-next-restricted/no-next-link",
						message: "Do not use next/link. Use <a> instead.",
					},
				],
			},
		]);
	});

	it("should not report error when not using next/link", async (t: TestContext) => {
		const eslint = createESLint(config);
		const code = `
			import Link from "react-router";

			export const Component = () => <Link to="/about">About</Link>;
		`;
		const results = await eslint.lintText(code);

		t.assert.deepStrictEqual(formatLintResults(results), [
			{
				messages: [],
			},
		]);
	});
});
