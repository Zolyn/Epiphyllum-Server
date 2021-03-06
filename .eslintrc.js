module.exports = {
    extends: ['alloy', 'alloy/typescript', 'plugin:prettier/recommended'],
    env: {
        node: true,
        browser: true,
        commonjs: true,
    },
    globals: {
        NodeJS: true,
    },
    rules: {
        'array-callback-return': 'off',
    },
};
