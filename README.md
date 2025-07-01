# LogiTrack 360 - Warehouse Management System

![LogiTrack 360](https://img.shields.io/badge/LogiTrack_360-v1.0.0-8A4AF3?style=for-the-badge&logo=warehouse)

A comprehensive, modern warehouse management system with real-time 3D visualization, multi-language support, and advanced analytics. Built with React, TypeScript, and Three.js for production-ready warehouse operations.

## 🌟 Features

### 🔐 Multi-Role Authentication System
- **Admin**: Complete system access, user management, warehouse configuration
- **Manager**: Inventory oversight, KPI monitoring, report generation
- **Worker**: Task management, mobile-friendly interface, barcode scanning ready

### 📦 Advanced Inventory Management
- Real-time stock tracking with SKU, location, and batch management
- Automated low-stock alerts and reorder notifications
- Comprehensive item details with images, pricing, and supplier information
- Advanced filtering and search capabilities
- Bulk import/export functionality (CSV, PDF)

### 🎯 Task Workflow Management
- Complete warehouse operations: Receive → Putaway → Pick → Move → Dispatch
- Priority-based task assignment with due date tracking
- Real-time task status updates and completion tracking
- Mobile-optimized interface for warehouse floor operations

### 🏗️ 3D Warehouse Visualization
- Interactive 3D warehouse layout with real-time rack utilization
- Color-coded zones and racks based on capacity and status
- Click-to-navigate functionality for efficient warehouse management
- Optimized pathfinding visualization for worker guidance

### 📊 Analytics & Reporting
- Real-time KPI dashboard with key performance metrics
- Advanced charts and graphs using Recharts
- Exportable reports in PDF and CSV formats
- Historical data analysis and trend visualization

### 🌐 Multi-Language Support
- English and Slovak language support
- Easy language switching with persistent preferences
- Fully localized interface and content

### 📱 Responsive Design
- Mobile-first approach for warehouse floor operations
- Tablet and desktop optimized layouts
- Touch-friendly interface for scanning and task management

## 🛠️ Technology Stack

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=flat-square&logo=tailwind-css)
![Three.js](https://img.shields.io/badge/Three.js-0.158.0-000000?style=flat-square&logo=three.js)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.16.16-0055FF?style=flat-square&logo=framer)
![React Router](https://img.shields.io/badge/React_Router-6.20.1-CA4245?style=flat-square&logo=react-router)
![Zustand](https://img.shields.io/badge/Zustand-4.4.7-FF6B35?style=flat-square)
![Recharts](https://img.shields.io/badge/Recharts-2.8.0-8884D8?style=flat-square)
![i18next](https://img.shields.io/badge/i18next-23.7.6-26A69A?style=flat-square&logo=i18next)


## 🏗️ Project Structure

```
src/
├── components/           
│   ├── 3D/              
│   │   └── WarehouseScene.tsx
│   ├── Dashboard/       
│   │   ├── ActivityFeed.tsx
│   │   └── KPICard.tsx
│   ├── Layout/          
│   │   ├── Layout.tsx
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── Modals/          
│       ├── AddItemModal.tsx
│       ├── EditItemModal.tsx
│       └── DeleteConfirmModal.tsx
├── pages/               
│   ├── Dashboard.tsx    
│   ├── Inventory.tsx    
│   ├── Tasks.tsx       
│   ├── Warehouse.tsx    
│   ├── Reports.tsx      
│   ├── Settings.tsx     
│   └── Login.tsx        
├── store/               
│   ├── authStore.ts
│   ├── inventoryStore.ts 
│   └── tasksStore.ts    
├── i18n/                
│   ├── index.ts
│   └── locales/
│       ├── en.json      
│       └── sk.json      
├── utils/               
│   └── exportUtils.ts   
└── App.tsx              
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/logitrack-360.git
   cd logitrack-360
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

### Demo Accounts

The application includes demo accounts for testing different user roles:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@logitrack.com | password |
| Manager | manager@logitrack.com | password |
| Worker | worker@logitrack.com | password |

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_APP_NAME=LogiTrack 360
VITE_APP_VERSION=1.0.0
VITE_DEFAULT_LANGUAGE=en
```

### Customization
- **Colors**: Modify `tailwind.config.js` for custom color schemes
- **Languages**: Add new language files in `src/i18n/locales/`
- **3D Models**: Extend `WarehouseScene.tsx` for custom warehouse layouts

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**LogiTrack 360** - Transforming warehouse management with modern technology and intuitive design.

![Footer](https://img.shields.io/badge/Made_with-❤️_and_TypeScript-8A4AF3?style=for-the-badge)