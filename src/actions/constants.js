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

  RESET_PASSWORD_REQUEST: "RESET_PASSWORD_REQUEST",
  RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS",
  RESET_PASSWORD_FAILURE: "RESET_PASSWORD_FAILURE",
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

  ADD_USER_ORDER_REQUEST: "ADD_USER_ORDER_REQUEST",
  ADD_USER_ORDER_SUCCESS: "ADD_USER_ORDER_SUCCESS",
  ADD_USER_ORDER_FAILURE: "ADD_USER_ORDER_FAILURE",

  ADD_NEW_CUSTOMER_REQUEST: "ADD_NEW_CUSTOMER_REQUEST",
  ADD_NEW_CUSTOMER_SUCCESS: "ADD_NEW_CUSTOMER_SUCCESS",
  ADD_NEW_CUSTOMER_FAILURE: "ADD_NEW_CUSTOMER_FAILURE",

  UPDATE_CUSTOMER_DETAILS_REQUEST: "UPDATE_CUSTOMER_DETAILS_REQUEST",
  UPDATE_CUSTOMER_DETAILS_SUCCESS: "UPDATE_CUSTOMER_DETAILS_SUCCESS",
  UPDATE_CUSTOMER_DETAILS_FAILURE: "UPDATE_CUSTOMER_DETAILS_FAILURE",

  GET_CUSTOMER_ADDRESS_REQUEST: "GET_CUSTOMER_ADDRESS_REQUEST",
  GET_CUSTOMER_ADDRESS_SUCCESS: "GET_CUSTOMER_ADDRESS_SUCCESS",
  GET_CUSTOMER_ADDRESS_FAILURE: "GET_CUSTOMER_ADDRESS_FAILURE",

  GET_CUSTOMER_DETAILS_REQUEST: "GET_CUSTOMER_DETAILS_REQUEST",
  GET_CUSTOMER_DETAILS_SUCCESS: "GET_CUSTOMER_DETAILS_SUCCESS",
  GET_CUSTOMER_DETAILS_FAILURE: "GET_CUSTOMER_DETAILS_FAILURE",

  ADD_UPDATE_CUSTOMER_ADDRESS_REQUEST: "ADD_UPDATE_CUSTOMER_ADDRESS_REQUEST",
  ADD_UPDATE_CUSTOMER_ADDRESS_SUCCESS: "ADD_UPDATE_CUSTOMER_ADDRESS_SUCCESS",
  ADD_UPDATE_CUSTOMER_ADDRESS_FAILURE: "ADD_UPDATE_CUSTOMER_ADDRESS_FAILURE",

  SAVE_COUPON_REQUEST: "SAVE_COUPON_REQUEST",
  SAVE_COUPON_SUCCESS: "SAVE_COUPON_SUCCESS",
  SAVE_COUPON_FAILURE: "SAVE_COUPON_FAILURE",

  UPDATE_COUPON_REQUEST: "UPDATE_COUPON_REQUEST",
  UPDATE_COUPON_SUCCESS: "UPDATE_COUPON_SUCCESS",
  UPDATE_COUPON_FAILURE: "UPDATE_COUPON_FAILURE",

  VALIDATE_COUPON_REQUEST: "VALIDATE_COUPON_REQUEST",
  VALIDATE_COUPON_SUCCESS: "VALIDATE_COUPON_SUCCESS",
  VALIDATE_COUPON_FAILURE: "VALIDATE_COUPON_FAILURE",

  CLEAR_COUPON_REQUEST: "CLEAR_COUPON_REQUEST",
  CLEAR_COUPON_SUCCESS: "CLEAR_COUPON_SUCCESS",
  CLEAR_COUPON_FAILURE: "CLEAR_COUPON_FAILURE",

  GET_COUPONS_REQUEST: "GET_COUPONS_REQUEST",
  GET_COUPONS_SUCCESS: "GET_COUPONS_SUCCESS",
  GET_COUPONS_FAILURE: "GET_COUPONS_FAILURE",

  PERFORM_EOD_REQUEST: "PERFORM_EOD_REQUEST",
  PERFORM_EOD_SUCCESS: "PERFORM_EOD_SUCCESS",
  PERFORM_EOD_FAILURE: "PERFORM_EOD_FAILURE",

  GET_BUSINESS_DATE_REQUEST: "GET_BUSINESS_DATE_REQUEST",
  GET_BUSINESS_DATE_SUCCESS: "GET_BUSINESS_DATE_SUCCESS",
  GET_BUSINESS_DATE_FAILURE: "GET_BUSINESS_DATE_FAILURE",

  GET_ALL_BUSINESS_DATES_REQUEST: "GET_ALL_BUSINESS_DATES_REQUEST",
  GET_ALL_BUSINESS_DATES_SUCCESS: "GET_ALL_BUSINESS_DATES_SUCCESS",
  GET_ALL_BUSINESS_DATES_FAILURE: "GET_ALL_BUSINESS_DATES_FAILURE",

  UPDATE_BUSINESS_DATE_REQUEST: "UPDATE_BUSINESS_DATE_REQUEST",
  UPDATE_BUSINESS_DATE_SUCCESS: "UPDATE_BUSINESS_DATE_SUCCESS",
  UPDATE_BUSINESS_DATE_FAILURE: "UPDATE_BUSINESS_DATE_FAILURE",

  GET_DELIVERY_PRICE_REQUEST: "GET_DELIVERY_PRICE_REQUEST",
  GET_DELIVERY_PRICE_FAILURE: "GET_DELIVERY_PRICE_FAILURE",
  GET_DELIVERY_PRICE_SUCCESS: "GET_DELIVERY_PRICE_SUCCESS",
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
  GET_PRODUCTS_BY_SLUG_REQUEST: "GET_PRODUCTS_BY_SLUG_REQUEST",
  GET_PRODUCTS_BY_SLUG_SUCCESS: "GET_PRODUCTS_BY_SLUG_SUCCESS",
  GET_PRODUCTS_BY_SLUG_FAILURE: "GET_PRODUCTS_BY_SLUG_FAILURE",
  ADD_NEW_CATEGORY_REQUEST: "ADD_NEW_CATEGORY_REQUEST",
  ADD_NEW_CATEGORY_SUCCESS: "ADD_NEW_CATEGORY_SUCCESS",
  ADD_NEW_CATEGORY_FAILURE: "ADD_NEW_CATEGORY_FAILURE",
  GET_SPECIFIC_PRODUCT_BY_SLUG_REQUEST: "GET_SPECIFIC_PRODUCT_BY_SLUG_REQUEST",
  GET_SPECIFIC_PRODUCT_BY_SLUG_SUCCESS: "GET_SPECIFIC_PRODUCT_BY_SLUG_SUCCESS",
  GET_MENU_INGREDIENTS_BY_PRODUCT_ID_FAILURE:
    "GET_MENU_INGREDIENTS_BY_PRODUCT_ID_FAILURE",
  GET_MENU_INGREDIENTS_BY_PRODUCT_ID_REQUEST:
    "GET_MENU_INGREDIENTS_BY_PRODUCT_ID_REQUEST",
  GET_MENU_INGREDIENTS_BY_PRODUCT_ID_SUCCESS:
    "GET_MENU_INGREDIENTS_BY_PRODUCT_ID_SUCCESS",
  GET_ALL_SECTIONS_REQUEST: "GET_ALL_SECTIONS_REQUEST",
  GET_ALL_SECTIONS_SUCCESS: "GET_ALL_SECTIONS_SUCCESS",
  GET_ALL_SECTIONS_FAILURE: "GET_ALL_SECTIONS_FAILURE",
  GET_DISHES_BY_SECTION_REQUEST: "GET_DISHES_BY_SECTION_REQUEST",
  GET_DISHES_BY_SECTION_SUCCESS: "GET_DISHES_BY_SECTION_SUCCESS",
  GET_DISHES_BY_SECTION_FAILURE: "GET_DISHES_BY_SECTION_FAILURE",

  GET_ALL_SECTIONS_WITH_DISHES_REQUEST: "GET_ALL_SECTIONS_WITH_DISHES_REQUEST",
  GET_ALL_SECTIONS_WITH_DISHES_SUCCESS: "GET_ALL_SECTIONS_WITH_DISHES_SUCCESS",
  GET_ALL_SECTIONS_WITH_DISHES_FAILURE: "GET_ALL_SECTIONS_WITH_DISHES_FAILURE",

  GET_ALL_MENU_INGREDIENTS_REQUEST: "GET_ALL_MENU_INGREDIENTS_REQUEST",
  GET_ALL_MENU_INGREDIENTS_SUCCESS: "GET_ALL_MENU_INGREDIENTS_SUCCESS",
  GET_ALL_MENU_INGREDIENTS_FAILURE: "GET_ALL_MENU_INGREDIENTS_FAILURE",

  GET_ALL_MENU_INGREDIENTS_PAGE_REQUEST:
    "GET_ALL_MENU_INGREDIENTS_PAGE_REQUEST",
  GET_ALL_MENU_INGREDIENTS_PAGE_SUCCESS:
    "GET_ALL_MENU_INGREDIENTS_PAGE_SUCCESS",
  GET_ALL_MENU_INGREDIENTS_PAGE_FAILURE:
    "GET_ALL_MENU_INGREDIENTS_PAGE_FAILURE",

  GET_PRODUCTS_BY_PAGE_REQUEST: "GET_PRODUCTS_BY_PAGE_REQUEST",
  GET_PRODUCTS_BY_PAGE_SUCCESS: "GET_PRODUCTS_BY_PAGE_SUCCESS",
  GET_PRODUCTS_BY_PAGE_FAILURE: "GET_PRODUCTS_BY_PAGE_FAILURE",

  UPDATE_MENU_ITEM_REQUEST: "UPDATE_MENU_ITEM_REQUEST",
  UPDATE_MENU_ITEM_SUCCESS: "UPDATE_MENU_ITEM_SUCCESS",
  UPDATE_MENU_ITEM_FAILURE: "UPDATE_MENU_ITEM_FAILURE",

  ADD_MENU_ITEM_REQUEST: "ADD_MENU_ITEM_REQUEST",
  ADD_MENU_ITEM_SUCCESS: "ADD_MENU_ITEM_SUCCESS",
  ADD_MENU_ITEM_FAILURE: "ADD_MENU_ITEM_FAILURE",

  UPDATE_MENU_INGREDIENT_REQUEST: "UPDATE_MENU_INGREDIENT_REQUEST",
  UPDATE_MENU_INGREDIENT_SUCCESS: "UPDATE_MENU_INGREDIENT_SUCCESS",
  UPDATE_MENU_INGREDIENT_FAILURE: "UPDATE_MENU_INGREDIENT_FAILURE",

  SAVE_NEW_MENU_INGREDIENT_REQUEST: "SAVE_NEW_MENU_INGREDIENT_REQUEST",
  SAVE_NEW_MENU_INGREDIENT_SUCCESS: "SAVE_NEW_MENU_INGREDIENT_SUCCESS",
  SAVE_NEW_MENU_INGREDIENT_FAILURE: "SAVE_NEW_MENU_INGREDIENT_FAILURE",

  SAVE_NEW_SUB_PRODUCT_REQUEST: "SAVE_NEW_SUB_PRODUCT_REQUEST",
  SAVE_NEW_SUB_PRODUCT_SUCCESS: "SAVE_NEW_SUB_PRODUCT_SUCCESS",
  SAVE_NEW_SUB_PRODUCT_FAILURE: "SAVE_NEW_SUB_PRODUCT_FAILURE",

  GET_DISH_TOPPING_MAPPING_BY_RESTRO_REQUEST:
    "GET_DISH_TOPPING_MAPPING_BY_RESTRO_REQUEST",
  GET_DISH_TOPPING_MAPPING_BY_RESTRO_SUCCESS:
    "GET_DISH_TOPPING_MAPPING_BY_RESTRO_SUCCESS",
  GET_DISH_TOPPING_MAPPING_BY_RESTRO_FAILURE:
    "GET_DISH_TOPPING_MAPPING_BY_RESTRO_FAILURE",

  SAVE_DISH_TO_TOPPING_REQUEST: "SAVE_DISH_TO_TOPPING_REQUEST",
  SAVE_DISH_TO_TOPPING_SUCCESS: "SAVE_DISH_TO_TOPPING_SUCCESS",
  SAVE_DISH_TO_TOPPING_FAILURE: "SAVE_DISH_TO_TOPPING_FAILURE",

  DELETE_DISH_TO_TOPPING_REQUEST: "DELETE_DISH_TO_TOPPING_REQUEST",
  DELETE_DISH_TO_TOPPING_SUCCESS: "DELETE_DISH_TO_TOPPING_SUCCESS",
  DELETE_DISH_TO_TOPPING_FAILURE: "DELETE_DISH_TO_TOPPING_FAILURE",

  GET_ALL_SECTIONS_MASTER_REQUEST: "GET_ALL_SECTIONS_MASTER_REQUEST",
  GET_ALL_SECTIONS_MASTER_SUCCESS: "GET_ALL_SECTIONS_MASTER_SUCCESS",
  GET_ALL_SECTIONS_MASTER_FAILURE: "GET_ALL_SECTIONS_MASTER_FAILURE",

  GET_ALL_DISHES_MASTER_REQUEST: "GET_ALL_DISHES_MASTER_REQUEST",
  GET_ALL_DISHES_MASTER_SUCCESS: "GET_ALL_DISHES_MASTER_SUCCESS",
  GET_ALL_DISHES_MASTER_FAILURE: "GET_ALL_DISHES_MASTER_FAILURE",

  SAVE_NEW_SECTION_REQUEST: "SAVE_NEW_SECTION_REQUEST",
  SAVE_NEW_SECTION_SUCCESS: "SAVE_NEW_SECTION_SUCCESS",
  SAVE_NEW_SECTION_FAILURE: "SAVE_NEW_SECTION_FAILURE",

  SAVE_NEW_DISH_REQUEST: "SAVE_NEW_DISH_REQUEST",
  SAVE_NEW_DISH_SUCCESS: "SAVE_NEW_DISH_SUCCESS",
  SAVE_NEW_DISH_FAILURE: "SAVE_NEW_DISH_FAILURE",
};

