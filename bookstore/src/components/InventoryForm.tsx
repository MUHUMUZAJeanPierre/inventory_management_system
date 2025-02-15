import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface InventoryItem {
  _id?: string;
  name: string;
  status: string;
  condition: string;
  borrower?: string;
  dueDate?: string;
}

interface InventoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  item: InventoryItem | null;
  setInventory: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
}

const InventoryForm: React.FC<InventoryFormProps> = ({ isOpen, onClose, item, setInventory }) => {
  const [formData, setFormData] = useState<InventoryItem>({
    name: "",
    status: "Available",
    condition: "New",
    borrower: "",
    dueDate: "",
  });

  useEffect(() => {
    setFormData({
      name: item?.name || "",
      status: item?.status || "Available",
      condition: item?.condition || "New",
      borrower: item?.borrower || "",
      dueDate: item?.dueDate || "",
    });
  }, [item]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://inventory-management-system-backend-6.onrender.com/api/inventory", formData);
      if (response.data && response.data._id) {
        setInventory((prev) => [...prev, response.data]);
        toast.success("Inventory item added successfully!");
        onClose();
      } else {
        throw new Error("Invalid response data");
      }
    } catch (error) {
      toast.error("Failed to add item!");
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!item || !item._id) {
      toast.error("Invalid item ID for update.");
      return;
    }
    try {
      const response = await axios.put(`https://inventory-management-system-backend-6.onrender.com/api/inventory/${item._id}`, formData);
      if (response.data && response.data._id) {
        setInventory((prev) => prev.map((inv) => (inv._id === item._id ? response.data : inv)));
        toast.success("Inventory item updated successfully!");
        onClose();
      } else {
        throw new Error("Invalid response data");
      }
    } catch (error) {
      toast.error("Failed to update item!");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center py-10">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">{item ? "Edit Item" : "Add New Item"}</h2>
        <form onSubmit={item ? handleUpdate : handleAdd}>
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
            <select name="status" value={formData.status} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg">
              <option value="Available">Available</option>
              <option value="Assigned">Assigned</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Condition</label>
            <select name="condition" value={formData.condition} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg">
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
            <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500">
              Cancel
            </button>
            <button
              type="submit"
              className={item ? "bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600" : "bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"}
            >
              {item ? "Update Item" : "Add Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventoryForm;
