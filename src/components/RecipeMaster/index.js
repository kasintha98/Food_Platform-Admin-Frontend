import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Modal, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
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
  Typography,
  FormControl,
  NativeSelect,
  TextField,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import { getActiveRecipes } from "../../actions";
import { useSelector, useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";

const MyPaginate = styled(ReactPaginate)`
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  list-style-type: none;
  padding: 0 5rem;
  li a {
    border-radius: 7px;
    padding: 0.1rem 1rem;
    border: gray 1px solid;
    cursor: pointer;
  }
  li.previous a,
  li.next a,
  li.break a {
    border-color: transparent;
  }
  li.active a {
    background-color: #0366d6;
    border-color: transparent;
    color: white;
    min-width: 32px;
  }
  li.disabled a {
    color: grey;
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }
`;

const CusTableCell1 = styled(TableCell)`
  font-size: 0.75rem;
  font-weight: bold;
  background-color: #00b0f0;
  color: #fff;
`;

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

const CusTableCell = styled(TableCell)`
  padding: 0;
  font-size: 14px;
  border: 1px solid #000;
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

 & .MuiInputBase-input.Mui-disabled {
    -webkit-text-fill-color:  #404040;
  }
`;

const CusTypo = styled(Typography)`
  color: #7f7f7f;
  font-weight: bold;
`;

export const RecipeMaster = () => {
  const activeRecipes = useSelector((state) => state.inventory.activeRecipes);
  const activeRecipesLoading = useSelector(
    (state) => state.inventory.activeRecipesLoading
  );
  const uomList = useSelector((state) => state.inventory.uomList);
  const user = useSelector((state) => state.auth.user);
  const productListMaster = useSelector(
    (state) => state.product.masterProducts
  );
  const productListLoading = useSelector((state) => state.product.loading);

  const [pagination, setPagination] = useState({
    data: productListMaster,
    offset: 0,
    numberPerPage: 10,
    pageCount: 0,
    currentData: productListMaster.slice(0, 10),
  });
  const [showAdd, setShowAdd] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentItemQty, setCurrentItemQty] = useState({});
  const [itemUOM, setItemUOM] = useState("");
  const [currentItemCost, setCurrentItemCost] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActiveRecipes());
  }, []);

  useEffect(() => {
    setPagination((prevState) => ({
      ...prevState,
      pageCount: productListMaster.length / prevState.numberPerPage,
      currentData: productListMaster.slice(
        pagination.offset,
        pagination.offset + pagination.numberPerPage
      ),
    }));
  }, [pagination.numberPerPage, pagination.offset, productListMaster]);

  const getIngredientsByProductId = (id, list) => {
    let filtered = list.filter((x) => x.productId === id);
    return filtered;
  };

  const calcMenuCost = (id, list) => {
    const items = getIngredientsByProductId(id, list);
    let total = 0;

    for (let i = 0; i < items.length; i++) {
      total = total + Number(items[i].itemQty) * Number(items[i].itemCost);
    }

    return total.toFixed(2);
  };

  const handlePageClick = (event) => {
    const selected = event.selected;
    const offset = selected * pagination.numberPerPage;
    setPagination({ ...pagination, offset });
  };

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  const renderAddModal = () => {
    return (
      <Modal
        size="lg"
        show={showAdd}
        onHide={handleCloseAdd}
        style={{
          marginTop: "65px",
          zIndex: 1100,
          paddingBottom: "60px",
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {currentProduct ? currentProduct.dishType : "ADD"}
          </Modal.Title>
        </Modal.Header>
        {currentProduct ? (
          <Modal.Body>
            <Row>
              <Col xs={5} align="center">
                <CusTypo>Ingredient Name</CusTypo>
              </Col>
              <Col xs={2} align="center">
                <CusTypo>Qty.</CusTypo>
              </Col>
              <Col xs={2} align="center">
                <CusTypo>UOM</CusTypo>
              </Col>
              <Col xs={2} align="center">
                <CusTypo>Cost</CusTypo>
              </Col>
              <Col xs={1} align="center"></Col>
            </Row>

            {getIngredientsByProductId(
              currentProduct.productId,
              activeRecipes
            ).map((item) => (
              <Row>
                <Col xs={5} align="center">
                  {item.itemId}
                </Col>
                <Col xs={2} align="center">
                  <CusTextField
                    key={item.id}
                    defaultValue={item.itemQty}
                    value={currentItemQty[item.id]}
                    onChange={(event) => {
                      const qty = {
                        ...currentItemQty,
                        [item.id]: event.target.value,
                      };
                      setCurrentItemQty(qty);
                    }}
                    fullWidth
                    variant="standard"
                  />
                </Col>
                <Col xs={2} align="center">
                  <FormControl fullWidth>
                    <NativeSelect
                      key={item.id}
                      defaultValue={item.itemUOM}
                      inputProps={{
                        name: "status",
                        id: "uncontrolled-native",
                      }}
                      onChange={(event) => {
                        setItemUOM(event.target.value);
                      }}
                      sx={{ fontSize: "0.75rem" }}
                    >
                      {uomList &&
                        uomList.map((item) => (
                          <option
                            value={item.configCriteriaValue}
                            style={{ fontSize: "0.75rem" }}
                          >
                            {item.configCriteriaDesc}
                          </option>
                        ))}
                      <option value={""} style={{ fontSize: "0.75rem" }}>
                        Select UOM
                      </option>
                    </NativeSelect>
                  </FormControl>
                </Col>
                <Col xs={2} align="center">
                  <CusTextField
                    key={item.id}
                    defaultValue={item.itemCost}
                    value={currentItemCost[item.id]}
                    onChange={(event) => {
                      const ost = {
                        ...currentItemCost,
                        [item.id]: event.target.value,
                      };
                      setCurrentItemCost(ost);
                    }}
                    fullWidth
                    variant="standard"
                  />
                </Col>
                <Col xs={1} align="center">
                  <IconButton
                    key={item.id}
                    sx={{
                      fontSize: "0.75rem",
                      color: "red",
                    }}
                    onClick={() => {
                      /* softDeleteSupplier(item.id); */
                    }}
                  >
                    <DeleteIcon
                      sx={{ height: "0.95rem", width: "0.95rem" }}
                    ></DeleteIcon>
                  </IconButton>
                </Col>
              </Row>
            ))}
          </Modal.Body>
        ) : null}

        <Modal.Footer>
          <Button variant="contained" color="error" onClick={handleCloseAdd}>
            Close
          </Button>
          &nbsp;
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              /* saveNewSupplier(); */
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <div>
      <TableContainer component={Paper} sx={{ maxHeight: 430 }}>
        <Table sx={{ minWidth: 800 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <CusTableCell1 align="center">RESTAURANT</CusTableCell1>
              <CusTableCell1 align="center">PRODUCT ID</CusTableCell1>
              <CusTableCell1 align="center">DISH NAME</CusTableCell1>
              <CusTableCell1 align="center">MENU COST</CusTableCell1>
              <CusTableCell1 align="center">RECIPE</CusTableCell1>
              <CusTableCell1 align="center">ACTION</CusTableCell1>
            </TableRow>
          </TableHead>
          <TableBody>
            {productListLoading || activeRecipesLoading ? (
              <TableRow>
                <TableCell colSpan={14}>
                  <div className="d-flex justify-content-center">
                    <div
                      className="spinner-border text-primary"
                      role="status"
                    ></div>
                  </div>
                  <div className="text-center">
                    <Typography>Loading Data...</Typography>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              <>
                {productListMaster && productListMaster.length > 0 ? (
                  <>
                    {productListMaster
                      .slice(
                        pagination.offset,
                        pagination.offset + pagination.numberPerPage
                      )
                      .map((item, index) => (
                        <TableRow key={item.id}>
                          <CusTableCell align="center">Hangries</CusTableCell>
                          <CusTableCell align="center">
                            {item.productId}
                          </CusTableCell>
                          <CusTableCell align="center">
                            {item.dishType}
                          </CusTableCell>
                          <CusTableCell align="center">
                            Rs. {calcMenuCost(item.productId, activeRecipes)}
                          </CusTableCell>
                          <CusTableCell align="center">
                            {getIngredientsByProductId(
                              item.productId,
                              activeRecipes
                            ).map((item) => (
                              <span>{item.itemId}, </span>
                            ))}
                          </CusTableCell>
                          <CusTableCell align="center">
                            <Button
                              onClick={() => {
                                setCurrentProduct(item);
                                handleShowAdd();
                              }}
                            >
                              Edit
                            </Button>
                          </CusTableCell>
                        </TableRow>
                      ))}
                  </>
                ) : (
                  <TableRow>
                    <TableCell colSpan={15}>
                      <Alert severity="warning">No items found!</Alert>
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <MyPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={pagination.pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
      {renderAddModal()}
    </div>
  );
};
