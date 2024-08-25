import { TreeNode } from '../@types/tree';

export const TreeNodeView: React.FC<{
  node: TreeNode;
  isExpanded: boolean;
  toggleExpand: () => void;
  isAdding: boolean;
  toggleAdding: () => void;
}> = ({ node, isExpanded, toggleExpand, isAdding, toggleAdding }) => (
  <div className="flex items-center">
    {node.children && node.children.length > 0 && (
      <button
        className="mr-2 text-gray-500 focus:outline-none"
        onClick={toggleExpand}
      >
        {isExpanded ? '▼' : '►'}
      </button>
    )}
    <span>{node.name}</span>
    <button
      className={`ml-2 ${isAdding ? 'text-red-500' : 'text-blue-500'} focus:outline-none`}
      onClick={toggleAdding}
    >
      {isAdding ? 'x' : '+'}
    </button>
  </div>
);

