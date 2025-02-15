import { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrash, FaTools, FaUndo, FaPlus } from "react-icons/fa";
import InventoryForm from "../components/InventoryForm";
import axios from "axios";

const itemsPerPage = 4;

const DashboardHome = () => {
  const [inventory, setInventory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get("https://inventory-management-system-backend-6.onrender.com/api/inventory");
        setTimeout(() => {
          setInventory(response.data.data);
          setLoading(false);
        }, 3000); // Simulating 3 seconds loading time
      } catch (error) {
        console.error("Error fetching inventory:", error);
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  const totalPages = Math.ceil(inventory.length / itemsPerPage);
  const paginatedData = inventory.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const openCreateForm = () => {
    setEditingItem(null);
    setIsFormOpen(true);
  };

  const openEditForm = (item) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await axios.delete(`https://inventory-management-system-backend-6.onrender.com/api/inventory/${id}`);
      setInventory(inventory.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b dark:border-gray-700 flex justify-between">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Inventory Overview</h3>
          <button
            onClick={openCreateForm}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition"
          >
            <FaPlus className="mr-2" /> Add Item
          </button>
        </div>
        <table className="w-full text-left text-gray-700 dark:text-gray-300">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3">Item</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Condition</th>
              <th className="px-6 py-3">Borrower</th>
              <th className="px-6 py-3">Due Date</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={index} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-white text-xs font-semibold rounded-full ${item.status === "Overdue" ? "bg-red-500" : item.status === "Assigned" ? "bg-yellow-500" : "bg-green-500"}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4">{item.condition}</td>
                <td className="px-6 py-4">{item.borrower || "N/A"}</td>
                <td className="px-6 py-4">{item.dueDate || "N/A"}</td>
                <td className="px-6 py-4 flex space-x-4">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaEye />
                  </button>
                  <button className="text-yellow-500 hover:text-yellow-700" onClick={() => openEditForm(item)}>
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center space-x-2">
        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50">Previous</button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => setCurrentPage(index + 1)} className={`px-4 py-2 rounded-md ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}>{index + 1}</button>
        ))}
        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50">Next</button>
      </div>

      <InventoryForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} item={editingItem} />
    </div>
  );
};

export default DashboardHome;
