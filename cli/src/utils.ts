import { Trie } from './trie';

export function parseDepth(value: string): number {
  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue)) {
    handleError(`error: '--depth <n>' must be an integer`);
  }
  return parsedValue;
}

export function validatePhrase(value: string): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    handleError('error: Phrase must be a non-empty string');
  }
  return value;
}

function handleError(message: string): never {
  console.error(message);
  process.exit(1);
}

function logVerbose(message: string, startTime: [number, number]): void {
  const timeTaken = process.hrtime(startTime);
  console.log(`${message} | ${(timeTaken[0] * 1000 + timeTaken[1] / 1e6).toFixed(3)}ms`);
}

export function analyzePhrase(trie: Trie, phrase: string, depth: number, verbose: boolean): void {
  const normalizedPhrase = trie.normalize(phrase).split(' ');

  const startTime = process.hrtime();
  const analysisResult = trie.analyzeAtDepth(depth, normalizedPhrase);
  console.log(analysisResult);

  if (verbose) {
    logVerbose('Tempo de carregamento dos parâmetros', startTime);
    logVerbose('Tempo de verificação da frase', process.hrtime());
  }
}
