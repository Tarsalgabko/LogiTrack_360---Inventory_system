import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Warehouse as WarehouseIcon, 
  Grid3X3, 
  BarChart3, 
  MapPin,
  Plus,
  Edit,
  Eye
} from 'lucide-react';
import { WarehouseScene } from '../components/3D/WarehouseScene';
import { AddZoneModal } from '../components/Modals/AddZoneModal';

interface Zone {
  id: string;
  name: string;
  description: string;
  capacity: number;
  utilized: number;
  racks: number;
  temperature?: string;
  type: 'storage' | 'picking' | 'receiving' | 'dispatch';
}

interface Rack {
  id: string;
  zoneId: string;
  name: string;
  levels: number;
  bins: number;
  utilization: number;
  capacity: number;
  items: number;
}

const mockZones: Zone[] = [
  {
    id: '1',
    name: 'Zone A - Electronics',
    description: 'High-value electronics storage',
    capacity: 1000,
    utilized: 850,
    racks: 12,
    temperature: '18-22°C',
    type: 'storage'
  },
  {
    id: '2',
    name: 'Zone B - Accessories',
    description: 'Small accessories and peripherals',
    capacity: 500,
    utilized: 275,
    racks: 8,
    type: 'storage'
  },
  {
    id: '3',
    name: 'Zone C - Furniture',
    description: 'Large furniture items',
    capacity: 200,
    utilized: 30,
    racks: 4,
    type: 'storage'
  },
  {
    id: '4',
    name: 'Receiving Dock',
    description: 'Incoming shipment processing',
    capacity: 100,
    utilized: 45,
    racks: 0,
    type: 'receiving'
  }
];

const mockRacks: Rack[] = [
  { id: 'A1', zoneId: '1', name: 'Rack A1', levels: 4, bins: 20, utilization: 85, capacity: 80, items: 68 },
  { id: 'A2', zoneId: '1', name: 'Rack A2', levels: 4, bins: 20, utilization: 65, capacity: 80, items: 52 },
  { id: 'A3', zoneId: '1', name: 'Rack A3', levels: 4, bins: 20, utilization: 45, capacity: 80, items: 36 },
  { id: 'B1', zoneId: '2', name: 'Rack B1', levels: 3, bins: 15, utilization: 75, capacity: 45, items: 34 },
  { id: 'B2', zoneId: '2', name: 'Rack B2', levels: 3, bins: 15, utilization: 55, capacity: 45, items: 25 },
  { id: 'C1', zoneId: '3', name: 'Rack C1', levels: 2, bins: 10, utilization: 95, capacity: 20, items: 19 },
];

export const Warehouse: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'overview' | 'zones' | 'racks'>('overview');
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [isAddZoneModalOpen, setIsAddZoneModalOpen] = useState(false);
  const [zones, setZones] = useState<Zone[]>(mockZones);

  const handleRackClick = (rackId: string) => {
    console.log('Clicked rack:', rackId);
    // Show rack details or navigate to rack management
  };

  const handleAddZone = (newZone: Omit<Zone, 'id'>) => {
    const zone: Zone = {
      ...newZone,
      id: Date.now().toString(),
      utilized: 0,
      racks: 0,
    };
    setZones([...zones, zone]);
  };

  const getZoneTypeColor = (type: Zone['type']) => {
    switch (type) {
      case 'storage':
        return 'bg-blue-100 text-blue-800';
      case 'picking':
        return 'bg-green-100 text-green-800';
      case 'receiving':
        return 'bg-yellow-100 text-yellow-800';
      case 'dispatch':
        return 'bg-red-100 text-red-800';
    }
  };

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 80) return 'text-red-600';
    if (utilization >= 60) return 'text-yellow-600';
    return 'text-green-600';
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
            <WarehouseIcon className="h-8 w-8 mr-3 text-violet" />
            {t('warehouse.title')}
          </h1>
          <p className="text-gray-600 mt-1">Manage warehouse layout and capacity</p>
        </div>
        <button 
          onClick={() => setIsAddZoneModalOpen(true)}
          className="bg-violet hover:bg-violet/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Zone</span>
        </button>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex space-x-6 border-b">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'zones', label: t('warehouse.zones'), icon: Grid3X3 },
            { id: 'racks', label: t('warehouse.racks'), icon: MapPin },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-violet text-violet'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* 3D Warehouse Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">3D Warehouse Layout</h2>
            <div className="bg-gray-50 rounded-lg">
              <WarehouseScene onRackClick={handleRackClick} />
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-violet mb-2">{zones.length}</div>
              <div className="text-sm text-gray-600">Total Zones</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">24</div>
              <div className="text-sm text-gray-600">Active Racks</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">1,800</div>
              <div className="text-sm text-gray-600">Total Capacity</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">67%</div>
              <div className="text-sm text-gray-600">Overall Utilization</div>
            </div>
          </motion.div>
        </div>
      )}

      {activeTab === 'zones' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {zones.map((zone, index) => (
            <motion.div
              key={zone.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{zone.name}</h3>
                  <p className="text-sm text-gray-600">{zone.description}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getZoneTypeColor(zone.type)}`}>
                  {zone.type}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Capacity</span>
                  <span className="font-medium">{zone.capacity} items</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Utilized</span>
                  <span className={`font-medium ${getUtilizationColor((zone.utilized / zone.capacity) * 100)}`}>
                    {zone.utilized} ({Math.round((zone.utilized / zone.capacity) * 100)}%)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Racks</span>
                  <span className="font-medium">{zone.racks}</span>
                </div>
                {zone.temperature && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Temperature</span>
                    <span className="font-medium">{zone.temperature}</span>
                  </div>
                )}
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div
                  className={`h-3 rounded-full ${
                    (zone.utilized / zone.capacity) >= 0.8
                      ? 'bg-red-500'
                      : (zone.utilized / zone.capacity) >= 0.6
                      ? 'bg-yellow-500'
                      : 'bg-green-500'
                  }`}
                  style={{ width: `${(zone.utilized / zone.capacity) * 100}%` }}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button className="p-2 text-gray-600 hover:text-violet hover:bg-violet/10 rounded-lg transition-colors duration-200">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                  <Edit className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {activeTab === 'racks' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rack ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Zone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Levels</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bins</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Utilization</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockRacks.map((rack, index) => (
                  <motion.tr
                    key={rack.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{rack.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">
                        {zones.find(z => z.id === rack.zoneId)?.name.split(' - ')[0]}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {rack.levels}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {rack.bins}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className={`h-2 rounded-full ${
                              rack.utilization >= 80
                                ? 'bg-red-500'
                                : rack.utilization >= 60
                                ? 'bg-yellow-500'
                                : 'bg-green-500'
                            }`}
                            style={{ width: `${rack.utilization}%` }}
                          />
                        </div>
                        <span className={`text-sm font-medium ${getUtilizationColor(rack.utilization)}`}>
                          {rack.utilization}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {rack.items}/{rack.capacity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button className="p-1 text-gray-600 hover:text-violet hover:bg-violet/10 rounded">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded">
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Add Zone Modal */}
      <AddZoneModal
        isOpen={isAddZoneModalOpen}
        onClose={() => setIsAddZoneModalOpen(false)}
        onAddZone={handleAddZone}
      />
    </div>
  );
};