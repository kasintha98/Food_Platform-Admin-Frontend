import { inventoryConstants } from "../actions/constants";

const initState = {
  inventory: [],
  loading: false,
  error: null,
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
  }
  return state;
};
