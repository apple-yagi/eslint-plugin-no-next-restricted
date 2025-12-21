# eslint-plugin-no-next-restricted

ESLint plugin to restrict usage of specific Next.js features.

## Installation

```bash
pnpm add -D eslint eslint-plugin-no-next-restricted
```

## Usage

Enable the plugin and the recommended config with ESLint 9 flat config:

```js
// eslint.config.js
import noNextRestricted from "eslint-plugin-no-next-restricted";

export default [
  {
    plugins: {
      "no-next-restricted": noNextRestricted
    },
    rules: noNextRestricted.configs.recommended.rules,
  },
];
```

Or configure rules individually:

```js
// eslint.config.js
import noNextRestricted from "eslint-plugin-no-next-restricted";

export default [
  {
    plugins: {
      "no-next-restricted": noNextRestricted
    },
    rules: {
      "no-next-restricted/no-next-link": "error",
      "no-next-restricted/no-next-image": "error",
      "no-next-restricted/no-next-form": "error",
      "no-next-restricted/no-next-font": "error",
      "no-next-restricted/no-next-script": "error",
    },
  },
];
```

## Rules

| Rule ID                             | Purpose                                   | Default                    | Message example                                          |
| ----------------------------------- | ----------------------------------------- | -------------------------- | -------------------------------------------------------- |
| `no-next-restricted/no-next-link`   | Disallow `next/link`                      | `error` (recommended)      | `Do not use next/link. Use <a> instead.`                 |
| `no-next-restricted/no-next-image`  | Disallow `next/image`                     | `error` (recommended)      | `Do not use next/image. Use <img> instead.`              |
| `no-next-restricted/no-next-form`   | Disallow `next/form`                      | `error` (recommended)      | `Do not use next/form. Use <form> instead.`              |
| `no-next-restricted/no-next-font`   | Disallow `next/font` (including subpaths) | `error` (recommended)      | `Do not use next/font. Use CSS fonts instead.`           |
| `no-next-restricted/no-next-script` | Disallow `next/script`                    | `off` (not in recommended) | `Do not use next/script. Use standard <script> instead.` |

## Notes

- Each rule reports on default imports from the corresponding Next.js module.
- The plugin is published as ESM and works in TypeScript or JavaScript projects.
