import { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrash, FaTools, FaUndo, FaPlus } from "react-icons/fa";
import InventoryForm from "../components/InventoryForm";
import axios from "axios";
import { Card, CardBody, CardTitle, Container, Row } from "reactstrap";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const itemsPerPage = 4;

const DashboardAbout = () => {
  const [inventory, setInventory] = useState([]);
  const [stats, setStats] = useState({ total: 0, assigned: 0, damaged: 0, overdue: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get("https://inventory-management-system-backend-6.onrender.com/api/inventory");
        setTimeout(() => {
          const data = response.data.data;
          setInventory(data);
          setStats({
            total: data.length,
            assigned: data.filter(item => item.status === "Assigned").length,
            damaged: data.filter(item => item.status === "Damaged").length,
            overdue: data.filter(item => item.status === "Overdue").length,
          });
          setLoading(false);
        }, 3000);
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

  const inventoryStats = [
    { title: "Total Items", value: stats.total, icon: "fas fa-boxes", iconBg: "bg-blue-500", timePeriod: "Current total" },
    { title: "Assigned Items", value: stats.assigned, icon: "fas fa-user-check", iconBg: "bg-yellow-500", timePeriod: "Currently assigned" },
    { title: "Damaged Items", value: stats.damaged, icon: "fas fa-tools", iconBg: "bg-red-500", timePeriod: "Reported as damaged" },
    { title: "Overdue Returns", value: stats.overdue, icon: "fas fa-exclamation-triangle", iconBg: "bg-orange-500", timePeriod: "Overdue for return" },
  ];

  const chartData = {
    labels: ["Total Items", "Assigned Items", "Damaged Items", "Overdue Returns"],
    datasets: [
      {
        label: "Inventory Statistics",
        data: [stats.total, stats.assigned, stats.damaged, stats.overdue],
        backgroundColor: ["#3b82f6", "#facc15", "#ef4444", "#f97316"],
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8 ">
      <div className="header bg-gradient-to-r from-indigo-500 to-blue-700 text-white mx-auto px-4 py-8 rounded-lg">
        <Container fluid>
          <div className="header-body">
            <div className="mb-6">
              <Bar data={chartData} />
            </div>
            <Row className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
              {inventoryStats.map((stat, index) => (
                <Card key={index} className="shadow-md transition duration-300 hover:scale-105 border-0 rounded-lg bg-white dark:bg-gray-900">
                  <CardBody className="p-4 flex items-center space-x-4">
                    <div className={`icon w-12 h-12 flex items-center justify-center ${stat.iconBg} text-white rounded-full shadow-md`}>
                      <i className={`${stat.icon} text-xl`} />
                    </div>
                    <div>
                      <CardTitle tag="h6" className="text-gray-600 dark:text-gray-300 font-semibold text-xs uppercase tracking-wide">
                        {stat.title}
                      </CardTitle>
                      <span className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</span>
                      <p className="mt-1 text-gray-500 dark:text-gray-400 text-xs flex items-center">
                        <span className="ml-2">{stat.timePeriod}</span>
                      </p>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </Row>
          </div>
        </Container>
      </div>
      <InventoryForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} item={editingItem} />
    </div>
  );
};

export default DashboardAbout;
