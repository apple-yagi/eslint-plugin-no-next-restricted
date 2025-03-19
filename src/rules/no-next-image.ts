import type { Rule } from "eslint";

export const noNextImage: Rule.RuleModule = {
	meta: {
		type: "problem",
		docs: {
			recommended: true,
			description: "Disallow usage of next/image",
		},
	},
	create(context) {
		return {
			ImportDeclaration(node) {
				if (node.source.value !== "next/image") {
					return;
				}

				// Find the default import specifier
				const imageSpecifier = node.specifiers.find(
					(specifier) => specifier.type === "ImportDefaultSpecifier",
				);

				if (!imageSpecifier) {
					return;
				}

				context.report({
					node: imageSpecifier,
					message: "Do not use next/image. Use <img> instead.",
				});
			},
		};
	},
};
