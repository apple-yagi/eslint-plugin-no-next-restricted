import packageJson from "../package.json";
import { ESLint } from "eslint";

const plugin = {
  meta: {
    name: packageJson.name,
    version: packageJson.version,
  },
} satisfies ESLint.Plugin;

export default plugin;
