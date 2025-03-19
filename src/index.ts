import type { ESLint } from "eslint";
import packageJson from "../package.json" with { type: "json" };
import { noNextLink } from "./rules/no-next-link.ts";

const plugin = {
	meta: {
		name: packageJson.name,
		version: packageJson.version,
	},
	rules: {
		"no-next-link": noNextLink,
	},
	configs: {
		recommended: {
			languageOptions: {
				parserOptions: {
					ecmaFeatures: {
						jsx: true,
					},
				},
			},
			plugins: ["no-next-restricted"],
			rules: {
				"no-next-restricted/no-next-link": "error",
			},
		},
	},
} satisfies ESLint.Plugin;

export default plugin;
