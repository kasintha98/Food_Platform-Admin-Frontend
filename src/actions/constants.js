//constants to verify requests

export const authConstants = {
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",

  LOGOUT_REQUEST: "LOGOUT_REQUEST",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  LOGOUT_FAILURE: "LOGOUT_FAILURE",

  GET_VERSION_REQUEST: "GET_VERSION_REQUEST",
  GET_VERSION_SUCCESS: "GET_VERSION_SUCCESS",
  GET_VERSION_FAILURE: "GET_VERSION_FAILURE",
};

export const userConstants = {
  USER_SIGNUP_REQUEST: "USER_SIGNUP_REQUEST",
  USER_SIGNUP_FAILURE: "USER_SIGNUP_FAILURE",
  USER_SIGNUP_SUCCESS: "USER_SIGNUP_SUCCESS",

  GET_ROLES_REQUEST: "GET_ROLES_REQUEST",
  GET_ROLES_FAILURE: "GET_ROLES_FAILURE",
  GET_ROLES_SUCCESS: "GET_ROLES_SUCCESS",

  GET_ROLES_WITH_MODULE_REQUEST: "GET_ROLES_WITH_MODULE_REQUEST",
  GET_ROLES_WITH_MODULE_FAILURE: "GET_ROLES_WITH_MODULE_FAILURE",
  GET_ROLES_WITH_MODULE_SUCCESS: "GET_ROLES_WITH_MODULE_SUCCESS",

  GET_MODULES_REQUEST: "GET_MODULES_REQUEST",
  GET_MODULES_FAILURE: "GET_MODULES_FAILURE",
  GET_MODULES_SUCCESS: "GET_MODULES_SUCCESS",

  GET_USERS_BY_ROLE_REQUEST: "GET_USERS_BY_ROLE_REQUEST",
  GET_USERS_BY_ROLE_FAILURE: "GET_USERS_BY_ROLE_FAILURE",
  GET_USERS_BY_ROLE_SUCCESS: "GET_USERS_BY_ROLE_SUCCESS",

  SAVE_ROLE_WITH_MODULES_REQUEST: "SAVE_ROLE_WITH_MODULES_REQUEST",
  SAVE_ROLE_WITH_MODULES_FAILURE: "SAVE_ROLE_WITH_MODULES_FAILURE",
  SAVE_ROLE_WITH_MODULES_SUCCESS: "SAVE_ROLE_WITH_MODULES_SUCCESS",

  DELETE_ROLE_WITH_MODULES_REQUEST: "DELETE_ROLE_WITH_MODULES_REQUEST",
  DELETE_ROLE_WITH_MODULES_FAILURE: "DELETE_ROLE_WITH_MODULES_FAILURE",
  DELETE_ROLE_WITH_MODULES_SUCCESS: "DELETE_ROLE_WITH_MODULES_SUCCESS",

  GET_CONFIG_DETAILS_REQUEST: "GET_CONFIG_DETAILS_REQUEST",
  GET_CONFIG_DETAILS_FAILURE: "GET_CONFIG_DETAILS_FAILURE",
  GET_CONFIG_DETAILS_SUCCESS: "GET_CONFIG_DETAILS_SUCCESS",

  ADD_CONFIG_DETAILS_REQUEST: "ADD_CONFIG_DETAILS_REQUEST",
  ADD_CONFIG_DETAILS_FAILURE: "ADD_CONFIG_DETAILS_FAILURE",
  ADD_CONFIG_DETAILS_SUCCESS: "ADD_CONFIG_DETAILS_SUCCESS",

  GET_MODULES_FOR_USER_REQUEST: "GET_MODULES_FOR_USER_REQUEST",
  GET_MODULES_FOR_USER_FAILURE: "GET_MODULES_FOR_USER_FAILURE",
  GET_MODULES_FOR_USER_SUCCESS: "GET_MODULES_FOR_USER_SUCCESS",

  GET_ORDER_STATUS_REQUEST: "GET_ORDER_STATUS_REQUEST",
  GET_ORDER_STATUS_SUCCESS: "GET_ORDER_STATUS_SUCCESS",
  GET_ORDER_STATUS_FAILURE: "GET_ORDER_STATUS_FAILURE",
};

export const categoryConstants = {
  GET_ALL_CATEGORIES_REQUEST: "GET_ALL_CATEGORIES_REQUEST",
  GET_ALL_CATEGORIES_SUCCESS: "GET_ALL_CATEGORIES_SUCCESS",
  GET_ALL_CATEGORIES_FAILURE: "GET_ALL_CATEGORIES_FAILURE",
  ADD_NEW_CATEGORY_REQUEST: "ADD_NEW_CATEGORY_REQUEST",
  ADD_NEW_CATEGORY_SUCCESS: "ADD_NEW_CATEGORY_SUCCESS",
  ADD_NEW_CATEGORY_FAILURE: "ADD_NEW_CATEGORY_FAILURE",
  UPDATE_CATEGORY_REQUEST: "UPDATE_CATEGORY_REQUEST",
  UPDATE_CATEGORY_SUCCESS: "UPDATE_CATEGORY_SUCCESS",
  UPDATE_CATEGORY_FAILURE: "UPDATE_CATEGORY_FAILURE",
  DELETE_CATEGORY_REQUEST: "DELETE_CATEGORY_REQUEST",
  DELETE_CATEGORY_SUCCESS: "DELETE_CATEGORY_SUCCESS",
  DELETE_CATEGORY_FAILURE: "DELETE_CATEGORY_FAILURE",
};

