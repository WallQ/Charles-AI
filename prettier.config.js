const config = {
  printWidth: 80,
  tabWidth: 4,
  useTabs: true,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: true,
  quoteProps: "as-needed",
  trailingComma: "all",
  bracketSpacing: true,
  bracketSameLine: true,
  arrowParens: "always",
  endOfLine: "lf",
  singleAttributePerLine: false,
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^types$",
    "^@/types/(.*)$",
    "^@/config/(.*)$",
    "^@/lib/(.*)$",
    "^@/hooks/(.*)$",
    "^@/components/ui/(.*)$",
    "^@/components/(.*)$",
    "^@/styles/(.*)$",
    "^@/app/(.*)$",
    "",
    "^[./]",
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrderBuiltinModulesToTop: true,
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true,
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
};

export default config;
