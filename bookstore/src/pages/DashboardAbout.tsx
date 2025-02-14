import { Card, CardBody, CardTitle, Container, Row } from "reactstrap";

// Inventory Stats Data
const inventoryStats = [
  {
    title: "Total Items",
    value: "1,250",
    icon: "fas fa-boxes",
    iconBg: "bg-blue-500",
    change: "5%",
    changeType: "up",
    changeColor: "text-green-500",
    timePeriod: "Since last update",
  },
  {
    title: "Assigned Items",
    value: "450",
    icon: "fas fa-user-check",
    iconBg: "bg-yellow-500",
    change: "2%",
    changeType: "up",
    changeColor: "text-green-500",
    timePeriod: "Since last week",
  },
  {
    title: "Damaged Items",
    value: "35",
    icon: "fas fa-tools",
    iconBg: "bg-red-500",
    change: "8%",
    changeType: "down",
    changeColor: "text-red-500",
    timePeriod: "Since last report",
  },
  {
    title: "Overdue Returns",
    value: "20",
    icon: "fas fa-exclamation-triangle",
    iconBg: "bg-orange-500",
    change: "12%",
    changeType: "up",
    changeColor: "text-red-500",
    timePeriod: "Since last audit",
  },
];

const DashboardAbout = () => {
  return (
    <div className="header bg-gradient-to-r from-indigo-500 to-blue-700 text-white mx-auto px-4 py-8 rounded-lg">
      <Container fluid>
        <div className="header-body">
          {/* Responsive Grid Layout */}
          <Row className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
            {inventoryStats.map((stat, index) => (
              <Card
                key={index}
                className="shadow-md transition duration-300 hover:scale-105 border-0 rounded-lg bg-white dark:bg-gray-900"
              >
                <CardBody className="p-4 flex items-center space-x-4">
                  <div
                    className={`icon w-12 h-12 flex items-center justify-center ${stat.iconBg} text-white rounded-full shadow-md`}
                  >
                    <i className={`${stat.icon} text-xl`} />
                  </div>
                  <div>
                    <CardTitle
                      tag="h6"
                      className="text-gray-600 dark:text-gray-300 font-semibold text-xs uppercase tracking-wide"
                    >
                      {stat.title}
                    </CardTitle>
                    <span className="text-2xl font-bold text-gray-800 dark:text-white">
                      {stat.value}
                    </span>
                    <p className="mt-1 text-gray-500 dark:text-gray-400 text-xs flex items-center">
                      <span className={`${stat.changeColor} font-semibold`}>
                        <i className={`fas fa-arrow-${stat.changeType} mr-1`} />{" "}
                        {stat.change}
                      </span>
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
  );
};

export default DashboardAbout;
