import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CartCard from "../../components/CartCard";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";
import styled from "@emotion/styled";
import { Row, Col } from "react-bootstrap";

const CheckoutButton = styled(Button)`
  background-color: rgb(130, 187, 55);

  &:hover {
    background-color: rgb(130, 187, 55);
  }
`;

export const NewCart = (props) => {
  const [subTotal, setSubtotal] = useState(0);
  const [extraSubTotal, setExtraSubTotal] = useState(0);
  const [choiceTotal, setChoiceTotal] = useState(0);

  const taxDetails = useSelector((state) => state.user.taxDetails);

  const handleSubTotal = (total) => {
    setSubtotal(total);
  };

  const handleExtraTotal = (total) => {
    setExtraSubTotal(total);
  };

  const handleChoiceTotal = (total) => {
    setChoiceTotal(total);
  };

  const renderAllSub = () => {
    const all =
      subTotal +
      (extraSubTotal ? extraSubTotal : 0) +
      (choiceTotal ? choiceTotal : 0);
    return <span style={{ fontSize: "0.85rem" }}>₹ {all.toFixed(2)}</span>;
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

    const grantTot = allSub + allTax;

    return <span style={{ fontSize: "0.85rem" }}>₹ {grantTot.toFixed(2)}</span>;
  };

  return (
    <div>
      <Card sx={{ width: "100%", marginTop: "60px" }}>
        <div
          style={{ height: "5px", backgroundColor: "rgb(130, 187, 55)" }}
        ></div>
        <CardContent
          sx={{
            height: "425px",
            overflowY: "auto",
            backgroundColor: "#fff",
          }}
        >
          <CartCard
            onChangeSubTotal={handleSubTotal}
            onChangeExtraSubTotal={handleExtraTotal}
            onChangeChoiceTotal={handleChoiceTotal}
          ></CartCard>
        </CardContent>
        <div
          style={{
            backgroundColor: "#fff",
            boxShadow: "0px -4px 3px rgba(50, 50, 50, 0.3)",
          }}
        >
          <Typography>
            <Row className="pl-2">
              <Col className="col-7 pr-0" style={{ fontSize: "0.85rem" }}>
                Subtotal
              </Col>
              <Col className="col-5 ps-0">{renderAllSub()}</Col>
            </Row>
            <Row className="pl-2">
              {taxDetails ? (
                <>
                  {taxDetails.map((tax) => (
                    <>
                      <Col className="col-7 pr-0">
                        <span
                          style={{ fontSize: "0.75rem", fontStyle: "italic" }}
                        >
                          Taxes ({tax.taxCategory} {tax.taxPercentage}%)
                        </span>
                      </Col>
                      <Col className="col-5 ps-0">
                        <span
                          style={{ fontSize: "0.75rem", fontStyle: "italic" }}
                        >
                          {renderTax(tax)}
                        </span>
                      </Col>
                    </>
                  ))}
                </>
              ) : null}
            </Row>

            <Row className="pl-2">
              <Col className="col-7 pr-0" style={{ fontSize: "0.85rem" }}>
                Grand Total
              </Col>
              <Col className="col-5 ps-0">{renderGrandTot()}</Col>
            </Row>
          </Typography>

          <CardActions>
            <CheckoutButton
              onClick={() => {
                props.setShowCheckout(true);
              }}
              variant="contained"
              className="w-100"
            >
              Checkout
            </CheckoutButton>
          </CardActions>
        </div>
      </Card>
    </div>
  );
};
