import { Command } from 'commander';
import { parseDepth, validatePhrase, analyzePhrase } from './utils';
import { Trie } from './trie';
import tree from "./dicts/world.json";

const program = new Command();
const trie = new Trie();
trie.populateFromJson(tree);

program
  .command('analyze')
  .description('Analyze a phrase with optional depth and verbosity')
  .requiredOption('--depth <n>', 'Specify the depth for the analysis', parseDepth)
  .option('--verbose', 'Enable verbose output')
  .argument('<phrase>', 'The phrase to be analyzed', validatePhrase)
  .action((phrase: string, options) => {
    analyzePhrase(trie, phrase, options.depth, options.verbose);
  });

program.parse(process.argv);