export const productConstants = {
  GET_ALL_PRODUCTS_REQUEST: "GET_ALL_PRODUCTS_REQUEST",
  GET_ALL_PRODUCTS_SUCCESS: "GET_ALL_PRODUCTS_SUCCESS",
  GET_ALL_PRODUCTS_FAILURE: "GET_ALL_PRODUCTS_FAILURE",
  ADD_NEW_PRODUCT_REQUEST: "ADD_NEW_PRODUCT_REQUEST",
  ADD_NEW_PRODUCT_SUCCESS: "ADD_NEW_PRODUCT_SUCCESS",
  ADD_NEW_PRODUCT_FAILURE: "ADD_NEW_PRODUCT_FAILURE",
  UPDATE_PRODUCT_REQUEST: "UPDATE_PRODUCT_REQUEST",
  UPDATE_PRODUCT_SUCCESS: "UPDATE_PRODUCT_SUCCESS",
  UPDATE_PRODUCT_FAILURE: "UPDATE_PRODUCT_FAILURE",
  DELETE_PRODUCT_REQUEST: "DELETE_PRODUCT_REQUEST",
  DELETE_PRODUCT_SUCCESS: "DELETE_PRODUCT_SUCCESS",
  DELETE_PRODUCT_FAILURE: "DELETE_PRODUCT_FAILURE",
};

export const initialDataConstants = {
  GET_ALL_INITIAL_DATA_REQUEST: "GET_ALL_INITIAL_DATA_REQUEST",
  GET_ALL_INITIAL_DATA_SUCCESS: "GET_ALL_INITIAL_DATA_SUCCESS",
  GET_ALL_INITIAL_DATA_FAILURE: "GET_ALL_INITIAL_DATA_FAILURE",
};

export const orderConstants = {
  GET_CUSTOMER_ORDER_REQUEST: "GET_CUSTOMER_ORDER_REQUEST",
  GET_CUSTOMER_ORDER_SUCCESS: "GET_CUSTOMER_ORDER_SUCCESS",
  GET_CUSTOMER_ORDER_FAILURE: "GET_CUSTOMER_ORDER_FAILURE",

  GET_ALL_ORDER_REQUEST: "GET_ALL_ORDER_REQUEST",
  GET_ALL_ORDER_SUCCESS: "GET_ALL_ORDER_SUCCESS",
  GET_ALL_ORDER_FAILURE: "GET_ALL_ORDER_FAILURE",

  UPDATE_CUSTOMER_ORDER_REQUEST: "UPDATE_CUSTOMER_ORDER_REQUEST",
  UPDATE_CUSTOMER_ORDER_SUCCESS: "UPDATE_CUSTOMER_ORDER_SUCCESS",
  UPDATE_CUSTOMER_ORDER_FAILURE: "UPDATE_CUSTOMER_ORDER_FAILURE",

  UPDATE_ORDER_SUBPROD_STATUS_REQUEST: "UPDATE_ORDER_SUBPROD_STATUS_REQUEST",
  UPDATE_ORDER_SUBPROD_STATUS_SUCCESS: "UPDATE_ORDER_SUBPROD_STATUS_SUCCESS",
  UPDATE_ORDER_SUBPROD_STATUS_FAILURE: "UPDATE_ORDER_SUBPROD_STATUS_FAILURE",

  UPDATE_ORDER_DELI_BOY_REQUEST: "UPDATE_ORDER_DELI_BOY_REQUEST",
  UPDATE_ORDER_DELI_BOY_SUCCESS: "UPDATE_ORDER_DELI_BOY_SUCCESS",
  UPDATE_ORDER_DELI_BOY_FAILURE: "UPDATE_ORDER_DELI_BOY_FAILURE",
};

