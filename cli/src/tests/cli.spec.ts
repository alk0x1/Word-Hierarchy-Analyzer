import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

describe('CLI', () => {
  const runCLI = async (args: string) => {
    try {
      const { stdout, stderr } = await execAsync(`bun run cli.ts ${args}`);
      return { stdout, stderr };
    } catch (error: unknown) {
      function hasStderr(err: unknown): err is { stderr: string } {
        return typeof err === 'object' && err !== null && 'stderr' in err && typeof err.stderr === 'string';
      }
      if (error instanceof Error && hasStderr(error)) {
        return { stdout: '', stderr: error.stderr };
      }
      return { stdout: '', stderr: 'An unknown error occurred.' };
    }
  };

  test('should analyze phrase correctly', async () => {
    const { stdout } = await runCLI('analyze --depth 3 "vertebrados árvores flores"');
    expect(stdout.trim()).toBe('Animais = 1; Plantas = 2'); 
  });

  test('should handle verbose output', async () => {
    const { stdout } = await runCLI('analyze --depth 3 --verbose "vertebrados árvores flores"');
    expect(stdout).toContain('Plantas = 2');
    expect(stdout).toContain('Tempo de carregamento dos parâmetros');
    expect(stdout).toContain('Tempo de verificação da frase');
  });

  test('should handle non-existent words', async () => {
    const { stdout } = await runCLI('analyze --depth 2 "nonexistent word"');
    expect(stdout).toContain('');
  });

  test('should handle different depths', async () => {
    const { stdout } = await runCLI('analyze --depth 3 "mamíferos aves árvores flores"');
    expect(stdout.trim()).toBe('Plantas = 2'); 
  });

  test('should handle accents and case insensitivity', async () => {
    const { stdout } = await runCLI('analyze --depth 3 "VERTEBRADOS Árvores FLORES"');
    expect(stdout.trim()).toBe('Animais = 1; Plantas = 2');
  });

  test('should handle missing depth parameter', async () => {
    const { stderr } = await runCLI('analyze "vertebrados árvores flores"');
    expect(stderr).toContain('error: required option \'--depth <n>\' not specified');
  });

  test('should handle invalid depth parameter', async () => {
    const { stderr } = await runCLI('analyze --depth invalid "vertebrados árvores flores"');
    expect(stderr).toContain('error: \'--depth <n>\' must be an integer\n');
  });

  test('should handle mixed categories', async () => {
    const { stdout } = await runCLI('analyze --depth 2 "mamíferos aves eletrônicos móveis"');
    expect(stdout.trim()).toBe('Objetos = 2');
  });
});
