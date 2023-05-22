import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  getProductsNew,
  getAllSections,
  getAllSectionsWithDishes,
  getProductsNewWithPaging,
  updateMenuItem,
  saveProduct,
  getAllDishesFromMaster,
  getAllSectionsFromMaster,
  saveSection,
  saveDish,
  uploadImage,
  saveSubProduct,
  getAllMenuIngredientsByRestoAndStoreId,
  saveMenuIngredient,
  saveSubProductNew,
  getAllProduct,
  saveProductMenuMapping,
} from "../../actions";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Row, Col, Form, Modal } from "react-bootstrap";
import Select from "@mui/material/Select";
import styled from "@emotion/styled";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import {
  Typography,
  TextField,
  Button,
  Alert,
  TableContainer,
} from "@mui/material";
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

const CusInputLabel = styled(InputLabel)`
  &.Mui-focused {
    top: 0px !important;
  }

  &.MuiFormLabel-filled {
    top: 0px !important;
  }
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

// const CusTableCell = styled(TableCell)`
//   padding: 0;
//   font-size: 14px;
//   border: 1px solid #000;
// `;

const CusTableCell = styled(TableCell)`
  padding: 0;
  font-size: 14px;
`;

// const CusTableCell1 = styled(TableCell)`
//   padding: 0;
//   font-size: 14px;
//   border: 1px solid #000;
//   background-color: #ffc000;
//   color: #fff;
// `;

const CusTableCell1 = styled(TableCell)`
  padding: 0;
  font-size: 14px;
  border: 1px solid #837E7C;
  background-color: #837E7C;
  color: #fff;
  height: 40px;
`;

const CusMenuItem = styled(MenuItem)``;

const itemsPerPage = 33;

const kdsRouters = ["PIZZA", "CHINESE", "DRINKS", "FAST FOOD"];

