import React, { useRef, useEffect } from "react";
import { Row, Col, Modal } from "react-bootstrap";
import styled from "@emotion/styled";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Add, Remove } from "@mui/icons-material";
import vegSvg from "../../img/veg.svg";
import chili from "../../img/chili.svg";
import nonvegSvg from "../../img/non-veg.svg";
import pizzaPic from "../../img/pizzaPic.jpg";
import thinImg from "../../img/thin.svg";
import panImg from "../../img/pan.svg";
import cheeseImg from "../../img/cheese.svg";
import noImage from "../../img/no-img.png";
import Delete from "@mui/icons-material/Delete";
import {
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormGroup,
  Checkbox,
  TextField,
} from "@mui/material";
import { addToCartNew, getMenuIngredientsByProductId } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { imagePath } from "../../urlConfig";
import { imagePathHome } from "../../urlConfig";

import "./style.css";

const imageExt = ".jpg";

const CheckoutButton = styled(Button)`
  background-color: rgb(130, 187, 55);

  &:hover {
    background-color: rgb(130, 187, 55);
  }
`;

const CusBox = styled(Box)`
  max-height: 800px;
  overflow-y: auto;

  @media (max-width: 992px) {
    max-height: 90vh;
  }
`;

const PriceTypography = styled(Typography)`
  font-size: 0.75rem;
  font-weight: 600;
  font-family: Arial;
  color: #2e7d32;
  @media (max-width: 992px) {
    font-size: 0.9rem;
  }
`;

const CusModal = styled(Modal)`
  & .modal-dialog {
    max-width: 600px;
  }

  z-index: 1100;

  @media (max-width: 600px) {
    & .modal-dialog {
      max-width: 100%;
    }
  }
`;

const IncButton = styled(Button)`
  width: 25px !important;
  height: 25px;
  min-width: 25px !important;
  font-size: 1rem !important;
  font-weight: 600;
  background-color: #fff;
  color: #595959;
  border: none;

  &:hover {
    background-color: #f2f3f4;
  }
`;

const VegImg = styled.img`
  position: absolute;
  left: 5px;
  top: 5px;
`;

const CusCardMedia = styled(CardMedia)`
  &:hover {
    cursor: pointer;
  }

  height: 100px;
  width: 100%;

  @media (max-width: 1200px) {
    height: 100px;
  }

  @media (max-width: 992px) {
    height: 100px;
  }

  @media (max-width: 768px) {
    height: 100px;
  }

  @media (max-width: 576px) {
    height: 100px;
  }
`;

const CustRow = styled(Row)`
  height: 80px;
  @media (max-width: 600px) {
    height: 16vw;
  }
`;

const CusTypography = styled(Typography)`
  @media (max-width: 600px) {
    min-height: 38px; //55 if three line title
  }
`;

const AddButton = styled(Button)`
  width: 100%;
  font-size: 0.7rem;
  min-width: 40px;

  @media (max-width: 600px) {
    width: 80%;
    font-size: 0.8rem;
  }
`;

