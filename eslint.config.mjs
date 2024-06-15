import globals from 'globals'
import pluginJs from '@eslint/js'

export default [
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { languageOptions: { globals: { ...globals.node, ...globals.browser } } },
  { ignores: ['dist/*'] },
  pluginJs.configs.recommended,
]
