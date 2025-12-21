import type { Rule } from "eslint";

export const noNextScript: Rule.RuleModule = {
	meta: {
		type: "problem",
		docs: {
			recommended: false,
			description: "Disallow usage of next/script",
		},
	},
	create(context) {
		return {
			ImportDeclaration(node) {
				if (node.source.value !== "next/script") {
					return;
				}

				const scriptSpecifier = node.specifiers.find(
					(specifier) => specifier.type === "ImportDefaultSpecifier",
				);

				if (!scriptSpecifier) {
					return;
				}

				context.report({
					node: scriptSpecifier,
					message: "Do not use next/script. Use standard <script> instead.",
				});
			},
		};
	},
};
