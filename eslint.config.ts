import eslint from '@eslint/js'
import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'
import pluginReact from "eslint-plugin-react"
import pluginReactHooks from "eslint-plugin-react-hooks"

export default defineConfig(
    eslint.configs.recommended,
    tseslint.configs.strict,
    pluginReact.configs.flat.recommended,
    pluginReact.configs.flat["jsx-runtime"],
    {
        languageOptions: {
            parser: tseslint.parser,
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                React: "readonly"
            }
        },
        settings: {
            react: {
                pragma: "React",
                version: "detect"
            }
        },
        plugins: {
            "react": pluginReact,
            "react-hooks": pluginReactHooks
        },
        rules: {
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",
            "react/prop-types": "off",
            "quotes": ["error", "double"]
        }
    }
)