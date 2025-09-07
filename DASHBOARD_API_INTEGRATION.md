# Dashboard API Integration

This document explains how to use the dashboard API integration with your backend.

## Overview

The dashboard integrates with the following backend endpoints:

1. **Import Chart** (`POST /api/dashboard/import-chart`) - WMS-04
2. **Export Chart** (`POST /api/dashboard/export-chart`) - WMS-05
3. **Summary Chart** (`POST /api/dashboard/summary-chart`) - WMS-06
4. **SKU Type Ratio** (`GET /api/dashboard/sku-type-ratio`) - WMS-07
5. **Optimization Index** (`POST /api/dashboard/optimization-index`) - WMS-09
6. **Storage Status** (`POST /api/dashboard/storage-status`) - WMS-10
7. **Warehouse PDF Report** (`POST /api/dashboard/warehouse-summary-pdf`) - WMS-12

## Files Structure

```
src/
├── lib/
│   ├── networking/
│   │   ├── api.ts                     # API endpoints configuration
│   │   ├── axious.ts                  # Axios configuration with interceptors
│   │   └── client/
│   │       └── dashboard/
│   │           └── service.ts         # Dashboard API service functions
│   └── types/
│       └── dashboard.types.ts         # TypeScript types for requests/responses
├── hooks/
│   └── dashboard/
│       └── useDashboardData.ts        # Custom hook for dashboard data management
├── services/
│   └── dashboard.service.ts           # Utility functions for dashboard operations
└── app/(auth)/(dashboard)/
    ├── page.tsx                       # Dashboard page component
    └── components/
        ├── dashboard-client.tsx       # Main dashboard component
        ├── chart-pie-interactive.tsx  # Pie chart component
        └── chart-bar-stacked.tsx      # Bar chart component
```

## Usage

### 1. Using the Custom Hook

```tsx
import { useDashboardData } from "@/hooks/dashboard/useDashboardData";

const MyComponent = () => {
  const {
    // Data
    importChartData,
    exportChartData,
    summaryChartData,
    skuTypeRatioData,
    
    // Loading states
    isLoadingImportChart,
    isLoadingExportChart,
    
    // Error states  
    importChartError,
    exportChartError,
    
    // Functions to fetch data
    fetchImportChart,
    fetchExportChart,
    fetchSummaryChart,
    fetchSkuTypeRatio,
    
    // Utility functions for chart formatting
    formatImportDataForPieChart,
    formatExportDataForPieChart,
  } = useDashboardData();

  // Fetch data
  useEffect(() => {
    const dateRange = { 
      startDate: "2024-01-01", 
      endDate: "2024-12-31" 
    };
    
    fetchImportChart({ ...dateRange, warehouseId: 1 });
    fetchExportChart({ ...dateRange, warehouseId: 1 });
    fetchSummaryChart({ ...dateRange, type: "daily" });
    fetchSkuTypeRatio();
  }, []);

  return (
    <div>
      {isLoadingImportChart && <div>Loading...</div>}
      {importChartError && <div>Error: {importChartError}</div>}
      
      {/* Use formatted data in charts */}
      <PieChart data={formatImportDataForPieChart()} />
    </div>
  );
};
```

### 2. Direct API Usage

```tsx
import { dashboardApi } from "@/lib/networking/client/dashboard/service";

// Direct API calls
const fetchData = async () => {
  try {
    const importData = await dashboardApi.getImportChart({
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      warehouseId: 1
    });
    
    const exportData = await dashboardApi.getExportChart({
      startDate: "2024-01-01", 
      endDate: "2024-12-31",
      warehouseId: 1
    });
    
    const skuRatio = await dashboardApi.getSkuTypeRatio();
    
    console.log({ importData, exportData, skuRatio });
  } catch (error) {
    console.error("API Error:", error);
  }
};
```

### 3. Using Dashboard Service Utilities

```tsx
import { dashboardService } from "@/services/dashboard.service";

// Get common date ranges
const last30Days = dashboardService.getLastNDaysDateRange(30);
const currentMonth = dashboardService.getCurrentMonthDateRange();
const lastMonth = dashboardService.getLastMonthDateRange();

// Create request objects
const importRequest = dashboardService.createImportChartRequest(last30Days, 1);
const exportRequest = dashboardService.createExportChartRequest(currentMonth, 2);
const summaryRequest = dashboardService.createSummaryChartRequest(lastMonth, "monthly");
```

### 4. PDF Export

```tsx
const { exportWarehousePdf } = useDashboardData();

const handleExportPdf = async () => {
  await exportWarehousePdf({ warehouseId: 1 });
  // PDF will automatically download
};
```

## Data Types

### Request Types
```typescript
interface ImportChartRequest {
  warehouseId?: number;
  startDate: string; // yyyy-MM-dd
  endDate: string;   // yyyy-MM-dd
}

interface ExportChartRequest {
  warehouseId?: number;
  startDate: string; // yyyy-MM-dd
  endDate: string;   // yyyy-MM-dd
}

interface SummaryChartRequest {
  startDate: string;  // yyyy-MM-dd
  endDate: string;    // yyyy-MM-dd
  type: "daily" | "monthly";
}

interface OptimizationIndexRequest {
  startDate: string;
  endDate: string;
  warehouseId?: number;
}

interface StorageStatusRequest {
  warehouseId?: number;
}
```

### Response Types
```typescript
interface ImportChartResponse {
  importDate: string;    // yyyy-MM-dd
  totalItems: number;    // Total quantity imported
  totalOrders: number;   // Total import orders
}

interface ExportChartResponse {
  exportDate: string;
  totalItems: number;
  totalOrders: number;
}

interface SkuTypeRatioChartResponse {
  skuName: string;
  totalQuantity: number;
}

interface OptimizationIndexResponse {
  date: string;
  totalImportOrders: number;
  totalImportItems: number;
  totalExportOrders: number;
  totalExportItems: number;
  optimizationRate: number;
}

interface StorageStatusResponse {
  totalCapacity: number;
  usedCapacity: number;
  availableCapacity: number;
  utilizationRate: number;
}
```

## Environment Variables

Make sure you have the following environment variable set:

```env
NEXT_PUBLIC_API=http://localhost:8080
```

## Authentication

The API service automatically includes the JWT token from localStorage in requests. The token is automatically refreshed when it expires using the refresh token endpoint.

## Error Handling

All API calls include automatic error handling:
- Network errors are caught and displayed
- 401 errors trigger automatic token refresh
- Error messages are stored in the hook's error states

## Component Integration

The dashboard components automatically:
- Show loading states while fetching data
- Display error messages when API calls fail
- Fall back to sample data when no real data is available
- Support internationalization (English/Vietnamese)

## Customization

You can customize the charts by:
1. Modifying the chart configuration in the component files
2. Updating the data formatting functions in the hook
3. Adding new chart types by extending the types and API service
4. Customizing colors and styling in the chart components

## Backend Requirements

Ensure your backend:
1. Returns data in the exact format specified by the response types
2. Supports CORS for your frontend domain
3. Handles the date format (yyyy-MM-dd) correctly
4. Returns appropriate HTTP status codes
5. Includes proper error messages in error responses

## Testing

To test the integration:
1. Start your backend server
2. Verify the API endpoints are accessible
3. Check the browser network tab for API calls
4. Monitor the console for any errors
5. Test with different date ranges and warehouse IDs
