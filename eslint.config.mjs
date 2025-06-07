import eslint from '@eslint/js'
import pluginNext from '@next/eslint-plugin-next'
import stylistic from '@stylistic/eslint-plugin'
import eslintConfigPrettier from 'eslint-config-prettier'
import onlyWarn from 'eslint-plugin-only-warn'
import pkgJsonPlugin from 'eslint-plugin-package-json'
import perfectionist from 'eslint-plugin-perfectionist'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import jsoncPlugin from 'jsonc-eslint-parser'
import tseslint from 'typescript-eslint'

// https://eslint.nodejs.cn/docs/latest/use/getting-started
export default defineConfig([
   eslint.configs.recommended,
   tseslint.configs.recommended,
   {
      rules: {
         '@typescript-eslint/no-explicit-any': ['off', { ignoreRestArgs: true }],
         '@typescript-eslint/no-unused-vars': ['off'],
      },
   },
   {
      plugins: {
         onlyWarn,
      },
   },
   {
      ...pluginReact.configs.flat.recommended,
      languageOptions: {
         ...pluginReact.configs.flat.recommended.languageOptions,
         globals: {
            ...globals.serviceworker,
         },
      },
   },
   {
      plugins: {
         '@next/next': pluginNext,
      },
      rules: {
         ...pluginNext.configs.recommended.rules,
         ...pluginNext.configs['core-web-vitals'].rules,
         '@next/next/no-img-element': ['off'],
      },
   },
   {
      plugins: {
         'react-hooks': pluginReactHooks,
      },
      rules: {
         ...pluginReactHooks.configs.recommended.rules,
         'react/prop-types': 'off',
         'react/react-in-jsx-scope': 'off',
      },
      settings: { react: { version: 'detect' } },
   },
   {
      plugins: {
         perfectionist,
      },
      ...perfectionist.configs['recommended-natural'],
      rules: {
         'perfectionist/sort-jsx-props': [
            'error',
            {
               type: 'natural',
               order: 'asc',
               fallbackSort: { type: 'line-length', order: 'asc' },
               ignoreCase: true,
               specialCharacters: 'keep',
               ignorePattern: [],
               partitionByNewLine: false,
               newlinesBetween: 'ignore',
               useConfigurationIf: {},
               groups: [],
               customGroups: {},
            },
         ],
         'perfectionist/sort-imports': ['error', {
            type: 'natural',
            order: 'asc',
            fallbackSort: { type: 'line-length', order: 'asc' },
            internalPattern: ['^~/.+', '^@/.+'],
            partitionByComment: true,
            tsconfigRootDir: '.',
            newlinesBetween: 'always',
            environment: 'node',
            groups: [
               'only',
               'react',
               'type-import',
               ['value-builtin', 'value-external'],
               ['components'],
               ['type-internal', 'value-internal'],
               ['type-parent', 'type-sibling', 'type-index'],
               ['value-parent', 'value-sibling', 'value-index'],
            ],
            customGroups: [{
               groupName: 'only',
               elementNamePattern: ['^server-only$', '^client-only$'],
            }, {
               groupName: 'react',
               elementNamePattern: ['^react$', '^react/.+'],
            }, {
               groupName: 'components',
               elementNamePattern: ['^@/components/.+'],
            }],
         }],
         'perfectionist/sort-named-imports': [
            'error',
            {
               type: 'natural',
               order: 'asc',
               fallbackSort: { type: 'line-length', order: 'asc' },
               ignoreAlias: false,
               ignoreCase: true,
               specialCharacters: 'keep',
               groupKind: 'mixed',
               partitionByNewLine: false,
               partitionByComment: false,
               newlinesBetween: 'ignore',
            },
         ],
         'perfectionist/sort-exports': [
            'error',
            {
               type: 'natural',
               order: 'asc',
               fallbackSort: { type: 'line-length', order: 'asc' },
               ignoreCase: true,
               specialCharacters: 'keep',
               partitionByComment: false,
               partitionByNewLine: false,
               newlinesBetween: 'ignore',
               groupKind: 'mixed',
               groups: [],
               customGroups: [],
            },
         ],
         'perfectionist/sort-heritage-clauses': [
            'error',
            {
               type: 'natural',
               order: 'asc',
               fallbackSort: { type: 'line-length', order: 'asc' },
               ignoreCase: true,
               specialCharacters: 'keep',
               groups: [],
               customGroups: {},
            },
         ],
      },
   },
   eslintConfigPrettier,
   {
      ...pkgJsonPlugin.configs.recommended,
      files: ['package.json', '*.json', '*.json5'],
      languageOptions: {
         parser: jsoncPlugin,
      },
   },
   {
      ...stylistic.configs.recommended,
      rules: {
         '@stylistic/keyword-spacing': 'off',
      },
   },
   stylistic.configs.customize({
      indent: 3,
      quotes: 'single',
      jsx: true,
      arrowParens: true,
      semi: false,
   }),
   {
      ignores: [
         'src/components/ui/**',
         'dist/**',
         '.next/**',
         'node_modules/**',
         'coverage/**',
         'test/**',
         'tests/**',
         'build/**',
         'public/**',
      ],
   },
])
