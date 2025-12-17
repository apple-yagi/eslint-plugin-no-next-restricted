import type { ESLint } from "eslint";
import packageJson from "../package.json" with { type: "json" };
import { noNextFont } from "./rules/no-next-font.ts";
import { noNextForm } from "./rules/no-next-form.ts";
import { noNextImage } from "./rules/no-next-image.ts";
import { noNextLink } from "./rules/no-next-link.ts";
import { noNextScript } from "./rules/no-next-script.ts";

const plugin = {
	meta: {
		name: packageJson.name,
		version: packageJson.version,
	},
	rules: {
		"no-next-link": noNextLink,
		"no-next-image": noNextImage,
		"no-next-form": noNextForm,
		"no-next-font": noNextFont,
		"no-next-script": noNextScript,
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
				"no-next-restricted/no-next-form": "error",
				"no-next-restricted/no-next-font": "error",
				"no-next-restricted/no-next-script": "error",
			},
		},
	},
} satisfies ESLint.Plugin;

export default plugin;
