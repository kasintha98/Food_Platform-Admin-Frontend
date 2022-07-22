import { productConstants } from "../actions/constants";

const initState = {
  products: [],
  ingredients: [],
  sections: [],
  dishesOfSection: [],
  loading: false,
  product: {},
  error: null,
  dishSectionLoading: false,
  allDishesBySection: {},
  allMenuIngredients: [],
  menuIngredientsLoading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case productConstants.GET_PRODUCTS_BY_SLUG_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productConstants.GET_PRODUCTS_BY_SLUG_SUCCESS:
      state = {
        ...state,
        products: action.payload.products,
        loading: false,
      };
      break;
    case productConstants.GET_PRODUCTS_BY_SLUG_FAILURE:
      state = {
        ...state,
        loading: false,
      };
      break;
    case productConstants.GET_SPECIFIC_PRODUCT_BY_SLUG_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productConstants.GET_SPECIFIC_PRODUCT_BY_SLUG_SUCCESS:
      state = {
        ...state,
        product: action.payload.product,
        loading: false,
      };
      break;
    case productConstants.GET_SPECIFIC_PRODUCT_BY_SLUG_FAILURE:
      state = {
        ...state,
        product: [],
        loading: false,
      };
      break;
    case productConstants.GET_MENU_INGREDIENTS_BY_PRODUCT_ID_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productConstants.GET_MENU_INGREDIENTS_BY_PRODUCT_ID_SUCCESS:
      state = {
        ...state,
        ingredients: action.payload,
        loading: false,
      };
      break;
    case productConstants.GET_MENU_INGREDIENTS_BY_PRODUCT_ID_FAILURE:
      state = {
        ...state,
        ingredients: [],
        loading: false,
      };
      break;
    case productConstants.GET_ALL_SECTIONS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productConstants.GET_ALL_SECTIONS_SUCCESS:
      state = {
        ...state,
        sections: action.payload,
        loading: false,
      };
      break;
    case productConstants.GET_ALL_SECTIONS_FAILURE:
      state = {
        ...state,
        sections: [],
        loading: false,
      };
      break;
    case productConstants.GET_DISHES_BY_SECTION_REQUEST:
      state = {
        ...state,
        dishSectionLoading: true,
      };
      break;
    case productConstants.GET_DISHES_BY_SECTION_SUCCESS:
      state = {
        ...state,
        dishesOfSection: action.payload.res,
        dishSectionLoading: false,
        allDishesBySection: {
          ...state.allDishesBySection,
          [action.payload.section]: action.payload.res,
        },
      };
      break;
    case productConstants.GET_DISHES_BY_SECTION_FAILURE:
      state = {
        ...state,
        dishesOfSection: [],
        dishSectionLoading: false,
      };
      break;

    case productConstants.GET_ALL_MENU_INGREDIENTS_REQUEST:
      state = {
        ...state,
        menuIngredientsLoading: true,
      };
      break;
    case productConstants.GET_ALL_MENU_INGREDIENTS_SUCCESS:
      state = {
        ...state,
        allMenuIngredients: action.payload,
        menuIngredientsLoading: false,
      };
      break;
    case productConstants.GET_ALL_MENU_INGREDIENTS_FAILURE:
      state = {
        ...state,
        allMenuIngredients: [],
        menuIngredientsLoading: false,
      };
      break;
  }
  return state;
};
