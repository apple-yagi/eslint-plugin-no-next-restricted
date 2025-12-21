import type { Rule } from "eslint";

export const noNextForm: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      recommended: true,
      description: "Disallow usage of next/form",
    },
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        if (node.source.value !== "next/form") {
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
          message: "Do not use next/form. Use <form> instead.",
        });
      },
    };
  },
};
