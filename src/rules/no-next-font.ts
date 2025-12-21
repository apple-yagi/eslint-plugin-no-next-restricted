import type { Rule } from "eslint";

export const noNextFont: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      recommended: true,
      description: "Disallow usage of next/font",
    },
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        if (typeof node.source.value !== "string" || !node.source.value.startsWith("next/font")) {
          return;
        }

        const fontSpecifier = node.specifiers[0];

        if (!fontSpecifier) {
          return;
        }

        context.report({
          node: fontSpecifier,
          message: "Do not use next/font. Use CSS fonts instead.",
        });
      },
    };
  },
};