export const employeeConstants = {
  GET_EMPLOYEE_REQUEST: "GET_EMPLOYEE_REQUEST",
  GET_EMPLOYEE_SUCCESS: "GET_EMPLOYEE_SUCCESS",
  GET_EMPLOYEE_FAILURE: "GET_EMPLOYEE_FAILURE",

  ADD_EMPLOYEE_REQUEST: "ADD_EMPLOYEE_REQUEST",
  ADD_EMPLOYEE_SUCCESS: "ADD_EMPLOYEE_SUCCESS",
  ADD_EMPLOYEE_FAILURE: "ADD_EMPLOYEE_FAILURE",

  UPDATE_EMPLOYEE_REQUEST: "UPDATE_EMPLOYEE_REQUEST",
  UPDATE_EMPLOYEE_SUCCESS: "UPDATE_EMPLOYEE_SUCCESS",
  UPDATE_EMPLOYEE_FAILURE: "UPDATE_EMPLOYEE_FAILURE",

  GET_EMPLOYEE_BY_RES_REQUEST: "GET_EMPLOYEE_BY_RES_REQUEST",
  GET_EMPLOYEE_BY_RES_SUCCESS: "GET_EMPLOYEE_BY_RES_SUCCESS",
  GET_EMPLOYEE_BY_RES_FAILURE: "GET_EMPLOYEE_BY_RES_FAILURE",
};

export const inventoryConstants = {
  GET_INVENTORY_REQUEST: "GET_INVENTORY_REQUEST",
  GET_INVENTORY_SUCCESS: "GET_INVENTORY_SUCCESS",
  GET_INVENTORY_FAILURE: "GET_INVENTORY_FAILURE",
  ADD_INVENTORY_REQUEST: "ADD_INVENTORY_REQUEST",
  ADD_INVENTORY_SUCCESS: "ADD_INVENTORY_SUCCESS",
  ADD_INVENTORY_FAILURE: "ADD_INVENTORY_FAILURE",
  UPDATE_INVENTORY_REQUEST: "UPDATE_INVENTORY_REQUEST",
  UPDATE_INVENTORY_SUCCESS: "UPDATE_INVENTORY_SUCCESS",
  UPDATE_INVENTORY_FAILURE: "UPDATE_INVENTORY_FAILURE",
  DELETE_INVENTORY_REQUEST: "DELETE_INVENTORY_REQUEST",
  DELETE_INVENTORY_SUCCESS: "DELETE_INVENTORY_SUCCESS",
  DELETE_INVENTORY_FAILURE: "DELETE_INVENTORY_FAILURE",
};

export const purchaseConstants = {
  GET_PURCHASE_REQUEST: "GET_PURCHASE_REQUEST",
  GET_PURCHASE_SUCCESS: "GET_PURCHASE_SUCCESS",
  GET_PURCHASE_FAILURE: "GET_PURCHASE_FAILURE",
  ADD_PURCHASE_REQUEST: "ADD_PURCHASE_REQUEST",
  ADD_PURCHASE_SUCCESS: "ADD_PURCHASE_SUCCESS",
  ADD_PURCHASE_FAILURE: "ADD_PURCHASE_FAILURE",
  UPDATE_PURCHASE_REQUEST: "UPDATE_PURCHASE_REQUEST",
  UPDATE_PURCHASE_SUCCESS: "UPDATE_PURCHASE_SUCCESS",
  UPDATE_PURCHASE_FAILURE: "UPDATE_PURCHASE_FAILURE",
  DELETE_PURCHASE_REQUEST: "DELETE_PURCHASE_REQUEST",
  DELETE_PURCHASE_SUCCESS: "DELETE_PURCHASE_SUCCESS",
  DELETE_PURCHASE_FAILURE: "DELETE_PURCHASE_FAILURE",
};

export const storeConstants = {
  GET_ALL_STORES_REQUEST: "GET_ALL_STORES_REQUEST",
  GET_ALL_STORES_FAILURE: "GET_ALL_STORES_FAILURE",
  GET_ALL_STORES_SUCCESS: "GET_ALL_STORES_SUCCESS",
};

export const reportConstants = {
  GET_ALL_REPORTS_REQUEST: "GET_ALL_REPORTS_REQUEST",
  GET_ALL_REPORTS_FAILURE: "GET_ALL_REPORTS_FAILURE",
  GET_ALL_REPORTS_SUCCESS: "GET_ALL_REPORTS_SUCCESS",
};

export const riderConstants = {
  GET_ALL_RIDER_LOCATION_REQUEST: "GET_ALL_RIDER_LOCATION_REQUEST",
  GET_ALL_RIDER_LOCATION_SUCCESS: "GET_ALL_RIDER_LOCATION_SUCCESS",
  GET_ALL_RIDER_LOCATION_FAILURE: "GET_ALL_RIDER_LOCATION_FAILURE",
  ADD_RIDER_LOCATION_REQUEST: "ADD_RIDER_LOCATION_REQUEST",
  ADD_RIDER_LOCATION_SUCCESS: "ADD_RIDER_LOCATION_SUCCESS",
  ADD_RIDER_LOCATION_FAILURE: "ADD_RIDER_LOCATION_FAILURE",
  GET_ONE_RIDER_LOCATION_REQUEST: "GET_ONE_RIDER_LOCATION_REQUEST",
  GET_ONE_RIDER_LOCATION_SUCCESS: "GET_ONE_RIDER_LOCATION_SUCCESS",
  GET_ONE_RIDER_LOCATION_FAILURE: "GET_ONE_RIDER_LOCATION_FAILURE",
};
