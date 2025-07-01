import React from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  AlertTriangle, 
  User,
  Clock
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ActivityItem {
  id: string;
  type: 'receive' | 'pick' | 'complete' | 'alert';
  message: string;
  user: string;
  timestamp: Date;
  metadata?: {
    sku?: string;
    quantity?: number;
    location?: string;
  };
}

const mockActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'complete',
    message: 'Completed picking task for Order #12345',
    user: 'Worker User',
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    metadata: { sku: 'SKU-002', quantity: 2 }
  },
  {
    id: '2',
    type: 'receive',
    message: 'New shipment received',
    user: 'Admin User',
    timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
    metadata: { sku: 'SKU-001', quantity: 10, location: 'A1-2-03' }
  },
  {
    id: '3',
    type: 'alert',
    message: 'Low stock alert for Wireless Mouse',
    user: 'System',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    metadata: { sku: 'SKU-002', quantity: 3 }
  },
  {
    id: '4',
    type: 'pick',
    message: 'Started picking task for Order #12346',
    user: 'Worker User',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    metadata: { sku: 'SKU-004', quantity: 1 }
  },
  {
    id: '5',
    type: 'complete',
    message: 'Putaway task completed',
    user: 'Worker User',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    metadata: { sku: 'SKU-004', quantity: 5, location: 'A2-3-02' }
  }
];

const getActivityIcon = (type: ActivityItem['type']) => {
  switch (type) {
    case 'receive':
      return <Truck className="h-4 w-4" />;
    case 'pick':
      return <Package className="h-4 w-4" />;
    case 'complete':
      return <CheckCircle className="h-4 w-4" />;
    case 'alert':
      return <AlertTriangle className="h-4 w-4" />;
    default:
      return <Package className="h-4 w-4" />;
  }
};

const getActivityColor = (type: ActivityItem['type']) => {
  switch (type) {
    case 'receive':
      return 'bg-blue-100 text-blue-600';
    case 'pick':
      return 'bg-violet/10 text-violet';
    case 'complete':
      return 'bg-green-100 text-green-600';
    case 'alert':
      return 'bg-yellow-100 text-yellow-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

export const ActivityFeed: React.FC = () => {
  return (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      {mockActivities.map((activity, index) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <div className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
            {getActivityIcon(activity.type)}
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 mb-1">
              {activity.message}
            </p>
            
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <User className="h-3 w-3" />
              <span>{activity.user}</span>
              <Clock className="h-3 w-3 ml-2" />
              <span>{formatDistanceToNow(activity.timestamp, { addSuffix: true })}</span>
            </div>
            
            {activity.metadata && (
              <div className="mt-2 text-xs text-gray-600">
                {activity.metadata.sku && (
                  <span className="inline-block bg-gray-200 px-2 py-1 rounded mr-2">
                    {activity.metadata.sku}
                  </span>
                )}
                {activity.metadata.quantity && (
                  <span className="inline-block bg-gray-200 px-2 py-1 rounded mr-2">
                    Qty: {activity.metadata.quantity}
                  </span>
                )}
                {activity.metadata.location && (
                  <span className="inline-block bg-gray-200 px-2 py-1 rounded">
                    {activity.metadata.location}
                  </span>
                )}
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};