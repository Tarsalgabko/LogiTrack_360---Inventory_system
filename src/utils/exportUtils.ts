import jsPDF from 'jspdf';
import 'jspdf-autotable';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export const exportToPDF = (data: any[], filename: string, title: string) => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(20);
  doc.text(title, 20, 20);
  
  // Add date
  doc.setFontSize(12);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 35);
  
  // Prepare table data based on data type
  let columns: string[] = [];
  let rows: any[][] = [];
  
  if (filename.includes('inventory')) {
    columns = ['SKU', 'Name', 'Quantity', 'Location', 'Status', 'Price'];
    rows = data.map(item => [
      item.sku,
      item.name,
      item.quantity.toString(),
      `${item.location.zone}${item.location.rack}-${item.location.level}-${item.location.bin}`,
      item.status,
      `€${item.price.toFixed(2)}`
    ]);
  } else if (filename.includes('tasks')) {
    columns = ['ID', 'Title', 'Type', 'Status', 'Priority', 'Created'];
    rows = data.map(task => [
      task.id,
      task.title,
      task.type,
      task.status,
      task.priority,
      task.createdAt.toLocaleDateString()
    ]);
  } else if (filename.includes('reports')) {
    columns = ['Metric', 'Value', 'Change', 'Period'];
    rows = [
      ['Total Revenue', '€2.4M', '+12.5%', 'Last Month'],
      ['Inventory Value', '€1.8M', '+8.3%', 'Last Month'],
      ['Avg Task Time', '2.3h', '-5.2%', 'Last Month'],
      ['Active Workers', '12', '+2', 'Last Month'],
    ];
  }
  
  // Add table
  doc.autoTable({
    head: [columns],
    body: rows,
    startY: 50,
    theme: 'grid',
    headStyles: {
      fillColor: [138, 74, 243], // violet color
      textColor: 255,
      fontStyle: 'bold'
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252]
    },
    margin: { top: 50, left: 20, right: 20 }
  });
  
  // Save the PDF
  doc.save(`${filename}.pdf`);
};

export const exportToCSV = (data: any[], filename: string) => {
  let csvContent = '';
  
  if (filename.includes('inventory')) {
    csvContent = 'SKU,Name,Description,Quantity,Min Quantity,Price,Currency,Location,Status,Category,Supplier,Last Updated\n';
    csvContent += data.map(item => [
      item.sku,
      `"${item.name}"`,
      `"${item.description}"`,
      item.quantity,
      item.minQuantity,
      item.price,
      item.currency,
      `"${item.location.zone}${item.location.rack}-${item.location.level}-${item.location.bin}"`,
      item.status,
      item.category,
      item.supplier,
      item.lastUpdated.toISOString()
    ].join(',')).join('\n');
  } else if (filename.includes('tasks')) {
    csvContent = 'ID,Title,Description,Type,Status,Priority,Assigned To,Created At,Due Date,Completed At\n';
    csvContent += data.map(task => [
      task.id,
      `"${task.title}"`,
      `"${task.description}"`,
      task.type,
      task.status,
      task.priority,
      task.assignedTo,
      task.createdAt.toISOString(),
      task.dueDate ? task.dueDate.toISOString() : '',
      task.completedAt ? task.completedAt.toISOString() : ''
    ].join(',')).join('\n');
  }
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};