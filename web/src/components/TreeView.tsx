import React, { useState } from 'react';
import { TreeNode } from '../@types/tree';
import { AddChildInput } from './AddChildInput';
import { TreeNodeView } from './TreeNodeView';

interface TreeViewProps {
  node: TreeNode;
  onAddChild: (parentNode: TreeNode, childName: string) => void;
}

export const TreeView: React.FC<TreeViewProps> = ({ node, onAddChild }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newChildName, setNewChildName] = useState('');

  const handleAddChild = () => {
    if (newChildName.trim()) {
      onAddChild(node, newChildName);
      setNewChildName('');
      setIsAdding(false);
    }
  };

  return (
    <div className="ml-4">
      <TreeNodeView
        node={node}
        isExpanded={isExpanded}
        toggleExpand={() => setIsExpanded(!isExpanded)}
        isAdding={isAdding}
        toggleAdding={() => setIsAdding(!isAdding)}
      />
      {isExpanded && node.children && (
        <div className="ml-4">
          {node.children.map((child, index) => (
            <TreeView key={index} node={child} onAddChild={onAddChild} />
          ))}
        </div>
      )}
      {isAdding && (
        <AddChildInput
          newChildName={newChildName}
          setNewChildName={setNewChildName}
          handleAddChild={handleAddChild}
        />
      )}
    </div>
  );
};