import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Save, Clock, User, Package } from 'lucide-react';
import { useTasksStore, TaskType, TaskPriority } from '../../store/tasksStore';
import { useInventoryStore } from '../../store/inventoryStore';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose }) => {
  const { addTask } = useTasksStore();
  const { items } = useInventoryStore();
  const [formData, setFormData] = useState({
    type: 'pick' as TaskType,
    title: '',
    description: '',
    priority: 'medium' as TaskPriority,
    assignedTo: '3', // Default to worker
    dueDate: '',
    dueTime: '',
    estimatedTime: 30,
    instructions: '',
    selectedItems: [] as { sku: string; name: string; quantity: number; location?: { from?: string; to?: string } }[],
  });

  const [newItem, setNewItem] = useState({
    sku: '',
    quantity: 1,
    locationFrom: '',
    locationTo: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const dueDate = formData.dueDate && formData.dueTime 
      ? new Date(`${formData.dueDate}T${formData.dueTime}`)
      : undefined;

    addTask({
      type: formData.type,
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      status: 'pending',
      assignedTo: formData.assignedTo,
      dueDate,
      items: formData.selectedItems,
      instructions: formData.instructions,
      estimatedTime: formData.estimatedTime,
    });

    // Reset form
    setFormData({
      type: 'pick',
      title: '',
      description: '',
      priority: 'medium',
      assignedTo: '3',
      dueDate: '',
      dueTime: '',
      estimatedTime: 30,
      instructions: '',
      selectedItems: [],
    });
    setNewItem({ sku: '', quantity: 1, locationFrom: '', locationTo: '' });
    onClose();
  };

  const addItemToTask = () => {
    const item = items.find(i => i.sku === newItem.sku);
    if (item && newItem.sku) {
      const taskItem = {
        sku: item.sku,
        name: item.name,
        quantity: newItem.quantity,
        location: {
          from: newItem.locationFrom || `${item.location.zone}${item.location.rack}-${item.location.level}-${item.location.bin}`,
          to: newItem.locationTo || undefined,
        },
      };
      setFormData({
        ...formData,
        selectedItems: [...formData.selectedItems, taskItem],
      });
      setNewItem({ sku: '', quantity: 1, locationFrom: '', locationTo: '' });
    }
  };

  const removeItemFromTask = (index: number) => {
    setFormData({
      ...formData,
      selectedItems: formData.selectedItems.filter((_, i) => i !== index),
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Add New Task</h2>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Task Type *</label>
              <select
                required
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as TaskType })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet focus:border-transparent"
              >
                <option value="receive">Receive</option>
                <option value="putaway">Put Away</option>
                <option value="pick">Pick</option>
                <option value="move">Move</option>
                <option value="dispatch">Dispatch</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority *</label>
              <select
                required
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as TaskPriority })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet focus:border-transparent"
              placeholder="Task title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet focus:border-transparent"
              rows={3}
              placeholder="Task description"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Due Time</label>
              <input
                type="time"
                value={formData.dueTime}
                onChange={(e) => setFormData({ ...formData, dueTime: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Time (min)</label>
              <input
                type="number"
                min="1"
                value={formData.estimatedTime}
                onChange={(e) => setFormData({ ...formData, estimatedTime: parseInt(e.target.value) || 30 })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Instructions</label>
            <textarea
              value={formData.instructions}
              onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet focus:border-transparent"
              rows={2}
              placeholder="Special instructions for this task"
            />
          </div>

          {/* Add Items Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Task Items</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                  <select
                    value={newItem.sku}
                    onChange={(e) => setNewItem({ ...newItem, sku: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet focus:border-transparent"
                  >
                    <option value="">Select SKU</option>
                    {items.map(item => (
                      <option key={item.id} value={item.sku}>{item.sku} - {item.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">From Location</label>
                  <input
                    type="text"
                    value={newItem.locationFrom}
                    onChange={(e) => setNewItem({ ...newItem, locationFrom: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet focus:border-transparent"
                    placeholder="A1-2-03"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">To Location</label>
                  <input
                    type="text"
                    value={newItem.locationTo}
                    onChange={(e) => setNewItem({ ...newItem, locationTo: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet focus:border-transparent"
                    placeholder="B2-1-05"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={addItemToTask}
                    disabled={!newItem.sku}
                    className="w-full bg-violet hover:bg-violet/90 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    Add Item
                  </button>
                </div>
              </div>

              {/* Selected Items List */}
              {formData.selectedItems.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">Selected Items:</h4>
                  {formData.selectedItems.map((item, index) => (
                    <div key={index} className="flex justify-between items-center bg-white p-3 rounded-lg border">
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <span className="text-gray-500 ml-2">({item.sku})</span>
                        <span className="text-gray-500 ml-2">Qty: {item.quantity}</span>
                        {item.location?.from && (
                          <span className="text-gray-500 ml-2">From: {item.location.from}</span>
                        )}
                        {item.location?.to && (
                          <span className="text-gray-500 ml-2">To: {item.location.to}</span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItemFromTask(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
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
              <span>Create Task</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};