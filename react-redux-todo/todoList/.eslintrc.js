module.exports = {
    "env": {
        "browser": true,
    },
    "parser": "babel-eslint",
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "airbnb"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 11,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "react/prop-types": 0,
        "@typescript-eslint/no-explicit-any": "off",
        "no-param-reassign": 0,
        "react/prefer-stateless-function": "off",
        "import/no-named-as-default": 0
    }
};
