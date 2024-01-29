/** @type {import("prettier").Options} */
module.exports = {
  bracketSpacing: true,
  bracketSameLine: true,
  singleQuote: false,
  jsxSingleQuote: false,
  trailingComma: "es5",
  semi: true,
  printWidth: 80,
  arrowParens: "avoid",
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
  ],
  importOrder: [
    "<THIRD_PARTY_MODULES>",
    "^@(shared|ui)?/((?!styles).)*$",
    "^(.?./)((?!.*.s?css$).+)$",
    "^[@(shared|ui)(./)](.)+styles(.+).s?css$",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  overrides: [],
  organizeImportsSkipDestructiveCodeActions: true,
};
