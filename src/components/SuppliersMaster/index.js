import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Modal } from "react-bootstrap";
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
  Select,
  InputLabel,
  MenuItem,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import {
  getActiveSuppliers,
  saveUpdateSupplier,
  deleteSupplier,
} from "../../actions";
import ReactPaginate from "react-paginate";
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

export const SuppliersMaster = () => {
  const allSuppliers = useSelector((state) => state.inventory.allSuppliers);
  const allSuppliersLoading = useSelector(
    (state) => state.inventory.allSuppliersLoading
  );
  const user = useSelector((state) => state.auth.user);

  const [isSave, setIsSave] = useState({});
  const [isAddNew, setIsAddNew] = useState(false);
  const [supplierCategory, setSupplierCategory] = useState("");
  const [supplierStatus, setSupplierStatus] = useState("");
  const [currentSupplierName, setCurrentSupplierName] = useState({});
  const [currentSupplierAddress, setCurrentSupplierAddress] = useState({});
  const [currentSupplierCity, setCurrentSupplierCity] = useState({});
  const [currentSupplierState, setCurrentSupplierState] = useState({});
  const [currentSupplierPinCode, setCurrentSupplierPinCode] = useState({});
  const [currentSupplierPhone, setCurrentSupplierPhone] = useState({});
  const [currentSupplierEmail, setCurrentSupplierEmail] = useState({});
  const [currentSupplierFax, setCurrentSupplierFax] = useState({});
  const [currentSupplierGst, setCurrentSupplierGst] = useState({});
  const [currentSupplierTan, setCurrentSupplierTan] = useState({});
  const [showAdd, setShowAdd] = useState(false);
  const [newsupplierCategory, setNewSupplierCategory] = useState("EXTERNAL");
  const [newSupplierName, setNewSupplierName] = useState("");
  const [newSupplierAddress, setNewSupplierAddress] = useState("");
  const [newSupplierCity, setNewSupplierCity] = useState("");
  const [newSupplierState, setNewSupplierState] = useState("");
  const [newSupplierPinCode, setNewSupplierPinCode] = useState("");
  const [newSupplierPhone, setNewSupplierPhone] = useState("");
  const [newSupplierEmail, setNewSupplierEmail] = useState("");
  const [newSupplierFax, setNewSupplierFax] = useState("");
  const [newSupplierGst, setNewSupplierGst] = useState("");
  const [newSupplierTan, setNewSupplierTan] = useState("");
  const [newSupplierStatus, setNewSupplierStatus] = useState("");
  const [pagination, setPagination] = useState({
    data: allSuppliers,
    offset: 0,
    numberPerPage: 10,
    pageCount: 0,
    currentData: allSuppliers.slice(0, 10),
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActiveSuppliers());
  }, []);

  useEffect(() => {
    setPagination((prevState) => ({
      ...prevState,
      pageCount: allSuppliers.length / prevState.numberPerPage,
      currentData: allSuppliers.slice(
        pagination.offset,
        pagination.offset + pagination.numberPerPage
      ),
    }));
  }, [pagination.numberPerPage, pagination.offset, allSuppliers]);

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  const handleSupplierCategoryUpdate = (event) => {
    setSupplierCategory(event.target.value);
  };

  const handleSupplierStatusUpdate = (event) => {
    setSupplierStatus(event.target.value);
  };

  const onEditClickHandle = (id) => {
    let edits = { ...isSave, [id]: true };
    setIsSave(edits);
  };

  const onSaveClickHandle = (id) => {
    let edits = { ...isSave, [id]: false };
    setIsSave(edits);
  };

  const updateSupplierHandle = (oldSupplier) => {
    const newSupplier = {
      ...oldSupplier,
      supplierName: currentSupplierName[oldSupplier.id]
        ? currentSupplierName[oldSupplier.id]
        : oldSupplier.supplierName,
      supplierAddress: currentSupplierAddress[oldSupplier.id]
        ? currentSupplierAddress[oldSupplier.id]
        : oldSupplier.supplierAddress,
      supplierCity: currentSupplierCity[oldSupplier.id]
        ? currentSupplierCity[oldSupplier.id]
        : oldSupplier.supplierCity,
      supplierState: currentSupplierState[oldSupplier.id]
        ? currentSupplierState[oldSupplier.id]
        : oldSupplier.supplierState,
      supplierZipCode: currentSupplierPinCode[oldSupplier.id]
        ? currentSupplierPinCode[oldSupplier.id]
        : oldSupplier.supplierZipCode,
      supplierMobileNumber: currentSupplierPhone[oldSupplier.id]
        ? currentSupplierPhone[oldSupplier.id]
        : oldSupplier.supplierMobileNumber,
      supplierEmailId: currentSupplierEmail[oldSupplier.id]
        ? currentSupplierEmail[oldSupplier.id]
        : oldSupplier.supplierEmailId,
      supplierFaxNumber: currentSupplierFax[oldSupplier.id]
        ? currentSupplierFax[oldSupplier.id]
        : oldSupplier.supplierFaxNumber,
      supplierGstNumber: currentSupplierGst[oldSupplier.id]
        ? currentSupplierGst[oldSupplier.id]
        : oldSupplier.supplierGstNumber,
      supplierTANNumber: currentSupplierTan[oldSupplier.id]
        ? currentSupplierTan[oldSupplier.id]
        : oldSupplier.supplierTANNumber,
      supplierCategory: supplierCategory
        ? supplierCategory
        : oldSupplier.supplierCategory,
      supplierStatus: supplierStatus
        ? supplierStatus
        : oldSupplier.supplierStatus,
      updatedBy: user.loginId,
      updatedDate: new Date(),
    };

    dispatch(saveUpdateSupplier(newSupplier)).then((res) => {
      if (res) {
        onSaveClickHandle(oldSupplier.id);
        clearStates();
      }
    });
  };

  const handlePageClick = (event) => {
    const selected = event.selected;
    const offset = selected * pagination.numberPerPage;
    setPagination({ ...pagination, offset });
  };

  const saveNewSupplier = () => {
    if (!newSupplierName) {
      toast.error("Supplier name is mandatory!");
      return;
    }

    /* if (!newsupplierCategory) {
      toast.error("Supplier category is mandatory!");
      return;
    } */

    const newSupplier = {
      supplierName: newSupplierName,
      supplierAddress: newSupplierAddress,
      supplierCity: newSupplierCity,
      supplierState: newSupplierState,
      supplierZipCode: newSupplierPinCode,
      supplierMobileNumber: newSupplierPhone,
      supplierEmailId: newSupplierEmail,
      supplierFaxNumber: newSupplierFax,
      supplierGstNumber: newSupplierGst,
      supplierTANNumber: newSupplierTan,
      supplierCategory: newsupplierCategory ? newsupplierCategory : "EXTERNAL",
      supplierStatus: newSupplierStatus ? newSupplierStatus : "ACTIVE",
      createdBy: user.loginId,
      createdDate: new Date(),
      updatedBy: user.loginId,
      updatedDate: new Date(),
    };

    dispatch(saveUpdateSupplier(newSupplier)).then((res) => {
      if (res) {
        handleCloseAdd();
        clearStates();
        setIsAddNew(false);
      }
    });
  };

  const softDeleteSupplier = (id) => {
    dispatch(deleteSupplier(id, user.loginId));
  };

  const clearStates = () => {
    setSupplierCategory("");
    setSupplierStatus("");
    setCurrentSupplierName({});
    setCurrentSupplierAddress({});
    setCurrentSupplierCity({});
    setCurrentSupplierState({});
    setCurrentSupplierPinCode({});
    setCurrentSupplierPhone({});
    setCurrentSupplierEmail({});
    setCurrentSupplierFax({});
    setCurrentSupplierGst({});
    setCurrentSupplierTan({});

    setNewSupplierCategory("");
    setNewSupplierName("");
    setNewSupplierAddress("");
    setNewSupplierCity("");
    setNewSupplierState("");
    setNewSupplierPinCode("");
    setNewSupplierPhone("");
    setNewSupplierEmail("");
    setNewSupplierFax("");
    setNewSupplierGst("");
    setNewSupplierTan("");
    setNewSupplierStatus("");
  };

  const renderAddModal = () => {
    return (
      <Modal
        show={showAdd}
        onHide={handleCloseAdd}
        style={{
          marginTop: "65px",
          zIndex: 1100,
          paddingBottom: "60px",
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>ADD NEW TOPPING</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl fullWidth>
            <CusInputLabel
              sx={{ fontSize: "0.75rem", lineHeight: "1rem", top: "-11px" }}
            >
              Supplier Category
            </CusInputLabel>
            <CusSelect
              label="SupplierCategory"
              onChange={(event) => {
                setNewSupplierCategory(event.target.value);
              }}
              sx={{ fontSize: "0.75rem" }}
              fullWidth
            >
              <MenuItem value={"EXTERNAL"} style={{ fontSize: "0.75rem" }}>
                EXTERNAL
              </MenuItem>
              <MenuItem value={"INTERNAL"} style={{ fontSize: "0.75rem" }}>
                INTERNAL
              </MenuItem>
            </CusSelect>
          </FormControl>
          <div className="mt-3">
            <CusTextField
              label="Supplier Name"
              value={newSupplierName}
              onChange={(event) => {
                setNewSupplierName(event.target.value);
              }}
              fullWidth
            />
          </div>
          <div className="mt-3">
            <CusTextField
              label="Supplier Address"
              value={newSupplierAddress}
              onChange={(event) => {
                setNewSupplierAddress(event.target.value);
              }}
              fullWidth
            />
          </div>
          <div className="mt-3">
            <CusTextField
              label="Supplier City"
              value={newSupplierCity}
              onChange={(event) => {
                setNewSupplierCity(event.target.value);
              }}
              fullWidth
            />
          </div>
          <div className="mt-3">
            <CusTextField
              label="Supplier State"
              value={newSupplierState}
              onChange={(event) => {
                setNewSupplierState(event.target.value);
              }}
              fullWidth
            />
          </div>
          <div className="mt-3">
            <CusTextField
              label="Supplier ZipCode"
              value={newSupplierPinCode}
              onChange={(event) => {
                setNewSupplierPinCode(event.target.value);
              }}
              fullWidth
            />
          </div>
          <div className="mt-3">
            <CusTextField
              label="Supplier Phone NO"
              value={newSupplierPhone}
              onChange={(event) => {
                setNewSupplierPhone(event.target.value);
              }}
              fullWidth
            />
          </div>
          <div className="mt-3">
            <CusTextField
              label="Supplier Email"
              value={newSupplierEmail}
              onChange={(event) => {
                setNewSupplierEmail(event.target.value);
              }}
              fullWidth
            />
          </div>
          <div className="mt-3">
            <CusTextField
              label="Supplier Fax"
              value={newSupplierFax}
              onChange={(event) => {
                setNewSupplierFax(event.target.value);
              }}
              fullWidth
            />
          </div>
          <div className="mt-3">
            <CusTextField
              label="Supplier GST NO"
              value={newSupplierGst}
              onChange={(event) => {
                setNewSupplierGst(event.target.value);
              }}
              fullWidth
            />
          </div>
          <div className="mt-3">
            <CusTextField
              label="Supplier TAN NO"
              value={newSupplierTan}
              onChange={(event) => {
                setNewSupplierTan(event.target.value);
              }}
              fullWidth
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="contained" color="error" onClick={handleCloseAdd}>
            Close
          </Button>
          &nbsp;
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              saveNewSupplier();
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
              <CusTableCell1 align="center">NO</CusTableCell1>
              <CusTableCell1 align="center">CATEGORY</CusTableCell1>
              <CusTableCell1 align="center">NAME</CusTableCell1>
              <CusTableCell1 align="center">ADDRESS</CusTableCell1>
              <CusTableCell1 align="center">CITY</CusTableCell1>
              <CusTableCell1 align="center">STATE</CusTableCell1>
              <CusTableCell1 align="center">PIN CODE</CusTableCell1>
              <CusTableCell1 align="center">PHONE NO</CusTableCell1>
              <CusTableCell1 align="center">E-MAIL</CusTableCell1>
              <CusTableCell1 align="center">FAX NO</CusTableCell1>
              <CusTableCell1 align="center">GST NO</CusTableCell1>
              <CusTableCell1 align="center">TAX NO</CusTableCell1>
              {/* <CusTableCell1 align="center">STATUS</CusTableCell1> */}
              <CusTableCell1 align="center">ACTION</CusTableCell1>
            </TableRow>
          </TableHead>
          <TableBody>
            {allSuppliersLoading ? (
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
                {allSuppliers && allSuppliers.length > 0 ? (
                  <>
                    {allSuppliers
                      .slice(
                        pagination.offset,
                        pagination.offset + pagination.numberPerPage
                      )
                      .map((item, index) => (
                        <TableRow key={item.id}>
                          <CusTableCell align="center">
                            {index + 1 + pagination.offset}
                          </CusTableCell>
                          <CusTableCell align="center">
                            <FormControl fullWidth>
                              <NativeSelect
                                key={item.id}
                                defaultValue={item.supplierCategory}
                                inputProps={{
                                  name: "status",
                                  id: "uncontrolled-native",
                                }}
                                onChange={(event) => {
                                  setSupplierCategory(event.target.value);
                                }}
                                sx={{ fontSize: "0.75rem" }}
                                disabled={!isSave[item.id]}
                              >
                                <option
                                  value={"EXTERNAL"}
                                  style={{ fontSize: "0.75rem" }}
                                >
                                  EXTERNAL
                                </option>
                                <option
                                  value={"INTERNAL"}
                                  style={{ fontSize: "0.75rem" }}
                                >
                                  INTERNAL
                                </option>
                              </NativeSelect>
                            </FormControl>
                          </CusTableCell>
                          <CusTableCell align="center">
                            <CusTextField
                              key={item.id}
                              defaultValue={item.supplierName}
                              value={currentSupplierName[item.id]}
                              onChange={(event) => {
                                const names = {
                                  ...currentSupplierName,
                                  [item.id]: event.target.value,
                                };
                                setCurrentSupplierName(names);
                              }}
                              fullWidth
                              variant="standard"
                              disabled={!isSave[item.id]}
                            />
                          </CusTableCell>
                          <CusTableCell align="center">
                            <CusTextField
                              key={item.id}
                              defaultValue={item.supplierAddress}
                              value={currentSupplierAddress[item.id]}
                              onChange={(event) => {
                                const names = {
                                  ...currentSupplierAddress,
                                  [item.id]: event.target.value,
                                };
                                setCurrentSupplierAddress(names);
                              }}
                              fullWidth
                              variant="standard"
                              disabled={!isSave[item.id]}
                            />
                          </CusTableCell>
                          <CusTableCell align="center">
                            <CusTextField
                              key={item.id}
                              defaultValue={item.supplierCity}
                              value={currentSupplierCity[item.id]}
                              onChange={(event) => {
                                const cities = {
                                  ...currentSupplierCity,
                                  [item.id]: event.target.value,
                                };
                                setCurrentSupplierCity(cities);
                              }}
                              fullWidth
                              variant="standard"
                              disabled={!isSave[item.id]}
                            />
                          </CusTableCell>
                          <CusTableCell align="center">
                            <CusTextField
                              key={item.id}
                              defaultValue={item.supplierState}
                              value={currentSupplierState[item.id]}
                              onChange={(event) => {
                                const states = {
                                  ...currentSupplierState,
                                  [item.id]: event.target.value,
                                };
                                setCurrentSupplierState(states);
                              }}
                              fullWidth
                              variant="standard"
                              disabled={!isSave[item.id]}
                            />
                          </CusTableCell>

                          <CusTableCell align="center">
                            <CusTextField
                              key={item.id}
                              defaultValue={item.supplierZipCode}
                              value={currentSupplierPinCode[item.id]}
                              onChange={(event) => {
                                const pins = {
                                  ...currentSupplierPinCode,
                                  [item.id]: event.target.value,
                                };
                                setCurrentSupplierPinCode(pins);
                              }}
                              fullWidth
                              variant="standard"
                              disabled={!isSave[item.id]}
                            />
                          </CusTableCell>

                          <CusTableCell align="center">
                            <CusTextField
                              key={item.id}
                              defaultValue={item.supplierMobileNumber}
                              value={currentSupplierPhone[item.id]}
                              onChange={(event) => {
                                const phomes = {
                                  ...currentSupplierPhone,
                                  [item.id]: event.target.value,
                                };
                                setCurrentSupplierPhone(phomes);
                              }}
                              fullWidth
                              variant="standard"
                              disabled={!isSave[item.id]}
                            />
                          </CusTableCell>

                          <CusTableCell align="center">
                            <CusTextField
                              key={item.id}
                              defaultValue={item.supplierEmailId}
                              value={currentSupplierEmail[item.id]}
                              onChange={(event) => {
                                const email = {
                                  ...currentSupplierEmail,
                                  [item.id]: event.target.value,
                                };
                                setCurrentSupplierEmail(email);
                              }}
                              fullWidth
                              variant="standard"
                              disabled={!isSave[item.id]}
                            />
                          </CusTableCell>

                          <CusTableCell align="center">
                            <CusTextField
                              key={item.id}
                              defaultValue={item.supplierFaxNumber}
                              value={currentSupplierFax[item.id]}
                              onChange={(event) => {
                                const faxes = {
                                  ...currentSupplierFax,
                                  [item.id]: event.target.value,
                                };
                                setCurrentSupplierFax(faxes);
                              }}
                              fullWidth
                              variant="standard"
                              disabled={!isSave[item.id]}
                            />
                          </CusTableCell>

                          <CusTableCell align="center">
                            <CusTextField
                              key={item.id}
                              defaultValue={item.supplierGstNumber}
                              value={currentSupplierGst[item.id]}
                              onChange={(event) => {
                                const faxes = {
                                  ...currentSupplierGst,
                                  [item.id]: event.target.value,
                                };
                                setCurrentSupplierGst(faxes);
                              }}
                              fullWidth
                              variant="standard"
                              disabled={!isSave[item.id]}
                            />
                          </CusTableCell>

                          <CusTableCell align="center">
                            <CusTextField
                              key={item.id}
                              defaultValue={item.supplierTANNumber}
                              value={currentSupplierTan[item.id]}
                              onChange={(event) => {
                                const faxes = {
                                  ...currentSupplierTan,
                                  [item.id]: event.target.value,
                                };
                                setCurrentSupplierTan(faxes);
                              }}
                              fullWidth
                              variant="standard"
                              disabled={!isSave[item.id]}
                            />
                          </CusTableCell>

                          {/* <CusTableCell align="center">
                          <FormControl fullWidth>
                            <NativeSelect
                              key={item.id}
                              defaultValue={item.supplierStatus}
                              inputProps={{
                                name: "status",
                                id: "uncontrolled-native",
                              }}
                              onChange={handleSupplierStatusUpdate}
                              sx={{
                                fontSize: "0.75rem",
                                "& .MuiInputBase-input.Mui-disabled": {
                                  WebkitTextFillColor:
                                    item.supplierStatus === "INACTIVE"
                                      ? "red !important"
                                      : "green !important",
                                },
                              }}
                              disabled={!isSave[item.id]}
                            >
                              <option
                                value={"ACTIVE"}
                                style={{ fontSize: "0.75rem" }}
                              >
                                ACTIVE
                              </option>
                              <option
                                value={"INACTIVE"}
                                style={{ fontSize: "0.75rem" }}
                              >
                                INACTIVE
                              </option>
                            </NativeSelect>
                          </FormControl>
                        </CusTableCell> */}
                          <CusTableCell align="center">
                            {isSave[item.id] ? (
                              <IconButton
                                key={item.id}
                                sx={{
                                  fontSize: "0.75rem",
                                  color: "#92D050",
                                }}
                                onClick={() => {
                                  updateSupplierHandle(item);
                                }}
                              >
                                <SaveIcon
                                  sx={{ height: "0.95rem", width: "0.95rem" }}
                                ></SaveIcon>
                              </IconButton>
                            ) : (
                              <IconButton
                                key={item.id}
                                sx={{
                                  fontSize: "0.75rem",
                                  color: "#FFC000",
                                }}
                                onClick={() => {
                                  onEditClickHandle(item.id);
                                }}
                              >
                                <EditIcon
                                  sx={{ height: "0.95rem", width: "0.95rem" }}
                                ></EditIcon>
                              </IconButton>
                            )}

                            <IconButton
                              key={item.id}
                              sx={{
                                fontSize: "0.75rem",
                                color: "red",
                              }}
                              onClick={() => {
                                softDeleteSupplier(item.id);
                              }}
                            >
                              <DeleteIcon
                                sx={{ height: "0.95rem", width: "0.95rem" }}
                              ></DeleteIcon>
                            </IconButton>
                          </CusTableCell>
                        </TableRow>
                      ))}

                    {isAddNew ? (
                      <TableRow>
                        <CusTableCell align="center">
                          {allSuppliers ? allSuppliers.length + 1 : "#"}
                        </CusTableCell>
                        <CusTableCell align="center">
                          <FormControl fullWidth>
                            <NativeSelect
                              inputProps={{
                                name: "status",
                                id: "uncontrolled-native",
                              }}
                              onChange={(event) => {
                                setNewSupplierCategory(event.target.value);
                              }}
                              sx={{ fontSize: "0.75rem" }}
                            >
                              <option
                                value={"EXTERNAL"}
                                style={{ fontSize: "0.75rem" }}
                              >
                                EXTERNAL
                              </option>
                              <option
                                value={"INTERNAL"}
                                style={{ fontSize: "0.75rem" }}
                              >
                                INTERNAL
                              </option>
                            </NativeSelect>
                          </FormControl>
                        </CusTableCell>
                        <CusTableCell align="center">
                          <CusTextField
                            value={newSupplierName}
                            onChange={(event) => {
                              setNewSupplierName(event.target.value);
                            }}
                            fullWidth
                            variant="standard"
                          />
                        </CusTableCell>
                        <CusTableCell align="center">
                          <CusTextField
                            value={newSupplierAddress}
                            onChange={(event) => {
                              setNewSupplierAddress(event.target.value);
                            }}
                            fullWidth
                            variant="standard"
                          />
                        </CusTableCell>
                        <CusTableCell align="center">
                          <CusTextField
                            value={newSupplierCity}
                            onChange={(event) => {
                              setNewSupplierCity(event.target.value);
                            }}
                            fullWidth
                            variant="standard"
                          />
                        </CusTableCell>
                        <CusTableCell align="center">
                          <CusTextField
                            value={newSupplierState}
                            onChange={(event) => {
                              setNewSupplierState(event.target.value);
                            }}
                            fullWidth
                            variant="standard"
                          />
                        </CusTableCell>

                        <CusTableCell align="center">
                          <CusTextField
                            value={newSupplierPinCode}
                            onChange={(event) => {
                              setNewSupplierPinCode(event.target.value);
                            }}
                            fullWidth
                            variant="standard"
                          />
                        </CusTableCell>

                        <CusTableCell align="center">
                          <CusTextField
                            value={newSupplierPhone}
                            onChange={(event) => {
                              setNewSupplierPhone(event.target.value);
                            }}
                            fullWidth
                            variant="standard"
                          />
                        </CusTableCell>

                        <CusTableCell align="center">
                          <CusTextField
                            value={newSupplierEmail}
                            onChange={(event) => {
                              setNewSupplierEmail(event.target.value);
                            }}
                            fullWidth
                            variant="standard"
                          />
                        </CusTableCell>

                        <CusTableCell align="center">
                          <CusTextField
                            value={newSupplierFax}
                            onChange={(event) => {
                              setNewSupplierFax(event.target.value);
                            }}
                            fullWidth
                            variant="standard"
                          />
                        </CusTableCell>

                        <CusTableCell align="center">
                          <CusTextField
                            value={newSupplierGst}
                            onChange={(event) => {
                              setNewSupplierGst(event.target.value);
                            }}
                            fullWidth
                            variant="standard"
                          />
                        </CusTableCell>

                        <CusTableCell align="center">
                          <CusTextField
                            value={newSupplierTan}
                            onChange={(event) => {
                              setNewSupplierTan(event.target.value);
                            }}
                            fullWidth
                            variant="standard"
                          />
                        </CusTableCell>

                        {/* <CusTableCell align="center">
                          <FormControl fullWidth>
                            <NativeSelect
                              inputProps={{
                                name: "status",
                                id: "uncontrolled-native",
                              }}
                              onChange={(event) => {
                                setNewSupplierStatus(event.target.value);
                              }}
                              sx={{ fontSize: "0.75rem" }}
                            >
                              <option
                                value={"ACTIVE"}
                                style={{
                                  fontSize: "0.75rem",
                                }}
                              >
                                ACTIVE
                              </option>
                              <option
                                value={"INACTIVE"}
                                style={{
                                  fontSize: "0.75rem",
                                }}
                              >
                                INACTIVE
                              </option>
                            </NativeSelect>
                          </FormControl>
                        </CusTableCell> */}
                        <CusTableCell align="center">
                          <IconButton
                            sx={{
                              fontSize: "0.75rem",
                              color: "#92D050",
                            }}
                            onClick={() => {
                              saveNewSupplier();
                            }}
                          >
                            <SaveIcon
                              sx={{ height: "0.95rem", width: "0.95rem" }}
                            ></SaveIcon>
                          </IconButton>
                          <IconButton
                            sx={{
                              fontSize: "0.75rem",
                              color: "red",
                            }}
                            onClick={() => {
                              setIsAddNew(false);
                            }}
                          >
                            <CloseIcon
                              sx={{ height: "0.95rem", width: "0.95rem" }}
                            ></CloseIcon>
                          </IconButton>
                        </CusTableCell>
                      </TableRow>
                    ) : null}
                  </>
                ) : (
                  <TableRow>
                    <TableCell colSpan={15}>
                      <Alert severity="warning">No suppliers found!</Alert>
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <SaveButton
        className="mt-4"
        onClick={
          /* handleShowAdd */ () => {
            setIsAddNew(true);
          }
        }
      >
        ADD ANOTHER
      </SaveButton>
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
