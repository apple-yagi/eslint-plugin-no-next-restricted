import type { Rule } from "eslint";

export const noNextLink: Rule.RuleModule = {
	meta: {
		type: "problem",
		docs: {
			recommended: true,
			description: "Disallow usage of next/link",
		},
	},
	create(context) {
		return {
			ImportDeclaration(node) {
				if (node.source.value !== "next/link") {
					return;
				}

				// Find the default import specifier
				const linkSpecifier = node.specifiers.find(
					(specifier) => specifier.type === "ImportDefaultSpecifier",
				);

				if (!linkSpecifier) {
					return;
				}

				context.report({
					node: linkSpecifier,
					message: "Do not use next/link. Use <a> instead.",
				});
			},
		};
	},
};
