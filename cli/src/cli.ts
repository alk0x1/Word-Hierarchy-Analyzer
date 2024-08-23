import { Command } from 'commander';
import { Trie } from './trie';
import tree from "./dicts/animais.json";

const program = new Command();
const trie = new Trie();
trie.populateFromJson(tree);

program
  .command('analyze')
  .description('Analyze a phrase with optional depth and verbosity')
  .option('--depth <n>', 'Specify the depth for the analysis', parseInt)
  .option('--verbose', 'Enable verbose output')
  .argument('<phrase>', 'The phrase to be analyzed')
  .action((phrase: string, options) => {
    const { depth, verbose } = options;
    const startTime = process.hrtime();

    const normalized_phrase = trie.normalize(phrase).split(" ");
    const analysisResult = trie.analyzeAtDepth(depth, normalized_phrase);
    console.log(analysisResult);

    const paramLoadTime = process.hrtime(startTime);
    const analysisStartTime = process.hrtime();
    const analysisTime = process.hrtime(analysisStartTime);

    if (verbose) {
      console.log(`Tempo de carregamento dos parâmetros | ${(paramLoadTime[0] * 1000 + paramLoadTime[1] / 1e6).toFixed(3)}ms`);
      console.log(`Tempo de verificação da frase        | ${(analysisTime[0] * 1000 + analysisTime[1] / 1e6).toFixed(3)}ms`);
    }
  });

program.parse(process.argv);
