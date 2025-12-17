# eslint-plugin-no-next-restricted

ESLint plugin to restrict usage of specific Next.js features.

## Installation

```bash
pnpm add -D eslint eslint-plugin-no-next-restricted
```

## Usage

Enable the plugin and the recommended config:

```json
{
  "plugins": ["no-next-restricted"],
  "extends": ["plugin:no-next-restricted/recommended"]
}
```

Or configure rules individually:

```json
{
  "plugins": ["no-next-restricted"],
  "rules": {
    "no-next-restricted/no-next-link": "error",
    "no-next-restricted/no-next-image": "error",
    "no-next-restricted/no-next-form": "error",
    "no-next-restricted/no-next-font": "error",
    "no-next-restricted/no-next-script": "error"
  }
}
```

## Rules

| Rule ID | Purpose | Default | Message example |
| --- | --- | --- | --- |
| `no-next-restricted/no-next-link` | Disallow `next/link` | `error` (recommended) | `Do not use next/link. Use <a> instead.` |
| `no-next-restricted/no-next-image` | Disallow `next/image` | `error` (recommended) | `Do not use next/image. Use <img> instead.` |
| `no-next-restricted/no-next-form` | Disallow `next/form` | `error` (recommended) | `Do not use next/form. Use <form> instead.` |
| `no-next-restricted/no-next-font` | Disallow `next/font` (including subpaths) | `error` (recommended) | `Do not use next/font. Use CSS fonts instead.` |
| `no-next-restricted/no-next-script` | Disallow `next/script` | `error` (recommended) | `Do not use next/script. Use standard <script> instead.` |

## Notes

- Each rule reports on default imports from the corresponding Next.js module.
- The plugin is published as ESM and works in TypeScript or JavaScript projects.
