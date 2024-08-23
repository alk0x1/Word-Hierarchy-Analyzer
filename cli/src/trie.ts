import { TreeNode } from "./@types/tree";

class TrieNode {
  children: Map<string, TrieNode>;

  constructor() {
    this.children = new Map<string, TrieNode>();
  }
}

export class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(path: string[]) {
    let node = this.root;
    for (const part of path) {
      const normalized = this.normalize(part);
      if (!node.children.has(normalized)) {
        node.children.set(normalized, new TrieNode());
      }
      node = node.children.get(normalized)!;
    }
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
      output.push(`${category} = ${count}`);
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
}