export default function ProductCard(props) {
  const [open, setOpen] = React.useState(false);
  const [showPictureModal, setshowPictureModal] = React.useState(false);
  const [dishCusType, setDishCusType] = React.useState("1");
  const [image, setImage] = React.useState("");
  const [imageName, setImageName] = React.useState("");
  const [choiseIngrdients, setChoiseIngrdients] = React.useState([]);
  const [toppingIngrdients, setToppingIngrdients] = React.useState([]);
  const [dishSize, setDishSize] = React.useState(props.product.productSize);
  const [currentProduct, setCurrentProduct] = React.useState(props.product);
  const [toppingCustomization, setToppingCustomization] = React.useState({});
  const [toppingSubTotal, setToppingSubTotal] = React.useState(0);
  const [choice, setChoice] = React.useState("");
  const [choiceObj, setChoiceObj] = React.useState({});
  const [toppings, setToppings] = React.useState({});
  const [selectedCusProd, setSelectedCusProd] = React.useState({});
  const [specialText, setSpecialText] = React.useState("");
  const [qty, setQty] = React.useState(1);

  const user = useSelector((state) => state.auth.user);
  const cart = useSelector((state) => state.cart);
  let ingredients = useSelector((state) => state.product.ingredients);

  let { check } = toppingCustomization;

  const dispatch = useDispatch();
  const prevProduct = useRef();

  const handleSpecialText = (event) => {
    setSpecialText(event.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
    dispatch(
      getMenuIngredientsByProductId(
        currentProduct.productId,
        props.restaurantId,
        props.storeId
      )
    );
    //extra topings api comes here(replace ingredients with toppings)
  };
  const handleClose = () => setOpen(false);

  const handleClosePictureModal = () => setshowPictureModal(false);
  const handleShowPictureModal = () => setshowPictureModal(true);

  useEffect(() => {
    prevProduct.current = currentProduct;
    console.log(currentProduct);
    let filteredArrayTopping = [];
    for (let i = 0; i < ingredients.length; i++) {
      if (ingredients[i].category === "Topping") {
        filteredArrayTopping.push(ingredients[i]);
      }
    }
    setToppingIngrdients(filteredArrayTopping);

    let filteredArrayChoise = [];
    for (let i = 0; i < ingredients.length; i++) {
      if (ingredients[i].category === "Choise of Base") {
        filteredArrayChoise.push(ingredients[i]);
      }
    }
    setChoiseIngrdients(filteredArrayChoise);
  }, [
    currentProduct,
    cart?.cartItems,
    props.product.dishType,
    props.product.productId,
    ingredients,
  ]);

  const onQuantityIncrement = (productId) => {
    let newQty = qty + 1;
    setQty(newQty);
    calculateSubTotal();
  };

  const onQuantityDecrement = (productId) => {
    if (qty !== 0) {
      let newQty = qty - 1;
      setQty(newQty);
    }

    calculateSubTotal();
  };

  const handleSelectedCusProd = (product) => {
    setSelectedCusProd(product);
    console.log(product.productId);
  };

  const handleDishCusType = (event) => {
    setDishCusType(event.target.value);
  };
  const handleDishSize = (event) => {
    console.log(event.target.value);
    setDishSize(event.target.value);
  };

  const handleChoice = (event) => {
    setChoice(event.target.value);
    console.log(event.target.value);
  };

  const handleCurrentProduct = (curProduct) => {
    setCurrentProduct(curProduct);

    const cartProd = cart?.cartItems[curProduct.productId];

    console.log("cartprod");
    console.log(cartProd);

    if (cartProd) {
      /* setQty(cartProd.qty);
      setChoiceObj(cartProd.choiceIng);
      setChoice(cartProd.choiceIng.ingredientType);
      setToppings(cartProd.extra);
      setSpecialText(cartProd.specialText ? cartProd.specialText : ""); */
      setChoice("");
      setChoiceObj({});
      setToppingSubTotal(0);
      setToppings({});
      //new qty = 1
      setQty(1);
    } else {
      setChoice("");
      setChoiceObj({});
      setToppingSubTotal(0);
      setToppings({});
      //new qty = 1
      setQty(1);
    }
  };

  const calculateSubTotal = () => {
    let total = 0;
    for (let key of Object.keys(cart?.cartItems)) {
      total = total + cart?.cartItems[key].qty * cart?.cartItems[key].price;
    }

    props.onChangeSubTotal(total);
  };

  const handleCustomization = (event) => {
    setToppingCustomization({
      ...toppingCustomization,
      [event.target.name]: event.target.checked,
    });
    console.log(toppingCustomization);
  };

  const handleClearCheckBox = () => {
    setToppings({});
    calculateToppingTotal();
  };

  const handleExtra = (ing) => {
    const existing = toppings[ing.subProductId];
    if (existing) {
      delete toppings[ing.subProductId];
    } else {
      toppings[ing.subProductId] = { ...ing };
    }
    calculateToppingTotal();
    console.log(toppings);
  };

  const calculateToppingTotal = () => {
    let extraTotal = 0;
    for (let key of Object.keys(toppings)) {
      extraTotal = extraTotal + toppings[key].price;
    }
    console.log(extraTotal);
    setToppingSubTotal(extraTotal);
  };

  const showCustPrice = () => {
    const choicePrice = choiceObj && choiceObj.price ? choiceObj.price : 0;
    const toppingAllPrice = toppingSubTotal ? toppingSubTotal : 0;
    const prodTotal =
      currentProduct && currentProduct.price ? qty * currentProduct.price : 0;

    const total = prodTotal + choicePrice * qty + toppingAllPrice * qty;
    return <span>{Number(total).toFixed(2)}</span>;
  };

  const renderPictureModal = () => {
    return (
      <Modal
        show={showPictureModal}
        onHide={handleClosePictureModal}
        style={{
          marginTop: "65px",
          zIndex: 1100,
          paddingBottom: "60px",
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{imageName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img style={{ width: "100%" }} src={image} alt="Product" />
        </Modal.Body>
      </Modal>
    );
  };

  const renderCustomizeModal = () => {
    return (
      <CusModal
        show={open}
        onHide={() => {
          handleClose();
          //calculateSubTotal();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ padding: "0px" }}
      >
        <Modal.Header closeButton>Customise Order</Modal.Header>
        <CusBox>
          <Modal.Body
            style={{
              backgroundColor: "#f7f7f7",
              paddingTop: 0,
              paddingLeft: 0,
              paddingBottom: 0,
            }}
          >
            <Row className="p-0 m-0">
              <Col className="col-3 p-0 cus-side-back"></Col>
              <Col className="col-9 ps-1 pe-0 pt-0 pb-0 m-0">
                <div>
                  <div>
                    {currentProduct.productSize !== "Regular" ? (
                      <>
                        <div>
                          <div
                            className="text-center"
                            style={{
                              backgroundColor: "#FFC000",
                              color: "#fff",
                            }}
                          >
                            <Typography sx={{ fontWeight: "bold" }}>
                              Size
                            </Typography>
                          </div>
                          <FormControl
                            sx={{
                              width: "100%",
                              marginTop: "-22px",
                            }}
                          >
                            <RadioGroup
                              aria-labelledby="demo-controlled-radio-buttons-group"
                              name="controlled-radio-buttons-group"
                              value={dishSize}
                              onChange={handleDishSize}
                              defaultValue={currentProduct.productId}
                            >
                              <Row className="align-items-center">
                                {props.products.map((dupProduct) =>
                                  dupProduct.dishType ===
                                  currentProduct.dishType ? (
                                    <Col className="col-4">
                                      <FormControlLabel
                                        value={dupProduct.productSize}
                                        control={
                                          <Radio
                                            onClick={() => {
                                              handleCurrentProduct(dupProduct);
                                              if (
                                                !cart?.cartItems[
                                                  dupProduct.productId
                                                ]
                                              ) {
                                                /* replaceCartItem(
                                                  dupProduct,
                                                  currentProduct.productId
                                                ); */
                                              }
                                              dispatch(
                                                getMenuIngredientsByProductId(
                                                  dupProduct.productId,
                                                  props.restaurantId,
                                                  props.storeId
                                                )
                                              );
                                              //setChoice("");
                                              //handleClearCheckBox();
                                            }}
                                          />
                                        }
                                        label={
                                          <Typography
                                            sx={{
                                              fontSize: "0.75rem !important",
                                              fontWeight: "600",
                                              fontFamily: "Arial",
                                              color: "#FF0000",
                                              textAlign: "center",
                                            }}
                                          >
                                            <CustRow className="justify-content-center align-items-end">
                                              {dupProduct.productSize ===
                                              "Small" ? (
                                                <img
                                                  style={{ width: "40%" }}
                                                  src={pizzaPic}
                                                  alt="pizza"
                                                ></img>
                                              ) : dupProduct.productSize ===
                                                "Medium" ? (
                                                <img
                                                  style={{ width: "50%" }}
                                                  src={pizzaPic}
                                                  alt="pizza"
                                                ></img>
                                              ) : dupProduct.productSize ===
                                                "Large" ? (
                                                <img
                                                  style={{ width: "60%" }}
                                                  src={pizzaPic}
                                                  alt="pizza"
                                                ></img>
                                              ) : (
                                                <img
                                                  style={{ width: "50%" }}
                                                  src={pizzaPic}
                                                  alt="pizza"
                                                ></img>
                                              )}
                                            </CustRow>
                                            <Row
                                              className="justify-content-center"
                                              style={{ marginTop: "3px" }}
                                            >
                                              <div className="text-center w-100">
                                                <p
                                                  style={{
                                                    margin: 0,
                                                    lineHeight: 1,
                                                  }}
                                                >
                                                  {dupProduct.productSize}
                                                </p>
                                              </div>

                                              <br></br>
                                              <div style={{ marginTop: "5px" }}>
                                                {currentProduct.productId ===
                                                dupProduct.productId ? (
                                                  <span
                                                    style={{
                                                      fontWeight: "600",
                                                      backgroundColor:
                                                        "#548235",
                                                      color: "#fff",
                                                      padding: "6px",
                                                      borderRadius: "5px",
                                                      width: "100%",
                                                      display: "block",
                                                    }}
                                                  >
                                                    + ₹ {dupProduct.price}
                                                  </span>
                                                ) : (
                                                  <span
                                                    style={{
                                                      fontWeight: "600",
                                                      backgroundColor:
                                                        "#696969",
                                                      color: "#fff",
                                                      padding: "6px",
                                                      borderRadius: "5px",
                                                      width: "100%",
                                                      display: "block",
                                                    }}
                                                  >
                                                    + ₹ {dupProduct.price}
                                                  </span>
                                                )}
                                              </div>
                                            </Row>
                                            <br></br>
                                          </Typography>
                                        }
                                        className="pizzaRound"
                                        sx={{ marginLeft: "0px" }}
                                        labelPlacement="bottom"
                                      />
                                    </Col>
                                  ) : null
                                )}
                              </Row>
                            </RadioGroup>
                          </FormControl>
                        </div>
                      </>
                    ) : null}
                  </div>
                  <div>
                    {choiseIngrdients.length > 0 ? (
                      <>
                        <div>
                          <div
                            className="text-center"
                            style={{
                              backgroundColor: "#FFC000",
                              color: "#fff",
                            }}
                          >
                            <Typography sx={{ fontWeight: "bold" }}>
                              Choice of Base
                            </Typography>
                          </div>
                          <FormControl
                            sx={{
                              width: "100%",
                              marginTop: "-20px",
                            }}
                          >
                            <RadioGroup
                              aria-labelledby="demo-controlled-radio-buttons-group"
                              name="controlled-radio-buttons-group"
                              value={choice}
                              onChange={handleChoice}
                            >
                              <Row className="align-items-center">
                                {choiseIngrdients?.map((choiceIng) => (
                                  <Col className="col-4">
                                    <FormControlLabel
                                      value={choiceIng.ingredientType}
                                      control={
                                        <Radio
                                          onClick={() => {
                                            setChoiceObj(choiceIng);
                                          }}
                                        />
                                      }
                                      label={
                                        <Typography
                                          sx={{
                                            fontSize: "0.75rem !important",
                                            fontWeight: "600",
                                            fontFamily: "Arial",
                                            color: "#FF0000",
                                            textAlign: "center",
                                            paddingBottom: "15px",
                                          }}
                                        >
                                          <Row className="justify-content-center align-items-end">
                                            {choiceIng.ingredientType ===
                                            "Thincrust" ? (
                                              <img
                                                style={{ width: "50%" }}
                                                src={thinImg}
                                                alt="thin"
                                              ></img>
                                            ) : choiceIng.ingredientType ===
                                              "Cheese Burst" ? (
                                              <img
                                                style={{ width: "50%" }}
                                                src={cheeseImg}
                                                alt="cheese"
                                              ></img>
                                            ) : choiceIng.ingredientType ===
                                              "Pan" ? (
                                              <img
                                                style={{ width: "50%" }}
                                                src={panImg}
                                                alt="pan"
                                              ></img>
                                            ) : (
                                              <img
                                                style={{ width: "50%" }}
                                                src={panImg}
                                                alt="pan"
                                              ></img>
                                            )}
                                          </Row>

                                          <Row className="justify-content-center ">
                                            <div className="text-center w-100">
                                              <p
                                                style={{
                                                  margin: 0,
                                                  lineHeight: 1,
                                                }}
                                              >
                                                {choiceIng.ingredientType}
                                              </p>
                                            </div>

                                            <br></br>
                                            <div style={{ marginTop: "5px" }}>
                                              {choice ===
                                              choiceIng.ingredientType ? (
                                                <span
                                                  style={{
                                                    fontWeight: "600",
                                                    backgroundColor: "#548235",
                                                    color: "#fff",
                                                    padding: "6px",
                                                    borderRadius: "5px",
                                                    width: "100%",
                                                    display: "block",
                                                  }}
                                                >
                                                  + ₹ {choiceIng.price}
                                                </span>
                                              ) : (
                                                <span
                                                  style={{
                                                    fontWeight: "600",
                                                    backgroundColor: "#696969",
                                                    color: "#fff",
                                                    padding: "6px",
                                                    borderRadius: "5px",
                                                    width: "100%",
                                                    display: "block",
                                                  }}
                                                >
                                                  + ₹ {choiceIng.price}
                                                </span>
                                              )}
                                            </div>
                                          </Row>
                                        </Typography>
                                      }
                                      className="pizzaRound"
                                      sx={{ marginLeft: "0px" }}
                                      labelPlacement="bottom"
                                    />
                                  </Col>
                                ))}
                              </Row>
                            </RadioGroup>
                          </FormControl>
                        </div>
                      </>
                    ) : null}
                  </div>
                  <div style={{ marginTop: "0px" }}>
                    {toppingIngrdients.length > 0 ? (
                      <>
                        <div>
                          <div
                            className="text-center"
                            style={{
                              backgroundColor: "#FFC000",
                              color: "#fff",
                            }}
                          >
                            <Typography sx={{ fontWeight: "bold" }}>
                              Toppings
                            </Typography>
                          </div>
                          <FormGroup>
                            <Row
                              className="align-items-center"
                              style={{ width: "103%" }}
                            >
                              {toppingIngrdients.map((ing) => (
                                <Col className="col-6 pr-0">
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={
                                          toppings[ing.subProductId]
                                            ? true
                                            : false
                                        }
                                        onChange={(e) => {
                                          handleCustomization(e);
                                          handleExtra(ing);
                                        }}
                                        name={ing.ingredientType}
                                      />
                                    }
                                    label={
                                      <Typography
                                        sx={{
                                          fontSize: "0.75rem !important",
                                          fontWeight: "400",
                                          fontFamily: "Arial",
                                          color: "#595959",
                                          width: "100%",
                                        }}
                                      >
                                        <Row className="align-items-center">
                                          <Col className="col-6">
                                            {ing.ingredientType}
                                          </Col>
                                          <Col className="col-6 ">
                                            <Row className="m-0 p-0 justify-content-end">
                                              {toppings[ing.subProductId] ? (
                                                <span
                                                  style={{
                                                    fontWeight: "600",
                                                    backgroundColor: "#548235",
                                                    color: "#fff",
                                                    padding: "6px",
                                                    textAlign: "center",
                                                  }}
                                                >
                                                  + ₹ {ing.price}
                                                </span>
                                              ) : (
                                                <span
                                                  style={{
                                                    fontWeight: "600",
                                                    backgroundColor: "#696969",
                                                    color: "#fff",
                                                    padding: "6px",
                                                    textAlign: "center",
                                                  }}
                                                >
                                                  {" "}
                                                  + ₹ {ing.price}{" "}
                                                </span>
                                              )}
                                            </Row>
                                          </Col>
                                        </Row>
                                      </Typography>
                                    }
                                    sx={{
                                      width: "100%",
                                      marginRight: "0px",
                                      marginLeft: "0px",
                                    }}
                                    className="borderRound"
                                  />
                                </Col>
                              ))}
                            </Row>
                          </FormGroup>
                        </div>
                      </>
                    ) : null}
                  </div>

                  <div>
                    <br></br>
                    <Row>
                      <Col className="col-12">
                        <TextField
                          id="outlined-multiline-static"
                          label={
                            <Typography
                              sx={{
                                fontSize: "0.75rem !important",
                                fontWeight: "400",
                                fontFamily: "Arial",
                                color: "#595959",
                              }}
                            >
                              Special Instructions
                            </Typography>
                          }
                          multiline
                          rows={1}
                          sx={{ width: "100%" }}
                          InputProps={{
                            style: {
                              fontSize: "1rem",
                              fontWeight: "400",
                              fontFamily: "Arial",
                              color: "#595959",
                            },
                          }}
                          value={specialText}
                          onChange={handleSpecialText}
                        />
                      </Col>
                    </Row>
                  </div>
                </div>
                <div>
                  <br></br>
                  <Row className="align-items-center pb-2">
                    <Col className="col-4">
                      <ButtonGroup
                        variant="contained"
                        aria-label="outlined primary button group"
                      >
                        <IncButton
                          sx={{ border: "none !important" }}
                          onClick={() => {
                            onQuantityDecrement(currentProduct?.productId);
                          }}
                        >
                          {qty < 2 ? (
                            <Delete sx={{ fontSize: "0.9rem" }}></Delete>
                          ) : (
                            <Remove sx={{ fontSize: "0.9rem" }}></Remove>
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
                              fontSize: "0.9rem",
                            }}
                          >
                            {qty}
                          </Typography>{" "}
                        </IncButton>

                        <IncButton
                          onClick={() => {
                            onQuantityIncrement(currentProduct?.productId);
                          }}
                        >
                          <Add sx={{ fontSize: "0.9rem" }}></Add>
                        </IncButton>
                      </ButtonGroup>
                    </Col>
                    <Col className="col-8">
                      <CheckoutButton
                        className="w-100"
                        variant="contained"
                        onClick={() => {
                          dispatch(
                            addToCartNew(
                              currentProduct,
                              qty,
                              toppings,
                              toppingSubTotal,
                              specialText,
                              choiceObj,
                              true
                            )
                          ).then((res) => {
                            if (res) {
                              setChoice("");
                              setChoiceObj({});
                              setToppingSubTotal(0);
                              setToppings({});
                              //new qty = 1
                              setQty(1);
                            }
                          });
                          calculateSubTotal();
                          setSpecialText("");
                          handleClose();
                        }}
                      >
                        Add to my order ₹ {showCustPrice()}
                      </CheckoutButton>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Modal.Body>
        </CusBox>
      </CusModal>
    );
  };

  return (
    <div>
      <Card
        sx={{
          maxWidth: 345,
          marginTop: 5,
          position: "relative",
        }}
      >
        {!currentProduct?.imagePath ||
        currentProduct?.imagePath === "No_Image_Found" ? (
          <CusCardMedia
            component="img"
            image={noImage}
            alt="product"
            onClick={() => {
              handleShowPictureModal();
              setImage(noImage);
              setImageName(props.product?.dishType);
            }}
          />
        ) : (
          <CusCardMedia
            component="img"
            // image={`${imagePathHome}/${"R001"}/${currentProduct?.imagePath}${imageExt}`}
            image={`${imagePathHome}/${user.restaurantId}/${currentProduct?.imagePath}`}
            alt="product"
            onClick={() => {
              handleShowPictureModal();
              // setImage(`${imagePathHome}/${"R001"}/${currentProduct?.imagePath}${imageExt}`);
              setImage(`${imagePathHome}/${user.restaurantId}/${currentProduct?.imagePath}`);
              setImageName(props.product?.dishType);
            }}
          />
        )}

        {props.product?.dishCategory === "Veg" ? (
          <VegImg src={vegSvg} alt="veg" />
        ) : (
          <VegImg src={nonvegSvg} alt="non-veg" />
        )}
        <VegImg src={vegSvg} alt="veg" />

        <CardContent sx={{ padding: "5px", minHeight: "43px" }}>
          <CusTypography
            sx={{
              fontSize: "0.7rem",
              fontWeight: "600",
              fontFamily: "Arial",
              color: "#595959",
            }}
            gutterBottom
            variant="h5"
            component="div"
          >
            {props.product?.dishType === "Fries" ? (
              <>
                {props.product?.dishType} ({props.product?.productSize})
              </>
            ) : (
              <>{props.product?.dishType}</>
            )}

            {currentProduct.dishSpiceIndicatory === "Less Spicy" && (
              <>
                <img
                  style={{ width: "10px", marginLeft: "5px" }}
                  src={chili}
                  alt="less-spicy"
                />
              </>
            )}
            {currentProduct.dishSpiceIndicatory === "Medium Spicy" && (
              <>
                <img
                  style={{ width: "10px", marginLeft: "5px" }}
                  src={chili}
                  alt="less-spicy"
                />
                <img
                  style={{ width: "10px", marginLeft: "5px" }}
                  src={chili}
                  alt="less-spicy"
                />
              </>
            )}
            {currentProduct.dishSpiceIndicatory === "Extra Hot" && (
              <>
                <img
                  style={{ width: "10px", marginLeft: "5px" }}
                  src={chili}
                  alt="less-spicy"
                />
                <img
                  style={{ width: "10px", marginLeft: "5px" }}
                  src={chili}
                  alt="less-spicy"
                />
                <img
                  style={{ width: "10px", marginLeft: "5px" }}
                  src={chili}
                  alt="less-spicy"
                />
              </>
            )}
          </CusTypography>
          {props.product?.commonImage === "Y" ? (
            <Typography
              sx={{
                fontSize: "0.75rem",
                fontWeight: "400",
                fontFamily: "Arial",
                color: "#767171",
              }}
              variant="body2"
              color="text.secondary"
            >
              {props.product?.dishDescriptionId}
            </Typography>
          ) : null}
        </CardContent>
        <CardActions>
          <Row
            className="w-100 align-items-center justify-content-start"
            style={{ margin: "0px" }}
          >
            <Col className="col-6 p-0">
              <PriceTypography>₹ {props.product?.price}</PriceTypography>
            </Col>
            <Col className="col-6 p-0">
              <AddButton
                onClick={() => {
                  if (props.product.ingredientExistsFalg === "Y") {
                    if (!cart?.cartItems[currentProduct.productId]) {
                      /* dispatch(
                        addToCartNew(
                          currentProduct,
                          1,
                          toppings,
                          toppingSubTotal,
                          specialText,
                          //choiseIngrdients[0]
                          null
                        )
                      ); */
                      calculateSubTotal();
                    }
                    /* setChoice(
                      cart?.cartItems[currentProduct.productId]?.choiceIng
                        ? cart?.cartItems[currentProduct.productId]?.choiceIng
                            ?.ingredientType
                        : choiseIngrdients[0]?.ingredientType
                    );
                    setSpecialText(
                      cart?.cartItems[currentProduct?.productId]?.specialText
                        ? cart?.cartItems[currentProduct?.productId]
                            ?.specialText
                        : ""
                    );
                    setQty(
                      cart?.cartItems[currentProduct?.productId]?.qty
                        ? cart?.cartItems[currentProduct?.productId]?.qty
                        : 1
                    );
                    setChoiceObj(
                      cart?.cartItems[currentProduct?.productId]?.choiceIng
                        ? cart?.cartItems[currentProduct?.productId]?.choiceIng
                        : choiceObj
                    );
                    setToppings(
                      cart?.cartItems[currentProduct?.productId]?.extra
                        ? cart?.cartItems[currentProduct?.productId]?.extra
                        : {}
                    ); */

                    handleOpen();
                  } else {
                    /* dispatch(
                    getMenuIngredientsByProductId(currentProduct.productId)
                  ).then((res) => {
                    ingredients = res;
                  }); */
                    dispatch(
                      addToCartNew(
                        currentProduct,
                        1,
                        toppings,
                        toppingSubTotal,
                        specialText,
                        //choiseIngrdients[0]
                        null
                      )
                    );
                    calculateSubTotal();
                  }
                }}
                variant="contained"
                color="error"
              >
                Add
              </AddButton>
            </Col>
          </Row>
        </CardActions>
      </Card>
      {renderCustomizeModal()}
      {renderPictureModal()}
    </div>
  );
}
