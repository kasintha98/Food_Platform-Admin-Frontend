import { inventoryConstants } from "../actions/constants";

const initState = {
  inventory: [],
  loading: false,
  error: null,
  allSuppliers: [],
  allSuppliersLoading: false,
  allInventory: [],
  allInventoryLoading: false,
  activeInventory: [],
  activeInventoryLoading: false,
  uomList: [],
  categoryList: [],
  categorySubList: [],
  activeRecipes: [],
  activeRecipesLoading: false,
  purchaseOrderCategory: [],
  purchaseOrderCategoryLoading: false,
  closedPurchaseOrders: [],
  closedPurchaseOrderLoading: false,
};

const buildNewInventory = (inventory, inventoryOne) => {
  return [
    ...inventory,
    {
      _id: inventoryOne._id,
      name: inventoryOne.name,
      qty: inventoryOne.qty,
      description: inventoryOne.description,
    },
  ];
};

export default (state = initState, action) => {
  switch (action.type) {
    case inventoryConstants.ADD_INVENTORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case inventoryConstants.ADD_INVENTORY_SUCCESS:
      const inventoryOne = action.payload.inventory;
      const updatedInventories = buildNewInventory(
        state.inventory,
        inventoryOne
      );

      state = {
        ...state,
        inventory: updatedInventories,
        loading: false,
      };
      break;
    case inventoryConstants.ADD_INVENTORY_FAILURE:
      state = {
        ...initState,
        loading: false,
        error: action.payload.error,
      };
      break;
    case inventoryConstants.DELETE_INVENTORY_REQUEST:
      state = { ...state, loading: true };
      break;
    case inventoryConstants.DELETE_INVENTORY_SUCCESS:
      state = { ...state, loading: false };
      break;
    case inventoryConstants.DELETE_INVENTORY_FAILURE:
      state = { ...state, error: action.payload.error, loading: false };
      break;
    case inventoryConstants.GET_INVENTORY_SUCCESS:
      state = {
        ...state,
        inventory: action.payload.inventory,
        loading: false,
      };
      break;

    case inventoryConstants.GET_INVENTORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;

    case inventoryConstants.GET_INVENTORY_FAILURE:
      state = {
        ...initState,
        loading: false,
        error: action.payload.error,
      };
      break;

    case inventoryConstants.GET_ALL_SUPPLIERS_REQUEST:
      state = {
        ...state,
        allSuppliersLoading: true,
      };
      break;
    case inventoryConstants.GET_ALL_SUPPLIERS_SUCCESS:
      state = {
        ...state,
        allSuppliersLoading: false,
        allSuppliers: action.payload,
      };
      break;
    case inventoryConstants.GET_ALL_SUPPLIERS_FAILURE:
      state = {
        ...state,
        allSuppliersLoading: false,
        allSuppliers: action.payload,
      };
      break;

    case inventoryConstants.GET_ALL_INVENTORY_ITEMS_REQUEST:
      state = {
        ...state,
        allInventoryLoading: true,
      };
      break;
    case inventoryConstants.GET_ALL_INVENTORY_ITEMS_SUCCESS:
      state = {
        ...state,
        allInventoryLoading: false,
        allInventory: action.payload,
      };
      break;
    case inventoryConstants.GET_ALL_INVENTORY_ITEMS_FAILURE:
      state = {
        ...state,
        allInventoryLoading: false,
        allInventory: action.payload,
      };
      break;

    case inventoryConstants.GET_ACTIVE_INVENTORY_ITEMS_REQUEST:
      state = {
        ...state,
        activeInventoryLoading: true,
      };
      break;
    case inventoryConstants.GET_ACTIVE_INVENTORY_ITEMS_SUCCESS:
      state = {
        ...state,
        activeInventoryLoading: false,
        activeInventory: action.payload,
      };
      break;
    case inventoryConstants.GET_ACTIVE_INVENTORY_ITEMS_FAILURE:
      state = {
        ...state,
        activeInventoryLoading: false,
        activeInventory: action.payload,
      };
      break;

    case inventoryConstants.GET_UOM_SUCCESS:
      state = {
        ...state,
        uomList: action.payload,
      };
      break;

    case inventoryConstants.GET_INVENTORY_CATEGORIES_SUCCESS:
      state = {
        ...state,
        categoryList: action.payload,
      };
      break;

    case inventoryConstants.GET_INVENTORY_SUB_CATEGORIES_SUCCESS:
      state = {
        ...state,
        categorySubList: action.payload,
      };
      break;

    case inventoryConstants.GET_ACTIVE_RECIPES_REQUEST:
      state = {
        ...state,
        activeRecipesLoading: true,
      };
      break;
    case inventoryConstants.GET_ACTIVE_RECIPES_SUCCESS:
      state = {
        ...state,
        activeRecipesLoading: false,
        activeRecipes: action.payload,
      };
      break;
    case inventoryConstants.GET_ACTIVE_RECIPES_FAILURE:
      state = {
        ...state,
        activeRecipesLoading: false,
        activeRecipes: action.payload,
      };
      break;

    case inventoryConstants.GET_PURCHASE_ORDER_CATEGORY_REQUEST:
      state = {
        ...state,
        purchaseOrderCategoryLoading: true,
      };
      break;
    case inventoryConstants.GET_PURCHASE_ORDER_CATEGORY_SUCCESS:
      state = {
        ...state,
        purchaseOrderCategoryLoading: false,
        purchaseOrderCategory: action.payload,
      };
      break;
    case inventoryConstants.GET_PURCHASE_ORDER_CATEGORY_FAILURE:
      state = {
        ...state,
        purchaseOrderCategoryLoading: false,
        purchaseOrderCategory: action.payload,
      };
      break;

    case inventoryConstants.GET_CLOSED_PURCHASE_ORDERS_REQUEST:
      state = {
        ...state,
        closedPurchaseOrderLoading: true,
      };
      break;
    case inventoryConstants.GET_CLOSED_PURCHASE_ORDERS_SUCCESS:
      state = {
        ...state,
        closedPurchaseOrderLoading: false,
        closedPurchaseOrders: action.payload,
      };
      break;
    case inventoryConstants.GET_CLOSED_PURCHASE_ORDERS_FAILURE:
      state = {
        ...state,
        closedPurchaseOrderLoading: false,
        closedPurchaseOrders: action.payload,
      };
      break;
  }
  return state;
};
