import * as prettier from 'prettier/standalone';
import parserTypescript from 'prettier/plugins/typescript';
import parserBabel from 'prettier/plugins/babel';
import parserEstree from 'prettier/plugins/estree';

export async function formatCode(code: string, language: 'tsx' | 'jsx'): Promise<string> {
  try {
    const formatted = await prettier.format(code, {
      parser: language === 'tsx' ? 'typescript' : 'babel',
      plugins: language === 'tsx' ? [parserTypescript, parserEstree] : [parserBabel, parserEstree],
      semi: true,
      singleQuote: true,
      trailingComma: 'all',
    });
    return formatted.trim();
  } catch {
    // Fall back to the unformatted source if Prettier can't parse a partial snippet.
    return code;
  }
}
