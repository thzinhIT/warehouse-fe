const ApiEndPoint = {
  LOGIN: "/auth",
  REFRESHTOKEN: "/auth/refresh-token",
  SENDCODEEMAIL: "/user/forgot-password",
  NEWPASSWORD: "user/reset-password",
  ALLIMPORTORDER: "/api/manage-import-orders/getallImportOrder",
  ALLHISTORYIMPORTORDER: "/api/manage-import-orders/allDetails/merged-sku",
  ALLDETAILIMPORTORDER: "/api/manage-import-orders/allDetails",

  // --- KEEP YOUR EXPORT AND DASHBOARD ENDPOINTS ---
  ALLEXPORTORDER: "/admin/export-orders/getallExportOrder",
  ALLEXPORTORDERDETAILS: "/admin/export-orders/getAllExportOrderDetails",
  EXPORTORDERDETAILBYID: "/admin/export-orders/detail",
  SEARCHEXPORTORDERS: "/admin/export-orders/search",
  EXPORTORDERBOARDDETAILS: "/admin/export-orders/getAllExportOrder/board",
  SKUSTATUSEXPORT: "/admin/export-orders/sku-status",
  MOVETOQUEUE: "/admin/export-orders/multiple/move-to-queue",
  MOVEBACKFROMQUEUE: "/admin/export-orders/multiple/move-back-from-queue",
  EXPORTWITHROUTE: "/admin/export-orders/multiple/export-with-route",
  IMPORT_CHART: "/api/dashboard/import-chart",
  EXPORT_CHART: "/api/dashboard/export-chart",
  SUMMARY_CHART: "/api/dashboard/summary-chart",
  SKU_TYPE_RATIO: "/api/dashboard/sku-type-ratio",
  OPTIMIZATION_INDEX: "/api/dashboard/optimization-index",
  STORAGE_STATUS: "/api/dashboard/storage-status",
  WAREHOUSE_SUMMARY_PDF: "/api/dashboard/warehouse-summary-pdf",

  // --- AND KEEP THE INCOMING UPLOAD/IMPORT ENDPOINTS ---
  UPLOADFILEEXCEL: "api/manage-import-orders/upload-excel-to-temp",
  TEMPITEMSTEMPORARY: "api/manage-import-orders/temp-items",
  DELETETEMPORARY: "api/manage-import-orders/delete/temp",
  UPDATETEMPORARY: "api/manage-import-orders/temp/update",
  IMPORTWAREHOUSE: "/api/manage-import-orders/import-from-temp",
  DOWNLOADTEMPLATEIMPORTORDER: "api/manage-import-orders/template",
  HISTORY_IMPORT_ORDER_BY_ID: "/api/manage-import-orders/import-orders",
};

export default ApiEndPoint;
