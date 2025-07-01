import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Download, 
  Calendar, 
  Filter,
  TrendingUp,
  Package,
  Clock,
  Users
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { exportToPDF, exportToCSV } from '../utils/exportUtils';

const inventoryData = [
  { month: 'Jan', inStock: 1250, lowStock: 45, outOfStock: 12 },
  { month: 'Feb', inStock: 1380, lowStock: 38, outOfStock: 8 },
  { month: 'Mar', inStock: 1420, lowStock: 42, outOfStock: 15 },
  { month: 'Apr', inStock: 1390, lowStock: 35, outOfStock: 10 },
  { month: 'May', inStock: 1510, lowStock: 28, outOfStock: 7 },
  { month: 'Jun', inStock: 1580, lowStock: 32, outOfStock: 9 },
];

const taskData = [
  { month: 'Jan', completed: 340, pending: 45 },
  { month: 'Feb', completed: 380, pending: 38 },
  { month: 'Mar', completed: 420, pending: 42 },
  { month: 'Apr', completed: 390, pending: 35 },
  { month: 'May', completed: 510, pending: 28 },
  { month: 'Jun', completed: 580, pending: 32 },
];

const utilizationData = [
  { name: 'Zone A', value: 85, color: '#ef4444' },
  { name: 'Zone B', value: 65, color: '#f59e0b' },
  { name: 'Zone C', value: 25, color: '#22c55e' },
  { name: 'Receiving', value: 45, color: '#3b82f6' },
];

const reportData = [
  { metric: 'Total Revenue', value: '€2.4M', change: '+12.5%', period: 'Last Month' },
  { metric: 'Inventory Value', value: '€1.8M', change: '+8.3%', period: 'Last Month' },
  { metric: 'Avg Task Time', value: '2.3h', change: '-5.2%', period: 'Last Month' },
  { metric: 'Active Workers', value: '12', change: '+2', period: 'Last Month' },
];

export const Reports: React.FC = () => {
  const { t } = useTranslation();
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [selectedReport, setSelectedReport] = useState('overview');

  const handleExportPDF = () => {
    exportToPDF(reportData, 'reports-analytics', 'Analytics Report');
  };

  const handleExportCSV = () => {
    exportToCSV(reportData, 'reports-export');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <BarChart3 className="h-8 w-8 mr-3 text-violet" />
            {t('nav.reports')}
          </h1>
          <p className="text-gray-600 mt-1">Analytics and insights for your warehouse</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleExportCSV}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>CSV</span>
          </button>
          <button
            onClick={handleExportPDF}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>PDF</span>
          </button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet focus:border-transparent"
            >
              <option value="overview">Overview</option>
              <option value="inventory">Inventory Analysis</option>
              <option value="tasks">Task Performance</option>
              <option value="utilization">Warehouse Utilization</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet focus:border-transparent"
            >
              <option value="1month">Last Month</option>
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="1year">Last Year</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Revenue</p>
              <p className="text-3xl font-bold">€2.4M</p>
              <p className="text-blue-200 text-sm flex items-center mt-2">
                <TrendingUp className="h-4 w-4 mr-1" />
                +12.5% vs last month
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-400/30 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Inventory Value</p>
              <p className="text-3xl font-bold">€1.8M</p>
              <p className="text-green-200 text-sm flex items-center mt-2">
                <TrendingUp className="h-4 w-4 mr-1" />
                +8.3% vs last month
              </p>
            </div>
            <div className="w-12 h-12 bg-green-400/30 rounded-lg flex items-center justify-center">
              <Package className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-violet to-violet/80 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-violet-100 text-sm">Avg Task Time</p>
              <p className="text-3xl font-bold">2.3h</p>
              <p className="text-violet-200 text-sm flex items-center mt-2">
                <TrendingUp className="h-4 w-4 mr-1" />
                -5.2% vs last month
              </p>
            </div>
            <div className="w-12 h-12 bg-violet-400/30 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm">Active Workers</p>
              <p className="text-3xl font-bold">12</p>
              <p className="text-yellow-200 text-sm flex items-center mt-2">
                <TrendingUp className="h-4 w-4 mr-1" />
                +2 vs last month
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-400/30 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inventory Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Inventory Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={inventoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="inStock" fill="#22c55e" name="In Stock" />
              <Bar dataKey="lowStock" fill="#f59e0b" name="Low Stock" />
              <Bar dataKey="outOfStock" fill="#ef4444" name="Out of Stock" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Task Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Task Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={taskData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="completed" stroke="#8A4AF3" strokeWidth={3} name="Completed" />
              <Line type="monotone" dataKey="pending" stroke="#ef4444" strokeWidth={3} name="Pending" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Warehouse Utilization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Warehouse Utilization by Zone</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={utilizationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {utilizationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Utilization']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            {utilizationData.map((zone, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: zone.color }}
                  />
                  <span className="font-medium text-gray-900">{zone.name}</span>
                </div>
                <span className="text-2xl font-bold" style={{ color: zone.color }}>
                  {zone.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};