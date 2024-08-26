# Word Hierarchy Analyzer
Deployed Web: https://word-hierarchy-analyzer.vercel.app/
## Setup Instructions
Clone the repository:
```bash
git clone https://github.com/alk0x1/Word-Hierarchy-Analyzer.git
```
### Running the CLI
Navigate to the CLI directory and follow the [CLI README](./cli/README.md) for setup and usage instructions.

### Running the Web Application
Navigate to the Web directory and follow the [Web README](./web/README.md) for setup and usage instructions.

### Performance Optimization Techniques

1. **Trie Structure**:
 The Trie data structure was chosen to manage hierarchical word data due to its efficiency in storing and retrieving categories based on their hierarchical path.
**Trade-off**: Although a Trie can consume more memory compared to flat data structures due to storing prefixes, its time efficiency in lookups and inserts justifies the trade-off, especially for a command-line tool where speed is critical.
2. **Normalization**:
All words are normalized by converting them to lowercase and stripping diacritics. This ensures that the Trie treats words like "Leão" and "leao" as the same category.
**Trade-off**: The normalization process adds a slight overhead, but this is necessary for consistent and accurate matching across different inputs.
3. **Depth-First Search (DFS)**:
The analysis at a specific depth is implemented using DFS, which allows for traversing the Trie efficiently and accumulating counts for matched categories.
**Trade-off**: DFS was chosen over BFS (Breadth-First Search) because it uses less memory, as it doesn't need to store all nodes at a certain level before proceeding.
4. **Pre-Loading Data**:
All words are stores in the data structure at once.
**Trade-off**: This consumes more memory than the lazy loading approach where only the necessary parts of the hierarchy are loaded during analysis. But as our priority is query speed Pre-Load the data is a better choice for it.
5. **Caching Mechanism**:
A hashmap implemented to store precomputed paths and their corresponding Trie nodes. This allows for faster lookups by avoiding the need to traverse the entire Trie from the root for frequently accessed paths.
**Trade-off**: While the cache increases memory usage, it significantly reduces the lookup time for paths, especially in scenarios where the same paths are queried multiple times.






