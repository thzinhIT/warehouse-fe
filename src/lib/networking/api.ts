const ApiEndPoint = {
  LOGIN: "/auth",
  REFRESHTOKEN: "/auth/refresh-token",
  SENDCODEEMAIL: "/user/forgot-password",
  NEWPASSWORD: "user/reset-password",
  ALLIMPORTORDER: "/api/manage-import-orders/getallImportOrder",
  ALLHISTORYIMPORTORDER: "/api/manage-import-orders/allDetails/merged-sku",
  ALLDETAILIMPORTORDER: "/api/manage-import-orders/allDetails",
  UPLOADFILEEXCEL: "api/manage-import-orders/upload-excel-to-temp",
  TEMPITEMSTEMPORARY: "api/manage-import-orders/temp-items",
  DELETETEMPORARY: "api/manage-import-orders/delete/temp",
  UPDATETEMPORARY: "api/manage-import-orders/temp/update",
  IMPORTWAREHOUSE: "/api/manage-import-orders/import-from-temp",
  DOWNLOADTEMPLATEIMPORTORDER: "api/manage-import-orders/template",
  HISTORY_IMPORT_ORDER_BY_ID: "/api/manage-import-orders/import-orders",
};
export default ApiEndPoint;