export const ProductMappingMaster = () => {
  const stores = useSelector((state) => state.store.stores);
  //const productsByRes = useSelector((state) => state.product.products);
  const productList = useSelector((state) => state.product.products);
  const productListMaster = useSelector(
    (state) => state.product.masterProducts
  );
  const user = useSelector((state) => state.auth.user);
  const allSectionsFromMaster = useSelector(
    (state) => state.product.allSectionsFromMaster
  );
  const allDishesFromMaster = useSelector(
    (state) => state.product.allDishesFromMaster
  );
  //const productsOfPage = useSelector((state) => state.product.productsOfPage);
  const allDishesBySection = useSelector(
    (state) => state.product.allDishesBySection
  );
  const productListLoading = useSelector((state) => state.product.loading);
  const dishSectionLoading = useSelector(
    (state) => state.product.dishSectionLoading
  );
  //const allDishOfSection = useSelector((state) => state.product.allDishOfSection);
  const sections = useSelector((state) => state.product.sections);

  const [selectedStore, setSelectedStore] = useState(
    //stores[0] ? stores[0].resturantName : null
    null
  );
  const [selectedStoreObj, setSelectedStoreObj] = useState(
    /* stores[0] */ null
  );
  const [newDishSection, setNewDishSection] = useState("");
  const [newDishCategory, setNewDishCategory] = useState("");
  const [currentRestaurent, setCurrentRestaurent] = useState("");
  const [currentSection, setCurrentSection] = useState("");
  const [currentDish, setCurrentDish] = useState("");
  const [currentVeg, setCurrentVeg] = useState("");
  const [currentSpice, setCurrentSpice] = useState("");
  const [currentDishType, setCurrentDishType] = useState({});
  const [currentDishDesc, setCurrentDishDesc] = useState({});
  const [currentKdsRoutingName, setCurrentKdsRoutingName] = useState("");

  //const [currentImageName, setCurrentImageName] = useState({});
  const [currentPrice, setCurrentPrice] = useState({});
  const [currentMenuFlag, setCurrentMenuFlag] = useState("");
  const [currentIngredientFlag, setCurrentIngredientFlag] = useState("");
  const [currentSize, setCurrentSize] = useState("");
  const [productImage, setProductImage] = useState({});
  const [page, setPage] = useState(1);
  const [productsOfPage, setProductsOfPage] = useState([]);
  const [isSave, setIsSave] = useState({});
  const [sectionKeyword, setSectionKeyword] = useState("");
  const [categoryKeyword, setCategoryKeyword] = useState("");
  const [nameKeyword, setNameKeyword] = useState("");
  const [firstProductList, setFirstProductList] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showAddTopping, setShowAddTopping] = useState(false);
  const [newSection, setNewSection] = useState("");
  const [newDish, setNewDish] = useState("");
  const [newVeg, setNewVeg] = useState("");
  const [newSpice, setNewSpice] = useState("None");
  const [newDishType, setNewDishType] = useState("");
  const [newDishDesc, setNewDishDesc] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newPriceTopping, setNewPriceTopping] = useState("");
  const [newMenuFlag, setNewMenuFlag] = useState("");
  const [newOnlineApplicableFlag, setNewOnlineApplicableFlag] = useState("");
  const [newIngredientFlag, setNewIngredientFlag] = useState("");
  const [newSize, setNewSize] = useState("");
  const [newSizeTopping, setNewSizeTopping] = useState("");
  const [newProductImage, setNewProductImage] = useState("");
  const [newCommonImage, setNewCommonImage] = useState("");
  const [newKdsRoutingName, setNewKdsRoutingName] = useState("");
  const [newSelectedStore, setNewSelectedStore] = useState(null);
  const [newSelectedStoreObj, setNewSelectedStoreObj] = useState(null);
  const [isAddNewSection, setIsAddNewSection] = useState(false);
  const [isAddNewCategory, setIsAddNewCategory] = useState(false);
  const [addNewDishText, setAddNewDishText] = useState("");
  const [addNewSectionText, setAddNewSectionText] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newCategoryTopping, setNewCategoryTopping] = useState("");
  const [newIngredientTypeTopping, setNewIngredientTypeTopping] = useState("");
  const [isRefresh, setIsRefresh] = useState(false);
  const [mappings, setMappings] = useState([]);
  const [checkList, setCheckList] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProduct(user.restaurantId));
  }, []);

  useEffect(() => {
    if (selectedStoreObj) {
      dispatch(
        getAllMenuIngredientsByRestoAndStoreId(
          selectedStoreObj.restaurantId,
          selectedStoreObj.storeId
        )
      );
    }
  }, [selectedStoreObj, isRefresh]);

  useEffect(() => {
    if (selectedStoreObj) {
      dispatch(
        getProductsNew(selectedStoreObj.restaurantId, selectedStoreObj.storeId)
      ).then((res) => {
        if (res) {
          setFirstProductList(res);
        }
      });

      dispatch(
        getAllSections(selectedStoreObj.restaurantId, selectedStoreObj.storeId)
      );

      dispatch(
        getAllSectionsWithDishes(
          selectedStoreObj.restaurantId,
          selectedStoreObj.storeId
        )
      );
    }

    console.log("------------------",user.restaurantId)
    dispatch(getAllSectionsFromMaster(user.restaurantId));
    dispatch(getAllDishesFromMaster(user.restaurantId));
  }, [selectedStoreObj]);

  useEffect(() => {
    if (newSelectedStoreObj) {
      dispatch(
        getAllSections(
          newSelectedStoreObj.restaurantId,
          newSelectedStoreObj.storeId
        )
      );

      dispatch(
        getAllSectionsWithDishes(
          newSelectedStoreObj.restaurantId,
          newSelectedStoreObj.storeId
        )
      );
    }
  }, [newSelectedStoreObj]);

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  const handleCloseAddTopping = () => setShowAddTopping(false);
  const handleShowAddTopping = () => setShowAddTopping(true);

  const handleChangeStore = (event) => {
    setSelectedStore(event.target.value);
  };

  const handleSelectedStore = (store) => {
    setSelectedStoreObj(store);
  };

  const handleChangeStoreNew = (event) => {
    setNewSelectedStore(event.target.value);
  };

  const handleSelectedStoreNew = (store) => {
    setNewSelectedStoreObj(store);
  };

  const handleToppingTypeNew = (event) => {
    setNewCategoryTopping(event.target.value);
  };

  const handleRefresh = () => {
    if (isRefresh) {
      setIsRefresh(false);
    } else {
      setIsRefresh(true);
    }
  };

  const handleSizeNewTopping = (event) => {
    setNewSizeTopping(event.target.value);
  };

  const handleRestaurentUpdate = (event) => {
    console.log(event.target.value);
    setCurrentRestaurent(event.target.value);
  };

  const handleSectionUpdate = (event) => {
    console.log(event.target.value);
    setCurrentSection(event.target.value);
  };

  const handleDishUpdate = (event) => {
    console.log(event.target.value);
    setCurrentDish(event.target.value);
  };

  const handleVegUpdate = (event) => {
    console.log(event.target.value);
    setCurrentVeg(event.target.value);
  };

  const handleSpiceUpdate = (event) => {
    console.log(event.target.value);
    setCurrentSpice(event.target.value);
  };

  const handleMenuFlagUpdate = (event) => {
    console.log(event.target.value);
    setCurrentMenuFlag(event.target.value);
  };

  const handleKdsRoutingNameUpdate = (event) => {
    console.log(event.target.value);
    setCurrentKdsRoutingName(event.target.value);
  };

  const handleIngredientFlagUpdate = (event) => {
    console.log(event.target.value);
    setCurrentIngredientFlag(event.target.value);
  };

  const handleSizeUpdate = (event) => {
    console.log(event.target.value);
    setCurrentSize(event.target.value);
  };

  const handlePage = (event, value) => {
    setPage(value);
  };

  const handleProductImage = (e, id) => {
    if (e.target.files[0].size > 400000) {
      toast.error("File is too big. Please enter a image under 400 kb!");
      return;
    }

    if (e.target.files[0].type !== "image/jpeg") {
      toast.error("Only JPG images are accepted!");
      return;
    }

    let images = { ...productImage, [id]: e.target.files[0] };
    setProductImage(images);
    console.log(images);
  };

  const handleProductImageNew = (e) => {
    if (e.target.files[0].size > 400000) {
      toast.error("File is too big. Please enter a image under 400 kb!");
      return;
    }

    if (e.target.files[0].type !== "image/jpeg") {
      toast.error("Only JPG images are accepted!");
      return;
    }
    setNewProductImage(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const onEditClickHandle = (id) => {
    let edits = { ...isSave, [id]: true };
    setIsSave(edits);
  };

  const onSaveClickHandle = (id) => {
    let edits = { ...isSave, [id]: false };
    setIsSave(edits);
  };

  const saveUpdateProduct = (product) => {
    const newProduct = {
      id: product.id,
      productId: product.productId,
      restaruantId: product.restaruantId,
      storeId: product.storeId,
      section: currentSection ? currentSection : product.section,
      dish: currentDish ? currentDish : product.dish,
      dishCategory: currentVeg ? currentVeg : product.dishCategory,
      dishSpiceIndicatory: currentSpice
        ? currentSpice
        : product.dishSpiceIndicatory,
      dishType: currentDishType[product.id]
        ? currentDishType[product.id]
        : product.dishType,
      dishDescriptionId: currentDishDesc[product.id]
        ? currentDishDesc[product.id]
        : product.dishDescriptionId,
      productSize: currentSize ? currentSize : product.productSize,
      price: currentPrice[product.id]
        ? currentPrice[product.id]
        : product.price,
      imagePath: productImage[product.id]
        ? productImage[product.id].name.split(".").slice(0, -1).join(".")
        : product.imagePath,
      menuAvailableFlag: currentMenuFlag
        ? currentMenuFlag
        : product.menuAvailableFlag,
      ingredientExistsFalg: currentIngredientFlag
        ? currentIngredientFlag
        : product.ingredientExistsFalg,
      commonImage: product.commonImage,
      kdsRoutingName: currentKdsRoutingName
        ? currentKdsRoutingName
        : product.kdsRoutingName,
    };

    const formDataImage = new FormData();
    formDataImage.append("files", productImage[product.id]);

    dispatch(updateMenuItem(newProduct)).then((res) => {
      if (res && productImage[product.id]) {
        dispatch(uploadImage(formDataImage));
      }
    });
    console.log(newProduct);
  };

  const saveNewProduct = () => {
    if (
      /* !newSelectedStoreObj || */
      !newSection ||
      !newDish ||
      !newVeg ||
      !newSpice ||
      !newDishType ||
      !newDishDesc ||
      !newSize ||
      !newPrice ||
      !newProductImage ||
      !newMenuFlag ||
      !newCommonImage ||
      !newIngredientFlag ||
      !newKdsRoutingName ||
      !newOnlineApplicableFlag
    ) {
      toast.error("Please fill all the fields!");
      return;
    }

    //Restaurant related change
    const newProduct = {
      /* restaruantId: newSelectedStoreObj.restaurantId,
      storeId: newSelectedStoreObj.storeId, */

      restaurantId:user.restaurantId,
      storeId: 'ALL',
      section: newSection,
      dish: newDish,
      dishCategory: newVeg,
      dishSpiceIndicator: newSpice === "None" ? "" : newSpice,
      dishType: newDishType,
      dishDescriptionId: newDishDesc,
      productSize: newSize,
      price: newPrice,
      imagePath: newProductImage.name.split(".").slice(0, -1).join("."),
      menuAvailableFlag: newMenuFlag,
      commonImage: newCommonImage,
      ingredientExistFlag: newIngredientFlag,
      kdsRoutingName: newKdsRoutingName,
      createdBy: user.loginId,
      createdDate: new Date(),
      updatedBy: user.loginId,
      updatedDate: new Date(),
      productStatus: "ACTIVE",
      onlineApplicableFlag: newOnlineApplicableFlag
    };

    const formDataImage = new FormData();
    formDataImage.append("files", newProductImage);

    dispatch(saveProduct(newProduct)).then((res) => {
      if (res) {
        handleCloseAdd();
        dispatch(uploadImage(formDataImage)).then((res)=>{
          if(res){
            console.log("Uploaded");
            dispatch(getAllProduct(user.restaurantId));
            if (selectedStoreObj) {
              dispatch(
                getProductsNew(selectedStoreObj.restaurantId, selectedStoreObj.storeId)
              ).then((res) => {
                if (res) {
                  setFirstProductList(res);
                }
              });
            }
          }
        })
      }
    });
  };

  const saveNewTopping = () => {
    console.log(newCategoryTopping);
    if (
      !newIngredientTypeTopping ||
      !newCategoryTopping ||
      !newSizeTopping ||
      !newPriceTopping
    ) {
      toast.error("Please fill all the fields!");
      return;
    }

    if (!Number(newPriceTopping)) {
      toast.error("Price should be a number!");
      return;
    }

    /* const newSubProduct = {
      ingredientType: newIngredientTypeTopping,
      category: newCategoryTopping,
      size: newSizeTopping,
    }; */

    //Restaurant related change
    const newTopping = {
      /* storeId: selectedStoreObj.storeId,
      restaurantId: selectedStoreObj.restaurantId, */
      restaurantId: user.restaurantId,
      storeId: 'ALL',
      ingredientType: newIngredientTypeTopping,
      price: newPriceTopping,
      category: newCategoryTopping,
      imagePath: "IMAGE1",
      createdBy: user.loginId,
      subProductStatus: "ACTIVE",
      size: newSizeTopping,
      createdDate: new Date(),
      updatedBy: user.loginId,
      updatedDate: new Date(),
    };

    dispatch(saveSubProductNew(newTopping)).then((res) => {
      if (res) {
        handleCloseAddTopping();
        setNewIngredientTypeTopping("");
        setNewCategoryTopping("");
        setNewSizeTopping("");
        setNewPriceTopping(0);
        handleRefresh();
      }
    });
  };

  const renderAddModalTopping = () => {
    return (
      <Modal
        show={showAddTopping}
        onHide={handleCloseAddTopping}
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
              Topping Type
            </CusInputLabel>
            <CusSelect
              label="Topping Type"
              onChange={handleToppingTypeNew}
              sx={{ fontSize: "0.75rem" }}
              fullWidth
            >
              <MenuItem value={"Topping"} style={{ fontSize: "0.75rem" }}>
                Topping
              </MenuItem>
              <MenuItem
                value={"Choise of Base"}
                style={{ fontSize: "0.75rem" }}
              >
                Choice of Base
              </MenuItem>
            </CusSelect>
          </FormControl>
          <div className="mt-3">
            <CusTextField
              label="Topping Name"
              value={newIngredientTypeTopping}
              onChange={(event) => {
                setNewIngredientTypeTopping(event.target.value);
              }}
              fullWidth
            />
          </div>
          <FormControl className="mt-3" fullWidth>
            <CusInputLabel
              sx={{ fontSize: "0.75rem", lineHeight: "1rem", top: "-11px" }}
            >
              Size
            </CusInputLabel>
            <CusSelect
              onChange={handleSizeNewTopping}
              sx={{ fontSize: "0.75rem" }}
              label="Size"
              fullWidth
            >
              <MenuItem value={"Regular"} style={{ fontSize: "0.75rem" }}>
                Regular
              </MenuItem>
              <MenuItem value={"Small"} style={{ fontSize: "0.75rem" }}>
                Small
              </MenuItem>
              <MenuItem value={"Medium"} style={{ fontSize: "0.75rem" }}>
                Medium
              </MenuItem>
              <MenuItem value={"Large"} style={{ fontSize: "0.75rem" }}>
                Large
              </MenuItem>
            </CusSelect>
          </FormControl>
          <div className="mt-3">
            <CusTextField
              value={newPriceTopping}
              onChange={(event) => {
                setNewPriceTopping(event.target.value);
              }}
              fullWidth
              label="Price"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="contained"
            color="error"
            onClick={handleCloseAddTopping}
          >
            Close
          </Button>
          &nbsp;
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              saveNewTopping();
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const handleSaveChange = () => {
    if (!isAddNewSection && !isAddNewCategory) {
      saveNewProduct();
    }
    if (isAddNewSection && !isAddNewCategory) {
      if (!addNewSectionText) {
        toast.error("Please fill all the fields!");
        return;
      }

      //Restaurant related change
      const newSection = {
        section: addNewSectionText,
        restaurantId: user.restaurantId,
        storeId: 'ALL',
      };

      dispatch(saveSection(newSection)).then((res) => {
        if (res) {
          setIsAddNewSection(false);
          setAddNewSectionText("");
        }
      });
    }
    if (!isAddNewSection && isAddNewCategory) {
      if (!addNewDishText) {
        toast.error("Please fill all the fields!");
        return;
      }

      //Restaurant related change
      const newDish = {
        dish: addNewDishText,
        restaurantId: user.restaurantId,
        storeId: 'ALL',
      };

      dispatch(saveDish(newDish)).then((res) => {
        if (res) {
          setIsAddNewCategory(false);
          setAddNewDishText("");
        }
      });
    }
  };

  const handleCloseChange = () => {
    if (!isAddNewSection && !isAddNewCategory) {
      handleCloseAdd();
    }
    if (isAddNewSection && !isAddNewCategory) {
      setIsAddNewSection(false);
    }
    if (!isAddNewSection && isAddNewCategory) {
      setIsAddNewCategory(false);
    }
  };

  const renderAddModalNew = () => {
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
          <Modal.Title>ADD NEW DISH</Modal.Title>
        </Modal.Header>

        {isAddNewSection && !isAddNewCategory && (
          <Modal.Body>
            <CusTextField
              className="mt-3"
              label="Dish Section"
              value={addNewSectionText}
              onChange={(event) => {
                setAddNewSectionText(event.target.value);
              }}
              fullWidth
            />
          </Modal.Body>
        )}

        {isAddNewCategory && !isAddNewSection && (
          <Modal.Body>
            <CusTextField
              className="mt-3"
              label="Dish Category"
              value={addNewDishText}
              onChange={(event) => {
                setAddNewDishText(event.target.value);
              }}
              fullWidth
            />
          </Modal.Body>
        )}

        {!isAddNewSection && !isAddNewCategory && (
          <Modal.Body>
            {/* <FormControl fullWidth>
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
                value={newSelectedStore}
                label="Please select the store"
                onChange={handleChangeStoreNew}
              >
                {stores.map((store) => (
                  <CusMenuItem
                    onClick={() => {
                      handleSelectedStoreNew(store);
                    }}
                    value={store.resturantName}
                  >
                    <span>{store.resturantName}</span>
                  </CusMenuItem>
                ))}
              </CusSelect>
            </FormControl> */}

            <Row className="justify-content-center align-items-center mt-3">
              <Col sm={8}>
                <FormControl fullWidth>
                  <CusInputLabel
                    sx={{
                      fontSize: "0.75rem",
                      lineHeight: "1rem",
                      top: "-11px",
                    }}
                  >
                    Please select the section
                  </CusInputLabel>
                  <CusSelect
                    label="Please select the section"
                    onChange={(event) => {
                      setNewSection(event.target.value);
                    }}
                    sx={{ fontSize: "0.75rem" }}
                  >
                    {allSectionsFromMaster.map((section, index) => (
                      <CusMenuItem
                        key={index}
                        value={section.section}
                        style={{ fontSize: "0.75rem" }}
                      >
                        {section.section}
                      </CusMenuItem>
                    ))}
                  </CusSelect>
                </FormControl>
              </Col>
              <Col sm={4}>
                <Button
                  sx={{ fontSize: "0.75rem", padding: "0px" }}
                  onClick={() => {
                    setIsAddNewSection(true);
                  }}
                >
                  ADD NEW SECTION
                </Button>
              </Col>
            </Row>

            <Row className="justify-content-center align-items-center mt-3">
              <Col sm={8}>
                <FormControl fullWidth>
                  <CusInputLabel
                    sx={{
                      fontSize: "0.75rem",
                      lineHeight: "1rem",
                      top: "-11px",
                    }}
                  >
                    Please select the dish category
                  </CusInputLabel>
                  <CusSelect
                    label="Please select the dish category"
                    onChange={(event) => {
                      setNewDish(event.target.value);
                    }}
                    sx={{ fontSize: "0.75rem" }}
                  >
                    {allDishesFromMaster.map((dish, index) => (
                      <CusMenuItem
                        key={index}
                        value={dish.dish}
                        style={{ fontSize: "0.75rem" }}
                      >
                        {dish.dish}
                      </CusMenuItem>
                    ))}
                  </CusSelect>
                </FormControl>
              </Col>
              <Col sm={4}>
                <Button
                  sx={{ fontSize: "0.75rem", padding: "0px" }}
                  onClick={() => {
                    setIsAddNewCategory(true);
                  }}
                >
                  ADD NEW CATEGORY
                </Button>
              </Col>
            </Row>

            <CusTextField
              className="mt-3"
              label="Dish Name"
              value={newDishType}
              onChange={(event) => {
                setNewDishType(event.target.value);
              }}
              fullWidth
            />

            <FormControl fullWidth className="mt-3">
              <CusInputLabel
                sx={{ fontSize: "0.75rem", lineHeight: "1rem", top: "-11px" }}
              >
                Veg (Y/N)
              </CusInputLabel>
              <CusSelect
                label="Veg (Y/N)"
                onChange={(event) => {
                  setNewVeg(event.target.value);
                }}
                sx={{ fontSize: "0.75rem" }}
              >
                <CusMenuItem value={"Veg"} style={{ fontSize: "0.75rem" }}>
                  Y
                </CusMenuItem>
                <CusMenuItem value={"Non-Veg"} style={{ fontSize: "0.75rem" }}>
                  N
                </CusMenuItem>
              </CusSelect>
            </FormControl>

            <FormControl fullWidth className="mt-3">
              <CusInputLabel
                sx={{ fontSize: "0.75rem", lineHeight: "1rem", top: "-11px" }}
              >
                Spicy Indicator
              </CusInputLabel>
              <CusSelect
                label="Spicy Indicator"
                onChange={(event) => {
                  setNewSpice(event.target.value);
                }}
                sx={{ fontSize: "0.75rem" }}
              >
                <CusMenuItem value={"None"} style={{ fontSize: "0.75rem" }}>
                  None
                </CusMenuItem>
                <CusMenuItem
                  value={"Less Spicy"}
                  style={{ fontSize: "0.75rem" }}
                >
                  Less Spicy
                </CusMenuItem>
                <CusMenuItem
                  value={"Medium Spicy"}
                  style={{ fontSize: "0.75rem" }}
                >
                  Medium Spicy
                </CusMenuItem>
                <CusMenuItem
                  value={"Extra Hot"}
                  style={{ fontSize: "0.75rem" }}
                >
                  Extra Hot
                </CusMenuItem>
              </CusSelect>
            </FormControl>

            <CusTextField
              className="mt-3"
              label="Dish description"
              value={newDishDesc}
              onChange={(event) => {
                setNewDishDesc(event.target.value);
              }}
              fullWidth
            />

            <FormControl fullWidth className="mt-3">
              <CusInputLabel
                sx={{ fontSize: "0.75rem", lineHeight: "1rem", top: "-11px" }}
              >
                Size
              </CusInputLabel>
              <CusSelect
                label="Size"
                onChange={(event) => {
                  setNewSize(event.target.value);
                }}
                sx={{ fontSize: "0.75rem" }}
              >
                <CusMenuItem value={"Regular"} style={{ fontSize: "0.75rem" }}>
                  Regular
                </CusMenuItem>
                <CusMenuItem value={"Small"} style={{ fontSize: "0.75rem" }}>
                  Small
                </CusMenuItem>
                <CusMenuItem value={"Medium"} style={{ fontSize: "0.75rem" }}>
                  Medium
                </CusMenuItem>
                <CusMenuItem value={"Large"} style={{ fontSize: "0.75rem" }}>
                  Large
                </CusMenuItem>
              </CusSelect>
            </FormControl>

            <FormControl fullWidth className="mt-3">
              <CusInputLabel
                sx={{ fontSize: "0.75rem", lineHeight: "1rem", top: "-11px" }}
              >
                KDS Routing Name
              </CusInputLabel>
              <CusSelect
                label="KDS Routing Name"
                onChange={(event) => {
                  setNewKdsRoutingName(event.target.value);
                }}
                sx={{ fontSize: "0.75rem" }}
              >
                {kdsRouters.map((item) => (
                  <CusMenuItem value={item} style={{ fontSize: "0.75rem" }}>
                    {item}
                  </CusMenuItem>
                ))}
              </CusSelect>
            </FormControl>

            <div style={{ display: "flex" }} className="mt-3">
              <span
                style={{
                  fontSize: "0.75rem",
                  marginTop: "0.25rem",
                }}
              >
                Rs.{" "}
              </span>
              <CusTextField
                label="Price"
                value={newPrice}
                onChange={(event) => {
                  setNewPrice(event.target.value);
                }}
                fullWidth
              />
            </div>

            <FormControl fullWidth className="mt-3">
              <CusInputLabel
                sx={{ fontSize: "0.75rem", lineHeight: "1rem", top: "-11px" }}
              >
                Dish visible
              </CusInputLabel>
              <CusSelect
                label="Dish visible"
                onChange={(event) => {
                  setNewMenuFlag(event.target.value);
                }}
                sx={{ fontSize: "0.75rem" }}
              >
                <CusMenuItem value={"Y"} style={{ fontSize: "0.75rem" }}>
                  Y
                </CusMenuItem>
                <CusMenuItem value={"N"} style={{ fontSize: "0.75rem" }}>
                  N
                </CusMenuItem>
              </CusSelect>
            </FormControl>

            <FormControl fullWidth className="mt-3">
            <CusInputLabel
              sx={{ fontSize: "0.75rem", lineHeight: "1rem", top: "-11px" }}
            >
              Online Applicable (Y/N)
            </CusInputLabel>
            <CusSelect
              label="Online Applicable (Y/N)"
              onChange={(event) => {
                setNewOnlineApplicableFlag(event.target.value);
              }}
              sx={{ fontSize: "0.75rem" }}
            >
              <CusMenuItem value={"Y"} style={{ fontSize: "0.75rem" }}>
                Y
              </CusMenuItem>
              <CusMenuItem value={"N"} style={{ fontSize: "0.75rem" }}>
                N
              </CusMenuItem>
            </CusSelect>
          </FormControl>


            <FormControl fullWidth className="mt-3">
              <CusInputLabel
                sx={{ fontSize: "0.75rem", lineHeight: "1rem", top: "-11px" }}
              >
                Topping (Y/N)
              </CusInputLabel>
              <CusSelect
                label="Topping (Y/N)"
                onChange={(event) => {
                  setNewIngredientFlag(event.target.value);
                }}
                sx={{ fontSize: "0.75rem" }}
              >
                <CusMenuItem value={"Y"} style={{ fontSize: "0.75rem" }}>
                  Y
                </CusMenuItem>
                <CusMenuItem value={"N"} style={{ fontSize: "0.75rem" }}>
                  N
                </CusMenuItem>
              </CusSelect>
            </FormControl>

            <FormControl fullWidth className="mt-3">
              <CusInputLabel
                sx={{ fontSize: "0.75rem", lineHeight: "1rem", top: "-11px" }}
              >
                Common image
              </CusInputLabel>
              <CusSelect
                label="Common image"
                onChange={(event) => {
                  setNewCommonImage(event.target.value);
                }}
                sx={{ fontSize: "0.75rem" }}
              >
                <CusMenuItem value={"Y"} style={{ fontSize: "0.75rem" }}>
                  Y
                </CusMenuItem>
                <CusMenuItem value={"N"} style={{ fontSize: "0.75rem" }}>
                  N
                </CusMenuItem>
              </CusSelect>
            </FormControl>

            <Form.Group
              controlId="formFileSm"
              className="mt-3"
              style={{ width: "100%" }}
            >
              <CusInputLabel
                sx={{ fontSize: "0.75rem", lineHeight: "1rem", top: "-11px" }}
              >
                Product image
              </CusInputLabel>
              <Form.Control
                type="file"
                size="sm"
                accept=".jpg"
                maxFileSize={400000}
                onChange={(e) => {
                  handleProductImageNew(e);
                }}
              />
            </Form.Group>
          </Modal.Body>
        )}

        <Modal.Footer>
          <Button color="error" onClick={handleCloseChange} variant="contained">
            Close
          </Button>
          &nbsp;
          <Button
            color="success"
            onClick={handleSaveChange}
            variant="contained"
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const handleMenuAdd = (check, product) => {
    let foundProduct = productList.find(
      (el) => el.productId === product.productId && el.menuAvailableFlag === "Y"
    );

    if (foundProduct) {
      let obj = {
        productId: foundProduct.productId,
        restaurantId:user.restaurantId,
        storeId: foundProduct.storeId,
        menuAvailable: !check.target.checked ? "N" : "Y",
      };
      let newMap = mappings;
      newMap.push(obj);
      setMappings(newMap);
      dispatch(saveProductMenuMapping(newMap)).then((res) => {
        if (res) {
          setMappings([]);
        }
      });
    } else {
      let obj = {
        productId: product.productId,
        restaurantId:user.restaurantId,
        storeId: selectedStoreObj.storeId,
        menuAvailable: !check.target.checked ? "N" : "Y",
      };
      let newMap = mappings;
      newMap.push(obj);
      setMappings(newMap);
      dispatch(saveProductMenuMapping(newMap)).then((res) => {
        if (res) {
          setMappings([]);
        }
      });
    }

    console.log(check.target.checked, foundProduct);
  };

  return (
    <div>
      <Row className="align-items-center text-center">
        <Col sm={3}></Col>
        <div style={{ minWidth: "180px" }}>
          <Typography sx={{ color: "#7F7F7F", fontWeight: "bold" }}>
            Select Store
          </Typography>
        </div>
        <Col sm={2}>
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
        <Col sm={4}></Col>
      </Row>
      <Row className="mt-3">
        <Col sm={3}></Col>
        <Col sm={3}>
          <Button
            sx={{
              fontSize: "0.75rem",
              lineHeight: "1rem",
              padding: "5px 16px",
            }}
            variant="contained"
            color="success"
            onClick={handleShowAdd}
          >
            ADD NEW DISH
          </Button>
        </Col>
        <Col sm={3}>
          <Button
            sx={{
              fontSize: "0.75rem",
              lineHeight: "1rem",
              padding: "5px 16px",
            }}
            variant="contained"
            color="success"
            onClick={() => {
              /* if (selectedStoreObj) {
                handleShowAddTopping();
              } else {
                toast.error("Please select a store first!");
              } */
              handleShowAddTopping();
            }}
          >
            ADD NEW TOPPINGS
          </Button>
        </Col>
        <Col sm={3}></Col>
      </Row>
      <div>
        <TableContainer className="mt-2" sx={{ maxHeight: 430, width: "101%" }}>
          <Table sx={{ minWidth: 800 }} aria-label="simple table" stickyHeader>
            <TableHead>
              <TableRow>
                <CusTableCell1 align="center">NO</CusTableCell1>
                <CusTableCell1 align="center">PRODUCT ID</CusTableCell1>
                <CusTableCell1 align="center">
                  {/* <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Dish Category &nbsp;
                    <CusTextField2
                      value={categoryKeyword}
                      onChange={(event) => {
                        setIsSearched(true);
                        setCategoryKeyword(event.target.value);
                      }}
                      sx={{ width: "150px" }}
                      label="Search"
                    />
                  </div> */}
                  CATEGORY
                </CusTableCell1>
                <CusTableCell1 align="center">
                  {/* <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Dish Name &nbsp;
                    <CusTextField2
                      value={nameKeyword}
                      onChange={(event) => {
                        setIsSearched(true);
                        setNameKeyword(event.target.value);
                      }}
                      sx={{ width: "150px" }}
                      label="Search"
                    />
                  </div> */}
                  DISH NAME
                </CusTableCell1>
                <CusTableCell1 align="center">Price</CusTableCell1>
                {selectedStoreObj ? (
                  <CusTableCell1 align="center">
                    {selectedStoreObj.resturantName}
                  </CusTableCell1>
                ) : null}
              </TableRow>
            </TableHead>
            <TableBody>
              {productListLoading ? (
                <TableRow>
                  <TableCell colSpan={15}>
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
                      {productListMaster.map((product, index) => (
                        <TableRow key={product.id}>
                          <CusTableCell align="center">
                            {index + 1 + (page - 1) * itemsPerPage}
                          </CusTableCell>
                          <CusTableCell
                            align="center"
                            style={{ minWidth: "175px" }}
                          >
                            {product.productId}
                          </CusTableCell>
                          <CusTableCell
                            align="center"
                            style={{ minWidth: "100px" }}
                          >
                            {/* <FormControl fullWidth>
                              <NativeSelect
                                defaultValue={product.dish}
                                inputProps={{
                                  name: "status",
                                  id: "uncontrolled-native",
                                }}
                                onChange={handleDishUpdate}
                                sx={{
                                  fontSize: "0.75rem",
                                  "& .MuiInputBase-input.Mui-disabled": {
                                    WebkitTextFillColor: isSave[product.id]
                                      ? "black"
                                      : "#404040",
                                  },
                                }}
                                disabled={!isSave[product.id]}
                              >
                                {allDishesBySection[product.section] &&
                                allDishesBySection[product.section].length >
                                  0 &&
                                allDishesBySection[product.section].some(
                                  (el) => el === product.dish
                                ) ? (
                                  allDishesBySection[product.section].map(
                                    (dish, index) => (
                                      <option
                                        key={index}
                                        value={dish}
                                        style={{ fontSize: "0.75rem" }}
                                      >
                                        {dish}
                                        {index === allDishesBySection.length &&
                                          dishSectionLoading && (
                                            <div className="d-flex justify-content-center">
                                              <div
                                                className="spinner-border text-primary"
                                                role="status"
                                              ></div>
                                            </div>
                                          )}
                                      </option>
                                    )
                                  )
                                ) : (
                                  <option
                                    value={product.dish}
                                    style={{ fontSize: "0.75rem" }}
                                  >
                                    {product.dish}
                                    {dishSectionLoading && (
                                      <div className="d-flex justify-content-center">
                                        <div
                                          className="spinner-border text-primary"
                                          role="status"
                                        ></div>
                                      </div>
                                    )}
                                  </option>
                                )}
                              </NativeSelect>
                            </FormControl> */}
                            {product.dish}
                          </CusTableCell>
                          <CusTableCell
                            align="center"
                            style={{ minWidth: "150px" }}
                          >
                            {/* <CusTextField
                              disabled={!isSave[product.id]}
                              key={product.id}
                              defaultValue={product.dishType}
                              value={currentDishType[product.id]}
                              onChange={(event) => {
                                const dishTypes = {
                                  ...currentDishType,
                                  [product.id]: event.target.value,
                                };
                                setCurrentDishType(dishTypes);
                              }}
                              sx={{
                                fontSize: "0.75rem",
                                "& .MuiInputBase-input.Mui-disabled": {
                                  WebkitTextFillColor: isSave[product.id]
                                    ? "black"
                                    : "#404040",
                                },
                              }}
                              fullWidth
                              variant="standard"
                            /> */}
                            {product.dishType}
                          </CusTableCell>

                          <CusTableCell
                            align="center"
                            style={{ minWidth: "70px" }}
                          >
                            {/* <div style={{ display: "flex" }}>
                              &nbsp;
                              <span
                                style={{
                                  fontSize: "0.75rem",
                                  marginTop: "0.25rem",
                                  color: isSave[product.id]
                                    ? "black"
                                    : "#404040",
                                }}
                              >
                                Rs.{" "}
                              </span>
                              <CusTextField
                                disabled={!isSave[product.id]}
                                key={product.id}
                                defaultValue={product.price}
                                value={currentPrice[product.id]}
                                onChange={(event) => {
                                  const prices = {
                                    ...currentPrice,
                                    [product.id]: event.target.value,
                                  };
                                  setCurrentPrice(prices);
                                }}
                                sx={{
                                  fontSize: "0.75rem",
                                  "& .MuiInputBase-input.Mui-disabled": {
                                    WebkitTextFillColor: isSave[product.id]
                                      ? "black"
                                      : "#404040",
                                  },
                                }}
                                fullWidth
                                variant="standard"
                              />
                            </div> */}
                            {product.price}
                          </CusTableCell>
                          {selectedStoreObj ? (
                            <CusTableCell align="center">
                              <Checkbox
                                checked={
                                  productList.find(
                                    (el) =>
                                      el.productId === product.productId &&
                                      el.menuAvailableFlag === "Y"
                                  )
                                    ? true
                                    : false
                                }
                                onChange={(e) => {
                                  handleMenuAdd(e, product);
                                }}
                                name={product.productId}
                              />
                            </CusTableCell>
                          ) : null}
                        </TableRow>
                      ))}
                    </>
                  ) : (
                    <TableRow>
                      <TableCell colSpan={15}>
                        <Alert severity="warning">
                          {selectedStoreObj
                            ? "No products found!"
                            : "Please select a store!"}{" "}
                        </Alert>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {/* <div className="mt-3">
        <SaveButton
          onClick={saveMapping}
          disabled={mappings.length < 1 ? true : false}
        >
          SAVE
        </SaveButton>
      </div> */}
      {renderAddModalNew()}
      {renderAddModalTopping()}
    </div>
  );
};
