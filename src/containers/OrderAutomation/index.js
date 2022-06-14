import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../NewLayout";
import { Row, Col } from "react-bootstrap";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styled from "@emotion/styled";
import {
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

const CusMenuItem = styled(MenuItem)``;

const SaveButton = styled(Button)`
  background-color: #92d050;
  width: 150px;
  color: #fff;
  border-radius: 10px;

  &:hover {
    background-color: #7cbf33;
    color: #fff;
  }
`;

export const OrderAutomation = () => {
  const stores = useSelector((state) => state.store.stores);
  const [selectedStore, setSelectedStore] = useState("ALL");
  const [selectedStoreObj, setSelectedStoreObj] = useState({
    restaurantId: null,
    storeId: null,
  });
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleChangeStore = (event) => {
    setSelectedStore(event.target.value);
    console.log(event.target.value);
  };

  const handleSelectedStore = (store) => {
    setSelectedStoreObj(store);
  };

  return (
    <Layout sidebar headerTitle="Order Automation">
      <Row className="align-items-center">
        <Col className="col-3">
          <Typography
            sx={{ color: "#7F7F7F", fontWeight: "bold", textAlign: "right" }}
          >
            Select Role
          </Typography>
        </Col>
        <Col sm={6} style={{ display: "flex" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Please select the store
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedStore}
              label="Please select the store"
              onChange={handleChangeStore}
            >
              <CusMenuItem
                onClick={() => {
                  handleSelectedStore({
                    restaurantId: null,
                    storeId: null,
                  });
                }}
                value={"ALL"}
              >
                All Stores
              </CusMenuItem>
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
            </Select>
          </FormControl>
        </Col>
      </Row>
      <Row className="align-items-center mt-3">
        <Col className="col-3">
          <Typography
            sx={{ color: "#7F7F7F", fontWeight: "bold", textAlign: "right" }}
          >
            Check Order Source for automation
          </Typography>
        </Col>
        <Col sm={6} style={{ display: "flex" }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 450 }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#A5A5A5" }}>
                  <TableCell align="center" sx={{ color: "#fff" }}>
                    ORDER SOURCE
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#fff" }}>
                    AUTOMATE flag
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center">WEB</TableCell>
                  <TableCell align="center">
                    <Checkbox checked={checked} onChange={handleChange} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">MOBILE</TableCell>
                  <TableCell align="center">
                    <Checkbox checked={checked} onChange={handleChange} />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Col>
        <Col sm={3}>
          <Button>ADD NEW ORDER SOURCE</Button>
        </Col>
      </Row>
      <div className="text-center mt-4">
        <SaveButton>Save</SaveButton>
      </div>
    </Layout>
  );
};
