import React from 'react';
import { motion } from 'framer-motion';
import { X, Bell, AlertTriangle, Package, CheckCircle, Clock, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Notification {
  id: string;
  type: 'alert' | 'task' | 'inventory' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  actionUrl?: string;
}

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'alert',
    title: 'Low Stock Alert',
    message: 'Wireless Mouse (SKU-002) is running low. Only 3 items remaining.',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    read: false,
    priority: 'high',
    actionUrl: '/inventory'
  },
  {
    id: '2',
    type: 'task',
    title: 'Task Assigned',
    message: 'New picking task assigned: Pick Items for Order #12347',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    read: false,
    priority: 'medium',
    actionUrl: '/tasks'
  },
  {
    id: '3',
    type: 'inventory',
    title: 'Stock Received',
    message: 'New shipment of Dell Laptops (SKU-001) has been received and processed.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: true,
    priority: 'low',
    actionUrl: '/inventory'
  },
  {
    id: '4',
    type: 'system',
    title: 'System Maintenance',
    message: 'Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM.',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    read: true,
    priority: 'medium'
  },
  {
    id: '5',
    type: 'task',
    title: 'Task Completed',
    message: 'Putaway task for Zone A has been completed successfully.',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    read: true,
    priority: 'low',
    actionUrl: '/tasks'
  }
];

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'alert':
      return <AlertTriangle className="h-5 w-5" />;
    case 'task':
      return <CheckCircle className="h-5 w-5" />;
    case 'inventory':
      return <Package className="h-5 w-5" />;
    case 'system':
      return <Bell className="h-5 w-5" />;
    default:
      return <Bell className="h-5 w-5" />;
  }
};

const getNotificationColor = (type: Notification['type'], priority: Notification['priority']) => {
  if (priority === 'high') return 'bg-red-100 text-red-600';
  
  switch (type) {
    case 'alert':
      return 'bg-yellow-100 text-yellow-600';
    case 'task':
      return 'bg-blue-100 text-blue-600';
    case 'inventory':
      return 'bg-green-100 text-green-600';
    case 'system':
      return 'bg-violet/10 text-violet';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

const getPriorityBadge = (priority: Notification['priority']) => {
  const colors = {
    low: 'bg-gray-100 text-gray-800',
    medium: 'bg-blue-100 text-blue-800',
    high: 'bg-red-100 text-red-800'
  };
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[priority]}`}>
      {priority}
    </span>
  );
};

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ isOpen, onClose }) => {
  const unreadCount = mockNotifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-navy to-violet text-white">
          <div className="flex items-center space-x-3">
            <Bell className="h-6 w-6" />
            <div>
              <h2 className="text-xl font-semibold">Notifications</h2>
              <p className="text-sm text-white/80">{unreadCount} unread notifications</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {mockNotifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications</h3>
              <p className="text-gray-600">You're all caught up!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {mockNotifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 hover:bg-gray-50 transition-colors duration-200 cursor-pointer ${
                    !notification.read ? 'bg-blue-50/50' : ''
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-lg ${getNotificationColor(notification.type, notification.priority)}`}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                          {notification.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          {getPriorityBadge(notification.priority)}
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">
                        {notification.message}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          <span>{formatDistanceToNow(notification.timestamp, { addSuffix: true })}</span>
                        </div>
                        
                        {notification.actionUrl && (
                          <button className="text-xs text-violet hover:text-violet/80 font-medium">
                            View Details →
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t bg-gray-50 flex justify-between items-center">
          <button className="text-sm text-gray-600 hover:text-gray-900">
            Mark all as read
          </button>
          <button className="text-sm text-violet hover:text-violet/80 font-medium">
            View all notifications
          </button>
        </div>
      </motion.div>
    </div>
  );
};