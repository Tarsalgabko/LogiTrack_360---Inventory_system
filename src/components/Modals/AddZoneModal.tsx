import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Save, Grid3X3 } from 'lucide-react';

interface Zone {
  id: string;
  name: string;
  description: string;
  capacity: number;
  temperature?: string;
  type: 'storage' | 'picking' | 'receiving' | 'dispatch';
}

interface AddZoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddZone: (zone: Omit<Zone, 'id'>) => void;
}

export const AddZoneModal: React.FC<AddZoneModalProps> = ({ isOpen, onClose, onAddZone }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    capacity: 100,
    temperature: '',
    type: 'storage' as Zone['type'],
    racks: 1,
    levels: 4,
    binsPerLevel: 10,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onAddZone({
      name: formData.name,
      description: formData.description,
      capacity: formData.capacity,
      temperature: formData.temperature || undefined,
      type: formData.type,
    });

    // Reset form
    setFormData({
      name: '',
      description: '',
      capacity: 100,
      temperature: '',
      type: 'storage',
      racks: 1,
      levels: 4,
      binsPerLevel: 10,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <Grid3X3 className="h-6 w-6 mr-2 text-violet" />
            Add New Zone
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Zone Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet focus:border-transparent"
                placeholder="e.g., Zone A - Electronics"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Zone Type *</label>
              <select
                required
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as Zone['type'] })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet focus:border-transparent"
              >
                <option value="storage">Storage</option>
                <option value="picking">Picking</option>
                <option value="receiving">Receiving</option>
                <option value="dispatch">Dispatch</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet focus:border-transparent"
              rows={3}
              placeholder="Zone description and purpose"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Capacity *</label>
              <input
                type="number"
                required
                min="1"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 100 })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet focus:border-transparent"
                placeholder="Total items capacity"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of Racks</label>
              <input
                type="number"
                min="1"
                max="20"
                value={formData.racks}
                onChange={(e) => setFormData({ ...formData, racks: parseInt(e.target.value) || 1 })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Levels per Rack</label>
              <input
                type="number"
                min="1"
                max="10"
                value={formData.levels}
                onChange={(e) => setFormData({ ...formData, levels: parseInt(e.target.value) || 4 })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Temperature Control</label>
              <input
                type="text"
                value={formData.temperature}
                onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet focus:border-transparent"
                placeholder="e.g., 18-22°C"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bins per Level</label>
              <input
                type="number"
                min="1"
                max="50"
                value={formData.binsPerLevel}
                onChange={(e) => setFormData({ ...formData, binsPerLevel: parseInt(e.target.value) || 10 })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet focus:border-transparent"
              />
            </div>
          </div>

          {/* Zone Preview */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Zone Preview:</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <div>Total Storage Locations: {formData.racks * formData.levels * formData.binsPerLevel}</div>
              <div>Estimated Capacity: {formData.capacity} items</div>
              <div>Average Items per Location: {Math.round(formData.capacity / (formData.racks * formData.levels * formData.binsPerLevel))}</div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-violet text-white rounded-lg hover:bg-violet/90 transition-colors duration-200 flex items-center space-x-2"
            >
              <Save className="h-5 w-5" />
              <span>Create Zone</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};