export const taxConstants = {
  GET_TAX_REQUEST: "GET_TAX_REQUEST",
  GET_TAX_FAILURE: "GET_TAX_FAILURE",
  GET_TAX_SUCCESS: "GET_TAX_SUCCESS",
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

  UPDATE_FOOD_PACKAGED_FLAG_REQUEST: "UPDATE_FOOD_PACKAGED_FLAG_REQUEST",
  UPDATE_FOOD_PACKAGED_FLAG_SUCCESS: "UPDATE_FOOD_PACKAGED_FLAG_SUCCESS",
  UPDATE_FOOD_PACKAGED_FLAG_FAILURE: "UPDATE_FOOD_PACKAGED_FLAG_FAILURE",

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

export const cartConstants = {
  ADD_TO_CART_REQUEST: "ADD_TO_CART_REQUEST",
  ADD_TO_CART_SUCCESS: "ADD_TO_CART_SUCCESS",
  ADD_TO_CART_FAILURE: "ADD_TO_CART_FAILURE",
  REMOVE_CART_ITEM_REQUEST: "REMOVE_CART_ITEM_REQUEST",
  REMOVE_CART_ITEM_SUCCESS: "REMOVE_CART_ITEM_SUCCESS",
  REMOVE_CART_ITEM_FAILURE: "REMOVE_CART_ITEM_FAILURE",
  RESET_CART: "RESET_CART",
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
