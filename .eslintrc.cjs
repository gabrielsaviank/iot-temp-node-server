module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        semi: [2, "always"],
        "quotes": [2, "double", { "avoidEscape": true }],
        "object-curly-spacing": ["error", "always"],
        "no-multiple-empty-lines": ["error", { "max": 2, "maxEOF": 1 }]
    }
}
