import React, { useState, useEffect, useRef } from "react";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import { useHistory } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "./style.css";
import { Row, Col, Container, Modal } from "react-bootstrap";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";
import { Grid, TextField, Checkbox } from "@mui/material";
import CartCard from "../../components/CartCard";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import {
  saveNewOrder,
  addNewCustomer,
  updateCustomerDetails,
  GetCustomerAddress,
  AddUpdateCustomerAddress,
  GetCustomerDetails,
  validateCoupon,
  clearCoupon,
} from "../../actions";
import { InvoiceTable } from "../../components/InvoiceTable";
import Pdf from "react-to-pdf";
import { toast } from "react-toastify";
import "react-phone-number-input/style.css";
import { useReactToPrint } from "react-to-print";
import ReactToPrint from "react-to-print";
import { OrderInvoice } from "../../components/OrderInvoice";
//import { PaytmButton } from "../../components/PayTM/paytmButton";

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

const CusTextField = styled(TextField)`
 & label {
  font-size: 0.75rem;
  top: -11px;
}

& .Mui-focused{
  top: 0px !important;
}

& fieldset{
  font-size: 0.75rem;
}

& .MuiFormLabel-filled{
  top: 0px !important;
}

& input{
  font-size: 0.75rem;
  padding: 0.25rem;
}
 }
`;

