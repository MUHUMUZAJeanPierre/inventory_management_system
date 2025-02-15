import React, { useEffect, useState } from "react";
import axios from "axios";

const InventoryForm = ({ isOpen, onClose, onSubmit, item, setInventory }) => {
  const [formData, setFormData] = useState({
    name: "",
    status: "Available",
    condition: "New",
    borrower: "",
    dueDate: "",
  });

  // Populate form for editing
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

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add new item
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://inventory-management-system-backend-6.onrender.com/api/inventory", formData);
      setInventory((prev) => [...prev, response.data]);
      console.log("Item added:", response.data);
      onClose();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  // Update existing item
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!item?.id) {
      console.error("No item ID provided for update.");
      return;
    }
    try {
      const response = await axios.put(`https://inventory-management-system-backend-6.onrender.com/api/inventory/${item.id}`, {
        ...formData,
        id: item.id, // Ensure the API gets the item ID
      });

      setInventory((prev) =>
        prev.map((inv) => (inv.id === item.id ? response.data : inv))
      );
      console.log("Item updated:", response.data);
      onClose();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">{item ? "Edit Item" : "Add New Item"}</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium">Item Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="Available">Available</option>
              <option value="Assigned">Assigned</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Condition</label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="New">New</option>
              <option value="Good">Good</option>
              <option value="Damaged">Damaged</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Borrower (Optional)</label>
            <input
              type="text"
              name="borrower"
              value={formData.borrower}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Due Date (Optional)</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
            >
              Cancel
            </button>
            {item ? (
              <button
                type="button"
                onClick={handleUpdate}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Update Item
              </button>
            ) : (
              <button
                type="button"
                onClick={handleAdd}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Add Item
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventoryForm;
