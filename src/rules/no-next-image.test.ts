import { type TestContext, describe, it } from "node:test";
import type { Linter } from "eslint";
import { createESLint, formatLintResults } from "../__tests__/eslint.ts";

const config: Linter.Config = {
	rules: { "no-next-restricted/no-next-image": "error" },
};

describe("no-next-image", () => {
	it("should report error when using next/image", async (t: TestContext) => {
		const eslint = createESLint(config);
		const code = `
      import Image from "next/image";

      export const Component = () => <Image src="/image.png" />;
    `;
		const results = await eslint.lintText(code);

		t.assert.deepStrictEqual(formatLintResults(results), [
			{
				messages: [
					{
						column: 14,
						endColumn: 19,
						endLine: 2,
						line: 2,
						ruleId: "no-next-restricted/no-next-image",
						message: "Do not use next/image. Use <img> instead.",
					},
				],
			},
		]);
	});

	it("should not report error when not using next/image", async (t: TestContext) => {
		const eslint = createESLint(config);
		const code = `
      export const Component = () => <img src="/image.png" />;
    `;
		const results = await eslint.lintText(code);

		t.assert.deepStrictEqual(formatLintResults(results), [
			{
				messages: [],
			},
		]);
	});
});
