import React, { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Row, Col } from "react-bootstrap";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styled from "@emotion/styled";
import {
  Typography,
  TextField,
  Button,
  Alert,
  NativeSelect,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

const CusSelect = styled(Select)`
  & .MuiSelect-select {
    padding-top: 5px;
    padding-bottom: 5px;
  }
`;

const CusInputLabel = styled(InputLabel)`
  &.Mui-focused {
    top: 0px !important;
  }

  &.MuiFormLabel-filled {
    top: 0px !important;
  }
`;

const CusTableCell = styled(TableCell)`
  padding: 0;
  font-size: 14px;
  border: 1px solid #000;
`;

const CusMenuItem = styled(MenuItem)``;

export const ToppingMaster = () => {
  const stores = useSelector((state) => state.store.stores);

  const [selectedStore, setSelectedStore] = useState(
    //stores[0] ? stores[0].resturantName : null
    null
  );
  const [selectedStoreObj, setSelectedStoreObj] = useState(
    /* stores[0] */ null
  );

  const dispatch = useDispatch();

  const handleChangeStore = (event) => {
    setSelectedStore(event.target.value);
  };

  const handleSelectedStore = (store) => {
    setSelectedStoreObj(store);
  };

  return (
    <div>
      <Row className="align-items-center justify-content-center">
        <div style={{ maxWidth: "125px" }}>
          <Typography sx={{ color: "#7F7F7F", fontWeight: "bold" }}>
            Select Store
          </Typography>
        </div>
        <Col sm={5}>
          <FormControl fullWidth>
            <CusInputLabel
              sx={{ fontSize: "0.75rem", lineHeight: "1rem", top: "-11px" }}
              id="demo-simple-select-label"
            >
              Please select the store
            </CusInputLabel>
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
      </Row>
      <div>
        <TableContainer className="mt-2" sx={{ maxHeight: 430 }}>
          <Table sx={{ minWidth: 800 }} stickyHeader>
            <TableHead>
              <TableRow>
                <CusTableCell align="center">Store Name</CusTableCell>
                <CusTableCell align="center">Topping Type</CusTableCell>
                <CusTableCell align="center">Topping Name</CusTableCell>
                <CusTableCell align="center">Size</CusTableCell>
                <CusTableCell align="center">Price</CusTableCell>
                <CusTableCell align="center">
                  Topping Available(Y/N)
                </CusTableCell>
                <CusTableCell align="center">Action</CusTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <CusTableCell align="center">row.name</CusTableCell>
                <CusTableCell align="center">row.calories</CusTableCell>
                <CusTableCell align="center">row.fat</CusTableCell>
                <CusTableCell align="center">row.carbs</CusTableCell>
                <CusTableCell align="center">row.protein</CusTableCell>
                <CusTableCell align="center">row.protein</CusTableCell>
                <CusTableCell align="center">
                  <Button>SAVE</Button>
                </CusTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="mt-3 text-center">
        <Button variant="contained" color="success">
          ADD NEW TOPPING
        </Button>
      </div>
    </div>
  );
};
