import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Package, 
  AlertTriangle, 
  ClipboardCheck, 
  CheckCircle,
  TrendingUp,
  Users,
  Warehouse,
  BarChart3
} from 'lucide-react';
import { KPICard } from '../components/Dashboard/KPICard';
import { ActivityFeed } from '../components/Dashboard/ActivityFeed';
import { WarehouseScene } from '../components/3D/WarehouseScene';
import { useInventoryStore } from '../store/inventoryStore';
import { useTasksStore } from '../store/tasksStore';
import { useAuthStore } from '../store/authStore';

export const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { items } = useInventoryStore();
  const { tasks } = useTasksStore();
  const { user } = useAuthStore();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const lowStockItems = items.filter(item => item.status === 'low-stock').length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;
  const completedTodayTasks = tasks.filter(task => 
    task.status === 'completed' && 
    task.completedAt && 
    new Date(task.completedAt).toDateString() === new Date().toDateString()
  ).length;

  const handleRackClick = (rackId: string) => {
    console.log('Clicked rack:', rackId);
    // Handle rack click - could open a modal or navigate to detailed view
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-navy to-violet rounded-2xl p-8 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {t('dashboard.welcome')}, {user?.name}!
            </h1>
            <p className="text-silver/90 text-lg">
              Here's your warehouse overview for today
            </p>
          </div>
          <div className="hidden lg:flex items-center space-x-4">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
              <Warehouse className="h-12 w-12 text-white" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title={t('dashboard.totalItems')}
          value={totalItems.toLocaleString()}
          icon={Package}
          trend={{ value: 12, isPositive: true }}
          color="blue"
        />
        <KPICard
          title={t('dashboard.lowStock')}
          value={lowStockItems}
          icon={AlertTriangle}
          trend={{ value: -5, isPositive: false }}
          color="yellow"
        />
        <KPICard
          title={t('dashboard.pendingTasks')}
          value={pendingTasks}
          icon={ClipboardCheck}
          trend={{ value: 8, isPositive: false }}
          color="red"
        />
        <KPICard
          title={t('dashboard.completedToday')}
          value={completedTodayTasks}
          icon={CheckCircle}
          trend={{ value: 15, isPositive: true }}
          color="green"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 3D Warehouse Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Warehouse className="h-5 w-5 mr-2 text-violet" />
              {t('dashboard.warehouseOverview')}
            </h2>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Low (&lt;40%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>Medium (40-80%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>High (&gt;80%)</span>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg">
            <WarehouseScene onRackClick={handleRackClick} />
          </div>
        </motion.div>

        {/* Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-violet" />
            {t('dashboard.recentActivity')}
          </h2>
          <ActivityFeed />
        </motion.div>
      </div>

      {/* Additional KPI Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-violet" />
          {t('dashboard.kpiMetrics')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">94.5%</div>
            <div className="text-sm text-gray-600">Warehouse Efficiency</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">2.3 hrs</div>
            <div className="text-sm text-gray-600">Avg. Task Completion</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-violet/10 to-violet/20 rounded-lg">
            <div className="text-3xl font-bold text-violet mb-2">€2.4M</div>
            <div className="text-sm text-gray-600">Inventory Value</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};