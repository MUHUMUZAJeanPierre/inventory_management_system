import { useEffect, useState, useCallback, useMemo } from "react";
import { FaEye, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import InventoryForm from "../components/InventoryForm";
import axios from "axios";
import { useTheme } from "../context/ThemeContext"; // Import Theme Context

// ✅ Define Inventory Item Type
interface InventoryItem {
  _id: string; 
  name: string;
  status: string;
  condition: string;
  borrower?: string | null;
  dueDate?: string | null;
}

const itemsPerPage = 4;

const DashboardHome: React.FC = () => {
  const { darkMode } = useTheme(); // Get dark mode state
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get<{ data: InventoryItem[] }>(
          "https://inventory-management-system-backend-6.onrender.com/api/inventory"
        );
        setInventory(response.data.data);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInventory();
  }, []);

  // ✅ Optimize Pagination Calculation with useMemo
  const totalPages = useMemo(() => Math.ceil(inventory.length / itemsPerPage), [inventory.length]);
  const paginatedData = useMemo(
    () => inventory.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    [inventory, currentPage]
  );

  // ✅ Open Inventory Form for Adding a New Item
  const openCreateForm = useCallback(() => {
    setEditingItem(null);
    setIsFormOpen(true);
  }, []);

  // ✅ Open Inventory Form for Editing an Existing Item
  const openEditForm = useCallback((item: InventoryItem) => {
    setEditingItem(item);
    setIsFormOpen(true);
  }, []);

  // ✅ Handle Item Deletion
  const handleDelete = useCallback(async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await axios.delete(`https://inventory-management-system-backend-6.onrender.com/api/inventory/${id}`);
      setInventory((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }, []);

  if (loading) {
    return (
      <div className={`fixed inset-0 flex items-center justify-center ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className={`container mx-auto px-4 py-8 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <div className="shadow-lg rounded-lg overflow-hidden">
        
        {/* ✅ Header Section */}
        <div className={`px-6 py-4 border-b flex justify-between items-center ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
          <h3 className="text-lg font-semibold">Inventory Overview</h3>
          <button
            onClick={openCreateForm}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition"
          >
            <FaPlus className="mr-2" /> Add Item
          </button>
        </div>

        {/* ✅ Inventory Table */}
        <table className="w-full text-left">
          <thead className={`${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-700"}`}>
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
            {paginatedData.map((item) => (
              <tr key={item._id} className={`border-b ${darkMode ? "border-gray-700 hover:bg-gray-800" : "border-gray-200 hover:bg-gray-50"} transition`}>
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-white text-xs font-semibold rounded-full ${
                    item.status === "Overdue"
                      ? "bg-red-500"
                      : item.status === "Assigned"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}>
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

      {/* ✅ Pagination Controls */}
      <div className="mt-4 flex justify-center space-x-2">
        <button 
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} 
          disabled={currentPage === 1} 
          className={`px-4 py-2 rounded-md ${darkMode ? "bg-gray-800 hover:bg-gray-700 text-white" : "bg-gray-200 hover:bg-gray-300"} disabled:opacity-50`}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button 
            key={index} 
            onClick={() => setCurrentPage(index + 1)} 
            className={`px-4 py-2 rounded-md ${
              currentPage === index + 1 ? "bg-blue-500 text-white" : darkMode ? "bg-gray-800 hover:bg-gray-700 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button 
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} 
          disabled={currentPage === totalPages} 
          className={`px-4 py-2 rounded-md ${darkMode ? "bg-gray-800 hover:bg-gray-700 text-white" : "bg-gray-200 hover:bg-gray-300"} disabled:opacity-50`}
        >
          Next
        </button>
      </div>

      {/* ✅ Inventory Form Modal */}
      <InventoryForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} item={editingItem} setInventory={setInventory} />
    </div>
  );
};

export default DashboardHome;
