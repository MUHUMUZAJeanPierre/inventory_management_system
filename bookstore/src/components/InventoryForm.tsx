import { useEffect, useState } from "react";

const InventoryForm = ({ isOpen, onClose, onSubmit, item }) => {
  const [formData, setFormData] = useState({
    name: "",
    status: "Available",
    condition: "New",
    borrower: "",
    dueDate: "",
  });

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || "",
        status: item.status || "Available",
        condition: item.condition || "New",
        borrower: item.borrower || "",
        dueDate: item.dueDate || "",
      });
    } else {
      setFormData({
        name: "",
        status: "Available",
        condition: "New",
        borrower: "",
        dueDate: "",
      });
    }
  }, [item]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          {item ? "Edit Item" : "Add New Item"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Item Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              Item Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="Available">Available</option>
              <option value="Assigned">Assigned</option>
              <option value="Overdue">Overdue</option>
              <option value="Damaged">Damaged</option>
            </select>
          </div>

          {/* Condition */}
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              Condition
            </label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="New">New</option>
              <option value="Good">Good</option>
              <option value="Damaged">Damaged</option>
            </select>
          </div>

          {/* Borrower Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              Borrower (if assigned)
            </label>
            <input
              type="text"
              name="borrower"
              value={formData.borrower}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              Due Date (if borrowed)
            </label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition dark:bg-gray-600 dark:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              {item ? "Update" : "Add Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventoryForm;
