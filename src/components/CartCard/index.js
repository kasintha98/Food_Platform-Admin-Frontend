import React, { useEffect, useRef, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Add, Remove } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { addToCartNew } from "../../actions";
import Delete from "@mui/icons-material/Delete";
import styled from "@emotion/styled";
import emptyCartImg3 from "./../../img/empty-cart3.jpg";
import "./style.css";

const IncButton = styled(Button)`
  width: 25px !important;
  height: 25px;
  min-width: 25px !important;
  font-size: 1rem !important;
  font-weight: 600;
  background-color: #fff;
  color: #595959;
  border: none;
  padding: 0;

  &:hover {
    background-color: #f2f3f4;
  }
`;

const CusRow = styled(Row)`
  & p {
    line-height: 1 !important;
    margin-bottom: 0.3rem;
  }
`;

export default function CartCard(props) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const ref = useRef(null);

  const [divWidth, setDivWidth] = useState(0);

  useEffect(() => {
    calculateSubTotal();
    calculateExtraTotal();
    calculateChoiceTotal();
  });

  useEffect(() => {
    const width = ref.current ? ref.current.offsetWidth : 0;
    setDivWidth(width);
  }, [ref.current]);

  const onQuantityIncrement = (productId) => {
    dispatch(addToCartNew({ ...cart.cartItems[productId], key: productId }, 1));
    calculateSubTotal();
    props.onChangeSpecialOfferCheckBOGO &&
      props.onChangeSpecialOfferCheckBOGO();
    props.onChangeSpecialOfferCheckDRINK29 &&
      props.onChangeSpecialOfferCheckDRINK29();

    props.onChangeSpecialOfferCheckFRIES69 &&
      props.onChangeSpecialOfferCheckFRIES69();

    props.onChangeSpecialOfferCheckCOMBO1 &&
      props.onChangeSpecialOfferCheckCOMBO1();

    props.onChangeSpecialOfferCheckCOMBO2 &&
      props.onChangeSpecialOfferCheckCOMBO2();

    props.onChangeSpecialOfferCheckPASTA59 &&
      props.onChangeSpecialOfferCheckPASTA59();
  };

  const onQuantityDecrement = (productId) => {
    dispatch(
      addToCartNew({ ...cart.cartItems[productId], key: productId }, -1)
    );
    calculateSubTotal();
    props.onChangeSpecialOfferCheckBOGO &&
      props.onChangeSpecialOfferCheckBOGO();
    props.onChangeSpecialOfferCheckDRINK29 &&
      props.onChangeSpecialOfferCheckDRINK29();

    props.onChangeSpecialOfferCheckFRIES69 &&
      props.onChangeSpecialOfferCheckFRIES69();

    props.onChangeSpecialOfferCheckCOMBO1 &&
      props.onChangeSpecialOfferCheckCOMBO1();

    props.onChangeSpecialOfferCheckCOMBO2 &&
      props.onChangeSpecialOfferCheckCOMBO2();

    props.onChangeSpecialOfferCheckPASTA59 &&
      props.onChangeSpecialOfferCheckPASTA59();
  };

  const calculateSubTotal = () => {
    let total = 0;
    for (let key of Object.keys(cart?.cartItems)) {
      total = total + cart?.cartItems[key].qty * cart?.cartItems[key].price;
    }

    if(typeof props.comboOfferReduceKey !== 'undefined' && props.comboOfferReduceKey && props.comboOfferReduceKey.length > 0){
      props.onChangeSubTotal(total + props.offerPriceToAdd);
    }else{
      props.onChangeSubTotal(total);
    }
    // props.onChangeSubTotal(total);
  };

  const calculateExtraTotal = () => {
    let total = 0;
    for (let key of Object.keys(cart?.cartItems)) {
      total = total + cart?.cartItems[key].extraSubTotalWithQty;
    }
    props.onChangeExtraSubTotal(total);
  };

  const calculateChoiceTotal = () => {
    let total = 0;
    for (let key of Object.keys(cart?.cartItems)) {
      if (Object.keys(cart?.cartItems[key]?.choiceIng).length > 0) {
        total = total + cart?.cartItems[key]?.choiceIng.choiceTotal;
      }
    }
    props.onChangeChoiceTotal(total);
  };

  const renderAllTotal = (key) => {
    if (props.bOGOLowestPizzaKey?.some((el) => el.key === key)) {
      return (
        <>
          {(
            props.bOGOLowestPizzaKey.find((x) => x.key === key).qty *
              props.bOGOLowestPizzaKey.find((x) => x.key === key).price +
            (props.bOGOLowestPizzaKey.find((x) => x.key === key)
              .extraSubTotalWithQty
              ? props.bOGOLowestPizzaKey.find((x) => x.key === key)
                  .extraSubTotalWithQty
              : 0) +
            (Object.keys(
              props.bOGOLowestPizzaKey.find((x) => x.key === key)?.choiceIng
            ).length > 0
              ? Number(
                  props.bOGOLowestPizzaKey.find((x) => x.key === key)?.choiceIng
                    .choiceTotal
                    ? props.bOGOLowestPizzaKey.find((x) => x.key === key)
                        ?.choiceIng.choiceTotal
                    : 0
                )
              : 0)
          ).toFixed(2)}
        </>
      );
    } else if (props.drinkReduceKey && props.drinkReduceKey.key === key) {
      return (
        <>
          {/* {cart?.cartItems[key].qty * props.drinkReduceKey.price +
            (cart?.cartItems[key].extraSubTotalWithQty
              ? cart?.cartItems[key].extraSubTotalWithQty
              : 0) +
            (Object.keys(cart?.cartItems[key]?.choiceIng).length > 0
              ? cart?.cartItems[key]?.choiceIng.choiceTotal
              : 0)} */}
          {(
            (Number(cart?.cartItems[key].qty) -
              Number(props.drinkReduceKey.reducingDrinkaQty)) *
              cart?.cartItems[key].price +
            (cart?.cartItems[key].extraSubTotalWithQty
              ? cart?.cartItems[key].extraSubTotalWithQty
              : 0) +
            (Object.keys(cart?.cartItems[key]?.choiceIng).length > 0
              ? cart?.cartItems[key]?.choiceIng.choiceTotal
              : 0)
          ).toFixed(2)}
        </>
      );
    } 
    // else if (props.comboOfferReduceKey !== 'undefined' && props.comboOfferReduceKey && props.comboOfferReduceKey.length > 0) {
    //   return (
    //     <>
    //     {1 *
    //     (props.comboOfferReduceKey &&
    //       props.comboOfferReduceKey[0].key === key
    //       ? props.comboOfferReduceKey[0].price
    //       : cart?.cartItems[key].price) +
    //     (cart?.cartItems[key].extraSubTotalWithQty
    //       ? cart?.cartItems[key].extraSubTotalWithQty
    //       : 0) +
    //     (Object.keys(cart?.cartItems[key]?.choiceIng)
    //       .length > 0
    //       ? cart?.cartItems[key]?.choiceIng
    //           .choiceTotal
    //       : 0).toFixed(2)}
    //       </>
    //   );
    // }
    else if (props.pastaReduceKey && props.pastaReduceKey.pastaKey === key) {
      return (
        <>
          {/* {cart?.cartItems[key].qty * props.pastaReduceKey.newPrice +
            (cart?.cartItems[key].extraSubTotalWithQty
              ? cart?.cartItems[key].extraSubTotalWithQty
              : 0) +
            (Object.keys(cart?.cartItems[key]?.choiceIng).length > 0
              ? cart?.cartItems[key]?.choiceIng.choiceTotal
              : 0)} */}
          {(
            (Number(cart?.cartItems[key].qty) -
              Number(props.pastaReduceKey.reducingPastaQty)) *
              cart?.cartItems[key].price +
            (cart?.cartItems[key].extraSubTotalWithQty
              ? cart?.cartItems[key].extraSubTotalWithQty
              : 0) +
            (Object.keys(cart?.cartItems[key]?.choiceIng).length > 0
              ? cart?.cartItems[key]?.choiceIng.choiceTotal
              : 0)
          ).toFixed(2)}
        </>
      );
    } else if (props.combo1OfferReduceTotal) {
      if (props.combo1OfferReduceTotal.pizzaKey === key) {
        return (
          <>
            {(
              (Number(cart?.cartItems[key].qty) -
                Number(props.combo1OfferReduceTotal.reducingPizzaQty)) *
                cart?.cartItems[key].price +
              (cart?.cartItems[key].extraSubTotalWithQty
                ? cart?.cartItems[key].extraSubTotalWithQty
                : 0) +
              (Object.keys(cart?.cartItems[key]?.choiceIng).length > 0
                ? cart?.cartItems[key]?.choiceIng.choiceTotal
                : 0)
            ).toFixed(2)}
          </>
        );
      } else if (props.combo1OfferReduceTotal.noodlesKey === key) {
        return (
          <>
            {(
              (Number(cart?.cartItems[key].qty) -
                Number(props.combo1OfferReduceTotal.reducingNoodlesQty)) *
                cart?.cartItems[key].price +
              (cart?.cartItems[key].extraSubTotalWithQty
                ? cart?.cartItems[key].extraSubTotalWithQty
                : 0) +
              (Object.keys(cart?.cartItems[key]?.choiceIng).length > 0
                ? cart?.cartItems[key]?.choiceIng.choiceTotal
                : 0)
            ).toFixed(2)}
          </>
        );
      } else if (props.combo1OfferReduceTotal.manchuriKey === key) {
        return (
          <>
            {(
              (Number(cart?.cartItems[key].qty) -
                Number(props.combo1OfferReduceTotal.reducingManchuriQty)) *
                cart?.cartItems[key].price +
              (cart?.cartItems[key].extraSubTotalWithQty
                ? cart?.cartItems[key].extraSubTotalWithQty
                : 0) +
              (Object.keys(cart?.cartItems[key]?.choiceIng).length > 0
                ? cart?.cartItems[key]?.choiceIng.choiceTotal
                : 0)
            ).toFixed(2)}
          </>
        );
      } else if (
        props.combo1OfferReduceTotal.drinkObj.some((el) => el.productId === key)
      ) {
        return (
          <>
            {(
              (Number(cart?.cartItems[key].qty) -
                Number(
                  props.combo1OfferReduceTotal.drinkObj.find(
                    (x) => x.key === key
                  ).reducingDrinkQty
                )) *
                cart?.cartItems[key].price +
              (cart?.cartItems[key].extraSubTotalWithQty
                ? cart?.cartItems[key].extraSubTotalWithQty
                : 0) +
              (Object.keys(cart?.cartItems[key]?.choiceIng).length > 0
                ? cart?.cartItems[key]?.choiceIng.choiceTotal
                : 0)
            ).toFixed(2)}
          </>
        );
      } else {
        return (
          <>
            {(
              cart?.cartItems[key].qty * cart?.cartItems[key].price +
              (cart?.cartItems[key].extraSubTotalWithQty
                ? cart?.cartItems[key].extraSubTotalWithQty
                : 0) +
              (Object.keys(cart?.cartItems[key]?.choiceIng).length > 0
                ? cart?.cartItems[key]?.choiceIng.choiceTotal
                : 0)
            ).toFixed(2)}
          </>
        );
      }
    } else if (props.combo2OfferReduceTotal) {
      if (props.combo2OfferReduceTotal.pizzaKey === key) {
        return (
          <>
            {(
              (Number(cart?.cartItems[key].qty) -
                Number(props.combo2OfferReduceTotal.reducingPizzaQty)) *
                cart?.cartItems[key].price +
              (cart?.cartItems[key].extraSubTotalWithQty
                ? cart?.cartItems[key].extraSubTotalWithQty
                : 0) +
              (Object.keys(cart?.cartItems[key]?.choiceIng).length > 0
                ? cart?.cartItems[key]?.choiceIng.choiceTotal
                : 0)
            ).toFixed(2)}
          </>
        );
      } else if (props.combo2OfferReduceTotal.garBreadKey === key) {
        return (
          <>
            {(
              (Number(cart?.cartItems[key].qty) -
                Number(props.combo2OfferReduceTotal.reducingBreadQty)) *
                cart?.cartItems[key].price +
              (cart?.cartItems[key].extraSubTotalWithQty
                ? cart?.cartItems[key].extraSubTotalWithQty
                : 0) +
              (Object.keys(cart?.cartItems[key]?.choiceIng).length > 0
                ? cart?.cartItems[key]?.choiceIng.choiceTotal
                : 0)
            ).toFixed(2)}
          </>
        );
      } else if (props.combo2OfferReduceTotal.lavaCakeKey === key) {
        return (
          <>
            {(
              (Number(cart?.cartItems[key].qty) -
                Number(props.combo2OfferReduceTotal.reducingLavaQty)) *
                cart?.cartItems[key].price +
              (cart?.cartItems[key].extraSubTotalWithQty
                ? cart?.cartItems[key].extraSubTotalWithQty
                : 0) +
              (Object.keys(cart?.cartItems[key]?.choiceIng).length > 0
                ? cart?.cartItems[key]?.choiceIng.choiceTotal
                : 0)
            ).toFixed(2)}
          </>
        );
      } else if (props.combo2OfferReduceTotal.pastaKey === key) {
        return (
          <>
            {(
              (Number(cart?.cartItems[key].qty) -
                Number(props.combo2OfferReduceTotal.reducingPastaQty)) *
                cart?.cartItems[key].price +
              (cart?.cartItems[key].extraSubTotalWithQty
                ? cart?.cartItems[key].extraSubTotalWithQty
                : 0) +
              (Object.keys(cart?.cartItems[key]?.choiceIng).length > 0
                ? cart?.cartItems[key]?.choiceIng.choiceTotal
                : 0)
            ).toFixed(2)}
          </>
        );
      } else if (
        props.combo2OfferReduceTotal.drinkObj.some((el) => el.productId === key)
      ) {
        return (
          <>
            {(
              (Number(cart?.cartItems[key].qty) -
                Number(
                  props.combo2OfferReduceTotal.drinkObj.find(
                    (x) => x.key === key
                  ).reducingDrinkQty
                )) *
                cart?.cartItems[key].price +
              (cart?.cartItems[key].extraSubTotalWithQty
                ? cart?.cartItems[key].extraSubTotalWithQty
                : 0) +
              (Object.keys(cart?.cartItems[key]?.choiceIng).length > 0
                ? cart?.cartItems[key]?.choiceIng.choiceTotal
                : 0)
            ).toFixed(2)}
          </>
        );
      } else {
        return (
          <>
            {(
              cart?.cartItems[key].qty * cart?.cartItems[key].price +
              (cart?.cartItems[key].extraSubTotalWithQty
                ? cart?.cartItems[key].extraSubTotalWithQty
                : 0) +
              (Object.keys(cart?.cartItems[key]?.choiceIng).length > 0
                ? cart?.cartItems[key]?.choiceIng.choiceTotal
                : 0)
            ).toFixed(2)}
          </>
        );
      }
    } else if (props.friesOfferReduceTotal) {
      if (props.friesOfferReduceTotal.drinkKey === key) {
        return (
          <>
            {(
              (Number(cart?.cartItems[key].qty) -
                Number(props.friesOfferReduceTotal.reducingDrinkQty)) *
                cart?.cartItems[key].price +
              (cart?.cartItems[key].extraSubTotalWithQty
                ? cart?.cartItems[key].extraSubTotalWithQty
                : 0) +
              (Object.keys(cart?.cartItems[key]?.choiceIng).length > 0
                ? cart?.cartItems[key]?.choiceIng.choiceTotal
                : 0)
            ).toFixed(2)}
          </>
        );
      } else if (props.friesOfferReduceTotal.friesKey === key) {
        return (
          <>
            {(
              (Number(cart?.cartItems[key].qty) -
                Number(props.friesOfferReduceTotal.reducingFriesQty)) *
                cart?.cartItems[key].price +
              (cart?.cartItems[key].extraSubTotalWithQty
                ? cart?.cartItems[key].extraSubTotalWithQty
                : 0) +
              (Object.keys(cart?.cartItems[key]?.choiceIng).length > 0
                ? cart?.cartItems[key]?.choiceIng.choiceTotal
                : 0)
            ).toFixed(2)}
          </>
        );
      } else {
        return (
          <>
            {(
              cart?.cartItems[key].qty * cart?.cartItems[key].price +
              (cart?.cartItems[key].extraSubTotalWithQty
                ? cart?.cartItems[key].extraSubTotalWithQty
                : 0) +
              (Object.keys(cart?.cartItems[key]?.choiceIng).length > 0
                ? cart?.cartItems[key]?.choiceIng.choiceTotal
                : 0)
            ).toFixed(2)}
          </>
        );
      }
    } else {
      return (
        <>
          {(
            cart?.cartItems[key].qty * cart?.cartItems[key].price +
            (cart?.cartItems[key].extraSubTotalWithQty
              ? cart?.cartItems[key].extraSubTotalWithQty
              : 0) +
            (Object.keys(cart?.cartItems[key]?.choiceIng).length > 0
              ? cart?.cartItems[key]?.choiceIng.choiceTotal
              : 0)
          ).toFixed(2)}
        </>
      );
    }
  };

  const pizzaProductPriceRender = (key) => {
    if (
      props.bOGOLowestPizzaKey &&
      props.bOGOLowestPizzaKey.some((el) => el.key === key)
    ) {
      return (
        <>
          {(
            props.bOGOLowestPizzaKey.find((x) => x.key === key).price *
            props.bOGOLowestPizzaKey.find((x) => x.key === key).qty
          ).toFixed(2)}
        </>
      );
    } else if (
      props.combo1OfferReduceTotal &&
      props.combo1OfferReduceTotal.pizzaKey === key
    ) {
      return (
        <>
          {(
            cart?.cartItems[key].price *
            (Number(cart?.cartItems[key].qty) -
              Number(props.combo1OfferReduceTotal.reducingPizzaQty))
          ).toFixed(2)}
        </>
      );
    } else if (
      props.combo2OfferReduceTotal &&
      props.combo2OfferReduceTotal.pizzaKey === key
    ) {
      return (
        <>
          {(
            cart?.cartItems[key].price *
            (Number(cart?.cartItems[key].qty) -
              Number(props.combo2OfferReduceTotal.reducingPizzaQty))
          ).toFixed(2)}
        </>
      );
    } else {
      return (
        <>
          {(cart?.cartItems[key].price * cart?.cartItems[key].qty).toFixed(2)}
        </>
      );
    }
  };

  return (
    <div ref={ref}>
      {Object.keys(cart?.cartItems).length > 0 ? (
        <>
          {Object.keys(cart?.cartItems).map((key, index) => (
            <Card
              key={index}
              sx={{
                maxWidth: "100%",
                marginBottom: "15px",
                boxShadow: "none",
                backgroundColor: "#fff",
              }}
            >
              <CusRow>
                <Col className="col-12" style={{ paddingLeft: "30px" }}>
                  <div>
                    <Row className="align-items-center">
                      <div className="w375 mr-0 pr-0">
                        <Typography variant="body2" color="text.secondary">
                          <p
                            style={{
                              marginBottom: "0.5rem",
                              fontSize: "0.75rem",
                              fontWeight: "600",
                              fontFamily: "Arial",
                              color: "#595959",
                            }}
                          >
                            {cart?.cartItems[key].dishType}
                          </p>
                        </Typography>
                      </div>
                      <div className="w375 p-0 m-0 text-center">
                        <ButtonGroup
                          variant="contained"
                          aria-label="outlined primary button group"
                          sx={{ marginTop: "5px" }}
                        >
                          <IncButton
                            sx={{ border: "none !important" }}
                            onClick={() => {
                              onQuantityDecrement(key);
                            }}
                          >
                            {cart?.cartItems[key].qty < 2 ? (
                              <Delete sx={{ fontSize: "0.75rem" }}></Delete>
                            ) : (
                              <Remove sx={{ fontSize: "0.75rem" }}></Remove>
                            )}
                          </IncButton>

                          <IncButton
                            sx={{
                              borderLeft: "1px solid #bdbdbd !important",
                              borderRight: "1px solid #bdbdbd !important",
                            }}
                            InputProps={{ disabled: true }}
                          >
                            <Typography
                              sx={{
                                fontSize: "0.75rem",
                              }}
                            >
                              {cart?.cartItems[key].qty}
                            </Typography>{" "}
                          </IncButton>
                          <IncButton
                            onClick={() => {
                              onQuantityIncrement(key);
                            }}
                          >
                            <Add sx={{ fontSize: "0.75rem" }}></Add>
                          </IncButton>
                        </ButtonGroup>
                      </div>
                      {typeof props.comboOfferReduceKey !== 'undefined' && props.comboOfferReduceKey && props.comboOfferReduceKey.length > 0
                      ?(
                      <Col className="col-3" style={{ paddingLeft: 0 }}>
                        <div>
                          <p
                            style={{
                              fontSize: "0.75rem",
                              fontWeight: "600",
                              marginTop: "auto",
                              marginBottom: "auto",
                              color: "#2e7d32",
                            }}
                          >
                            ₹ <>
                            {1 *
                                  (props.comboOfferReduceKey &&
                                    props.comboOfferReduceKey[index].key === key
                                    ? props.comboOfferReduceKey[index].price
                                    : cart?.cartItems[key].price) +
                                  (cart?.cartItems[key].extraSubTotalWithQty
                                    ? cart?.cartItems[key].extraSubTotalWithQty
                                    : 0) +
                                  (Object.keys(cart?.cartItems[key]?.choiceIng)
                                    .length > 0
                                    ? cart?.cartItems[key]?.choiceIng
                                        .choiceTotal
                                    : 0)}
                              </>
                          </p>
                        </div>
                      </Col>
                      ):(
                      <Col className="col-3" style={{ paddingLeft: 0 }}>
                        <div>
                          <p
                            style={{
                              fontSize: "0.75rem",
                              fontWeight: "600",
                              marginTop: "auto",
                              marginBottom: "auto",
                              color: "#2e7d32",
                            }}
                          >
                            ₹ {renderAllTotal(key)}
                          </p>
                        </div>
                      </Col>
                      )}
                    </Row>
                  </div>
                  {cart?.cartItems[key].ingredientExistsFalg === "Y" ? (
                    <Typography variant="body2" color="text.secondary">
                      <Typography className="mt-2">
                        <Row>
                          <div className="w75">
                            <span
                              style={{
                                fontSize: "0.75rem",
                                fontWeight: "600",
                                fontFamily: "Arial",
                                color: "#595959",
                                lineHeight: "1",
                              }}
                            >
                              Size :
                            </span>
                            <span
                              style={{
                                fontSize: "0.75rem",
                                fontWeight: "600",
                                fontFamily: "Arial",
                                color: "#595959",
                                lineHeight: "1",
                              }}
                            >
                              {" "}
                              {cart?.cartItems[key].productSize}
                            </span>
                          </div>
                          <div className="w25">
                            <span
                              style={{
                                fontSize: "0.75rem",
                                fontWeight: "600",
                                fontFamily: "Arial",
                                color: "rgb(46, 125, 50)",
                                lineHeight: "1",
                              }}
                            >
                              {"₹ "}
                              {pizzaProductPriceRender(key)}
                            </span>
                          </div>
                        </Row>
                      </Typography>
                      <Typography>
                        <Row>
                          <Col className="pr-0 mr-0 col-12">
                            {cart?.cartItems[key]?.extra &&
                            Object.keys(cart?.cartItems[key]?.extra).length >
                              0 ? (
                              <span
                                style={{
                                  fontSize: "0.75rem",
                                  fontWeight: "600",
                                  fontFamily: "Arial",
                                  color: "#595959",
                                  lineHeight: "1",
                                }}
                              >
                                Extra Topping :{" "}
                              </span>
                            ) : null}
                          </Col>
                        </Row>
                        <Row>
                          <Col className="p-0 mr-0  col-12">
                            <Row className="m-0">
                              {cart?.cartItems[key]?.extra ? (
                                <>
                                  {Object.keys(cart?.cartItems[key]?.extra).map(
                                    (index) => (
                                      <>
                                        <div className="w75">
                                          <span
                                            style={{
                                              fontSize: "0.75rem",
                                              fontWeight: "400",
                                              fontFamily: "Arial",
                                              color: "#767171",
                                              lineHeight: "1",
                                            }}
                                          >
                                            {
                                              cart?.cartItems[key]?.extra[index]
                                                .ingredientType
                                            }
                                          </span>
                                        </div>
                                        <div className="w25">
                                          <span
                                            style={{
                                              fontSize: "0.75rem",
                                              fontWeight: "600",
                                              fontFamily: "Arial",
                                              color: "rgb(46, 125, 50)",
                                              lineHeight: "1",
                                            }}
                                          >
                                            {"₹ "}
                                            {props.bOGOLowestPizzaKey?.some(
                                              (el) => el.key === key
                                            ) ? (
                                              <>
                                                {Number(
                                                  props.bOGOLowestPizzaKey.find(
                                                    (x) => x.key === key
                                                  )?.extra[index].price *
                                                    props.bOGOLowestPizzaKey.find(
                                                      (x) => x.key === key
                                                    ).qty
                                                ).toFixed(2)}
                                              </>
                                            ) : (
                                              <>
                                                {Number(
                                                  cart?.cartItems[key]?.extra[
                                                    index
                                                  ].price *
                                                    cart?.cartItems[key].qty
                                                ).toFixed(2)}
                                              </>
                                            )}
                                          </span>
                                        </div>
                                      </>
                                    )
                                  )}
                                </>
                              ) : null}
                            </Row>
                          </Col>
                        </Row>
                      </Typography>
                      <Typography>
                        {cart?.cartItems[key]?.choiceIng &&
                        Object.keys(cart?.cartItems[key]?.choiceIng).length >
                          1 ? (
                          <>
                            <Row>
                              <Col className="pr-0 mr-0 col-9">
                                <span
                                  style={{
                                    fontSize: "0.75rem",
                                    fontWeight: "600",
                                    fontFamily: "Arial",
                                    color: "#595959",
                                    lineHeight: "1",
                                  }}
                                >
                                  Base:{" "}
                                </span>
                                <span
                                  style={{
                                    fontSize: "0.75rem",
                                    fontWeight: "600",
                                    fontFamily: "Arial",
                                    color: "#767171",
                                    lineHeight: "1",
                                  }}
                                >
                                  {
                                    cart?.cartItems[key]?.choiceIng
                                      .ingredientType
                                  }
                                </span>
                              </Col>
                              <div className="w25">
                                <span
                                  style={{
                                    fontSize: "0.75rem",
                                    fontWeight: "600",
                                    fontFamily: "Arial",
                                    color: "rgb(46, 125, 50)",
                                    lineHeight: "1",
                                  }}
                                >
                                  {"₹ "}
                                  {props.bOGOLowestPizzaKey?.some(
                                    (el) => el.key === key
                                  ) ? (
                                    <>
                                      {Number(
                                        props.bOGOLowestPizzaKey.find(
                                          (x) => x.key === key
                                        )?.choiceIng.price *
                                          props.bOGOLowestPizzaKey.find(
                                            (x) => x.key === key
                                          ).qty
                                      ).toFixed(2)}
                                    </>
                                  ) : (
                                    <>
                                      {Number(
                                        cart?.cartItems[key]?.choiceIng.price *
                                          cart?.cartItems[key].qty
                                      ).toFixed(2)}
                                    </>
                                  )}
                                </span>
                              </div>
                            </Row>
                          </>
                        ) : null}
                      </Typography>

                      {cart?.cartItems[key].specialText ? (
                        <p>
                          <span
                            style={{
                              fontSize: "0.75rem",
                              fontWeight: "600",
                              fontFamily: "Arial",
                              color: "#595959",
                              lineHeight: "1",
                            }}
                          >
                            Special Request:
                          </span>
                          <span
                            style={{
                              fontSize: "0.75rem",
                              fontWeight: "400",
                              fontFamily: "Arial",
                              color: "#767171",
                              lineHeight: "1",
                            }}
                          >
                            {" "}
                            {cart?.cartItems[key].specialText}
                          </span>
                        </p>
                      ) : null}
                    </Typography>
                  ) : null}
                </Col>
              </CusRow>
              <hr></hr>
            </Card>
          ))}
        </>
      ) : (
        <img
          style={{ width: "100%" }}
          height={"393px"}
          src={emptyCartImg3}
          alt="Empty Cart"
        />
      )}
    </div>
  );
}
