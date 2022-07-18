import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductsNew } from "../../actions";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Row, Col } from "react-bootstrap";
import Select from "@mui/material/Select";
import styled from "@emotion/styled";
import MenuItem from "@mui/material/MenuItem";
import { Typography, TextField, Button, Alert } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const CusSelect = styled(Select)`
  & .MuiSelect-select {
    padding-top: 5px;
    padding-bottom: 5px;
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

const CusTableCell = styled(TableCell)`
  padding: 0;
  font-size: 14px;
  border: 1px solid #000;
`;

const CusMenuItem = styled(MenuItem)``;

export const MenuMaster = () => {
  const stores = useSelector((state) => state.store.stores);
  const productList = useSelector((state) => state.product.products);
  const user = useSelector((state) => state.auth.user);

  const [selectedStore, setSelectedStore] = useState(
    stores[0] ? stores[0].resturantName : user.resturantName
  );
  const [selectedStoreObj, setSelectedStoreObj] = useState({
    restaurantId: stores[0] ? stores[0] : user.restaurantId,
    storeId: stores[0] ? stores[0] : user.storeId,
  });
  const [newDishSection, setNewDishSection] = useState("");
  const [newDishCategory, setNewDishCategory] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getProductsNew(selectedStoreObj.restaurantId, selectedStoreObj.storeId)
    );
  }, [selectedStoreObj]);

  const handleChangeStore = (event) => {
    setSelectedStore(event.target.value);
  };

  const handleSelectedStore = (store) => {
    setSelectedStoreObj(store);
  };

  return (
    <div>
      <Row className="align-items-center">
        <div style={{ maxWidth: "125px !important" }}>
          <Typography sx={{ color: "#7F7F7F", fontWeight: "bold" }}>
            Select Store
          </Typography>
        </div>
        <Col sm={5}>
          <FormControl fullWidth>
            <InputLabel
              sx={{ fontSize: "0.75rem", lineHeight: "1rem" }}
              id="demo-simple-select-label"
            >
              Please select the store
            </InputLabel>
            <CusSelect
              sx={{ fontSize: "0.75rem", lineHeight: "1rem" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedStore}
              label="Please select the store"
              onChange={handleChangeStore}
            >
              {stores.map((store) => (
                <CusMenuItem
                  onClick={() => {
                    handleSelectedStore(store);
                  }}
                  value={store.resturantName}
                >
                  <span>{store.resturantName}</span>
                </CusMenuItem>
              ))}
            </CusSelect>
          </FormControl>
        </Col>
        <Col sm={6}></Col>
      </Row>
      <Row className="align-items-center mt-2">
        <div style={{ maxWidth: "125px !important" }}>
          <Typography sx={{ color: "#7F7F7F", fontWeight: "bold" }}>
            Add new Dish Section
          </Typography>
        </div>
        <Col sm={5}>
          <CusTextField
            label="New Dish Section"
            value={newDishSection}
            onChange={(event) => {
              setNewDishSection(event.target.value);
            }}
            fullWidth
          />
        </Col>
        <Col sm={6}></Col>
      </Row>
      <Row className="align-items-center mt-2">
        <div style={{ maxWidth: "125px !important" }}>
          <Typography sx={{ color: "#7F7F7F", fontWeight: "bold" }}>
            Add new Dish Category
          </Typography>
        </div>
        <Col sm={5}>
          <CusTextField
            label="New Dish Category"
            value={newDishCategory}
            onChange={(event) => {
              setNewDishCategory(event.target.value);
            }}
            fullWidth
          />
        </Col>
        <Col sm={6}></Col>
      </Row>
      <div>
        <Table
          sx={{ minWidth: 800 }}
          aria-label="simple table"
          className="mt-3"
        >
          <TableHead>
            <TableRow>
              <CusTableCell align="center">Store Name</CusTableCell>
              <CusTableCell align="center">Dish Section</CusTableCell>
              <CusTableCell align="center">Dish Category</CusTableCell>
              <CusTableCell align="center">Dish Name</CusTableCell>
              <CusTableCell align="center">Veg (Y/N)</CusTableCell>
              <CusTableCell align="center">Spicy Indicator</CusTableCell>
              <CusTableCell align="center">Dish Description</CusTableCell>
              <CusTableCell align="center">Size</CusTableCell>
              <CusTableCell align="center">Price</CusTableCell>
              <CusTableCell align="center">Image Name</CusTableCell>
              <CusTableCell align="center">Dish Visible (Y/N)</CusTableCell>
              <CusTableCell align="center">KDS Counter Name</CusTableCell>
              <CusTableCell align="center">Topping (Y/N)</CusTableCell>
              <CusTableCell align="center">Add Toppings</CusTableCell>
              <CusTableCell align="center">Action</CusTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productList && productList.length > 0 ? (
              <>
                {" "}
                {productList.map((product) => (
                  <TableRow>
                    <CusTableCell align="center">
                      {product.restaruantId}
                    </CusTableCell>
                    <CusTableCell align="center">
                      {product.section}
                    </CusTableCell>
                    <CusTableCell align="center">{product.dish}</CusTableCell>
                    <CusTableCell align="center">
                      {product.dishType}
                    </CusTableCell>
                    <CusTableCell align="center">
                      {product.dishCategory === "Veg" ? "Y" : "N"}
                    </CusTableCell>
                    <CusTableCell align="center">
                      {product.dishSpiceIndicatory}
                    </CusTableCell>
                    <CusTableCell align="center">
                      {product.dishDescriptionId}
                    </CusTableCell>
                    <CusTableCell align="center">
                      {product.productSize}
                    </CusTableCell>
                    <CusTableCell align="center">{product.price}</CusTableCell>
                    <CusTableCell
                      style={{ wordWrap: "break-word", maxWidth: "200px" }}
                      align="center"
                    >
                      {product.imagePath}
                    </CusTableCell>
                    <CusTableCell align="center">
                      {product.menuAvailableFlag}
                    </CusTableCell>
                    <CusTableCell align="center">
                      {product.kdsRoutingName}
                    </CusTableCell>
                    <CusTableCell align="center">
                      {product.ingredientExistsFalg}
                    </CusTableCell>
                    <CusTableCell align="center">
                      {product.ingredientExistsFalg === "Y" ? (
                        <Button>Add Toppings</Button>
                      ) : null}
                    </CusTableCell>
                    <CusTableCell align="center">
                      <Button variant="contained" color="success">
                        Save
                      </Button>
                    </CusTableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <TableRow>
                <TableCell colSpan={15}>
                  <Alert severity="warning">No products found!</Alert>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
