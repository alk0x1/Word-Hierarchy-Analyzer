import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TreeView } from '../../components/TreeView';
import { TreeNode } from '../../@types/tree';

describe('TreeView Component', () => {
  let node: TreeNode;
  let onAddChild: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    node = {
      name: 'Root Node',
      children: [{ name: 'Child Node 1', children: [] }],
    };
    onAddChild = vi.fn();
  });

  it('renders TreeNodeView with the correct node', () => {
    render(<TreeView node={node} onAddChild={onAddChild} />);
    expect(screen.getByText('Root Node')).toBeInTheDocument();
  });

  it('toggles children visibility when toggleExpand is called', () => {
    render(<TreeView node={node} onAddChild={onAddChild} />);
    expect(screen.getByText('Child Node 1')).toBeInTheDocument();
    fireEvent.click(screen.getByText('▼'));
    expect(screen.queryByText('Child Node 1')).not.toBeInTheDocument();
  });

  it('shows AddChildInput when toggleAdding is called', () => {
    render(<TreeView node={node} onAddChild={onAddChild} />);
    fireEvent.click(screen.getAllByText('+')[0]);
    expect(screen.getByPlaceholderText('Nome do novo nó')).toBeInTheDocument();
  });

  it('calls onAddChild with correct arguments when handleAddChild is called', () => {
    render(<TreeView node={node} onAddChild={onAddChild} />);
    fireEvent.click(screen.getAllByText('+')[0]);
    fireEvent.change(screen.getByPlaceholderText('Nome do novo nó'), { target: { value: 'New Child' } });
    fireEvent.click(screen.getByText('Adicionar'));

    expect(onAddChild).toHaveBeenCalledWith(node, 'New Child');
    expect(screen.queryByPlaceholderText('Nome do novo nó')).not.toBeInTheDocument();
  });

  it('hides AddChildInput when child name is empty and handleAddChild is called', () => {
    render(<TreeView node={node} onAddChild={onAddChild} />);
    fireEvent.click(screen.getAllByText('+')[0]);
    fireEvent.change(screen.getByPlaceholderText('Nome do novo nó'), { target: { value: '' } });
    fireEvent.click(screen.getByText('Adicionar'));

    expect(onAddChild).not.toHaveBeenCalled();
    expect(screen.getByPlaceholderText('Nome do novo nó')).toBeInTheDocument();
  });

  it('renders nested TreeView components for child nodes', async () => {
    const complexNode: TreeNode = {
      name: 'Root Node',
      children: [
        {
          name: 'Child Node 1',
          children: [{ name: 'Grandchild Node', children: [] }],
        },
      ],
    };

    render(<TreeView node={complexNode} onAddChild={onAddChild} />);
    expect(screen.getByText('Child Node 1')).toBeInTheDocument();
    expect(screen.getByText('Grandchild Node')).toBeInTheDocument();
  });
});
