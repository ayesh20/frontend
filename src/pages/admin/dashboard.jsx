import axios from "axios";
import { useEffect, useState } from "react";
import { FiUsers, FiPackage, FiShoppingCart } from "react-icons/fi";
import Loader from "../../components/loader";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    users: {
      total: 0,
      admins: 0,
      normalUsers: 0
    },
    products: {
      total: 0,
      categories: {}
    },
    orders: {
      total: 0,
      pending: 0,
      completed: 0,
      cancelled: 0
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`
        };

        // Fetch all data concurrently
        const [usersRes, productsRes, ordersRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/all`, { headers }),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/all`),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/all`, { headers })
        ]);

        // Process users data
        const users = usersRes.data.users || [];
        const admins = users.filter(user => user.role === 'admin').length;
        const normalUsers = users.filter(user => user.role !== 'admin').length;

        // Process products data
        const products = productsRes.data.products || [];
        const categories = {};
        products.forEach(product => {
          if (product.category) {
            categories[product.category] = (categories[product.category] || 0) + 1;
          }
        });

        // Process orders data
        const orders = ordersRes.data.orders || [];
        const pending = orders.filter(order => order.status === 'pending').length;
        const completed = orders.filter(order => order.status === 'completed').length;
        const cancelled = orders.filter(order => order.status === 'cancelled').length;

        setDashboardData({
          users: {
            total: users.length,
            admins,
            normalUsers
          },
          products: {
            total: products.length,
            categories
          },
          orders: {
            total: orders.length,
            pending,
            completed,
            cancelled
          }
        });

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full h-full p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Users Card */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Users</h2>
            <FiUsers className="text-3xl text-blue-500" />
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Users:</span>
              <span className="text-2xl font-bold text-blue-600">
                {dashboardData.users.total}
              </span>
            </div>
            
            <div className="border-t pt-3 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Admins:</span>
                <span className="font-semibold text-red-600">
                  {dashboardData.users.admins}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Normal Users:</span>
                <span className="font-semibold text-green-600">
                  {dashboardData.users.normalUsers}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Products Card */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Products</h2>
            <FiPackage className="text-3xl text-green-500" />
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Products:</span>
              <span className="text-2xl font-bold text-green-600">
                {dashboardData.products.total}
              </span>
            </div>
            
            <div className="border-t pt-3 space-y-2">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">By Category:</h3>
              {Object.entries(dashboardData.products.categories).map(([category, count]) => (
                <div key={category} className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 capitalize">{category}:</span>
                  <span className="font-semibold text-green-600">{count}</span>
                </div>
              ))}
              {Object.keys(dashboardData.products.categories).length === 0 && (
                <p className="text-sm text-gray-400 italic">No categories found</p>
              )}
            </div>
          </div>
        </div>

        {/* Orders Card */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Orders</h2>
            <FiShoppingCart className="text-3xl text-orange-500" />
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Orders:</span>
              <span className="text-2xl font-bold text-orange-600">
                {dashboardData.orders.total}
              </span>
            </div>
            
            <div className="border-t pt-3 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Pending:</span>
                <span className="font-semibold text-yellow-600">
                  {dashboardData.orders.pending}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Completed:</span>
                <span className="font-semibold text-green-600">
                  {dashboardData.orders.completed}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Cancelled:</span>
                <span className="font-semibold text-red-600">
                  {dashboardData.orders.cancelled}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Summary */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{dashboardData.users.total}</div>
            <div className="text-sm text-gray-600">Total Users</div>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{dashboardData.products.total}</div>
            <div className="text-sm text-gray-600">Total Products</div>
          </div>
          
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{dashboardData.orders.total}</div>
            <div className="text-sm text-gray-600">Total Orders</div>
          </div>
          
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">{dashboardData.orders.pending}</div>
            <div className="text-sm text-gray-600">Pending Orders</div>
          </div>
        </div>
      </div>
    </div>
  );
}