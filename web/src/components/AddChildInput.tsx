export const AddChildInput: React.FC<{
  newChildName: string;
  setNewChildName: (name: string) => void;
  handleAddChild: () => void;
}> = ({ newChildName, setNewChildName, handleAddChild }) => (
  <div className="flex items-center mt-2">
    <input
      type="text"
      value={newChildName}
      onChange={(e) => setNewChildName(e.target.value)}
      placeholder="New child node name"
      className="border rounded px-2 py-1 mr-2"
    />
    <button
      onClick={handleAddChild}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
    >
      Add
    </button>
  </div>
);
