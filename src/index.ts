import type { ESLint } from "eslint";
import packageJson from "../package.json";

const plugin = {
	meta: {
		name: packageJson.name,
		version: packageJson.version,
	},
} satisfies ESLint.Plugin;

export default plugin;
