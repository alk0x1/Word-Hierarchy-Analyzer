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
      const normalized = part.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g,"");
      if (!node.children.has(normalized)) {
        node.children.set(normalized, new TrieNode());
      }
      node = node.children.get(normalized)!;
    }
  }
}
