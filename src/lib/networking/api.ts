const ApiEndPoint = {
  LOGIN: "/auth",
  REFRESHTOKEN: "/auth/refresh-token",
  SENDCODEEMAIL: "/user/forgot-password",
  NEWPASSWORD: "user/reset-password",
  ALLIMPORTORDER: "/api/manage-import-orders/getallImportOrder",
  ALLDETAILIMPORTORDER: "/api/manage-import-orders/allDetails",
  
  // Dashboard API endpoints
  IMPORT_CHART: "/api/dashboard/import-chart",
  EXPORT_CHART: "/api/dashboard/export-chart",
  SUMMARY_CHART: "/api/dashboard/summary-chart",
  SKU_TYPE_RATIO: "/api/dashboard/sku-type-ratio",
  OPTIMIZATION_INDEX: "/api/dashboard/optimization-index",
  STORAGE_STATUS: "/api/dashboard/storage-status",
  WAREHOUSE_SUMMARY_PDF: "/api/dashboard/warehouse-summary-pdf",
};
export default ApiEndPoint;
