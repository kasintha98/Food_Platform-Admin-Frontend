import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsNew } from "../../actions";
import styled from "@emotion/styled";
import {
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  Table,
  TableBody,
  Alert,
  Button,
} from "@mui/material";
import ReactExport from "react-export-excel";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const CusTableCell1 = styled(TableCell)`
  font-size: 0.75rem;
  font-weight: bold;
  background-color: #ffc000;
`;

const CusTableCell2 = styled(TableCell)`
  font-size: 0.75rem;
  padding: 0;
`;

export const MenuReport = (props) => {
  const productList = useSelector((state) => state.product.products);
  const loading = useSelector((state) => state.product.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsNew(props.restaurantId, props.storeId));
  }, [props.restaurantId, props.storeId]);

  return (
    <div>
      <ExcelFile element={<Button variant="text">Download Full Report</Button>}>
        <ExcelSheet data={productList} name="Orders">
          <ExcelColumn label="id" value="id" />
          <ExcelColumn label="restaruantId" value="restaruantId" />
          <ExcelColumn label="storeId" value="storeId" />
          <ExcelColumn label="section" value="section" />
          <ExcelColumn label="productId" value="productId" />
          <ExcelColumn label="dish" value="dish" />
          <ExcelColumn label="dishType" value="dishType" />
          <ExcelColumn label="dishCategory" value="dishCategory" />
          <ExcelColumn
            label="dishSpiceIndicatory"
            value="dishSpiceIndicatory"
          />
          <ExcelColumn label="dishDescriptionId" value="dishDescriptionId" />
          <ExcelColumn label="productSize" value="productSize" />
          <ExcelColumn label="price" value="price" />
          <ExcelColumn label="imagePath" value="imagePath" />
          <ExcelColumn label="menuAvailableFlag" value="menuAvailableFlag" />
          <ExcelColumn
            label="ingredientExistsFalg"
            value="ingredientExistsFalg"
          />
          <ExcelColumn label="commonImage" value="commonImage" />
          <ExcelColumn label="createdBy" value="createdBy" />

          <ExcelColumn label="createdDate" value="createdDate" />
        </ExcelSheet>
      </ExcelFile>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 3000 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <CusTableCell1 align="center">ID</CusTableCell1>
              <CusTableCell1 align="center">RESTAURANT ID</CusTableCell1>
              <CusTableCell1 align="center">STORE ID</CusTableCell1>
              <CusTableCell1 align="center">SECTION</CusTableCell1>
              <CusTableCell1 align="center">PRODUCT ID</CusTableCell1>
              <CusTableCell1 align="center">DISH</CusTableCell1>
              <CusTableCell1 align="center">DISH TYPE</CusTableCell1>
              <CusTableCell1 align="center">DISH CATEGORY</CusTableCell1>
              <CusTableCell1 align="center">SPICE IND.</CusTableCell1>
              <CusTableCell1 align="center">DISH DESCRIPTION</CusTableCell1>
              <CusTableCell1 align="center">PRODUCT SIZE</CusTableCell1>
              <CusTableCell1 align="center">PRICE</CusTableCell1>
              <CusTableCell1 align="center">IMAGE PATH</CusTableCell1>
              <CusTableCell1 align="center">MENU AVAILABLE FLAG</CusTableCell1>
              <CusTableCell1 align="center">
                INGREDIENT EXIST FLAG
              </CusTableCell1>
              <CusTableCell1 align="center">COMMON IMAGE</CusTableCell1>
              <CusTableCell1 align="center">CREATED BY</CusTableCell1>
              <CusTableCell1 align="center">CREATED DATE</CusTableCell1>
            </TableRow>
          </TableHead>
          <TableBody>
            {productList && productList.length > 0 ? (
              <>
                {productList.map((row) => (
                  <TableRow key={row.id}>
                    <CusTableCell2 align="center">{row.id}</CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.restaruantId}
                    </CusTableCell2>
                    <CusTableCell2 align="center">{row.storeId}</CusTableCell2>
                    <CusTableCell2 align="center">{row.section}</CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.productId}
                    </CusTableCell2>
                    <CusTableCell2 align="center">{row.dish}</CusTableCell2>
                    <CusTableCell2 align="center">{row.dishType}</CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.dishCategory}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.dishSpiceIndicatory}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.dishDescriptionId}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.productSize}
                    </CusTableCell2>

                    <CusTableCell2 align="center">{row.price}</CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.imagePath}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.menuAvailableFlag}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.ingredientExistsFalg}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.commonImage}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.createdBy}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.createdDate}
                    </CusTableCell2>
                  </TableRow>
                ))}
              </>
            ) : (
              <TableRow>
                <CusTableCell2 scope="row" colspan="13">
                  {loading ? (
                    <div className="d-flex justify-content-center">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      ></div>
                    </div>
                  ) : (
                    <Alert severity="warning">
                      {!props.restaurantId || !props.storeId
                        ? "Please select a store first!"
                        : "No menu items to show!"}{" "}
                    </Alert>
                  )}
                </CusTableCell2>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
