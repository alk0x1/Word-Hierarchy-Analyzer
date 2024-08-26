import { TreeNode } from "./@types/tree";
class TrieNode {
  children: Map<string, TrieNode>;
  originalWord?: string;

  constructor() {
    this.children = new Map<string, TrieNode>();
  }
}

export class Trie {
  root: TrieNode;
  originalWords: Map<string, string>;
  cache: Map<string, TrieNode>;

  constructor() {
    this.root = new TrieNode();
    this.originalWords = new Map<string, string>();
    this.cache = new Map<string, TrieNode>();
  }

  insert(path: string[]) {
    let node = this.root;
    let pathKey = '';

    for (const part of path) {
      const normalized = this.normalize(part);
      pathKey += normalized + '/';
      if (!node.children.has(normalized)) {
        node.children.set(normalized, new TrieNode());
      }
      node = node.children.get(normalized)!;
    }
    const original = path[path.length - 1];
    const normalized = this.normalize(original);
    node.originalWord = original;
    this.originalWords.set(normalized, original);

    this.cache.set(pathKey, node);
  }

  normalize(word: string) {
    return word.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  analyzeAtDepth(depth: number, words: string[]): string {
    const categoryCount: Map<string, number> = new Map();
    const normalizedWords = words.map(word => this.normalize(word));

    const dfs = (node: TrieNode, currentDepth: number, currentPath: string[]) => {
      if (currentDepth === depth) {
        for (const word of normalizedWords) {
          if (node.children.has(word)) {
            const category = currentPath[currentPath.length - 1];
            categoryCount.set(category, (categoryCount.get(category) || 0) + 1);
          }
        }
        return;
      }

      for (const [childKey, childNode] of node.children.entries()) {
        dfs(childNode, currentDepth + 1, [...currentPath, childKey]);
      }
    };

    dfs(this.root, 0, []);

    const output: string[] = [];
    for (const [category, count] of categoryCount.entries()) {
      const original = this.originalWords.get(this.normalize(category)) || category;
      output.push(`${original} = ${count}`);
    }

    return output.join("; ");
  }

  populateFromJson(node: TreeNode, path: string[] = []) {
    const currentPath = [...path, node.name];
    this.insert(currentPath);

    if (node.children) {
      for (const child of node.children) {
        this.populateFromJson(child, currentPath);
      }
    }
  }

  findCategory(word: string): string | undefined {
    const normalizedWord = this.normalize(word);
    const cachedNode = this.cache.get(normalizedWord);

    if (cachedNode && cachedNode.originalWord) {
      return this.originalWords.get(this.normalize(cachedNode.originalWord));
    }

    return undefined;
  }
}
