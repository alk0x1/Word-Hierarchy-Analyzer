import { Command } from 'commander';

const program = new Command();

program
  .command('analyze')
  .description('Analyze a phrase with optional depth and verbosity')
  .option('--depth <n>', 'Specify the depth for the analysis', parseInt)
  .option('--verbose', 'Enable verbose output')
  .argument('<phrase>', 'The phrase to be analyzed')
  .action((phrase: string, options) => {
    const { depth, verbose } = options;

		console.log("phrase: ", phrase);
		console.log("depth: ", depth);
		console.log("verbose: ", verbose);
  });

program.parse(process.argv);
