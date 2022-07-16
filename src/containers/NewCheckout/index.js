import React, { useState, useEffect, useRef } from "react";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import { useHistory } from "react-router-dom";
import "./style.css";
import { Row, Col, Container, Modal } from "react-bootstrap";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";
import { Grid, TextField } from "@mui/material";
import CartCard from "../../components/CartCard";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { saveNewOrder } from "../../actions";
import { InvoiceTable } from "../../components/InvoiceTable";
import Pdf from "react-to-pdf";
import { toast } from "react-toastify";

const CusContainer = styled(Container)`
  margin-top: 50px;
  min-height: calc(100vh - 180px);
  margin-bottom: -40px;
  @media (max-width: 992px) {
    margin-top: 60px;
  }
`;

const MainText = styled(Typography)`
  font-size: 0.9rem;
  font-weight: 600;
  color: #595959;
`;

const POButton = styled(Button)`
  background-color: #00b050;
  height: 50px;
  width: 250px;

  &:hover {
    background-color: #357a38;
  }

  @media (max-width: 992px) {
    width: 100%;
  }
`;

const SPMButton = styled(Button)`
  background-color: #92d050;
  height: 40px;
  &:hover {
    background-color: #548235;
  }
`;

export default function NewCheckout(props) {
  const user = useSelector((state) => state.auth.user);
  const taxDetails = useSelector((state) => state.user.taxDetails);

  const cart = useSelector((state) => state.cart);
  const [subTotal, setSubtotal] = useState(0);
  const [extraSubTotal, setExtraSubTotal] = useState(0);
  const [choiceTotal, setChoiceTotal] = useState(0);
  const [orderResp, setOrderResp] = useStateWithCallbackLazy(null);
  const [show, setShow] = useState(false);
  const [paymentType, setPaymentType] = useState("");
  const [currentPaymentType, setCurrentPaymentType] = useState("");
  const [showInvoice, setShowInvoice] = useState(false);
  const [delCharge, setDelCharge] = useState(0);
  const [height, setHeight] = useState(0);
  const [tableNo, setTableNo] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [emailId, setEmailId] = useState("");

  const dispatch = useDispatch();
  const ref = React.createRef();
  const refH = useRef(null);

  const history = useHistory();

  useEffect(() => {
    if (refH.current) {
      setHeight(refH.current.clientHeight * 0.58);
    }
  });

  const options = {
    unit: "px",
    format: [255, height],
  };

  const renderAllSub = () => {
    const all =
      subTotal +
      (extraSubTotal ? extraSubTotal : 0) +
      (choiceTotal ? choiceTotal : 0);
    return <span>₹ {all.toFixed(2)}</span>;
  };

  const renderTax = (tax) => {
    const all = (
      (subTotal +
        (extraSubTotal ? extraSubTotal : 0) +
        (choiceTotal ? choiceTotal : 0)) *
      (tax.taxPercentage / 100)
    ).toFixed(2);
    return <span>₹ {all}</span>;
  };

  let grandTotalForPayU = 0;

  const renderGrandTot = () => {
    const allSub =
      subTotal +
      (extraSubTotal ? extraSubTotal : 0) +
      (choiceTotal ? choiceTotal : 0);

    let allTax = 0;

    if (taxDetails) {
      taxDetails.forEach((tax) => {
        allTax = allTax + allSub * (tax.taxPercentage / 100);
      });
    }

    const grantTot = allSub + allTax + Number(delCharge);
    grandTotalForPayU = grantTot.toFixed(2);

    return <span>₹ {grantTot.toFixed(2)}</span>;
  };

  const handlePaymentType = () => {
    console.log(paymentType);
    setCurrentPaymentType(paymentType);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseInvoice = () => {
    setShowInvoice(false);
    history.push("/dine-in");
  };
  const handleShowInvoice = () => setShowInvoice(true);

  const placeOrder = async () => {
    try {
      if (!tableNo) {
        toast.error("Table No is required!");
        return;
      }

      const total =
        subTotal +
        (extraSubTotal ? extraSubTotal : 0) +
        (choiceTotal ? choiceTotal : 0);

      let orderDetails = [];
      const allItems = Object.values(cart?.cartItems);

      for (let i = 0; i < allItems.length; i++) {
        const obj = {
          productId: allItems[i].productId,
          orderId: "EMPTY",
          subProductId: allItems[i].subProductId
            ? allItems[i].subProductId
            : "NAA",
          quantity: allItems[i].qty,
          storeId: allItems[i].storeId,
          price: allItems[i].price,
          remarks: allItems[i].specialText,
        };

        if (Object.keys(allItems[i].choiceIng).length > 0) {
          console.log(allItems[i].choiceIng);
          const objCh = {
            productId: allItems[i].productId,
            orderId: "EMPTY",
            subProductId: allItems[i].choiceIng.subProductId
              ? allItems[i].choiceIng.subProductId
              : "NAA",
            quantity: allItems[i].choiceIng.qty ? allItems[i].choiceIng.qty : 1,
            storeId: allItems[i].storeId,
            price: allItems[i].choiceIng.price,
            remarks: allItems[i].choiceIng.specialText
              ? allItems[i].choiceIng.specialText
              : "",
          };
          orderDetails.push(objCh);
        }

        if (Object.keys(allItems[i].extra).length > 0) {
          const allExtra = Object.values(allItems[i].extra);

          for (let k = 0; k < allExtra.length; k++) {
            const objextra = {
              productId: allItems[i].productId,
              orderId: "EMPTY",
              subProductId: allExtra[k].subProductId
                ? allExtra[k].subProductId
                : "NAA",
              quantity: allExtra[k].qty ? allExtra[k].qty : 1,
              storeId: allItems[i].storeId,
              price: allExtra[k].price,
              remarks: allExtra[k].specialText ? allExtra[k].specialText : "",
            };
            orderDetails.push(objextra);
          }
        }

        orderDetails.push(obj);
      }

      let cgstCaluclatedValue = 0;
      let sgstCalculatedValue = 0;

      if (taxDetails) {
        taxDetails.forEach((tax) => {
          if (tax.taxCategory.toUpperCase() === "CGST") {
            cgstCaluclatedValue = total * (tax.taxPercentage / 100);
          }
          if (tax.taxCategory.toUpperCase() === "SGST") {
            sgstCalculatedValue = total * (tax.taxPercentage / 100);
          }
        });
      }

      let overallPriceWithTax =
        Number(total) +
        Number(cgstCaluclatedValue.toFixed(2)) +
        Number(sgstCalculatedValue.toFixed(2)) +
        Number(delCharge);

      const NewOrder = {
        id: 0,
        orderId: "EMPTY",
        restaurantId: props.restaurantId,
        storeId: props.storeId,
        //orderSource: "W",
        orderSource: "DINE-IN",
        //customerId: 106,
        customerId: "000",
        orderReceivedDateTime: new Date(),
        //orderDeliveryType: "SELF-COLLECT",
        orderDeliveryType: "DINE-IN",
        storeTableId: tableNo,
        orderStatus: "SUBMITTED",
        taxRuleId: 1,
        totalPrice: total,
        paymentStatus: "PAID",
        paymentMode: currentPaymentType,
        deliveryCharges: 0,
        customerAddressId: null,
        cgstCalculatedValue: cgstCaluclatedValue.toFixed(2),
        sgstCalculatedValue: sgstCalculatedValue.toFixed(2),
        overallPriceWithTax: overallPriceWithTax,
        orderDetails: orderDetails,
        createdBy: user.firstName,
        mobileNumber: phoneNo ? phoneNo : "0000000000",
        customerName: `${firstName} ${lastName}`,
        emailId,
      };

      console.log(NewOrder);

      const result = await dispatch(saveNewOrder(NewOrder)).then((res) => {
        if (res && res.data) {
          console.log(res.data);
          setOrderResp(res.data[0], () => {
            handleShowInvoice();
          });

          return res.data;
        }
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const resetPaymentMethod = () => {
    setCurrentPaymentType("");
  };

  const handleSubTotal = (total) => {
    setSubtotal(total);
  };

  const handleExtraTotal = (total) => {
    setExtraSubTotal(total);
  };

  const handleChoiceTotal = (total) => {
    setChoiceTotal(total);
  };

  const handleChangePaymentType = (event) => {
    setPaymentType(event.target.value);
  };

  const renderNowDate = () => {
    const dateObj = new Date();
    const month = dateObj.toLocaleString("default", { month: "short" });
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    return (
      <span>
        {day}/{month.toUpperCase()}/{year}
      </span>
    );
  };

  const renderNowTime = () => {
    const dateObj = new Date();
    const time = dateObj.toLocaleString("en-US", {
      hour: "numeric",
      hour12: true,
      minute: "numeric",
    });

    return <span>{time}</span>;
  };

  const renderInvoiceModal = () => {
    return (
      <Modal
        show={showInvoice}
        onHide={handleCloseInvoice}
        style={{ zIndex: 1100 }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <Typography>Invoice</Typography>
          </Modal.Title>
        </Modal.Header>
        {orderResp ? (
          <Modal.Body style={{ maxHeight: "75vh", overflowY: "auto" }}>
            {props.storeObj ? (
              <div ref={ref}>
                <div ref={refH}>
                  <div className="text-center">
                    <Typography sx={{ fontWeight: "600" }}>Hangries</Typography>
                    <Typography sx={{ color: "black" }}>
                      <span>{props.storeObj.address1}</span>
                      {props.storeObj.address2 ? (
                        <>
                          , <span>{props.storeObj.address2}</span>
                        </>
                      ) : null}
                      {props.storeObj.address3 ? (
                        <>
                          , <br></br>
                          <span>{props.storeObj.address3}</span>
                        </>
                      ) : null}
                      , {props.storeObj.city}
                      {props.storeObj.zipCode ? (
                        <>, {props.storeObj.zipCode}</>
                      ) : null}
                      , {props.storeObj.country}
                    </Typography>
                    <Typography sx={{ fontWeight: "600" }}>
                      Order ID: {orderResp ? orderResp.orderId : null}
                    </Typography>
                    <Typography sx={{ fontWeight: "600" }}>
                      Customer Name: {orderResp ? orderResp.customerName : null}
                    </Typography>
                    <Typography sx={{ fontWeight: "600" }}>
                      Order No: {orderResp ? orderResp.id : null}
                    </Typography>
                    <Typography sx={{ fontWeight: "600" }}>
                      <span>DINE-IN</span>
                      <span>
                        [{orderResp ? orderResp.paymentStatus : null}]
                      </span>
                    </Typography>
                  </div>
                  <hr></hr>
                  <div>
                    <Typography sx={{ color: "black" }}>
                      Name: {firstName} {lastName}
                    </Typography>
                    <Typography sx={{ color: "black" }}>
                      Mob No: {phoneNo}
                    </Typography>
                  </div>
                  <hr></hr>
                  <div>
                    <Typography sx={{ color: "black" }}>
                      <Row>
                        <Col>Time: {renderNowTime()}</Col>
                        <Col>Date: {renderNowDate()}</Col>
                      </Row>
                    </Typography>
                  </div>
                  <hr></hr>
                  <div>
                    <InvoiceTable
                      allProducts={orderResp.orderDetails}
                      grandTot={orderResp.totalPrice}
                      cgst={orderResp.cgstCalculatedValue}
                      sgst={orderResp.sgstCalculatedValue}
                      overallPriceWithTax={orderResp.overallPriceWithTax}
                      delCharge={delCharge}
                      fullResp={orderResp}
                    ></InvoiceTable>
                  </div>
                </div>
              </div>
            ) : null}
          </Modal.Body>
        ) : null}

        <Modal.Footer>
          <Row className="w-100">
            <Col className="col-6">
              <Button
                color="secondary"
                onClick={handleCloseInvoice}
                className="w-100"
                variant="contained"
              >
                Close
              </Button>
            </Col>
            <Col className="col-6">
              <Pdf
                targetRef={ref}
                filename="invoice.pdf"
                options={options}
                x={0.8}
              >
                {({ toPdf }) => (
                  <Button
                    color="primary"
                    onClick={toPdf}
                    className="w-100"
                    variant="contained"
                  >
                    Download Invoice
                  </Button>
                )}
              </Pdf>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    );
  };

  const renderPayUModal = () => {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Secure Form Example</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Check refer to the{" "}
            <a href="card_tokenization.html#secureform">Secure Form section</a>.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <div style={{ marginTop: "-35px" }}>
      <div className="wh-background">
        <CusContainer className="pb-2">
          <Row className="pt-2">
            <Typography
              sx={{
                textAlign: "center",
                marginBottom: "20px",
                color: "#C00000",
                fontWeight: "bold",
                width: "100%",
              }}
              variant="h4"
              component="h4"
            >
              <span
                style={{
                  width: "10vw",
                  height: "5px",
                  backgroundColor: "#C00000",
                  display: "inline-block",
                  marginBottom: "7px",
                }}
              ></span>{" "}
              CHECKOUT{" "}
              <span
                style={{
                  width: "10vw",
                  height: "5px",
                  backgroundColor: "#C00000",
                  display: "inline-block",
                  marginBottom: "7px",
                }}
              ></span>
            </Typography>
          </Row>
          <Row>
            <Col md={12} lg={4} className="mar-tp-f">
              <Row>
                <Col className="col-12 text-center">
                  <h5
                    style={{
                      fontWeight: "bold",
                      color: "#000",
                      fontSize: "1.1rem",
                    }}
                  >
                    VALIDATE YOUR ORDER
                  </h5>
                </Col>
              </Row>
              <div>
                <Card
                  sx={{
                    width: "100%",
                    marginTop: 3,
                    height: "468px",
                    overflowY: "auto",
                  }}
                >
                  <CardContent sx={{ height: "auto" }}>
                    <CartCard
                      onChangeSubTotal={handleSubTotal}
                      onChangeExtraSubTotal={handleExtraTotal}
                      onChangeChoiceTotal={handleChoiceTotal}
                    ></CartCard>
                    {Object.keys(cart.cartItems).length > 0 ? (
                      <Typography>
                        <Row className="pl-2">
                          <div className="w75">
                            <Typography
                              sx={{
                                fontSize: "0.9rem",
                                fontWeight: "600",
                                fontFamily: "Arial",
                                color: "#595959",
                              }}
                            >
                              Subtotal
                            </Typography>
                          </div>
                          <div className="w25">
                            <Typography
                              sx={{
                                fontSize: "0.9rem",
                                fontWeight: "600",
                                color: "#2e7d32",
                              }}
                            >
                              {renderAllSub()}
                            </Typography>
                          </div>
                        </Row>
                        <Row className="pl-2">
                          {taxDetails ? (
                            <>
                              {taxDetails.map((tax) => (
                                <>
                                  <div className="w75">
                                    <Typography
                                      sx={{
                                        fontSize: "0.9rem",
                                        fontWeight: "600",
                                        fontFamily: "Arial",
                                        color: "#595959",
                                      }}
                                    >
                                      Taxes ({tax.taxCategory}{" "}
                                      {tax.taxPercentage}%)
                                    </Typography>
                                  </div>
                                  <div className="w25">
                                    <Typography
                                      sx={{
                                        fontSize: "0.9rem",
                                        fontWeight: "600",
                                        color: "#2e7d32",
                                      }}
                                    >
                                      {renderTax(tax)}
                                    </Typography>
                                  </div>
                                </>
                              ))}
                            </>
                          ) : null}
                        </Row>

                        <Row className="pl-2">
                          <div className="w75 mt-2">
                            <Typography
                              sx={{
                                fontSize: "0.9rem",
                                fontWeight: "600",
                                fontFamily: "Arial",
                                color: "#595959",
                              }}
                            >
                              Grand Total
                            </Typography>
                          </div>
                          <div className="w25 mt-2">
                            <Typography
                              sx={{
                                fontSize: "0.9rem",
                                fontWeight: "600",
                                color: "#2e7d32",
                              }}
                            >
                              {renderGrandTot()}
                            </Typography>
                          </div>
                        </Row>
                      </Typography>
                    ) : null}
                  </CardContent>
                </Card>
              </div>
            </Col>
            <Col md={12} lg={4} className="mar-tp">
              <Row>
                <Col className="col-12 text-center">
                  <h5
                    style={{
                      fontWeight: "bold",
                      color: "#000",
                      fontSize: "1.1rem",
                    }}
                  >
                    ADD TABLE NO & CUSTOMER DETAILS
                  </h5>
                </Col>
              </Row>
              <Row>
                <Col className="col-12">
                  <Grid sx={{ width: "100%", marginTop: 3 }}>
                    <Card
                      sx={{ width: "100%", marginTop: 3, minHeight: "468px" }}
                    >
                      <CardContent>
                        <div>
                          <Row className="align-items-center">
                            <Col className="pr-0">
                              <MainText>Select Table No</MainText>
                            </Col>
                            <Col className="pl-0">
                              <FormControl fullWidth>
                                <InputLabel id="tableNO">
                                  Select Table No
                                </InputLabel>
                                <Select
                                  labelId="tableNO"
                                  value={tableNo}
                                  label="Select Table No"
                                  onChange={(event) => {
                                    setTableNo(event.target.value);
                                  }}
                                  fullWidth
                                >
                                  <MenuItem value={"UPPER-01"}>
                                    UPPER-01
                                  </MenuItem>
                                  <MenuItem value={"LOWER-02"}>
                                    LOWER-02
                                  </MenuItem>
                                </Select>
                              </FormControl>
                            </Col>
                          </Row>
                        </div>
                        <div style={{ marginTop: "100px" }}>
                          <Row className="align-items-center">
                            <Col className="pr-0">
                              <MainText>Customer First Name</MainText>
                            </Col>
                            <Col className="pl-0">
                              <TextField
                                label="Customer First Name"
                                value={firstName}
                                onChange={(event) => {
                                  setFirstName(event.target.value);
                                }}
                              />
                            </Col>
                          </Row>
                        </div>
                        <div className="mt-3">
                          <Row className="align-items-center">
                            <Col className="pr-0">
                              <MainText>Customer Last Name</MainText>
                            </Col>
                            <Col className="pl-0">
                              <TextField
                                label="Customer Last Name"
                                value={lastName}
                                onChange={(event) => {
                                  setLastName(event.target.value);
                                }}
                              />
                            </Col>
                          </Row>
                        </div>
                        <div className="mt-3">
                          <Row className="align-items-center">
                            <Col className="pr-0">
                              <MainText>Phone No</MainText>
                            </Col>
                            <Col className="pl-0">
                              <TextField
                                label="Phone No"
                                value={phoneNo}
                                onChange={(event) => {
                                  setPhoneNo(event.target.value);
                                }}
                              />
                            </Col>
                          </Row>
                        </div>
                        <div className="mt-3">
                          <Row className="align-items-center">
                            <Col className="pr-0">
                              <MainText>Email Id</MainText>
                            </Col>
                            <Col className="pl-0">
                              <TextField
                                label="Email Id"
                                value={emailId}
                                onChange={(event) => {
                                  setEmailId(event.target.value);
                                }}
                              />
                            </Col>
                          </Row>
                        </div>
                      </CardContent>
                    </Card>
                  </Grid>
                </Col>
              </Row>
            </Col>
            <Col md={12} lg={4} className="mar-tp">
              <Row>
                <Col className="col-12 text-center">
                  <h5
                    style={{
                      fontWeight: "bold",
                      color: "#000",
                      fontSize: "1.1rem",
                    }}
                  >
                    PAYMENT INFO
                  </h5>
                </Col>
              </Row>

              <Row>
                <Col className="col-12">
                  <Grid sx={{ width: "100%", marginTop: 3 }}>
                    {!currentPaymentType ? (
                      <Card sx={{ minHeight: "468px" }}>
                        <FormControl sx={{ marginLeft: 3, marginTop: 2 }}>
                          <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={paymentType}
                            onChange={handleChangePaymentType}
                          >
                            <FormControlLabel
                              value="CASH"
                              control={<Radio color="success" />}
                              label={
                                <Typography
                                  sx={{
                                    color: "#595959",
                                    fontSize: "0.9rem",
                                    fontWeight: "600",
                                    fontFamily: "Arial",
                                  }}
                                >
                                  Cash
                                </Typography>
                              }
                            />
                            <FormControlLabel
                              value="GooglePay"
                              control={<Radio color="success" />}
                              label={
                                <Typography
                                  sx={{
                                    color: "#595959",
                                    fontSize: "0.9rem",
                                    fontWeight: "600",
                                    fontFamily: "Arial",
                                  }}
                                >
                                  GooglePay
                                </Typography>
                              }
                            />
                            <FormControlLabel
                              value="PayTM"
                              control={<Radio color="success" />}
                              label={
                                <Typography
                                  sx={{
                                    color: "#595959",
                                    fontSize: "0.9rem",
                                    fontWeight: "600",
                                    fontFamily: "Arial",
                                  }}
                                >
                                  PayTM
                                </Typography>
                              }
                            />
                            <FormControlLabel
                              value="Credit Card"
                              control={<Radio color="success" />}
                              label={
                                <Typography
                                  sx={{
                                    color: "#595959",
                                    fontSize: "0.9rem",
                                    fontWeight: "600",
                                    fontFamily: "Arial",
                                  }}
                                >
                                  Credit Card
                                </Typography>
                              }
                            />
                            <FormControlLabel
                              value="Debit Card"
                              control={<Radio color="success" />}
                              label={
                                <Typography
                                  sx={{
                                    color: "#595959",
                                    fontSize: "0.9rem",
                                    fontWeight: "600",
                                    fontFamily: "Arial",
                                  }}
                                >
                                  Debit Card
                                </Typography>
                              }
                            />
                            <FormControlLabel
                              value="PhonePe"
                              control={<Radio color="success" />}
                              label={
                                <Typography
                                  sx={{
                                    color: "#595959",
                                    fontSize: "0.9rem",
                                    fontWeight: "600",
                                    fontFamily: "Arial",
                                  }}
                                >
                                  PhonePe
                                </Typography>
                              }
                            />
                            <FormControlLabel
                              value="Amazon Pay"
                              control={<Radio color="success" />}
                              label={
                                <Typography
                                  sx={{
                                    color: "#595959",
                                    fontSize: "0.9rem",
                                    fontWeight: "600",
                                    fontFamily: "Arial",
                                  }}
                                >
                                  Amazon Pay
                                </Typography>
                              }
                            />
                          </RadioGroup>
                        </FormControl>
                        <CardActions>
                          <SPMButton
                            variant="contained"
                            color="success"
                            className="w-100"
                            onClick={handlePaymentType}
                            disabled={paymentType ? false : true}
                          >
                            SELECT PAYMENT METHOD
                          </SPMButton>
                        </CardActions>
                      </Card>
                    ) : null}

                    {currentPaymentType ? (
                      <Card className="p-3" sx={{ minHeight: "468px" }}>
                        <Row>
                          <Col>
                            <p>You selected {currentPaymentType}!</p>
                          </Col>
                          <Col>
                            <Button
                              onClick={resetPaymentMethod}
                              variant="contained"
                              color="warning"
                              sx={{ width: "100%", height: "100%" }}
                            >
                              Reset
                            </Button>
                          </Col>
                        </Row>
                      </Card>
                    ) : null}
                  </Grid>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col className="text-center p-3">
              <POButton
                onClick={placeOrder}
                variant="contained"
                disabled={
                  Object.keys(cart?.cartItems).length > 0 && currentPaymentType
                    ? false
                    : true
                }
              >
                PLACE ORDER
              </POButton>
            </Col>
          </Row>
        </CusContainer>
      </div>
      {renderInvoiceModal()}
      {renderPayUModal()}
    </div>
  );
}
