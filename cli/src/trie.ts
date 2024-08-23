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
