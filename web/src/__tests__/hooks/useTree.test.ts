import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useTree } from '../../hooks/useTree';
import { TreeNode } from '../../@types/tree';

describe('useTree Hook', () => {
  it('initializes with null tree', () => {
    const { result } = renderHook(() => useTree(null));
    expect(result.current.tree).toBeNull();
  });

  it('sets initial tree', () => {
    const initialTree: TreeNode = { name: 'Root', children: [] };
    const { result } = renderHook(() => useTree(initialTree));
    expect(result.current.tree).toEqual(initialTree);
  });

  it('adds child to tree', () => {
    const initialTree: TreeNode = { name: 'Root', children: [] };
    const { result } = renderHook(() => useTree(initialTree));

    act(() => {
      result.current.addChild(initialTree, 'Child 1');
    });

    expect(result.current.tree).toEqual({
      name: 'Root',
      children: [{ name: 'Child 1', children: [] }],
    });
  });

  it('adds child to nested node', () => {
    const initialTree: TreeNode = {
      name: 'Root',
      children: [{ name: 'Child 1', children: [] }],
    };
    const { result } = renderHook(() => useTree(initialTree));

    act(() => {
      if (result.current.tree && result.current.tree.children) {
        result.current.addChild(result.current.tree.children[0], 'Grandchild 1');
      }
    });

    expect(result.current.tree).toEqual({
      name: 'Root',
      children: [
        {
          name: 'Child 1',
          children: [{ name: 'Grandchild 1', children: [] }],
        },
      ],
    });
  });
});