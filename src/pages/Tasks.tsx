import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  ClipboardList, 
  Plus, 
  Clock, 
  User, 
  Package,
  Truck,
  ArrowUpDown,
  CheckCircle,
  Play,
  Pause
} from 'lucide-react';
import { useTasksStore, Task, TaskType, TaskStatus, TaskPriority } from '../store/tasksStore';
import { useAuthStore } from '../store/authStore';
import { AddTaskModal } from '../components/Modals/AddTaskModal';

export const Tasks: React.FC = () => {
  const { t } = useTranslation();
  const { tasks, completeTask, updateTask } = useTasksStore();
  const { user } = useAuthStore();
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus | 'all'>('all');
  const [selectedType, setSelectedType] = useState<TaskType | 'all'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredTasks = tasks.filter(task => {
    const statusMatch = selectedStatus === 'all' || task.status === selectedStatus;
    const typeMatch = selectedType === 'all' || task.type === selectedType;
    return statusMatch && typeMatch;
  });

  const getTaskTypeIcon = (type: TaskType) => {
    switch (type) {
      case 'receive':
        return <Truck className="h-5 w-5" />;
      case 'putaway':
        return <Package className="h-5 w-5" />;
      case 'pick':
        return <Package className="h-5 w-5" />;
      case 'move':
        return <ArrowUpDown className="h-5 w-5" />;
      case 'dispatch':
        return <Truck className="h-5 w-5" />;
    }
  };

  const getTaskTypeColor = (type: TaskType) => {
    switch (type) {
      case 'receive':
        return 'bg-blue-100 text-blue-800';
      case 'putaway':
        return 'bg-green-100 text-green-800';
      case 'pick':
        return 'bg-violet/10 text-violet';
      case 'move':
        return 'bg-yellow-100 text-yellow-800';
      case 'dispatch':
        return 'bg-red-100 text-red-800';
    }
  };

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case 'low':
        return 'bg-gray-100 text-gray-800';
      case 'medium':
        return 'bg-blue-100 text-blue-800';
      case 'high':
        return 'bg-yellow-100 text-yellow-800';
      case 'urgent':
        return 'bg-red-100 text-red-800';
    }
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
    }
  };

  const handleTaskAction = (task: Task) => {
    if (task.status === 'pending') {
      updateTask(task.id, { status: 'in-progress' });
    } else if (task.status === 'in-progress') {
      completeTask(task.id);
    }
  };

  const getActionButton = (task: Task) => {
    if (task.status === 'pending') {
      return (
        <button
          onClick={() => handleTaskAction(task)}
          className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          <Play className="h-4 w-4" />
          <span>Start</span>
        </button>
      );
    } else if (task.status === 'in-progress') {
      return (
        <button
          onClick={() => handleTaskAction(task)}
          className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          <CheckCircle className="h-4 w-4" />
          <span>Complete</span>
        </button>
      );
    }
    return null;
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
            <ClipboardList className="h-8 w-8 mr-3 text-violet" />
            {t('tasks.title')}
          </h1>
          <p className="text-gray-600 mt-1">Manage warehouse operations</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-violet hover:bg-violet/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Task</span>
        </button>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as TaskStatus | 'all')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="pending">{t('tasks.pending')}</option>
              <option value="in-progress">{t('tasks.inProgress')}</option>
              <option value="completed">{t('tasks.completed')}</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as TaskType | 'all')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="receive">{t('tasks.receive')}</option>
              <option value="putaway">{t('tasks.putaway')}</option>
              <option value="pick">{t('tasks.pick')}</option>
              <option value="move">{t('tasks.move')}</option>
              <option value="dispatch">{t('tasks.dispatch')}</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            {/* Task Header */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${getTaskTypeColor(task.type)}`}>
                  {getTaskTypeIcon(task.type)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{task.title}</h3>
                  <p className="text-sm text-gray-600">{task.description}</p>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                  {task.status}
                </span>
              </div>
            </div>

            {/* Task Details */}
            <div className="space-y-3 mb-4">
              {/* Assigned User */}
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  Assigned to: <span className="font-medium">Worker User</span>
                </span>
              </div>

              {/* Due Date */}
              {task.dueDate && (
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Due: {task.dueDate.toLocaleDateString()} {task.dueDate.toLocaleTimeString()}
                  </span>
                </div>
              )}

              {/* Estimated Time */}
              {task.estimatedTime && (
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Estimated: {task.estimatedTime} minutes
                  </span>
                </div>
              )}
            </div>

            {/* Items */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Items:</h4>
              <div className="space-y-2">
                {task.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                    <div>
                      <div className="font-medium text-sm">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.sku}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-sm">Qty: {item.quantity}</div>
                      {item.location && (
                        <div className="text-xs text-gray-500">
                          {item.location.from && `From: ${item.location.from}`}
                          {item.location.to && `To: ${item.location.to}`}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            {task.instructions && (
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <h4 className="text-sm font-medium text-blue-800 mb-1">Instructions:</h4>
                <p className="text-sm text-blue-700">{task.instructions}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-between items-center">
              <div className="text-xs text-gray-500">
                Created: {task.createdAt.toLocaleDateString()}
              </div>
              {getActionButton(task)}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTasks.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <ClipboardList className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No tasks found</h3>
          <p className="text-gray-600">Try adjusting your filter criteria</p>
        </motion.div>
      )}

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};