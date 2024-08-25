import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TreeNodeView } from '../../components/TreeNodeView';
import { TreeNode } from '../../@types/tree';

describe('TreeNodeView Component', () => {
  let node: TreeNode;
  let isExpanded: boolean;
  let toggleExpand: ReturnType<typeof vi.fn>;
  let isAdding: boolean;
  let toggleAdding: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    node = {
      name: 'Root Node',
      children: [{ name: 'Child Node', children: [] }],
    };
    isExpanded = false;
    toggleExpand = vi.fn();
    isAdding = false;
    toggleAdding = vi.fn();
  });

  it('renders the node name', () => {
    render(
      <TreeNodeView
        node={node}
        isExpanded={isExpanded}
        toggleExpand={toggleExpand}
        isAdding={isAdding}
        toggleAdding={toggleAdding}
      />
    );
    expect(screen.getByText('Root Node')).toBeInTheDocument();
  });

  it('shows expand button when node has children', () => {
    render(
      <TreeNodeView
        node={node}
        isExpanded={isExpanded}
        toggleExpand={toggleExpand}
        isAdding={isAdding}
        toggleAdding={toggleAdding}
      />
    );
    expect(screen.getByText('►')).toBeInTheDocument();
  });

  it('calls toggleExpand when expand button is clicked', () => {
    render(
      <TreeNodeView
        node={node}
        isExpanded={isExpanded}
        toggleExpand={toggleExpand}
        isAdding={isAdding}
        toggleAdding={toggleAdding}
      />
    );
    const button = screen.getByText('►');
    fireEvent.click(button);
    expect(toggleExpand).toHaveBeenCalled();
  });

  it('displays the correct icon based on isExpanded prop', () => {
    isExpanded = true;
    render(
      <TreeNodeView
        node={node}
        isExpanded={isExpanded}
        toggleExpand={toggleExpand}
        isAdding={isAdding}
        toggleAdding={toggleAdding}
      />
    );
    expect(screen.getAllByText('▼')[0]).toBeInTheDocument();
  });

  it('shows add button when not adding', () => {
    render(
      <TreeNodeView
        node={node}
        isExpanded={isExpanded}
        toggleExpand={toggleExpand}
        isAdding={isAdding}
        toggleAdding={toggleAdding}
      />
    );
    const addButton = screen.getByText('+', { selector: 'button' });
    expect(addButton).toBeInTheDocument();
  });

  it('shows cancel button when adding', () => {
    isAdding = true;
    render(
      <TreeNodeView
        node={node}
        isExpanded={isExpanded}
        toggleExpand={toggleExpand}
        isAdding={isAdding}
        toggleAdding={toggleAdding}
      />
    );
    expect(screen.getByText('x')).toBeInTheDocument();
  });

  it('calls toggleAdding when add/cancel button is clicked', () => {
    render(
      <TreeNodeView
        node={node}
        isExpanded={isExpanded}
        toggleExpand={toggleExpand}
        isAdding={isAdding}
        toggleAdding={toggleAdding}
      />
    );
    const button = screen.getByText('+');
    fireEvent.click(button);
    expect(toggleAdding).toHaveBeenCalled();
  });

  it('does not show expand button when node has no children', () => {
    node.children = [];
    render(
      <TreeNodeView
        node={node}
        isExpanded={isExpanded}
        toggleExpand={toggleExpand}
        isAdding={isAdding}
        toggleAdding={toggleAdding}
      />
    );
    expect(screen.queryByText('►')).not.toBeInTheDocument();
  });
});
