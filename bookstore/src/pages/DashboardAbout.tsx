import React, { useEffect, useState } from "react";
import InventoryForm from "../components/InventoryForm";
import axios from "axios";
import { Card, CardBody, CardTitle, Container, Row } from "reactstrap";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js";
import { useTheme } from "../context/ThemeContext"; 

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

interface InventoryItem {
  _id: string;
  name: string;
  status: string;
  condition: string;
  borrower?: string;
  dueDate?: string;
}

interface InventoryStats {
  total: number;
  assigned: number;
  damaged: number;
  overdue: number;
}

const DashboardAbout: React.FC = () => {
  const { darkMode } = useTheme(); 
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [stats, setStats] = useState<InventoryStats>({ total: 0, assigned: 0, damaged: 0, overdue: 0 });
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get<{ data: InventoryItem[] }>(
          "https://inventory-management-system-backend-6.onrender.com/api/inventory"
        );

        const data = response.data.data || [];

        setInventory(data);
        setStats({
          total: data.length,
          assigned: data.filter((item) => item.status === "Assigned").length,
          damaged: data.filter((item) => item.status === "Damaged").length,
          overdue: data.filter((item) => item.status === "Overdue").length,
        });
      } catch (error) {
        console.error("Error fetching inventory:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  if (loading) {
    return (
      <div className={`flex items-center justify-center h-screen ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500"></div>
      </div>
    );
  }

  const chartData = {
    labels: ["Total Items", "Assigned Items", "Damaged Items", "Overdue Returns"],
    datasets: [
      {
        label: "Inventory Statistics",
        data: [stats.total, stats.assigned, stats.damaged, stats.overdue],
        backgroundColor: darkMode
          ? ["#d1d5db", "#facc15", "#ef4444", "#10b981"] 
          : ["#6b7280", "#facc15", "#ef4444", "#10b981"],
      },
    ],
  };

  const cardColors: Record<string, string> = {
    total: darkMode ? "bg-gray-800" : "bg-gray-700",
    assigned: "bg-yellow-500",
    damaged: "bg-red-500",
    overdue: "bg-green-500",
  };

  return (
    <div className={`container mx-auto px-4 py-8 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <div
        className={`header mx-auto py-8 rounded-lg transition-all duration-300 ${
          darkMode ? "bg-gradient-to-r from-gray-800 to-gray-700" : "bg-gradient-to-r from-purple-500 to-teal-500 text-white"
        }`}
      >
        <Container fluid>
          <div className="header-body">
            <div className="mb-6 flex flex-col md:flex-row justify-center items-center space-x-4">
              
              <div className="w-full md:w-1/3 h-[300px]">
                <Pie
                  data={chartData}
                  options={{
                    maintainAspectRatio: false,
                    responsive: true,
                    plugins: {
                      legend: {
                        labels: { color: darkMode ? "white" : "black" },
                      },
                    },
                  }}
                />
              </div>

              <div className="w-full md:w-2/3 h-[300px]">
                <Bar
                  data={chartData}
                  options={{
                    maintainAspectRatio: false,
                    responsive: true,
                    plugins: {
                      legend: {
                        labels: { color: darkMode ? "white" : "black" },
                      },
                      title: {
                        display: true,
                        text: "Inventory Statistics",
                        color: darkMode ? "white" : "black",
                      },
                    },
                    scales: {
                      x: {
                        ticks: { color: darkMode ? "white" : "black" },
                        grid: { color: darkMode ? "gray" : "rgba(0,0,0,0.1)" },
                      },
                      y: {
                        ticks: { color: darkMode ? "white" : "black" },
                        grid: { color: darkMode ? "gray" : "rgba(0,0,0,0.1)" },
                      },
                    },
                  }}
                />
              </div>
            </div>

            <Row className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
              {Object.entries(stats).map(([key, value], index) => (
                <Card
                  key={index}
                  className={`shadow-md transition duration-300 hover:scale-105 border-0 rounded-lg text-white ${
                    cardColors[key] || "bg-gray-700"
                  }`}
                >
                  <CardBody className="p-4 flex items-center space-x-4">
                    <div>
                      <CardTitle tag="h6" className="text-sm uppercase tracking-wide font-semibold">
                        {key === "total"
                          ? "Total Items"
                          : key === "assigned"
                          ? "Assigned Items"
                          : key === "damaged"
                          ? "Damaged Items"
                          : "Overdue Returns"}
                      </CardTitle>
                      <span className="text-2xl font-bold">{value}</span>
                      <p className="mt-1 text-xs flex items-center">
                        <span className="font-semibold">
                          {stats.total > 0 ? `+${((value / stats.total) * 100).toFixed(2)}%` : "0%"}
                        </span>
                        <span className="ml-2">of total inventory</span>
                      </p>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </Row>
          </div>
        </Container>
      </div>

      <InventoryForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} item={editingItem} setInventory={setInventory} />
    </div>
  );
};

export default DashboardAbout;
