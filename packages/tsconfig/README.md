# @icebreakers/tsconfig

my tsconfig

## tsconfig.cjs.json

```json
{
  "extends": "@tsconfig/recommended/tsconfig.json",
  "compilerOptions": {
    "noEmitOnError": false,
    "declaration": true,
    "sourceMap": false,
    "allowSyntheticDefaultImports": true,
    "baseUrl": ".",
    "removeComments": true,
    "lib": [
      "ES2021"
    ],
    "paths": {
      "@/*": [
        "src/*"
      ]
    }
  }
}
```

## tsconfig.com.json

```json
{
  // test comment
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "moduleResolution": "node",
    "declaration": true,
    "declarationDir": "types",
    "strict": true,
    "jsx": "preserve",
    "allowJs": true,
    "sourceMap": true,
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
      "@components/*": ["./src/components/*"]
    },
    "lib": ["esnext", "dom"]
  },
  "include": ["src/**/*", "components/**/*"]
}

```
