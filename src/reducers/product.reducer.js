import { productConstants } from "../actions/constants";

const initState = {
  products: [],
  productsOfPage: [],
  ingredientsOfPage: [],
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
  allDishToppingMappingByRestoAndStore: [],
  allSectionsFromMaster: [],
  allDishesFromMaster: [],
  masterProducts: [],
  pageLoading: false,
  allOffersLoading: false,
  allOffers: [],
  offersByStatus: [],
  offersByStatusLoading: false,
  offersAppFlagConfig: [],
  offersCriteriaConfig: [],
  offersFunctionConfig: [],
  allActiveCSS: []
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
      };
      break;
    case productConstants.GET_DISHES_BY_SECTION_SUCCESS:
      state = {
        ...state,
        dishesOfSection: action.payload.res,
      };
      break;
    case productConstants.GET_DISHES_BY_SECTION_FAILURE:
      state = {
        ...state,
        dishesOfSection: [],
      };
      break;

    case productConstants.GET_ALL_SECTIONS_WITH_DISHES_REQUEST:
      state = {
        ...state,
        dishSectionLoading: true,
      };
      break;
    case productConstants.GET_ALL_SECTIONS_WITH_DISHES_SUCCESS:
      state = {
        ...state,

        dishSectionLoading: false,
        allDishesBySection: action.payload,
      };
      break;
    case productConstants.GET_ALL_SECTIONS_WITH_DISHES_FAILURE:
      state = {
        ...state,
        dishSectionLoading: false,
        allDishesBySection: {},
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

    case productConstants.GET_PRODUCTS_BY_PAGE_REQUEST:
      state = {
        ...state,
        loading: true,
        pageLoading: true,
      };
      break;
    case productConstants.GET_PRODUCTS_BY_PAGE_SUCCESS:
      state = {
        ...state,
        productsOfPage: action.payload.products,
        loading: false,
        pageLoading: false,
      };
      break;
    case productConstants.GET_PRODUCTS_BY_PAGE_FAILURE:
      state = {
        ...state,
        loading: false,
        pageLoading: false,
        productsOfPage: [],
      };
      break;

    case productConstants.GET_ALL_MENU_INGREDIENTS_PAGE_REQUEST:
      state = {
        ...state,
      };
      break;
    case productConstants.GET_ALL_MENU_INGREDIENTS_PAGE_SUCCESS:
      state = {
        ...state,
        ingredientsOfPage: action.payload,
      };
      break;
    case productConstants.GET_ALL_MENU_INGREDIENTS_PAGE_FAILURE:
      state = {
        ...state,
        ingredientsOfPage: [],
      };
      break;

    case productConstants.GET_DISH_TOPPING_MAPPING_BY_RESTRO_REQUEST:
      state = {
        ...state,
      };
      break;
    case productConstants.GET_DISH_TOPPING_MAPPING_BY_RESTRO_SUCCESS:
      state = {
        ...state,
        allDishToppingMappingByRestoAndStore: action.payload,
      };
      break;
    case productConstants.GET_DISH_TOPPING_MAPPING_BY_RESTRO_FAILURE:
      state = {
        ...state,
        allDishToppingMappingByRestoAndStore: [],
      };
      break;

    case productConstants.GET_ALL_SECTIONS_MASTER_REQUEST:
      state = {
        ...state,
      };
      break;
    case productConstants.GET_ALL_SECTIONS_MASTER_SUCCESS:
      state = {
        ...state,
        allSectionsFromMaster: action.payload,
      };
      break;
    case productConstants.GET_ALL_SECTIONS_MASTER_FAILURE:
      state = {
        ...state,
        allSectionsFromMaster: [],
      };
      break;

    case productConstants.GET_ALL_DISHES_MASTER_REQUEST:
      state = {
        ...state,
      };
      break;
    case productConstants.GET_ALL_DISHES_MASTER_SUCCESS:
      state = {
        ...state,
        allDishesFromMaster: action.payload,
      };
      break;
    case productConstants.GET_ALL_DISHES_MASTER_FAILURE:
      state = {
        ...state,
        allDishesFromMaster: [],
      };
      break;

    case productConstants.GET_MASTER_PRODUCTS_SUCCESS:
      state = {
        ...state,
        masterProducts: action.payload,
      };
      break;




      case productConstants.GET_ALL_OFFERS_REQUEST:
      state = {
        ...state,
        allOffersLoading: true
      };
      break;
    case productConstants.GET_ALL_OFFERS_SUCCESS:
      state = {
        ...state,
        allOffers: action.payload,
        allOffersLoading: false
      };
      break;
    case productConstants.GET_ALL_OFFERS_FAILURE:
      state = {
        ...state,
        allOffers: [],
        allOffersLoading: false
      };
      break;

      case productConstants.GET_ALL_OFFERS_BY_STATUS_REQUEST:
        state = {
          ...state,
          offersByStatusLoading: true
        };
        break;
      case productConstants.GET_ALL_OFFERS_BY_STATUS_SUCCESS:
        state = {
          ...state,
          offersByStatus: action.payload,
          offersByStatusLoading: false
        };
        break;
      case productConstants.GET_ALL_OFFERS_BY_STATUS_FAILURE:
        state = {
          ...state,
          offersByStatus: [],
          offersByStatusLoading: false
        };
        break;


        case productConstants.GET_OFFERS_APP_FLAG_CONFIG_REQUEST:
          state = {
            ...state,
          };
          break;
        case productConstants.GET_OFFERS_APP_FLAG_CONFIG_SUCCESS:
          state = {
            ...state,
            offersAppFlagConfig: action.payload,
          };
          break;
        case productConstants.GET_OFFERS_APP_FLAG_CONFIG_FAILURE:
          state = {
            ...state,
            offersAppFlagConfig: [],
          };
          break;


          case productConstants.GET_OFFERS_CRITERIA_CONFIG_REQUEST:
            state = {
              ...state,
            };
            break;
          case productConstants.GET_OFFERS_CRITERIA_CONFIG_SUCCESS:
            state = {
              ...state,
              offersCriteriaConfig: action.payload,
            };
            break;
          case productConstants.GET_OFFERS_CRITERIA_CONFIG_FAILURE:
            state = {
              ...state,
              offersCriteriaConfig: [],
            };
            break;


            case productConstants.GET_OFFERS_FUNCTION_CONFIG_REQUEST:
              state = {
                ...state,
              };
              break;
            case productConstants.GET_OFFERS_FUNCTION_CONFIG_SUCCESS:
              state = {
                ...state,
                offersFunctionConfig: action.payload,
              };
              break;
            case productConstants.GET_OFFERS_FUNCTION_CONFIG_FAILURE:
              state = {
                ...state,
                offersFunctionConfig: [],
              };
              break;

              case productConstants.GET_ALL_ACTIVE_CSS_REQUEST:
                state = {
                  ...state,
                  loading: true,
                };
                break;
              case productConstants.GET_ALL_ACTIVE_CSS_SUCCESS:
                state = {
                  ...state,
                  allActiveCSS: action.payload,
                  loading: false,
                };
                break;
              case productConstants.GET_ALL_ACTIVE_CSS_FAILURE:
                state = {
                  ...state,
                  allActiveCSS: [],
                  loading: false,
                };
                break;
  }
  return state;
};
