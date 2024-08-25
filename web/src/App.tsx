import React, { useState } from 'react';
import { useTree } from './hooks/useTree';
import { TreeView}  from './components/TreeView';

const App: React.FC = () => {
  const [rootName, setRootName] = useState('');
  const [isRootSet, setIsRootSet] = useState(false);
  const { tree, setTree, addChild } = useTree(null);

  const handleSetRoot = () => {
    if (rootName.trim()) {
      setTree({ name: rootName, children: [] });
      setIsRootSet(true);
    }
  };



  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg bg-gray-200 p-6 h-120 overflow-auto shadow-lg">
            {!isRootSet ? (
              <div className="flex items-center">
                <input
                  type="text"
                  value={rootName}
                  onChange={(e) => setRootName(e.target.value)}
                  placeholder="Insira o nome da raíz"
                  className="border rounded px-2 py-1 mr-2"
                />
                <button
                  onClick={handleSetRoot}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                >
                  Inserir
                </button>
              </div>
            ) : (
              tree && <TreeView node={tree} onAddChild={addChild} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
