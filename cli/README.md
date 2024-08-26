# CLI Application

## Overview
This CLI tool provides functionalities to analyze phrases with specified depth and optional verbosity. It is designed to be simple and time efficient, using TypeScript and the Bun runtime.

## Prerequisites
- **Bun**: Make sure Bun is installed globally on your system. Follow the installation guide at [bun.sh](https://bun.sh/).

## Setup Instructions

1. **Enter in the directory**:
    ```bash
    cd Word-Hierarchy-Analyzer/cli
    ```

2. **Install Dependencies**:
    Since Bun is used, dependencies are handled efficiently. Run the following command:
    ```bash
    bun install
    ```

## Usage

To run the CLI, use the following command format:
```bash
bun run src/cli.ts <command> [options] <arguments>
```
or
```bash
cd src
bun run cli.ts <command> [options] <arguments>
```
### Available Command
#### `analyze` 
- Analyze a given phrase with optional depth and verbosity.
- Example: bun run cli.ts analyze [options] <phrase>

##### Options:
- --depth <n> (required): Specifies the depth of the analysis. Must be a valid number. For example:
```bash
bun run cli.ts analyze --depth 3 "Your phrase here"
```
- --verbose (optional): Enables verbose output, providing more detailed information during analysis. For example:
```bash
bun run cli.ts analyze --depth 3 --verbose "Your phrase here"
```

##### Arguments:
`<phrase>`: The phrase to be analyzed. This argument is required and must be a valid string. For example:
```bash
bun run cli.ts analyze --depth 3 "Analyze this phrase"
```

### Running Tests
```bash
cd src
bun test
```
