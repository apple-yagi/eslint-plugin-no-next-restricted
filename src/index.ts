import type { ESLint } from "eslint";
import packageJson from "../package.json" with { type: "json" };
import { noNextImage } from "./rules/no-next-image.ts";
import { noNextLink } from "./rules/no-next-link.ts";

const plugin = {
	meta: {
		name: packageJson.name,
		version: packageJson.version,
	},
	rules: {
		"no-next-link": noNextLink,
		"no-next-image": noNextImage,
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
				"no-next-restricted/no-next-image": "error",
			},
		},
	},
} satisfies ESLint.Plugin;

export default plugin;