export default function NewCheckout(props) {
  const user = useSelector((state) => state.auth.user);
  const currentAddress = useSelector((state) => state.user.currentAddress);
  const taxDetails = useSelector((state) => state.user.taxDetails);
  const couponReduxObj = useSelector((state) => state.user.coupon);
  const deliveryPrice = useSelector((state) => state.user.deliveryPrice);
  const paymentModes = useSelector((state) => state.user.paymentModes);
  const businessDateAll = useSelector((state) => state.user.businessDate);

  const offersData = useSelector((state) => state.user.offersData);
  const [comboOfferReduceKey, setcomboOfferReduceKey] = useState([]);
  const [offerCost, setOfferCost] = useState(0);
  const [applicableTo, setapplicableTo] = useState("");

  const cart = useSelector((state) => state.cart);
  const [subTotal, setSubtotal] = useState(0);
  const [extraSubTotal, setExtraSubTotal] = useState(0);
  const [choiceTotal, setChoiceTotal] = useState(0);
  const [orderResp, setOrderResp] = useStateWithCallbackLazy(null);
  const [show, setShow] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
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
  const [addressType, setAddressType] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [landMark, setLandMark] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [referenceNo, setReferenceNo] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [defaultAddress, setDefaultAddress] = useState(false);
  const [currentGetAddress, setCurrentGetAddress] = useState(null);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [isNewCustomerFunc, setIsNewCustomerFunc] = useState(false);
  const [cardHeight, setCardHeight] = useState(0);
  const [changeAmount, setChangeAmount] = useState("");
  const [balanceAmount, setBalanceAmount] = useState(0);
  const [couponLocalObj, setCouponLocalObj] = useState(null);
  const [bOGOLowestPizzaKey, setBOGOLowestPizzaKey] = useState(null);
  const [drinkReduceKey, setdrinkReduceKey] = useState(null);
  const [allBogoReduceCost, setAllBogoReduceCost] = useState(0);
  const [friesOfferReduceTotal, setfriesOfferReduceTotal] = useState(null);
  const [combo1OfferReduceTotal, setcombo1OfferReduceTotal] = useState(null);
  const [combo2OfferReduceTotal, setcombo2OfferReduceTotal] = useState(null);
  const [pasta59OfferReduceTotal, setPASTA59OfferReduceTotal] = useState(null);
  const [allFoundAddressList, setAllFoundAddressList] = useState([]);
  const [valueAddress, setValueAddress] = useState("");
  const [addressId, setAddressId] = useState(null);
  const [changeAddressObj, setChangeAddressObj] = useState(null);
  const [disableSaveBtn, setDisableSaveBtn] = useState(false);

  const dispatch = useDispatch();
  const ref = React.createRef();
  const refH = useRef(null);
  const refCardHeight = useRef(null);
  const componentRef = useRef();

  const history = useHistory();

  useEffect(() => {
    if (refH.current) {
      setHeight(refH.current.clientHeight * 0.58);
    }
  });

  useEffect(() => {
    if (refCardHeight.current) {
      setCardHeight(refCardHeight.current.clientHeight);
    }
  });

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const options = {
    unit: "px",
    format: [255, height],
  };

  const renderAllSub = () => {
    let all =
      subTotal +
      (extraSubTotal ? extraSubTotal : 0) +
      (choiceTotal ? choiceTotal : 0);

    if (
      couponReduxObj &&
      Number(couponReduxObj.couponDetails.discountPercentage)
    ) {
      const afterAddCoupon =
        (100 - Number(couponReduxObj.couponDetails.discountPercentage)) / 100;
      all = all * afterAddCoupon;
    }

    if (allBogoReduceCost) {
      all = all - Number(allBogoReduceCost);
    }

    if (drinkReduceKey) {
      all =
        all -
        Number(
          drinkReduceKey.drinkObj.price * drinkReduceKey.reducingDrinkaQty
        );
    }

    if (friesOfferReduceTotal) {
      all =
        all -
        Number(friesOfferReduceTotal.reducingCost) -
        Number(friesOfferReduceTotal.price);
    }

    if (combo1OfferReduceTotal) {
      all =
        all -
        Number(combo1OfferReduceTotal.reducingCost) -
        Number(combo1OfferReduceTotal.price);
    }

    if (combo2OfferReduceTotal) {
      all =
        all -
        Number(combo2OfferReduceTotal.reducingCost) -
        Number(combo2OfferReduceTotal.price);
    }

    if (pasta59OfferReduceTotal) {
      all =
        all -
        Number(
          pasta59OfferReduceTotal.pastaObj.price *
            pasta59OfferReduceTotal.reducingPastaQty
        );
    }

    console.log(comboOfferReduceKey);
    if (typeof comboOfferReduceKey !== 'undefined' && comboOfferReduceKey && comboOfferReduceKey.length > 0) {
      var reduceCost = 0;
      for (let i = 0; i < comboOfferReduceKey.length; i++) {
        reduceCost = reduceCost + Number(comboOfferReduceKey[i].reducingCost)
      }
      all = all - reduceCost;
    }

    return <span>₹ {all.toFixed(2)}</span>;
  };

  const renderCouponDiscount = () => {
    let all =
      subTotal +
      (extraSubTotal ? extraSubTotal : 0) +
      (choiceTotal ? choiceTotal : 0);

    if (
      couponReduxObj &&
      Number(couponReduxObj.couponDetails.discountPercentage)
    ) {
      const afterAddCoupon =
        Number(couponReduxObj.couponDetails.discountPercentage) / 100;
      all = all * afterAddCoupon;
    }

    if (allBogoReduceCost) {
      all = all - Number(allBogoReduceCost);
    }

    if (drinkReduceKey) {
      all = all - Number(drinkReduceKey.reducingCost);
    }

    if (friesOfferReduceTotal) {
      all = all - Number(friesOfferReduceTotal.reducingCost);
    }

    if (combo1OfferReduceTotal) {
      all = all - Number(combo1OfferReduceTotal.reducingCost);
    }

    if (combo2OfferReduceTotal) {
      all = all - Number(combo2OfferReduceTotal.reducingCost);
    }

    if (pasta59OfferReduceTotal) {
      all = all - Number(pasta59OfferReduceTotal.reducingCost);
    }

    if (typeof comboOfferReduceKey !== 'undefined' && comboOfferReduceKey && comboOfferReduceKey.length > 0) {
      var reduceCost = 0;
      for (let i = 0; i < comboOfferReduceKey.length; i++) {
        reduceCost = reduceCost + Number(comboOfferReduceKey[i].reducingCost)
      }
      all = all - reduceCost;
    }

    return <span>₹ {all.toFixed(2)}</span>;
  };

  const renderTax = (tax) => {
    let allSub =
      subTotal +
      (extraSubTotal ? extraSubTotal : 0) +
      (choiceTotal ? choiceTotal : 0);

    if (
      couponReduxObj &&
      Number(couponReduxObj.couponDetails.discountPercentage)
    ) {
      const afterAddCoupon =
        (100 - Number(couponReduxObj.couponDetails.discountPercentage)) / 100;
      allSub = allSub * afterAddCoupon;
    }

    if (allBogoReduceCost) {
      allSub = allSub - Number(allBogoReduceCost);
    }

    if (drinkReduceKey) {
      allSub = allSub - Number(drinkReduceKey.reducingCost);
    }

    if (friesOfferReduceTotal) {
      allSub = allSub - Number(friesOfferReduceTotal.reducingCost);
    }

    if (combo1OfferReduceTotal) {
      allSub = allSub - Number(combo1OfferReduceTotal.reducingCost);
    }

    if (combo2OfferReduceTotal) {
      allSub = allSub - Number(combo2OfferReduceTotal.reducingCost);
    }

    if (pasta59OfferReduceTotal) {
      allSub = allSub - Number(pasta59OfferReduceTotal.reducingCost);
    }

    if (typeof comboOfferReduceKey !== 'undefined' && comboOfferReduceKey && comboOfferReduceKey.length > 0) {
      var reduceCost = 0;
      for (let i = 0; i < comboOfferReduceKey.length; i++) {
        reduceCost = reduceCost + Number(comboOfferReduceKey[i].reducingCost)
      }
      allSub = allSub - reduceCost;
    }

    const all = (allSub * (tax.taxPercentage / 100)).toFixed(2);

    return <span>₹ {all}</span>;
  };

  let grandTotalForPayU = 0;

  const renderGrandTot = () => {
    let allSub =
      subTotal +
      (extraSubTotal ? extraSubTotal : 0) +
      (choiceTotal ? choiceTotal : 0);

    if (
      couponReduxObj &&
      Number(couponReduxObj.couponDetails.discountPercentage)
    ) {
      const afterAddCoupon =
        (100 - Number(couponReduxObj.couponDetails.discountPercentage)) / 100;
      allSub = allSub * afterAddCoupon;
    }

    if (allBogoReduceCost) {
      allSub = allSub - Number(allBogoReduceCost);
    }

    if (drinkReduceKey) {
      allSub = allSub - Number(drinkReduceKey.reducingCost);
    }

    if (friesOfferReduceTotal) {
      allSub = allSub - Number(friesOfferReduceTotal.reducingCost);
    }

    if (combo1OfferReduceTotal) {
      allSub = allSub - Number(combo1OfferReduceTotal.reducingCost);
    }

    if (combo2OfferReduceTotal) {
      allSub = allSub - Number(combo2OfferReduceTotal.reducingCost);
    }

    if (pasta59OfferReduceTotal) {
      allSub = allSub - Number(pasta59OfferReduceTotal.reducingCost);
    }

    if (typeof comboOfferReduceKey !== 'undefined' && comboOfferReduceKey && comboOfferReduceKey.length > 0) {
      console.log("IN RENDER GRAND TOTAL NEW");
      var reduceCost = 0;
      for (let i = 0; i < comboOfferReduceKey.length; i++) {
        reduceCost = reduceCost + Number(comboOfferReduceKey[i].reducingCost)
      }
      allSub = allSub - reduceCost;
    }

    let allTax = 0;

    if (taxDetails) {
      taxDetails.forEach((tax) => {
        allTax = allTax + allSub * (tax.taxPercentage / 100);
      });
    }

    const grantTot = allSub + allTax + Number(delCharge);
    grandTotalForPayU = grantTot.toFixed(2);

    return <span>₹ {Math.round(grantTot.toFixed(2))}.00</span>;
  };

  const calcGrandTot = () => {
    let allSub =
      subTotal +
      (extraSubTotal ? extraSubTotal : 0) +
      (choiceTotal ? choiceTotal : 0);

    if (
      couponReduxObj &&
      Number(couponReduxObj.couponDetails.discountPercentage)
    ) {
      const afterAddCoupon =
        (100 - Number(couponReduxObj.couponDetails.discountPercentage)) / 100;
      allSub = allSub * afterAddCoupon;
    }

    if (allBogoReduceCost) {
      allSub = allSub - Number(allBogoReduceCost);
    }

    if (drinkReduceKey) {
      allSub = allSub - Number(drinkReduceKey.reducingCost);
    }

    if (friesOfferReduceTotal) {
      allSub = allSub - Number(friesOfferReduceTotal.reducingCost);
    }

    if (combo1OfferReduceTotal) {
      allSub = allSub - Number(combo1OfferReduceTotal.reducingCost);
    }

    if (combo2OfferReduceTotal) {
      allSub = allSub - Number(combo2OfferReduceTotal.reducingCost);
    }

    if (pasta59OfferReduceTotal) {
      allSub = allSub - Number(pasta59OfferReduceTotal.reducingCost);
    }

    let allTax = 0;

    if (taxDetails) {
      taxDetails.forEach((tax) => {
        allTax = allTax + allSub * (tax.taxPercentage / 100);
      });
    }

    const grantTot = allSub + allTax + Number(delCharge);
    grandTotalForPayU = grantTot.toFixed(2);

    return Math.round(grantTot.toFixed(2));
  };

  const calcDeliveryPrice = () => {
    let allSub =
      subTotal +
      (extraSubTotal ? extraSubTotal : 0) +
      (choiceTotal ? choiceTotal : 0);

    if (
      couponReduxObj &&
      Number(couponReduxObj.couponDetails.discountPercentage)
    ) {
      const afterAddCoupon =
        (100 - Number(couponReduxObj.couponDetails.discountPercentage)) / 100;
      allSub = allSub * afterAddCoupon;
    }

    if (allBogoReduceCost) {
      allSub = allSub - Number(allBogoReduceCost);
    }

    if (drinkReduceKey) {
      allSub = allSub - Number(drinkReduceKey.reducingCost);
    }

    if (friesOfferReduceTotal) {
      allSub = allSub - Number(friesOfferReduceTotal.reducingCost);
    }

    if (combo1OfferReduceTotal) {
      allSub = allSub - Number(combo1OfferReduceTotal.reducingCost);
    }

    if (combo2OfferReduceTotal) {
      allSub = allSub - Number(combo2OfferReduceTotal.reducingCost);
    }

    if (pasta59OfferReduceTotal) {
      allSub = allSub - Number(pasta59OfferReduceTotal.reducingCost);
    }

    if (typeof comboOfferReduceKey !== 'undefined' && comboOfferReduceKey && comboOfferReduceKey.length > 0) {
      var reduceCost = 0;
    for (let i = 0; i < comboOfferReduceKey.length; i++) {
      reduceCost = reduceCost + Number(comboOfferReduceKey[i].reducingCost)
    }
      allSub = allSub - reduceCost;
    }

    let deliveryCharge = 0;

    if (deliveryPrice) {
      deliveryPrice.forEach((delivery) => {
        if (allSub >= delivery.minAmount && allSub <= delivery.maxAmount) {
          deliveryCharge = delivery.deliveryFee;
        }
      });
    }
    setDelCharge(deliveryCharge.toFixed(2));
  };

  const handlePaymentType = () => {
    console.log(paymentType);
    setCurrentPaymentType(paymentType);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseAddress = () => setShowAddress(false);
  const handleShowAddress = () => setShowAddress(true);

  const handleChangeAddress = (event) => {
    setValueAddress(event.target.value);
  };

  const handleCloseInvoice = () => {
    setShowInvoice(false);
    //history.push("/dine-in");
    props.handleCheckoutClose();
  };
  const handleShowInvoice = () => setShowInvoice(true);

  const placeOrder = async () => {
    try {
      if (!tableNo) {
        toast.error("Table No is required!");
        return;
      }
      if (!defaultAddress && !currentGetAddress) {
        toast.error("Address required or select default store address!");
        return;
      }

      setDisableSaveBtn(true);

      let total =
        subTotal +
        (extraSubTotal ? extraSubTotal : 0) +
        (choiceTotal ? choiceTotal : 0);

      let discountAmount = 0;

      if (
        couponReduxObj &&
        Number(couponReduxObj.couponDetails.discountPercentage)
      ) {
        const afterAddCoupon =
          (100 - Number(couponReduxObj.couponDetails.discountPercentage)) / 100;
        total = total * afterAddCoupon;
        discountAmount =
          total *
          (Number(couponReduxObj.couponDetails.discountPercentage) / 100);
      }

      if (allBogoReduceCost) {
        total = total - Number(allBogoReduceCost);
      }

      if (drinkReduceKey) {
        total = total - Number(drinkReduceKey.reducingCost);
      }

      if (friesOfferReduceTotal) {
        total = total - Number(friesOfferReduceTotal.reducingCost);
      }

      if (combo1OfferReduceTotal) {
        total = total - Number(combo1OfferReduceTotal.reducingCost);
      }

      if (combo2OfferReduceTotal) {
        total = total - Number(combo2OfferReduceTotal.reducingCost);
      }

      if (pasta59OfferReduceTotal) {
        total = total - Number(pasta59OfferReduceTotal.reducingCost);
      }

      if (typeof comboOfferReduceKey !== 'undefined' && comboOfferReduceKey && comboOfferReduceKey.length > 0) {
        var reduceCost = 0;
        for (let i = 0; i < comboOfferReduceKey.length; i++) {
          reduceCost = reduceCost + Number(comboOfferReduceKey[i].reducingCost)
        }
        total = total - reduceCost;
      }

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
          foodPackagedFlag: "N",
          createdBy: user.loginId,
          updatedBy: user.loginId,
        };

        if (
          Object.keys(allItems[i].choiceIng).length > 0 &&
          allItems[i].choiceIng.price
        ) {
          console.log(allItems[i].choiceIng);
          const objCh = {
            productId: allItems[i].productId,
            orderId: "EMPTY",
            subProductId: allItems[i].choiceIng.subProductId
              ? allItems[i].choiceIng.subProductId
              : "NAA",
            quantity: allItems[i].qty ? allItems[i].qty : 1,
            storeId: allItems[i].storeId,
            price: allItems[i].choiceIng.price,
            remarks: allItems[i].choiceIng.specialText
              ? allItems[i].choiceIng.specialText
              : "",
            foodPackagedFlag: "N",
            createdBy: user.loginId,
            updatedBy: user.loginId,
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
              quantity: allItems[i].qty ? allItems[i].qty : 1,
              storeId: allItems[i].storeId,
              price: allExtra[k].price,
              remarks: allExtra[k].specialText ? allExtra[k].specialText : "",
              foodPackagedFlag: "N",
              createdBy: user.loginId,
              updatedBy: user.loginId,
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
        orderSource: props.selectedOrderTypeObj.code,
        //customerId: 106,
        customerId: currentCustomer ? currentCustomer.id : 99999,
        orderReceivedDateTime: businessDateAll
          ? new Date(businessDateAll.businessDate)
          : new Date(),
        //orderDeliveryType: "SELF-COLLECT",
        orderDeliveryType: props.selectedOrderTypeObj.name,
        storeTableId: tableNo,
        orderStatus: "SUBMITTED",
        taxRuleId: 1,
        totalPrice: total,
        paymentStatus:
          currentPaymentType === "Not Paid"
            ? "Not Paid"
            : props.selectedOrderTypeObj.paymentStatus,
        paymentMode: currentPaymentType,
        deliveryCharges: Number(delCharge) ? Number(delCharge) : 0,
        packagingCharges: Number(0).toFixed(2),
        discountAmount: discountAmount.toFixed(2),
        customerAddressId: defaultAddress ? 99999 : currentGetAddress.id,
        cgstCalculatedValue: cgstCaluclatedValue.toFixed(2),
        sgstCalculatedValue: sgstCalculatedValue.toFixed(2),
        overallPriceWithTax: Math.round(overallPriceWithTax),
        orderDetails: orderDetails,
        createdBy: user.loginId,
        updatedBy: user.loginId,
        paymentTxnReference: referenceNo,
        couponCode: couponReduxObj
          ? couponReduxObj.couponDetails.couponCode
          : "",
        discountPercentage: couponReduxObj
          ? couponReduxObj.couponDetails.discountPercentage
          : 0,
      };

      console.log(NewOrder);

      const result = await dispatch(saveNewOrder(NewOrder)).then((res) => {
        if (res && res.data) {
          setDisableSaveBtn(false);
          console.log(res.data);
          setOrderResp(res.data[0], () => {
            handleShowInvoice();
          });
          clearCustomer();
          clearAddress();
          dispatch(clearCoupon());
          return res.data;
        } else {
          setDisableSaveBtn(false);
        }
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  var isComboCouponApplied = false;
  var offerString = "";
  localStorage.setItem("offerList",offerString);

  const validateCouponCode = () => {
    if (!couponCode) {
      toast.error("Please fill the coupon code!");
      return;
    }

    if (couponCode === "BOGO") {
      specialOfferCheckBOGO();
      return;
    }else if (couponCode === "DRINK29") {
      specialOfferCheckDRINK29();
      return;
    }else if (couponCode === "FRIES69") {
      specialOfferCheckFRIES69();
      return;
    }else if (couponCode === "COMBO1") {
      specialOfferCheckCOMBO1();
      return;
    }else if (couponCode === "COMBO2") {
      specialOfferCheckCOMBO2();
      return;
    }else if (couponCode === "PASTA59") {
      specialOfferCheckPASTA59();
      return;
    }else{

      console.log("===============");
      console.log(offersData);

      for(let i = 0; i < offersData.length; i++) {
        if (couponCode === (offersData[i].offerCode)){
          if(offersData[i].offerApplicability !== 'DINE_IN'){
            toast.info("This code is not valid for DINE-IN");
            break;
          }

          isComboCouponApplied = true;
          setOfferCost(offersData[i].offerPrice);
          setapplicableTo(offersData[i].offerApplicability);
          offerString = offersData[i].offerProductList;
          // if(offerString != null){ localStorage.setItem("offerList",offersData[i].offerProductList);}else{ localStorage.setItem("offerList","");}
          localStorage.setItem("offerList",offersData[i].offerProductList);
          offerCheckForCart(offersData[i].offerProductList);

          console.log("+=+=");
          console.log(offersData[i].offerCode);
          break;
        }
        console.log(offersData[i].offerCode);
      }
      return;
  }

    dispatch(validateCoupon(couponCode)).then((res) => {
      if (res) {
        setCouponLocalObj(res);
      }
    });
  };
  //----- Combo offer code new ----
  var rule1 = "";
  var rule2 = "";
  var rule3 = "";
  var rule4 = "";
  var rule5 = "";
  var rule6 = "";

  var rule1Array = [];
  var rule2Array = [];
  var rule3Array = [];
  var rule4Array = [];
  var rule5Array = [];
  var rule6Array = [];

  var comboReduceCost = 0;

  var rule1Verified = false;
  var rule2Verified = false;
  var rule3Verified = false;
  var rule4Verified = false;
  var rule5Verified = false;
  var rule6Verified = false;

  var isCOMBOOfferVerified = false;

  let comboOfferObjects = [];

  let verifyRule1 = (item,rule_items) => {
    console.log("verifyRule1 Method called");
    console.log(item);
    console.log(rule_items);

    rule_items.forEach(product => {
      if(product === item){
        console.log("verifyRule1 Loop called");
        // setRule1Verified(true);
        rule1Verified = true;
        
      }
    });
  }

  let verifyRule = (rule,item,rule_items) => {
    console.log("verifyRule Method called");
    console.log(rule);
    console.log(item);
    console.log(rule_items);

    if(rule === "rule1"){
      rule_items.forEach(product => {
        if(product === item){
          rule1Verified = true;
          comboOfferObjects.push(item);
        }
      });
    }

    if(rule === "rule2"){
      rule_items.forEach(product => {
        if(product === item){
          rule2Verified = true;
          comboOfferObjects.push(item);
        }
      });
    }

    if(rule === "rule3"){
      rule_items.forEach(product => {
        if(product === item){
          rule3Verified = true;
          comboOfferObjects.push(item);
        }
      });
    }

    if(rule === "rule4"){
      rule_items.forEach(product => {
        if(product === item){
          rule4Verified = true;
          comboOfferObjects.push(item);
        }
      });
    }

    if(rule === "rule5"){
      rule_items.forEach(product => {
        if(product === item){
          rule5Verified = true;
          comboOfferObjects.push(item);
        }
      });
    }

    if(rule === "rule6"){
      rule_items.forEach(product => {
        if(product === item){
          rule6Verified = true;
          comboOfferObjects.push(item);
        }
      });
    }
  }

  const offerCheckForCart = (offerStr) => {
    rule1Verified = false;
    rule2Verified = false;
    rule3Verified = false;
    rule4Verified = false;
    rule5Verified = false;
    rule6Verified = false;

    // var offerString = "(P046 OR P047 OR PO54 OR P236 OR P237 OR P234)AND(PO76)AND(P022 OR P023)AND(P067 OR P068)AND(P067 OR P068)AND(NA)";
    // var offerString = "(P046 OR P049 OR P055 OR P052 OR P058)AND(P152 OR P154 OR P153)AND(P125 OR P126)AND(P113 OR P114)AND(P113 OR P114)AND(NA)"
    
    // var offerString = "(P046 OR P049 OR P055 OR P052 OR P058)AND(P152 OR P154 OR P153)AND(P125 OR P126)AND(P1808 OR P113 OR P114)AND(NA)AND(NA)"

    console.log("************* offerStr",offerStr);
    var offerString = offerStr;
    offerString = offerString.replace(/[{()}]/g, '');

    const rule_Array = offerString.split('AND');

    // console.log(rule_Array);

    for (var i = 0; i < rule_Array.length; i++) {
        if (i === 0) {
          rule1 = rule_Array[i];
          rule1Array = rule1.split(' OR ');
        } else if (i === 1) {
          rule2 = rule_Array[i];
          rule2Array = rule2.split(' OR ');
        } else if (i === 2) {
          rule3 = rule_Array[i];
          rule3Array = rule3.split(' OR ');
        } else if (i === 3) {
          rule4 = rule_Array[i];
          rule4Array = rule4.split(' OR ');
        } else if (i === 4) {
          rule5 = rule_Array[i];
          rule5Array = rule5.split(' OR ');
        }else if (i === 5) {
          rule6 = rule_Array[i];
          rule6Array = rule6.split(' OR ');
        }
    }

    console.log("RULE ARRAY LOGS START");
    console.log("----------------------");
    console.log( Object.values(cart?.cartItems));
    console.log( Object.keys(cart?.cartItems));
    console.log("----------------------");
    console.log("rule1",rule1Array);
    console.log("rule2",rule2Array);
    console.log("rule3",rule3Array);
    console.log("rule4",rule4Array);
    console.log("rule5",rule5Array);
    console.log("rule6",rule6Array);
    console.log("RULE ARRAY LOGS END");

    // verifyRule1("P055",rule1Array);
    // verifyRule("rule1","P055",rule1Array);

    for (let i = 0; i < Object.values(cart?.cartItems).length; i++) {
      if(rule1Verified || rule1Array[0] === "NA"){ rule1Verified = true; break;}
      verifyRule("rule1",Object.values(cart?.cartItems)[i].productId,rule1Array);
    }

    for (let i = 0; i < Object.values(cart?.cartItems).length; i++) {
      if(rule2Verified || rule2Array[0] === "NA"){ rule2Verified = true; break;}
      verifyRule("rule2",Object.values(cart?.cartItems)[i].productId,rule2Array);
    }

    for (let i = 0; i < Object.values(cart?.cartItems).length; i++) {
      if(rule3Verified || rule3Array[0] === "NA"){ rule3Verified = true; break;}
      verifyRule("rule3",Object.values(cart?.cartItems)[i].productId,rule3Array);
    }

    for (let i = 0; i < Object.values(cart?.cartItems).length; i++) {
      if(rule4Verified || rule4Array[0] === "NA"){ rule4Verified = true; break;}
      verifyRule("rule4",Object.values(cart?.cartItems)[i].productId,rule4Array);
    }

    for (let i = 0; i < Object.values(cart?.cartItems).length; i++) {
      if(rule5Verified || rule5Array[0] === "NA"){ rule5Verified = true; break;}
      verifyRule("rule5",Object.values(cart?.cartItems)[i].productId,rule5Array);
    }

    for (let i = 0; i < Object.values(cart?.cartItems).length; i++) {
      if(rule6Verified || rule6Array[0] === "NA"){
        rule6Verified = true;
        break;}
      verifyRule("rule6",Object.values(cart?.cartItems)[i].productId,rule6Array);
    }
    isCOMBOOfferVerified = false;

    if (isComboCouponApplied && rule1Verified && rule2Verified &&
      rule3Verified && rule4Verified && rule5Verified && rule6Verified) {
      isCOMBOOfferVerified = true;
      localStorage.setItem("VERIFIED_OFFER", "V");
      calculateCOMBOCartCost();
      toast.success("Hurray!! COMBO Offer has been applied!");
    } else {
        isCOMBOOfferVerified = false;
        isComboCouponApplied = false;
        
          // calculateCOMBOCartCostWithFailedCode();

        toast.error("FAILED!!");
    }

  }

  const calculateCOMBOCartCost = () => {
    console.log("CALCULATE CART VALUE START::::");
    console.log(comboOfferObjects);

    var comboKeys = [];
    var comboValues = [];

    for (let i = 0; i < Object.keys(cart?.cartItems).length; i++) {
      comboKeys.push(Object.keys(cart?.cartItems)[i]);
      comboValues.push({
          ...Object.values(cart?.cartItems)[i],
          cost:
            Object.values(cart?.cartItems)[i].price *
              Object.values(cart?.cartItems)[i].qty +
            Object.values(cart?.cartItems)[i].extraSubTotalWithQty +
            Object.values(cart?.cartItems)[i].choiceIng.choiceTotal,
          oneItemFullCost:
            Number(
              Object.values(cart?.cartItems)[i].price *
                Object.values(cart?.cartItems)[i].qty +
                Object.values(cart?.cartItems)[i].extraSubTotalWithQty +
                Object.values(cart?.cartItems)[i].choiceIng.choiceTotal
            ) / Number(Object.values(cart?.cartItems)[i].qty),
        });
    }

    // console.log("COMBO VALUES::::");
    // console.log(comboValues);

    const COMBOValuesSortByPrice = comboValues.sort(
      (a, b) => a.oneItemFullCost - b.oneItemFullCost
    );

    // console.log(COMBOValuesSortByPrice);
    var offerProduct = [];

    for (let j = 0; j < comboOfferObjects.length; j++) {

      for (let i = 0; i < Object.values(cart?.cartItems).length; i++) {
        if(comboOfferObjects[j] === Object.values(cart?.cartItems)[i].productId) {
          comboReduceCost = comboReduceCost + Object.values(cart?.cartItems)[i].price;
          offerProduct.push(Object.values(cart?.cartItems)[i]);
        }
      }
    }

    // console.log("CALCULATED COST::::");
    // console.log(comboReduceCost);
    // console.log(offerProduct);

    //----------
    let comboValuesWithReduceQty = [];

    for (let j = 0; j < offerProduct.length; j++) {

      comboReduceCost =
      comboReduceCost +
      offerProduct[j].oneItemFullCost;
      let obj2 = {
        ...offerProduct[j],
        qty: offerProduct[j].qty,
        extraSubTotalWithQty: Number(
          offerProduct[j].extraSubTotal *
            (offerProduct[j].qty)
        ),
        choiceIng: {
          ...offerProduct[j].choiceIng,
          choiceTotal: Number(
            offerProduct[j].choiceIng.price *
              (offerProduct[j].qty)
          ),
        },
      };
      comboValuesWithReduceQty.push(obj2);

      // console.log("comboValuesWithReduceQty::::");
      // console.log(comboValuesWithReduceQty);
      // console.log(((Number(comboValuesWithReduceQty[0].price)* comboValuesWithReduceQty[0].qty)-Number(comboValuesWithReduceQty[0].price)));
    }   

    var comboOfferArray = [];

    var finalArray = [];

    for (let i = 0; i < Object.values(cart?.cartItems).length; i++) {
      comboOfferArray.push(Object.values(cart?.cartItems)[i])
    }

    for (let i = 0; i < comboOfferArray.length; i++) {
      if (comboValuesWithReduceQty.some(person => person.productId === comboOfferArray[i].productId)) {
        // if(comboValuesWithReduceQty.indexOf(comboOfferArray[i])) {
        if (comboOfferArray[i].qty > 1) {
          let object = {
            key: comboOfferArray[i].key,
            price: Number((comboOfferArray[i].qty * comboOfferArray[i].price) - Number(comboOfferArray[i].price)),
            reducingCost: Number(comboOfferArray[i].price),
          }
          finalArray.push(object);
        } else {
          let object = {
            key: comboOfferArray[i].key,
            price: 0,
            reducingCost: Number(comboOfferArray[i].price),
          }
          finalArray.push(object);
        }
      }else{
        let object = {
          key: comboOfferArray[i].key,
          price: Number(comboOfferArray[i].price),
          reducingCost: 0,
        }
        finalArray.push(object);
      }
    }

    console.log("---------------");
    console.log(comboOfferArray);
    console.log(finalArray);

    setcomboOfferReduceKey(finalArray);

    console.log("CART VALUE AFTER REDUCE::::");
    console.log( Object.values(cart?.cartItems));
  }

  const calculateCOMBOCartCostWithFailedCode = () => {
    if(localStorage.getItem("VERIFIED_OFFER") === "V"){
      localStorage.setItem("VERIFIED_OFFER", "N");
      window.location.reload(true);
    }
 }

  //--------------------

  const specialOfferCheckBOGO = () => {
    if (couponCode === "BOGO") {
      const d = new Date(businessDateAll && businessDateAll.businessDate);
      const day = d.getDay();
      const wednesday = 3;
      let pizzaCount = 0;
      let pizzaKeys = [];
      let pizzaValues = [];
      let lowestPizzaKey = null;
      let lowestPizzaKeysList = [];
      let allReduceCost = 0;

      if (day === wednesday) {
        for (let i = 0; i < Object.keys(cart?.cartItems).length; i++) {
          if (
            Object.values(cart?.cartItems)[i].section === "Pizza" &&
            Object.values(cart?.cartItems)[i].productSize !== "Small" &&
            Object.values(cart?.cartItems)[i].dish !== "Combo"
          ) {
            pizzaKeys.push(Object.keys(cart?.cartItems)[i]);
            pizzaValues.push({
              ...Object.values(cart?.cartItems)[i],
              cost:
                Object.values(cart?.cartItems)[i].price *
                  Object.values(cart?.cartItems)[i].qty +
                Object.values(cart?.cartItems)[i].extraSubTotalWithQty +
                Object.values(cart?.cartItems)[i].choiceIng.choiceTotal,
              oneItemFullCost:
                Number(
                  Object.values(cart?.cartItems)[i].price *
                    Object.values(cart?.cartItems)[i].qty +
                    Object.values(cart?.cartItems)[i].extraSubTotalWithQty +
                    Object.values(cart?.cartItems)[i].choiceIng.choiceTotal
                ) / Number(Object.values(cart?.cartItems)[i].qty),
            });
            pizzaCount = pizzaCount + Object.values(cart?.cartItems)[i].qty;
          }
        }

        if (pizzaCount >= 2) {
          const pizzaValuesSortedByPrice = pizzaValues.sort(
            (a, b) => a.oneItemFullCost - b.oneItemFullCost
          );

          const numberOfPizzasToReducePrice = Math.floor(pizzaCount / 2);

          let pizzaValuesWithReduceQty = [];
          let reduceCount = numberOfPizzasToReducePrice;

          for (let j = 0; j < pizzaValuesSortedByPrice.length; j++) {
            if (reduceCount > pizzaValuesSortedByPrice[j].qty) {
              allReduceCost =
                allReduceCost +
                pizzaValuesSortedByPrice[j].qty *
                  pizzaValuesSortedByPrice[j].oneItemFullCost;
              let obj1 = {
                ...pizzaValuesSortedByPrice[j],
                qty: 0,
                extraSubTotal: 0,
                extraSubTotalWithQty: 0,
                choiceIng: {
                  ...pizzaValuesSortedByPrice[j].choiceIng,
                  choiceTotal: 0,
                },
                allBogoReduceCost: allReduceCost,
              };
              pizzaValuesWithReduceQty.push(obj1);
              reduceCount = reduceCount - pizzaValuesSortedByPrice[j].qty;
            } else {
              allReduceCost =
                allReduceCost +
                reduceCount * pizzaValuesSortedByPrice[j].oneItemFullCost;
              let obj2 = {
                ...pizzaValuesSortedByPrice[j],
                qty: pizzaValuesSortedByPrice[j].qty - reduceCount,
                extraSubTotalWithQty: Number(
                  pizzaValuesSortedByPrice[j].extraSubTotal *
                    (pizzaValuesSortedByPrice[j].qty - reduceCount)
                ),
                choiceIng: {
                  ...pizzaValuesSortedByPrice[j].choiceIng,
                  choiceTotal: Number(
                    pizzaValuesSortedByPrice[j].choiceIng.price *
                      (pizzaValuesSortedByPrice[j].qty - reduceCount)
                  ),
                },
                allBogoReduceCost: allReduceCost,
              };
              pizzaValuesWithReduceQty.push(obj2);
              reduceCount = 0;
            }
          }

          console.log(pizzaValuesWithReduceQty);
          console.log(allReduceCost);

          /* const pizzasToReducePrice = pizzaValuesSortedByPrice.slice(
            0,
            numberOfPizzasToReducePrice
          ); */

          /* for (let i = 0; i < pizzasToReducePrice.length; i++) {
            allReduceCost =
              allReduceCost +
              numberOfPizzasToReducePrice *
                pizzasToReducePrice[i].oneItemFullCost;
          } */

          /* if (
            cart?.cartItems[pizzaKeys[0]].price >
            cart?.cartItems[pizzaKeys[1]].price
          ) {
            lowestPizzaKey = pizzaKeys[1];
          }
          if (
            cart?.cartItems[pizzaKeys[0]].price <
            cart?.cartItems[pizzaKeys[1]].price
          ) {
            lowestPizzaKey = pizzaKeys[0];
          }

          let cost =
            cart?.cartItems[lowestPizzaKey].price *
              cart?.cartItems[lowestPizzaKey].qty +
            cart?.cartItems[lowestPizzaKey].extraSubTotalWithQty +
            cart?.cartItems[lowestPizzaKey].choiceIng.choiceTotal; */

          setAllBogoReduceCost(allReduceCost);
          setBOGOLowestPizzaKey(pizzaValuesWithReduceQty);
          toast.success("Hurray!! BOGO Offer has been applied!");
        } else {
          setBOGOLowestPizzaKey(null);
          toast.error("BOGO is not applicable for this cart!");
        }
      } else {
        setBOGOLowestPizzaKey(null);
        if (day !== wednesday) {
          toast.error("BOGO is not applicable today! Only on wednesday!");
        } else {
          toast.error("BOGO is not applicable for this cart!");
        }
      }
    }
  };

  const specialOfferCheckDRINK29 = () => {
    if (couponCode === "DRINK29") {
      if (Object.keys(cart?.cartItems).length >= 2) {
        let drinkCount = 0;
        let drinkKey = null;
        let drinkObj = null;

        for (let i = 0; i < Object.keys(cart?.cartItems).length; i++) {
          if (
            Object.values(cart?.cartItems)[i].section === "Shakes & Drinks" &&
            (Object.values(cart?.cartItems)[i].productId === "P113" ||
              Object.values(cart?.cartItems)[i].productId === "P114")
          ) {
            drinkKey = Object.keys(cart?.cartItems)[i];
            drinkObj = Object.values(cart?.cartItems)[i];
            drinkCount = drinkCount + Object.values(cart?.cartItems)[i].qty;
          }
        }

        if (drinkCount >= 1) {
          setdrinkReduceKey({
            key: drinkKey,
            price: 29,
            reducingDrinkaQty: 1,
            drinkObj,
            reducingCost: Number(drinkObj.price) - 29,
          });
          toast.success("Hurray!! DRINK29 Offer has been applied");
        } else {
          toast.error("DRINK29 is not applicable for this cart!");
          setdrinkReduceKey(null);
        }
      } else {
        setdrinkReduceKey(null);
        toast.error("DRINK29 is not applicable for this cart!");
      }
    }
  };

  const specialOfferCheckFRIES69 = () => {
    if (couponCode === "FRIES69") {
      if (Object.keys(cart?.cartItems).length >= 2) {
        let drinkCount = 0;
        let drinkKey = null;
        let drinkObj = null;

        let friesCount = 0;
        let friesKey = null;
        let friesObj = null;

        for (let i = 0; i < Object.keys(cart?.cartItems).length; i++) {
          if (
            Object.values(cart?.cartItems)[i].section === "Shakes & Drinks" &&
            (Object.values(cart?.cartItems)[i].productId === "P113" ||
              Object.values(cart?.cartItems)[i].productId === "P114")
          ) {
            drinkKey = Object.keys(cart?.cartItems)[i];
            drinkObj = Object.values(cart?.cartItems)[i];
            drinkCount = drinkCount + Object.values(cart?.cartItems)[i].qty;
          }
          if (
            Object.values(cart?.cartItems)[i].dish === "Fries" &&
            Object.values(cart?.cartItems)[i].productId === "P011"
          ) {
            friesKey = Object.keys(cart?.cartItems)[i];
            friesObj = Object.values(cart?.cartItems)[i];
            friesCount = drinkCount + Object.values(cart?.cartItems)[i].qty;
          }
        }

        if (drinkCount >= 1 && friesCount >= 1) {
          setfriesOfferReduceTotal({
            drinkKey,
            friesKey,
            newTotal: 69,
            price: 69,
            reducingDrinkQty: 1,
            reducingFriesQty: 1,
            drinkObj,
            friesObj,
            reducingCost: Number(drinkObj.price) + Number(friesObj.price) - 69,
          });
          toast.success("Hurray!! FRIES69 Offer has been applied");
        } else {
          toast.error("FRIES69 is not applicable for this cart!");
          setfriesOfferReduceTotal(null);
        }
      } else {
        setfriesOfferReduceTotal(null);
        toast.error("FRIES69 is not applicable for this cart!");
      }
    }
  };

  const specialOfferCheckCOMBO1 = () => {
    if (couponCode === "COMBO1") {
      if (Object.keys(cart?.cartItems).length >= 4) {
        let drinkCount = 0;
        let drinkKey = [];
        let drinkObj = [];
        let drinkTotalCost = 0;

        let pizzaCount = 0;
        let pizzaKey = null;
        let pizzaObj = null;

        let noodlesCount = 0;
        let noodlesKey = null;
        let noodlesObj = null;

        let manchuriCount = 0;
        let manchuriKey = null;
        let manchuriObj = null;

        let maxDrinkReduceCount = /* 2 */ 1;

        for (let i = 0; i < Object.keys(cart?.cartItems).length; i++) {
          if (
            Object.values(cart?.cartItems)[i].section === "Shakes & Drinks" &&
            maxDrinkReduceCount > 0 &&
            (Object.values(cart?.cartItems)[i].productId === "P113" ||
              Object.values(cart?.cartItems)[i].productId === "P114")
          ) {
            let reduceQty = /* Object.values(cart?.cartItems)[i].qty >= 2 ? 2 : 1 */ 1;
            drinkKey.push(Object.keys(cart?.cartItems)[i]);
            drinkObj.push({
              ...Object.values(cart?.cartItems)[i],
              reducingDrinkQty: reduceQty,
            });
            drinkCount = drinkCount + Object.values(cart?.cartItems)[i].qty;
            drinkTotalCost =
              drinkTotalCost +
              reduceQty * Number(Object.values(cart?.cartItems)[i].price);
            maxDrinkReduceCount = maxDrinkReduceCount - reduceQty;
          }
          if (
            Object.values(cart?.cartItems)[i].section === "Pizza" &&
            (Object.values(cart?.cartItems)[i].productId === "P046" ||
              Object.values(cart?.cartItems)[i].productId === "P049" ||
              Object.values(cart?.cartItems)[i].productId === "P053")
          ) {
            pizzaKey = Object.keys(cart?.cartItems)[i];
            pizzaObj = Object.values(cart?.cartItems)[i];
            pizzaCount = pizzaCount + Object.values(cart?.cartItems)[i].qty;
          }
          if (
            Object.values(cart?.cartItems)[i].dish === "Noodles" &&
            Object.values(cart?.cartItems)[i].productId === "P152"
          ) {
            noodlesKey = Object.keys(cart?.cartItems)[i];
            noodlesObj = Object.values(cart?.cartItems)[i];
            noodlesCount = noodlesCount + Object.values(cart?.cartItems)[i].qty;
          }
          if (
            Object.values(cart?.cartItems)[i].productId === "P125" ||
            Object.values(cart?.cartItems)[i].productId === "P126"
          ) {
            manchuriKey = Object.keys(cart?.cartItems)[i];
            manchuriObj = Object.values(cart?.cartItems)[i];
            manchuriCount =
              manchuriCount + Object.values(cart?.cartItems)[i].qty;
          }
        }

        if (
          drinkCount >= 1 &&
          pizzaCount >= 1 &&
          noodlesCount >= 1 &&
          manchuriCount >= 1
        ) {
          setcombo1OfferReduceTotal({
            drinkKey,
            pizzaKey,
            noodlesKey,
            manchuriKey,
            newTotal: 499,
            price: 499,
            drinkObj,
            pizzaObj,
            reducingPizzaQty: 1,
            reducingNoodlesQty: 1,
            reducingManchuriQty: 1,
            noodlesObj,
            manchuriObj,
            reducingCost:
              Number(drinkTotalCost) +
              Number(pizzaObj.price) +
              Number(noodlesObj.price) +
              Number(manchuriObj.price) -
              499,
          });
          toast.success("Hurray!! COMBO1 Offer has been applied");
        } else {
          toast.error("COMBO1 is not applicable for this cart!");
          setcombo1OfferReduceTotal(null);
        }
      } else {
        setcombo1OfferReduceTotal(null);
        toast.error("COMBO1 is not applicable for this cart!");
      }
    }
  };

  const specialOfferCheckCOMBO2 = () => {
    if (couponCode === "COMBO2") {
      if (Object.keys(cart?.cartItems).length >= 5) {
        let drinkCount = 0;
        let drinkKey = [];
        let drinkObj = [];
        let drinkTotalCost = 0;

        let pizzaCount = 0;
        let pizzaKey = null;
        let pizzaObj = null;

        let pastaCount = 0;
        let pastaKey = null;
        let pastaObj = null;

        let garBreadCount = 0;
        let garBreadKey = null;
        let garBreadObj = null;

        let lavaCakeCount = 0;
        let lavaCakeKey = null;
        let lavaCakeObj = null;

        let maxDrinkReduceCount = /* 2 */ 1;

        for (let i = 0; i < Object.keys(cart?.cartItems).length; i++) {
          if (
            Object.values(cart?.cartItems)[i].section === "Shakes & Drinks" &&
            maxDrinkReduceCount > 0 &&
            (Object.values(cart?.cartItems)[i].productId === "P113" ||
              Object.values(cart?.cartItems)[i].productId === "P114")
          ) {
            let reduceQty = /* Object.values(cart?.cartItems)[i].qty >= 2 ? 2 : 1 */ 1;
            drinkKey.push(Object.keys(cart?.cartItems)[i]);
            drinkObj.push({
              ...Object.values(cart?.cartItems)[i],
              reducingDrinkQty: reduceQty,
            });
            drinkCount = drinkCount + Object.values(cart?.cartItems)[i].qty;
            drinkTotalCost =
              drinkTotalCost +
              reduceQty * Number(Object.values(cart?.cartItems)[i].price);
            maxDrinkReduceCount = maxDrinkReduceCount - reduceQty;
          }
          if (
            Object.values(cart?.cartItems)[i].section === "Pizza" &&
            (Object.values(cart?.cartItems)[i].productId === "P046" ||
              Object.values(cart?.cartItems)[i].productId === "P049" ||
              Object.values(cart?.cartItems)[i].productId === "P053")
          ) {
            pizzaKey = Object.keys(cart?.cartItems)[i];
            pizzaObj = Object.values(cart?.cartItems)[i];
            pizzaCount = pizzaCount + Object.values(cart?.cartItems)[i].qty;
          }
          if (
            Object.values(cart?.cartItems)[i].section === "Pasta" &&
            (Object.values(cart?.cartItems)[i].productId === "P018" ||
              Object.values(cart?.cartItems)[i].productId === "P019")
          ) {
            pastaKey = Object.keys(cart?.cartItems)[i];
            pastaObj = Object.values(cart?.cartItems)[i];
            pastaCount = pastaCount + Object.values(cart?.cartItems)[i].qty;
          }
          if (
            Object.values(cart?.cartItems)[i].section === "Sides" &&
            Object.values(cart?.cartItems)[i].productId === "P028"
          ) {
            garBreadKey = Object.keys(cart?.cartItems)[i];
            garBreadObj = Object.values(cart?.cartItems)[i];
            garBreadCount =
              garBreadCount + Object.values(cart?.cartItems)[i].qty;
          }
          if (
            Object.values(cart?.cartItems)[i].section === "Desserts" &&
            Object.values(cart?.cartItems)[i].productId === "P104"
          ) {
            lavaCakeKey = Object.keys(cart?.cartItems)[i];
            lavaCakeObj = Object.values(cart?.cartItems)[i];
            lavaCakeCount =
              lavaCakeCount + Object.values(cart?.cartItems)[i].qty;
          }
        }

        if (
          drinkCount >= 1 &&
          pizzaCount >= 1 &&
          lavaCakeCount >= 1 &&
          garBreadCount >= 1 &&
          pastaCount >= 1
        ) {
          setcombo2OfferReduceTotal({
            drinkKey,
            pizzaKey,
            pastaKey,
            garBreadKey,
            lavaCakeKey,
            newTotal: 499,
            price: 499,
            reducingPizzaQty: 1,
            reducingPastaQty: 1,
            reducingBreadQty: 1,
            reducingLavaQty: 1,
            drinkObj,
            pizzaObj,
            pastaObj,
            garBreadObj,
            lavaCakeObj,
            reducingCost:
              Number(drinkTotalCost) +
              Number(pizzaObj.price) +
              Number(pastaObj.price) +
              Number(lavaCakeObj.price) +
              Number(garBreadObj.price) -
              499,
          });
          toast.success("Hurray!! COMBO2 Offer has been applied");
        } else {
          toast.error("COMBO2 is not applicable for this cart!");
          setcombo2OfferReduceTotal(null);
        }
      } else {
        setcombo2OfferReduceTotal(null);
        toast.error("COMBO2 is not applicable for this cart!");
      }
    }
  };

  const specialOfferCheckPASTA59 = () => {
    if (couponCode === "PASTA59") {
      if (Object.keys(cart?.cartItems).length >= 2) {
        let pizzaCount = 0;
        let pizzaKey = null;
        let pizzaObj = null;

        let pastaCount = 0;
        let pastaKey = null;
        let pastaObj = null;

        for (let i = 0; i < Object.keys(cart?.cartItems).length; i++) {
          if (Object.values(cart?.cartItems)[i].section === "Pizza") {
            pizzaKey = Object.keys(cart?.cartItems)[i];
            pizzaObj = Object.values(cart?.cartItems)[i];
            pizzaCount = pizzaCount + Object.values(cart?.cartItems)[i].qty;
          }
          if (
            Object.values(cart?.cartItems)[i].section === "Pasta" &&
            (Object.values(cart?.cartItems)[i].productId === "P018" ||
              Object.values(cart?.cartItems)[i].productId === "P019")
          ) {
            pastaKey = Object.keys(cart?.cartItems)[i];
            pastaObj = Object.values(cart?.cartItems)[i];
            pastaCount = pastaCount + Object.values(cart?.cartItems)[i].qty;
          }
        }

        if (pizzaCount >= 1 && pastaCount >= 1) {
          setPASTA59OfferReduceTotal({
            pizzaKey,
            pastaKey,
            pizzaObj,
            pastaObj,
            newPrice: 59,
            reducingPastaQty: 1,
            reducingCost: Number(pastaObj.price) - 59,
          });
          toast.success("Hurray!! PASTA59 Offer has been applied");
        } else {
          toast.error("PASTA59 is not applicable for this cart!");
          setPASTA59OfferReduceTotal(null);
        }
      } else {
        setPASTA59OfferReduceTotal(null);
        toast.error("PASTA59 is not applicable for this cart!");
      }
    }
  };

  const resetPaymentMethod = () => {
    setCurrentPaymentType("");
  };

  const handleChangeAmount = (amount) => {
    setChangeAmount(amount);
    if (!Number(amount)) {
      toast.error("Only numbers are allowed");
      setBalanceAmount(0);
      return;
    } else {
      const change = Number(amount) - calcGrandTot();
      setBalanceAmount(change);
    }
  };

  const handleSubTotal = (total) => {
    setSubtotal(total);
    if (props.isShowDeliveryCharge) {
      calcDeliveryPrice();
    }
  };

  const handleExtraTotal = (total) => {
    setExtraSubTotal(total);
    if (props.isShowDeliveryCharge) {
      calcDeliveryPrice();
    }
  };

  const handleChoiceTotal = (total) => {
    setChoiceTotal(total);
    if (props.isShowDeliveryCharge) {
      calcDeliveryPrice();
    }
  };

  const handleChangePaymentType = (event) => {
    setPaymentType(event.target.value);
  };

  const getAddressId = () => {
    const foundMatchType = allFoundAddressList
      ? allFoundAddressList.find((x) => x.customerAddressType === addressType)
      : null;

    if (currentGetAddress) {
      if (!foundMatchType) {
        if (currentGetAddress.customerAddressType !== addressType) {
          return null;
        } else {
          return currentGetAddress.id;
        }
      } else {
        if (foundMatchType.id !== currentGetAddress.id && !defaultAddress) {
          toast.error(
            "This address type already exists please use another type!"
          );
          return null;
        } else if (
          foundMatchType.id !== currentGetAddress.id &&
          defaultAddress
        ) {
          return foundMatchType.id;
        } else {
          return currentGetAddress.id;
        }
      }
    } else {
      return null;
    }
  };

  const addUpdateCustomerDetails = () => {
    if (defaultAddress) {
      if (!phoneNo || !firstName) {
        toast.error("Fill all mandatory fields!");
        return;
      }
    } else {
      if (
        !phoneNo ||
        !firstName ||
        !addressType ||
        !address1 ||
        //!zipCode ||
        !city ||
        !state
      ) {
        toast.error("Fill all mandatory fields!");
        return;
      }
    }

    if (!currentCustomer) {
      dispatch(addNewCustomer(phoneNo, firstName, lastName, emailId)).then(
        (res) => {
          if (res /* && !defaultAddress */) {
            const custObj = {
              ...res,
              firstName,
              lastName,
              emailId,
            };
            dispatch(updateCustomerDetails(custObj)).then((res) => {
              if (res) {
                setCurrentCustomer(res);
              }
            });

            let addressObj = {
              mobileNumber: res.mobileNumber,
              customerAddressType: addressType,
              address1: address1,
              address2: address2,
              city: city,
              state: state,
              landmark: landMark,
              zipCode: parseInt(zipCode),
            };
            dispatch(AddUpdateCustomerAddress(addressObj)).then((res) => {
              if (res) {
                setCurrentGetAddress(res);
              }
            });
          }
        }
      );
    } else {
      const custObj = {
        ...currentCustomer,
        firstName,
        lastName,
        emailId,
        mobileNumber: phoneNo,
      };
      dispatch(updateCustomerDetails(custObj)).then((res) => {
        if (res) {
          setCurrentCustomer(res);
          let addressObj = {
            id: getAddressId(),
            /* id: currentGetAddress
              ? currentGetAddress.customerAddressType
              : null, */
            mobileNumber: res.mobileNumber,
            customerAddressType: addressType,
            address1: address1,
            address2: address2,
            city: city,
            state: state,
            landmark: landMark,
            zipCode: parseInt(zipCode),
          };
          dispatch(AddUpdateCustomerAddress(addressObj)).then((res) => {
            if (res) {
              setCurrentGetAddress(res);
            }
          });
        }
      });
    }
  };

  const renderNowDate = () => {
    const dateObj = businessDateAll
      ? new Date(businessDateAll.businessDate)
      : new Date();
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

  const clearAddress = () => {
    setAddressId(null);
    setAddress1("");
    setAddress2("");
    setLandMark("");
    setAddressType("");
    setZipCode("");
    setCity("");
    setState("");
    setCurrentGetAddress(null);
  };

  const clearCustomer = () => {
    //setFirstName("")
    // setLastName("")
    //setPhoneNo("")
    ///setEmailId("")
    setCurrentCustomer(null);
  };

  const setFoundAddress = (address) => {
    if (address) {
      setAddressId(address.id);
      setAddress1(address.address1);
      setAddress2(address.address2);
      setLandMark(address.landmark);
      setAddressType(address.customerAddressType);
      setZipCode(address.zipCode);
      setCity(address.city);
      setState(address.state);
      setCurrentGetAddress(address);
    }
  };

  const setFoundCustomer = (userObj) => {
    setFirstName(userObj.firstName);
    setLastName(userObj.lastName);
    setPhoneNo(userObj.mobileNumber);
    setEmailId(userObj.emailId);
    setCurrentCustomer(userObj);
  };

  const onKeyDownHandler = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
    if (e.keyCode === 9) {
      setDefaultAddress(false);
      dispatch(GetCustomerAddress(phoneNo)).then((res) => {
        if (res && res.length === 0) {
          setAddressType("HOME");
          setZipCode(props.storeObj.zipCode ? props.storeObj.zipCode : 0);
          setCity(props.storeObj.city);
          setState(props.storeObj.country);
          setAddress1("");
          setAddress2("");
          setLandMark("");
        }
        if (res && res.length === 1) {
          setFoundAddress(res[0]);
        }
        if (res && res.length > 1) {
          setAllFoundAddressList(res);
          handleShowAddress();
        }
      });
      dispatch(GetCustomerDetails(phoneNo)).then((res) => {
        if (res) {
          setFoundCustomer(res);
          setIsNewCustomerFunc(false);
        } else {
          clearCustomer();
          //clearAddress();
          setFirstName("");
          setLastName("");
          setEmailId("");
          setIsNewCustomerFunc(true);
        }
      });
    }
  };

  const renderAddressSelectModal = () => {
    return (
      <Modal
        show={showAddress}
        //onHide={handleCloseAddress}
        style={{
          marginTop: "65px",
          zIndex: 1100,
          paddingBottom: "60px",
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title> Select Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {allFoundAddressList ? (
            <>
              <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">
                  Address
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={valueAddress}
                  onChange={handleChangeAddress}
                >
                  {allFoundAddressList.map((address) => (
                    <FormControlLabel
                      onClick={() => {
                        setChangeAddressObj(address);
                      }}
                      value={address.id}
                      control={<Radio />}
                      label={
                        <Typography>
                          <span
                            style={{
                              fontWeight: "600",
                            }}
                          >
                            {address.customerAddressType},{" "}
                          </span>
                          {address.address1}, {address.address2},{" "}
                          {address.landmark}, {address.city}, {address.zipCode},{" "}
                          {address.state}
                        </Typography>
                      }
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </>
          ) : (
            <>No Addresses Found!</>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddress}>
            Close
          </Button>
          <Button
            color="success"
            variant="contained"
            onClick={() => {
              if (changeAddressObj) {
                setFoundAddress(changeAddressObj);
                handleCloseAddress();
                //setChangeAddressObj(null);
                //setValueAddress(null);
              } else {
                toast.error("Please select an address!");
              }
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const handleManualPrint = () => {
    const div = document.getElementById("billNew").innerHTML;
    var windows = window.open("", "", "height=600, width=600");
    windows.document.write("<html><body >");
    windows.document.write(
      "<style> .id{font-size: 12px;} body{text-align: center; margin: 0; line-height: 0; font-size: 10px; font-weight: bold;} th{font-size: 11px;} h5{font-size: 10px; line-height: 0.9 !important; font-weight: bold !important;} td{font-size: 11px; font-weight: bold;} table{width: 100%} tbody{text-align: left;} th{text-align: left !important;} section{ line-height: 0.9 !important;}  @media print { body {  }} @page { size: Statement;margin: 0;}</style>"
    );
    windows.document.write(div);
    windows.document.write("</body></html>");
    windows.document.close();
    windows.print();

    //window.print();
  };

  const renderInvoiceModal = () => {
    return (
      <>
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
                  <div style={{ display: "none" }}>
                    <div id="billNew" ref={componentRef}>
                      <div
                        className="text-center"
                        style={{ marginTop: "25px" }}
                      >
                        <Typography
                          sx={{
                            fontSize: "3rem",
                            fontWeight: "bold",
                            fontFamily: "Billfont",
                            color: "black",
                          }}
                        >
                          {orderResp
                            ? orderResp.storeName.toUpperCase()
                            : "HANGRIES"}
                        </Typography>

                        <section>
                          {props.storeObj ? (
                            <Typography
                              sx={{
                                fontSize: "3rem",
                                fontWeight: "bold",
                                fontFamily: "Billfont",
                                color: "black",
                              }}
                            >
                              <span>{props.storeObj.address1},</span> <br></br>
                              {props.storeObj.address2 ? (
                                <span>{props.storeObj.address2},</span>
                              ) : null}
                              {props.storeObj.address3 ? (
                                <span>{props.storeObj.address3},</span>
                              ) : null}
                              <span>{props.storeObj.city},</span>
                              {props.storeObj.zipCode ? (
                                <span>{props.storeObj.zipCode},</span>
                              ) : null}
                            </Typography>
                          ) : null}
                        </section>
                        <div
                          style={{
                            borderBottom: "8px dashed black",
                            marginTop: "15px",
                            marginBottom: "15px",
                          }}
                        ></div>
                        <Typography
                          sx={{
                            fontSize: "3rem",
                            fontWeight: "bold",
                            fontFamily: "Billfont",
                            color: "black",
                          }}
                        >
                          GST NO:{" "}
                          {props.storeObj
                            ? props.storeObj.storeGstNumber
                            : null}
                        </Typography>
                        <p
                          className="id"
                          style={{
                            fontSize: "3rem",
                            fontWeight: "bold",
                            fontFamily: "Billfont",
                            color: "black",
                          }}
                        >
                          Order ID: {orderResp ? orderResp.orderId : null}
                        </p>
                        <div
                          style={{
                            borderBottom: "8px dashed black",
                            marginTop: "15px",
                            marginBottom: "15px",
                          }}
                        ></div>

                        <div
                          style={{ display: "inline-flex", columnGap: "15px" }}
                        >
                          <p
                            style={{
                              fontSize: "3rem",
                              fontWeight: "bold",
                              fontFamily: "Billfont",
                              color: "black",
                            }}
                          >
                            Cashier:{" "}
                            {orderResp
                              ? orderResp.createdBy.toUpperCase()
                              : null}
                          </p>
                          <p
                            style={{
                              fontSize: "3rem",
                              fontWeight: "bold",
                              fontFamily: "Billfont",
                              color: "black",
                            }}
                          >
                            Table No:{" "}
                            {orderResp && orderResp.storeTableId
                              ? orderResp.storeTableId
                              : "N/A"}
                          </p>
                        </div>
                        <div>
                          <p
                            style={{
                              fontSize: "3rem",
                              fontWeight: "bold",
                              fontFamily: "Billfont",
                              color: "black",
                            }}
                          >
                            <span>
                              {orderResp ? orderResp.orderDeliveryType : null}
                            </span>
                            <span>
                              [{orderResp ? orderResp.paymentStatus : null}]
                            </span>
                          </p>
                        </div>
                        <div
                          style={{ display: "inline-flex", columnGap: "10px" }}
                        >
                          <Typography
                            sx={{
                              fontSize: "3rem",
                              fontWeight: "bold",
                              fontFamily: "Billfont",
                              color: "black",
                            }}
                          >
                            Date: {renderNowDate()}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "3rem",
                              fontWeight: "bold",
                              fontFamily: "Billfont",
                              color: "black",
                            }}
                          >
                            Time: {renderNowTime()}
                          </Typography>
                        </div>
                      </div>
                      <div
                        style={{
                          borderBottom: "8px dashed black",
                          marginTop: "15px",
                          marginBottom: "15px",
                        }}
                      ></div>
                      <div className="text-center">
                        <Typography
                          sx={{
                            color: "black",
                            fontSize: "3rem",
                            fontWeight: "bold",
                            fontFamily: "Billfont",
                          }}
                        >
                          Name:{" "}
                          {firstName ? (
                            <span>
                              {firstName.toUpperCase()} {lastName.toUpperCase()}
                            </span>
                          ) : (
                            <span>{orderResp?.customerName.toUpperCase()}</span>
                          )}
                        </Typography>
                        <Typography
                          sx={{
                            color: "black",
                            fontSize: "3rem",
                            fontWeight: "bold",
                            fontFamily: "Billfont",
                          }}
                        >
                          Mob No:{" "}
                          {phoneNo ? (
                            <span>{phoneNo}</span>
                          ) : (
                            <span>{orderResp?.mobileNumber}</span>
                          )}
                        </Typography>
                        <p
                          style={{
                            color: "black",
                            fontSize: "3rem",
                            fontWeight: "bold",
                            fontFamily: "Billfont",
                          }}
                        >
                          Address:{" "}
                          {orderResp?.address ? (
                            <span>{orderResp?.address}</span>
                          ) : null}
                        </p>
                      </div>
                      <div>
                        <InvoiceTable
                          allProducts={orderResp.orderDetails}
                          grandTot={orderResp.totalPrice}
                          cgst={orderResp.cgstCalculatedValue}
                          sgst={orderResp.sgstCalculatedValue}
                          overallPriceWithTax={orderResp.overallPriceWithTax}
                          delCharge={delCharge}
                          fullResp={orderResp}
                          isShowDeliveryCharge={props.isShowDeliveryCharge}
                          bOGOLowestPizzaKey={
                            bOGOLowestPizzaKey ? bOGOLowestPizzaKey : []
                          }
                          drinkReduceKey={drinkReduceKey}
                          pastaReduceKey={pasta59OfferReduceTotal}
                          combo1OfferReduceTotal={combo1OfferReduceTotal}
                          combo2OfferReduceTotal={combo2OfferReduceTotal}
                          friesOfferReduceTotal={friesOfferReduceTotal}
                          isBill={true}
                          allBogoReduceCost={allBogoReduceCost}
                        ></InvoiceTable>
                      </div>
                    </div>
                  </div>
                  <div ref={refH} id="billHY" className="billHY">
                    <div className="text-center">
                      <Typography sx={{ fontWeight: "600" }}>
                        {orderResp ? orderResp.storeName : "Hangries"}
                      </Typography>
                      <Typography sx={{ color: "black", fontWeight: "600" }}>
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
                        {props.storeObj.city ? (
                          <>, {props.storeObj.city}</>
                        ) : null}
                        {props.storeObj.zipCode ? (
                          <>, {props.storeObj.zipCode}</>
                        ) : null}
                        {props.storeObj.country ? (
                          <>, {props.storeObj.country}</>
                        ) : null}
                      </Typography>
                      <hr></hr>
                      <Typography sx={{ fontWeight: "600" }}>
                        GST NO:{" "}
                        {props.storeObj ? props.storeObj.storeGstNumber : null}
                      </Typography>
                      <Typography
                        sx={{ fontWeight: "600", fontSize: "1.2rem" }}
                      >
                        Order ID: {orderResp ? orderResp.orderId : null}
                      </Typography>
                      <hr></hr>

                      <div>
                        <Typography sx={{ color: "black" }}>
                          <Row>
                            <Col>
                              <Typography sx={{ fontWeight: "600" }}>
                                Cashier:{" "}
                                {orderResp
                                  ? orderResp.createdBy.toUpperCase()
                                  : null}
                              </Typography>
                            </Col>
                            <Col>
                              <Typography sx={{ fontWeight: "600" }}>
                                Table No:{" "}
                                {orderResp && orderResp.storeTableId
                                  ? orderResp.storeTableId
                                  : "N/A"}
                              </Typography>
                            </Col>
                          </Row>
                        </Typography>
                      </div>

                      <Typography sx={{ fontWeight: "600" }}>
                        <span>
                          {orderResp ? orderResp.orderDeliveryType : null}
                        </span>
                        <span>
                          [{orderResp ? orderResp.paymentStatus : null}]
                        </span>
                      </Typography>

                      <div>
                        <Typography sx={{ color: "black", fontWeight: "600" }}>
                          <Row>
                            <Col>
                              <p>Date: {renderNowDate()}</p>
                            </Col>
                            <Col>
                              <p>Time: {renderNowTime()}</p>
                            </Col>
                          </Row>
                        </Typography>
                      </div>
                    </div>
                    <hr></hr>
                    <div className="text-center">
                      <Typography sx={{ color: "black", fontWeight: "600" }}>
                        Name:{" "}
                        {firstName ? (
                          <span>
                            {firstName.toUpperCase()} {lastName.toUpperCase()}
                          </span>
                        ) : (
                          <span>{orderResp?.customerName.toUpperCase()}</span>
                        )}
                      </Typography>
                      <Typography sx={{ color: "black", fontWeight: "600" }}>
                        Mob No:{" "}
                        {phoneNo ? (
                          <span>{phoneNo}</span>
                        ) : (
                          <span>{orderResp?.mobileNumber}</span>
                        )}
                      </Typography>
                      <Typography sx={{ color: "black", fontWeight: "600" }}>
                        Address:{" "}
                        {orderResp?.address ? (
                          <span>{orderResp?.address}</span>
                        ) : null}
                      </Typography>
                    </div>
                    <div>
                      <InvoiceTable
                        allProducts={orderResp.orderDetails}
                        grandTot={orderResp.totalPrice}
                        cgst={orderResp.cgstCalculatedValue}
                        sgst={orderResp.sgstCalculatedValue}
                        overallPriceWithTax={orderResp.overallPriceWithTax}
                        delCharge={delCharge}
                        fullResp={orderResp}
                        isShowDeliveryCharge={props.isShowDeliveryCharge}
                        bOGOLowestPizzaKey={
                          bOGOLowestPizzaKey ? bOGOLowestPizzaKey : []
                        }
                        drinkReduceKey={drinkReduceKey}
                        pastaReduceKey={pasta59OfferReduceTotal}
                        combo1OfferReduceTotal={combo1OfferReduceTotal}
                        combo2OfferReduceTotal={combo2OfferReduceTotal}
                        friesOfferReduceTotal={friesOfferReduceTotal}
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
                  onClick={/* handleManualPrint */ handlePrint}
                  className="w-100"
                  variant="contained"
                >
                  Print
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
      </>
    );
  };

  const renderPayUModal = () => {
    return (
      <Modal
        show={show}
        onHide={handleClose}
        style={{
          marginTop: "65px",
          zIndex: 1100,
          paddingBottom: "60px",
        }}
      >
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
                  ref={refCardHeight}
                >
                  <CardContent sx={{ height: "auto" }}>
                    <CartCard
                      onChangeSubTotal={handleSubTotal}
                      onChangeExtraSubTotal={handleExtraTotal}
                      onChangeChoiceTotal={handleChoiceTotal}
                      bOGOLowestPizzaKey={
                        bOGOLowestPizzaKey ? bOGOLowestPizzaKey : []
                      }
                      onChangeSpecialOfferCheckBOGO={specialOfferCheckBOGO}
                      onChangeSpecialOfferCheckDRINK29={
                        specialOfferCheckDRINK29
                      }
                      onChangeSpecialOfferCheckFRIES69={
                        specialOfferCheckFRIES69
                      }
                      onChangeSpecialOfferCheckCOMBO1={specialOfferCheckCOMBO1}
                      onChangeSpecialOfferCheckCOMBONew={calculateCOMBOCartCostWithFailedCode}
                      onChangeSpecialOfferCheckCOMBO2={specialOfferCheckCOMBO2}
                      onChangeSpecialOfferCheckPASTA59={
                        specialOfferCheckPASTA59
                      }
                      drinkReduceKey={drinkReduceKey}
                      pastaReduceKey={pasta59OfferReduceTotal}
                      combo1OfferReduceTotal={combo1OfferReduceTotal}
                      combo2OfferReduceTotal={combo2OfferReduceTotal}
                      friesOfferReduceTotal={friesOfferReduceTotal}
                      
                      comboOfferReduceKey={comboOfferReduceKey}
                      offerPriceToAdd={offerCost}
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

                        {pasta59OfferReduceTotal ? (
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
                                PASTA59 Offer
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
                                ₹{" "}
                                {Number(
                                  pasta59OfferReduceTotal.newPrice
                                ).toFixed(2)}
                                .00
                              </Typography>
                            </div>
                          </Row>
                        ) : null}

                        {drinkReduceKey ? (
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
                                DRINK29 Offer
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
                                ₹ {Number(drinkReduceKey.price).toFixed(2)}
                              </Typography>
                            </div>
                          </Row>
                        ) : null}

                        {combo1OfferReduceTotal ? (
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
                                COMBO1 Offer
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
                                ₹{" "}
                                {Number(combo1OfferReduceTotal.price).toFixed(
                                  2
                                )}
                              </Typography>
                            </div>
                          </Row>
                        ) : null}

                        {friesOfferReduceTotal ? (
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
                                FRIES69 Offer
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
                                ₹{" "}
                                {Number(friesOfferReduceTotal.price).toFixed(2)}
                              </Typography>
                            </div>
                          </Row>
                        ) : null}

                        {combo2OfferReduceTotal ? (
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
                                COMBO2 Offer
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
                                ₹{" "}
                                {Number(combo2OfferReduceTotal.price).toFixed(
                                  2
                                )}
                              </Typography>
                            </div>
                          </Row>
                        ) : null}

                        {couponReduxObj && couponReduxObj.couponDetails ? (
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
                                Coupon Discount
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
                                {renderCouponDiscount()}
                              </Typography>
                            </div>
                          </Row>
                        ) : null}

                        {/* {bOGOLowestPizzaKey ? (
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
                                Coupon Discount
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
                                ₹ {allBogoReduceCost}
                              </Typography>
                            </div>
                          </Row>
                        ) : null} */}

                        {props.isShowDeliveryCharge ? (
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
                                Delivery Charges
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
                                ₹ {delCharge}
                              </Typography>
                            </div>
                          </Row>
                        ) : null}

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

                    <Row className="mt-5">
                      <Col sm={7}>
                        <CusTextField
                          label="Coupon Code"
                          value={couponCode}
                          onChange={(event) => {
                            setCouponCode(event.target.value);
                          }}
                          fullWidth
                        />
                      </Col>
                      <Col sm={5}>
                        <Button
                          variant="contained"
                          color="success"
                          sx={{
                            fontSize: "0.75rem",
                            lineHeight: "1rem",
                            padding: "5px 16px",
                          }}
                          onClick={validateCouponCode}
                        >
                          APPLY
                        </Button>
                      </Col>
                    </Row>
                    <div className="text-center mt-2">
                      {couponReduxObj && couponReduxObj.couponDetails ? (
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            color: "#2e7d32",
                            fontSize: "0.9rem",
                          }}
                        >
                          {couponReduxObj.couponDetails.couponCode} Applied!
                          &nbsp;
                          {couponReduxObj.couponDetails.discountPercentage}%
                          Off!
                        </Typography>
                      ) : null}

                      {bOGOLowestPizzaKey ? (
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            color: "#2e7d32",
                            fontSize: "0.9rem",
                          }}
                        >
                          Hurray!! BOGO Offer has been applied!
                        </Typography>
                      ) : null}
                    </div>
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
                      sx={{
                        width: "100%",
                        marginTop: 3,
                        minHeight: cardHeight,
                      }}
                    >
                      <CardContent>
                        <div>
                          <Row className="align-items-center">
                            <Col className="pr-0">
                              <MainText>Select Table No</MainText>
                            </Col>
                            <Col className="pl-0">
                              {/* <FormControl fullWidth>
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
                              </FormControl> */}
                              <CusTextField
                                label="Table No"
                                value={tableNo}
                                onChange={(event) => {
                                  setTableNo(event.target.value);
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
                              <PhoneInput
                                defaultCountry="IN"
                                style={{ fontSize: "0.75rem" }}
                                placeholder="Mobile Number *"
                                value={phoneNo}
                                onChange={setPhoneNo}
                                onKeyDown={onKeyDownHandler}
                              />
                              {/* <CusTextField
                                label="Phone No"
                                value={phoneNo}
                                onChange={(event) => {
                                  setPhoneNo(event.target.value);
                                }}
                                onKeyDown={(e) => {
                                  if (e.keyCode === 9) {
                                    dispatch(
                                      GetCustomerAddress(e.target.value)
                                    ).then((res) => {
                                      if (res) {
                                        setFoundAddress(res[0]);
                                      }
                                    });
                                    dispatch(
                                      GetCustomerDetails(e.target.value)
                                    ).then((res) => {
                                      if (res) {
                                        setFoundCustomer(res);
                                      }
                                    });
                                  }
                                }}
                              /> */}
                            </Col>
                          </Row>
                        </div>
                        <div className="mt-3">
                          <Row className="align-items-center">
                            <Col className="pr-0">
                              <MainText>Email Id</MainText>
                            </Col>
                            <Col className="pl-0">
                              <CusTextField
                                label="Email Id"
                                value={emailId}
                                onChange={(event) => {
                                  setEmailId(event.target.value);
                                }}
                                disabled={defaultAddress}
                              />
                            </Col>
                          </Row>
                        </div>
                        <div className="text-center mt-3">
                          <CusTextField
                            label="Address Type *"
                            value={addressType}
                            onChange={(event) => {
                              setAddressType(event.target.value);
                            }}
                            disabled={defaultAddress}
                          />
                        </div>
                        <div className="mt-3">
                          <Row className="align-items-center">
                            <Col className="pr-0">
                              <CusTextField
                                label="First Name *"
                                value={firstName}
                                onChange={(event) => {
                                  setFirstName(event.target.value);
                                }}
                                disabled={defaultAddress}
                              />
                            </Col>
                            <Col className="pl-1">
                              <CusTextField
                                label="Last Name (Optional)"
                                value={lastName}
                                onChange={(event) => {
                                  setLastName(event.target.value);
                                }}
                                disabled={
                                  defaultAddress || phoneNo === "+9199999"
                                    ? true
                                    : false
                                }
                              />
                            </Col>
                          </Row>
                        </div>
                        <div className="mt-3">
                          <Row className="align-items-center">
                            <Col className="pr-0">
                              <CusTextField
                                label="Address 1 *"
                                value={address1}
                                onChange={(event) => {
                                  setAddress1(event.target.value);
                                }}
                                disabled={
                                  defaultAddress || phoneNo === "+9199999"
                                    ? true
                                    : false
                                }
                              />
                            </Col>
                            <Col className="pl-1">
                              <CusTextField
                                label="Address 2 (Optional)"
                                value={address2}
                                onChange={(event) => {
                                  setAddress2(event.target.value);
                                }}
                                disabled={
                                  defaultAddress || phoneNo === "+9199999"
                                    ? true
                                    : false
                                }
                              />
                            </Col>
                          </Row>
                        </div>
                        <div className="mt-3">
                          <Row className="align-items-center">
                            <Col className="pr-0">
                              <CusTextField
                                label="Land Mark (Optional)"
                                value={landMark}
                                onChange={(event) => {
                                  setLandMark(event.target.value);
                                }}
                                disabled={
                                  defaultAddress || phoneNo === "+9199999"
                                    ? true
                                    : false
                                }
                              />
                            </Col>
                            <Col className="pl-1">
                              <CusTextField
                                label="Zip Code *"
                                value={zipCode}
                                onChange={(event) => {
                                  setZipCode(event.target.value);
                                }}
                                disabled={
                                  defaultAddress || phoneNo === "+9199999"
                                    ? true
                                    : false
                                }
                              />
                            </Col>
                          </Row>
                        </div>
                        <div className="mt-3">
                          <Row className="align-items-center">
                            <Col className="pr-0">
                              <CusTextField
                                label="City *"
                                value={city}
                                onChange={(event) => {
                                  setCity(event.target.value);
                                }}
                                disabled={
                                  defaultAddress || phoneNo === "+9199999"
                                    ? true
                                    : false
                                }
                              />
                            </Col>
                            <Col className="pl-1">
                              <CusTextField
                                label="State *"
                                value={state}
                                onChange={(event) => {
                                  setState(event.target.value);
                                }}
                                disabled={
                                  defaultAddress || phoneNo === "+9199999"
                                    ? true
                                    : false
                                }
                              />
                            </Col>
                          </Row>
                        </div>
                        <div className="text-center mt-3">
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={defaultAddress}
                                onChange={(event) => {
                                  setDefaultAddress(event.target.checked);
                                  //clearAddress();
                                  if (event.target.checked) {
                                    setAddressType("STORE");
                                    setFirstName("GUEST");
                                    setLastName("");
                                    setAddress1(props.storeObj.address1);
                                    setAddress2(props.storeObj.address2);
                                    setLandMark(props.storeObj.address3);
                                    setZipCode(
                                      props.storeObj.zipCode
                                        ? props.storeObj.zipCode
                                        : 0
                                    );
                                    setCity(props.storeObj.city);
                                    setState(props.storeObj.country);
                                  }
                                }}
                                //disabled={!isNewCustomerFunc}
                                disabled={phoneNo === "+9199999" ? true : false}
                              />
                            }
                            label="Default Store address"
                          />
                        </div>
                        <div className="text-center mt-3">
                          <Button
                            variant="contained"
                            color="warning"
                            onClick={addUpdateCustomerDetails}
                            disabled={phoneNo === "+9199999" ? true : false}
                          >
                            SAVE CUSTOMER DETAILS
                          </Button>
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
                    {!currentPaymentType ||
                    !(
                      paymentType &&
                      firstName &&
                      phoneNo &&
                      (defaultAddress ||
                        (address1 && zipCode && city && state && addressType))
                    ) ? (
                      <Card sx={{ minHeight: cardHeight }}>
                        <FormControl sx={{ marginLeft: 3, marginTop: 2 }}>
                          <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={paymentType}
                            onChange={handleChangePaymentType}
                          >
                            {paymentModes.map((option) => (
                              <FormControlLabel
                                value={option.configCriteriaValue}
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
                                    {option.configCriteriaDesc}
                                  </Typography>
                                }
                              />
                            ))}
                            {/* <FormControlLabel
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
                                  CASH
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
                              value="EDC"
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
                                  Credit / Debit
                                </Typography>
                              }
                            />
                            <FormControlLabel
                              value="Gpay"
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
                                  Google Pay
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
                              value="AmznPay"
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
                            <FormControlLabel
                              value="Not Paid"
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
                                  Not Paid
                                </Typography>
                              }
                            /> */}
                          </RadioGroup>
                        </FormControl>
                        <CardActions>
                          <SPMButton
                            variant="contained"
                            color="success"
                            className="w-100"
                            onClick={handlePaymentType}
                            disabled={
                              paymentType &&
                              firstName &&
                              phoneNo &&
                              (defaultAddress ||
                                (address1 &&
                                  zipCode &&
                                  city &&
                                  state &&
                                  addressType))
                                ? false
                                : true
                            }
                          >
                            SELECT PAYMENT METHOD
                          </SPMButton>
                        </CardActions>
                      </Card>
                    ) : null}

                    {currentPaymentType &&
                    paymentType &&
                    firstName &&
                    phoneNo &&
                    (defaultAddress ||
                      (address1 && zipCode && city && state && addressType)) ? (
                      <>
                        {" "}
                        <Card className="p-3" sx={{ minHeight: cardHeight }}>
                          <Row>
                            <Col>
                              <p>You selected {currentPaymentType}!</p>
                              {/* <PaytmButton></PaytmButton> */}
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
                          {currentPaymentType === "CASH" ? (
                            <div
                              className="text-center"
                              style={{
                                marginTop: "100px",
                                backgroundColor: "rgb(242, 242, 242)",
                                padding: "15px 0 15px 0",
                                borderRadius: "15px",
                              }}
                            >
                              <Row>
                                <Col className="p-0">
                                  <Typography sx={{ fontSize: "0.9rem" }}>
                                    Enter Amount:
                                  </Typography>
                                </Col>
                                <Col className="pl-0">
                                  <CusTextField
                                    label="Enter Amount"
                                    value={changeAmount}
                                    onChange={(event) => {
                                      handleChangeAmount(event.target.value);
                                    }}
                                  />
                                </Col>
                              </Row>
                              <Row className="mt-3">
                                <Col className="p-0">
                                  <Typography sx={{ fontSize: "0.9rem" }}>
                                    Return Amount:
                                  </Typography>
                                </Col>
                                <Col className="pl-0">
                                  <Typography
                                    sx={{
                                      fontSize: "0.9rem",
                                      fontWeight: "bold",
                                      color: "red",
                                    }}
                                  >
                                    Rs. {balanceAmount}
                                  </Typography>
                                </Col>
                              </Row>
                            </div>
                          ) : null}
                        </Card>
                        <div
                          style={{ position: "relative", bottom: "50px" }}
                          className="text-center"
                        >
                          <CusTextField
                            label="Payment Reference No#"
                            value={referenceNo}
                            onChange={(event) => {
                              setReferenceNo(event.target.value);
                            }}
                          />
                        </div>
                      </>
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
                  Object.keys(cart?.cartItems).length > 0 &&
                  currentPaymentType &&
                  !disableSaveBtn
                    ? false
                    : true
                }
              >
                {!disableSaveBtn ? "PLACE ORDER" : "SAVING..."}
              </POButton>
            </Col>
          </Row>
        </CusContainer>
      </div>
      {renderInvoiceModal()}
      {renderPayUModal()}
      {renderAddressSelectModal()}
    </div>
  );
}
