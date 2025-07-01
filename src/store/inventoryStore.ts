import { create } from 'zustand';

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  description: string;
  quantity: number;
  minQuantity: number;
  price: number;
  currency: string;
  location: {
    zone: string;
    rack: string;
    level: number;
    bin: string;
  };
  image?: string;
  lastUpdated: Date;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  category: string;
  supplier: string;
  batchNumber?: string;
  expiryDate?: Date;
}

interface InventoryState {
  items: InventoryItem[];
  selectedItem: InventoryItem | null;
  loading: boolean;
  searchTerm: string;
  filterCategory: string;
  filterStatus: string;
  fetchItems: () => Promise<void>;
  addItem: (item: Omit<InventoryItem, 'id' | 'lastUpdated'>) => void;
  updateItem: (id: string, item: Partial<InventoryItem>) => void;
  deleteItem: (id: string) => void;
  setSelectedItem: (item: InventoryItem | null) => void;
  setSearchTerm: (term: string) => void;
  setFilterCategory: (category: string) => void;
  setFilterStatus: (status: string) => void;
  getFilteredItems: () => InventoryItem[];
}

// Mock data
const mockItems: InventoryItem[] = [
  {
    id: '1',
    sku: 'SKU-001',
    name: 'Laptop Dell XPS 13',
    description: 'High-performance laptop for business use',
    quantity: 15,
    minQuantity: 5,
    price: 1299.99,
    currency: 'EUR',
    location: { zone: 'A', rack: 'A1', level: 2, bin: 'A1-2-03' },
    lastUpdated: new Date('2024-01-15'),
    status: 'in-stock',
    category: 'Electronics',
    supplier: 'Dell Inc.',
    image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: '2',
    sku: 'SKU-002',
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with USB receiver',
    quantity: 3,
    minQuantity: 10,
    price: 29.99,
    currency: 'EUR',
    location: { zone: 'B', rack: 'B2', level: 1, bin: 'B2-1-05' },
    lastUpdated: new Date('2024-01-14'),
    status: 'low-stock',
    category: 'Accessories',
    supplier: 'Logitech',
    image: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: '3',
    sku: 'SKU-003',
    name: 'Office Chair',
    description: 'Ergonomic office chair with lumbar support',
    quantity: 0,
    minQuantity: 2,
    price: 199.99,
    currency: 'EUR',
    location: { zone: 'C', rack: 'C1', level: 1, bin: 'C1-1-01' },
    lastUpdated: new Date('2024-01-13'),
    status: 'out-of-stock',
    category: 'Furniture',
    supplier: 'Herman Miller',
    image: 'https://images.pexels.com/photos/586147/pexels-photo-586147.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: '4',
    sku: 'SKU-004',
    name: 'Monitor 27" 4K',
    description: '27-inch 4K UHD monitor with HDR support',
    quantity: 8,
    minQuantity: 3,
    price: 399.99,
    currency: 'EUR',
    location: { zone: 'A', rack: 'A2', level: 3, bin: 'A2-3-02' },
    lastUpdated: new Date('2024-01-16'),
    status: 'in-stock',
    category: 'Electronics',
    supplier: 'Samsung',
    image: 'https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
];

export const useInventoryStore = create<InventoryState>((set, get) => ({
  items: mockItems,
  selectedItem: null,
  loading: false,
  searchTerm: '',
  filterCategory: '',
  filterStatus: '',
  
  fetchItems: async () => {
    set({ loading: true });
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    set({ loading: false });
  },

  addItem: (item) => {
    const newItem: InventoryItem = {
      ...item,
      id: Date.now().toString(),
      lastUpdated: new Date(),
    };
    set(state => ({ items: [...state.items, newItem] }));
  },

  updateItem: (id, updatedItem) => {
    set(state => ({
      items: state.items.map(item =>
        item.id === id
          ? { ...item, ...updatedItem, lastUpdated: new Date() }
          : item
      )
    }));
  },

  deleteItem: (id) => {
    set(state => ({
      items: state.items.filter(item => item.id !== id)
    }));
  },

  setSelectedItem: (item) => set({ selectedItem: item }),
  setSearchTerm: (term) => set({ searchTerm: term }),
  setFilterCategory: (category) => set({ filterCategory: category }),
  setFilterStatus: (status) => set({ filterStatus: status }),

  getFilteredItems: () => {
    const { items, searchTerm, filterCategory, filterStatus } = get();
    return items.filter(item => {
      const matchesSearch = searchTerm === '' || 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${item.location.zone}${item.location.rack}`.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = filterCategory === '' || item.category === filterCategory;
      const matchesStatus = filterStatus === '' || item.status === filterStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  },
}));