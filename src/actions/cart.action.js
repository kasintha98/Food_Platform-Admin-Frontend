import { cartConstants } from "./constants";
import store from "../store";
import axios from "../helpers/axios";
import { toast } from "react-toastify";

//action to get cart items from database
const getCartItems = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
      const res = await axios.post("/user/getCartItems");
      if (res.status === 200) {
        const { cartItems } = res.data;
        console.log({ getCartItems: cartItems });
        if (cartItems) {
          dispatch({
            type: cartConstants.ADD_TO_CART_SUCCESS,
            payload: { cartItems },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

//action to add items to cart
export const addToCart = (product, newQty) => {
  return async (dispatch) => {
    const {
      cart: { cartItems },
      auth,
    } = store.getState();

    const qty = cartItems[product._id]
      ? parseInt(cartItems[product._id].qty) + newQty
      : newQty;

    cartItems[product._id] = { ...product, qty };

    if (auth.authenticate) {
      dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
      const payload = {
        cartItems: [
          {
            product: product._id,
            quantity: qty,
          },
        ],
      };
      console.log(payload);
      const res = await axios.post("/user/cart/addtocart", payload);
      console.log(res);
      if (res.status === 201) {
        dispatch(getCartItems());
      }
    } else {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }

    console.log("addToCart:", cartItems);

    dispatch({
      type: cartConstants.ADD_TO_CART_SUCCESS,
      payload: { cartItems },
    });
  };
};

//action to update cart details
export const updateCart = () => {
  return async (dispatch) => {
    let cartItems = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : null;

    if (cartItems) {
      dispatch({
        type: cartConstants.ADD_TO_CART_SUCCESS,
        payload: { cartItems },
      });
    }
  };
};

//action to remove items from cart
export const removeCartItem = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: cartConstants.REMOVE_CART_ITEM_REQUEST });
      const res = await axios.post("/user/cart/removeItem", { payload });

      if (res.status === 202) {
        dispatch({ type: cartConstants.REMOVE_CART_ITEM_SUCCESS });
        dispatch(getCartItems());
      } else {
        const { error } = res.data;
        dispatch({
          type: cartConstants.REMOVE_CART_ITEM_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

//action to add items to cart
export const addToCartNew = (
  product,
  newQty,
  extra,
  extraSubTotal,
  specialText,
  choiceIng,
  isCustomQty
) => {
  return async (dispatch) => {
    try {
      const {
        cart: { cartItems },
        auth,
      } = store.getState();

      if (product) {
        let qty = 0;

        if (isCustomQty) {
          qty = newQty;
        } else {
          qty = cartItems[product.productId]
            ? parseInt(cartItems[product.productId].qty) + newQty
            : newQty;
        }

        const extraTotal = extraSubTotal
          ? extraSubTotal
          : cartItems[product.productId]?.extraSubTotal
          ? cartItems[product.productId]?.extraSubTotal
          : 0;

        const extraItems = extra
          ? extra
          : cartItems[product.productId]?.extra
          ? cartItems[product.productId]?.extra
          : {};

        let text = "";

        if (specialText) {
          text = specialText;
        } else if (cartItems[product.productId]?.specialText) {
          text = cartItems[product.productId]?.specialText;
        } else {
          text = "";
        }

        let choice = {};

        if (choiceIng) {
          choice = {
            ...choiceIng,
            choiceTotal: choiceIng.price ? choiceIng.price * qty : 0,
          };
        } else if (cartItems[product.productId]?.choiceIng) {
          choice = {
            ...cartItems[product.productId]?.choiceIng,
            choiceTotal: cartItems[product.productId]?.choiceIng.price
              ? cartItems[product.productId]?.choiceIng.price * qty
              : 0,
          };
        } else {
          choice = {};
        }

        if (qty < 1) {
          delete cartItems[product.productId];
        } else {
          cartItems[product.productId] = {
            ...product,
            qty,
            extra: extraItems,
            extraSubTotal: extraTotal,
            specialText: text,
            choiceIng: choice,
            extraSubTotalWithQty: extraTotal ? extraTotal * qty : 0,
          };
        }

        if (auth.authenticate) {
          dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
          const payload = {
            cartItems: [
              {
                product: product.productId,
                quantity: qty,
              },
            ],
          };
          console.log(payload);
          /* const res = await axios.post("/user/cart/addtocart", payload);
          console.log(res);
          if (res.status === 201) {
            dispatch(getCartItems());
          } */

          localStorage.setItem("cart", JSON.stringify(cartItems));
        } else {
          localStorage.setItem("cart", JSON.stringify(cartItems));
        }

        console.log("addToCart:", cartItems);

        dispatch({
          type: cartConstants.ADD_TO_CART_SUCCESS,
          payload: { cartItems },
        });

        if (newQty < 0) {
          toast.success("Item removed from cart!", {
            position: "top-right",
            autoClose: 2000,
          });
        } else {
          toast.success("Item added to cart!", {
            position: "top-right",
            autoClose: 2000,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const replaceCartItemNew = (newProduct, oldId) => {
  return async (dispatch) => {
    try {
      const {
        cart: { cartItems },
        auth,
      } = store.getState();
      if (cartItems[oldId]) {
        delete Object.assign(cartItems, {
          [newProduct.productId]: cartItems[oldId],
        })[oldId];
        const qty = cartItems[newProduct.productId].qty;
        const text = cartItems[newProduct.productId].specialText
          ? cartItems[newProduct.productId].specialText
          : "";

        cartItems[newProduct.productId] = {
          ...newProduct,
          qty,
          specialText: text,
          choiceIng: {},
        };

        if (auth.authenticate) {
          dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
          const payload = {
            cartItems: [
              {
                product: newProduct.productId,
              },
            ],
          };
          console.log(payload);
          /* const res = await axios.post("/user/cart/addtocart", payload);
      console.log(res);
      if (res.status === 201) {
        dispatch(getCartItems());
      } */
          localStorage.setItem("cart", JSON.stringify(cartItems));
        } else {
          localStorage.setItem("cart", JSON.stringify(cartItems));
        }

        console.log("addToCart:", cartItems);

        dispatch({
          type: cartConstants.ADD_TO_CART_SUCCESS,
          payload: { cartItems },
        });

        toast.success("Item added to cart!", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const resetCart = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: cartConstants.RESET_CART,
        payload: { cartItems: {} },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export { getCartItems };
