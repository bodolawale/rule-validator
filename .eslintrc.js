const OFF = 0; const WARN = 1;

module.exports = {
    parser: "@typescript-eslint/parser",
    env: {
        browser: true,
        es6: true,
        mocha: true,
    },
    extends: [
        "airbnb-base",
        "plugin:@typescript-eslint/recommended",
    ],
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
    },
    rules: {
        indent: [WARN, 4,],
        "linebreak-style": OFF,
        quotes: [WARN, "double",],
        semi: [WARN, "always",],
        "max-len": [WARN, 150,],
        "comma-dangle": [WARN, "always",],
        "no-cond-assign": [WARN, "always",],
        "no-console": WARN,
        "no-underscore-dangle": OFF,
        "comma-spacing": OFF,
        camelcase: OFF,
        "no-unused-vars": OFF,
        "padded-blocks": OFF,
        "arrow-body-style": OFF,
        "@typescript-eslint/no-explicit-any": OFF,
        "import/extensions": [
            "error",
            "ignorePackages",
            {
                js: "never",
                jsx: "never",
                ts: "never",
                tsx: "never",
            },
        ],
    },
    settings: {
        "import/resolver": {
            node: {
                extensions: [".js", ".jsx", ".ts", ".tsx",],
            },
        },
    },
};
