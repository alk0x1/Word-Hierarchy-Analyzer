import { useState } from 'react';
import { TreeNode } from '../@types/tree';

export const useTree = (initialTree: TreeNode | null) => {
  const [tree, setTree] = useState<TreeNode | null>(initialTree);

  const addChild = (parentNode: TreeNode, childName: string) => {
    const addNode = (node: TreeNode): TreeNode => {
      if (node === parentNode) {
        const newNode: TreeNode = { name: childName, children: [] };
        return {
          ...node,
          children: node.children ? [...node.children, newNode] : [newNode],
        };
      }
      return {
        ...node,
        children: node.children ? node.children.map(addNode) : [],
      };
    };

    if (tree) {
      setTree(addNode(tree));
    }
  };

  return { tree, setTree, addChild };
};
