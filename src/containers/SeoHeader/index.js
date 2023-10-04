import React, { useState, useEffect } from "react";
import "./style.css";
import IconButton from "@mui/material/IconButton";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import {saveCSS, uploadImage, getAllActiveCSS} from "../../actions";
import { useSelector, useDispatch } from "react-redux";

import ConfirmationNumberRoundedIcon from '@mui/icons-material/ConfirmationNumberRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded';
import RuleRoundedIcon from '@mui/icons-material/RuleRounded';
import noImg from "../../img/no-img.png";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';



import {imagePathHome} from "../../urlConfig";

// import pizzaPic from "../../img/pizzaPic.jpg"

export const SeoHeader = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    const[allCss, setAllCss] = useState([]);

    const [logoFile, setLogoFile] = useState(null);
    const [logoFileName, setLogoFileName] = useState("");

    const [orderConfirmationFile, setOrderConfirmationFile] = useState(null);
    const [orderConfirmationFileName, setOrderConfirmationFileName] = useState("");

    const [orderTrackingFile, setOrderTrackingFile] = useState(null);
    const [orderTrackingFileName, setOrderTrackingFileName] = useState("");

    const [offerFile, setOfferFile] = useState(null);
    const [offerFileName, setOfferFileName] = useState("");

    const [logoImgPath, setLogoImagePath] = useState("");
    const [orderConfImgPath, setOrderConfImgPath] = useState("");
    const [orderTrackImgPath, setorderTrackImgPath] = useState("");
    const [offerImgPath, setofferImgPath] = useState("");

    useEffect(()=>{
        getCssData();
    },[])

    /**
     * Model related code
     */
    const [dialog, setDialog] = useState(false);
    const [imageSrc, setImageSrc] = useState("");

    const toggleDialog = () => {
        setDialog(!dialog);
    };
    

    function toggleDialogs(value){
        setDialog(!dialog);

        if(value === "Logo"){ 
            setImageSrc(logoImgPath);
        }
        if(value === "Order_Information"){ 
            setImageSrc(orderConfImgPath);
        }
        if(value === "Offer"){ 
            console.log("offerImgPath:::",offerImgPath);
            setImageSrc(offerImgPath);
        }
        if(value === "**"){ 
            setImageSrc(orderTrackImgPath);
        }
    };
    
    function handleChangeforLogo(e) {
        if (e.target.files[0] != undefined) {
            // console.log(e.target.files[0].name);
            // setLogoFile(URL.createObjectURL(e.target.files[0]));
            setLogoFileName(e.target.files[0].name);
            setLogoFile(e.target.files[0]);
        }
    }

    function handleChangeForOrderConfirmation(e) {
        if (e.target.files[0] != undefined) {
            setOrderConfirmationFileName(e.target.files[0].name);
            setOrderConfirmationFile(e.target.files[0]);
        }
    }

    function handleChangeforLogoOrderTracking(e) {
        if (e.target.files[0] != undefined) {
            setOrderTrackingFileName(e.target.files[0].name);
            setOrderTrackingFile(e.target.files[0]);
        }
    }

    function handleChangeforOfferIcon(e) {
        if (e.target.files[0] != undefined) {
            setOfferFileName(e.target.files[0].name);
            setOfferFile(e.target.files[0]);
        }
    }

    function getCssData() {
        dispatch(getAllActiveCSS(user.restaurantId ,"ALL")).then((resp) => {
            if(resp){
                console.log("GETALLCSS:::: ", resp);
                setAllCss(resp);
                resp.forEach((category)=>{
                    if (category.subCategory === "Logo") {
                        var path = imagePathHome + "/" + user.restaurantId + "/" + category.imagePath;
                        setLogoImagePath(path);
                    }
                    else if(category.subCategory === "Order_Information"){
                        var path = imagePathHome + "/" + user.restaurantId + "/" + category.imagePath;
                        setOrderConfImgPath(path);
                    }
                    else if(category.subCategory === "Offer"){
                        var path = imagePathHome + "/" + user.restaurantId + "/" + category.imagePath;
                        setofferImgPath(path);
                    }
                    else if(category.subCategory === " ** "){ // TODO: Check Order Tracking add
                        var path = imagePathHome + "/" + user.restaurantId + "/" + category.imagePath;
                        setorderTrackImgPath(path);                    }
                })
            }
        });
    }


    const saveCssData = (subCat, sorting, fileName, id) => {
        var cssObj = null;
        if (id == null) {
            cssObj = {
                restaurantId: user.restaurantId,
                storeId: "ALL",
                category: "HOME",
                subCategory: subCat,
                sorting: sorting,
                folderName: user.restaurantId,
                imagePath: fileName,
                status: "ACTIVE",
            }
        } else {
            cssObj = {
                id: id,
                restaurantId: user.restaurantId,
                storeId: "ALL",
                category: "HOME",
                subCategory: subCat,
                sorting: sorting,
                folderName: user.restaurantId,
                imagePath: fileName,
                status: "ACTIVE",
            }
        }

        console.log("cssObj --- ", cssObj);
        dispatch(saveCSS(cssObj)).then((resp) => {
            if (resp) {
                console.log("saveCss resp ", resp);
                getCssData(); // Fetch latest Css after successful upload of Image and Css update
            }
        });
    };



    const saveLogoClicked = () => {
        const formDataImage = new FormData();
        formDataImage.append("files", logoFile);
        formDataImage.append("restaurantId", user.restaurantId);

        var ids = null;
        dispatch(uploadImage(formDataImage)).then((res) => {
            if (res) {
                allCss.forEach((cssObj) => {
                    if (cssObj.subCategory === "Logo") {
                        ids = cssObj.id;
                    }
                });
                saveCssData("Logo", 1, logoFileName, ids);
            }
        })
    }
    const deleteLogoClicked = () => {
        setLogoFile(null);
        console.log("deleteLogoClicked Clicked");
    }

    const saveOrderCofirmationClicked = () => {
        const formDataImage = new FormData();
        formDataImage.append("files", orderConfirmationFile);
        formDataImage.append("restaurantId", user.restaurantId);

        var ids = null;
        dispatch(uploadImage(formDataImage)).then((res) => {
            if (res) {
                allCss.forEach((cssObj) => {
                    if (cssObj.subCategory === "Logo") {
                        ids = cssObj.id;
                    }
                });
                saveCssData("Order_Information", 1, orderConfirmationFileName, ids);
            }
        })
    }
    const deleteOrderCofirmationClicked = () => {
        console.log("deleteOrderCofirmationClicked Clicked");
    }

    const saveOrderTrackClicked = () => {
        const formDataImage = new FormData();
        formDataImage.append("files", orderTrackingFile);
        formDataImage.append("restaurantId", user.restaurantId);

        dispatch(uploadImage(formDataImage)).then((res) => {
            if (res) {
                console.log("Uploaded" + res);

                //   const cssOrderTrackObj = {
                //     restaurantId: user.restaurantId,
                //     storeId: "ALL",
                //     category: "HOME",
                //     subCategory: "Offer",
                //     sorting: 1,
                //     folderName: user.restaurantId,
                //     imagePath: orderConfirmationFileName,
                //     status: "ACTIVE",
                // }
                // console.log("cssOrderTrackObj --- ",cssOrderTrackObj);
                // dispatch(saveCSS(cssOrderTrackObj)).then((resp) => {
                //     if (resp) {
                //         console.log("saveCss resp ",resp);
                //     }
                // });

            }
        })
    }
    const deleteOrderTrackClicked = () => {
        console.log("deleteOrderTrackClicked Clicked");
    }

    const saveOfferClicked = () => {
        const formDataImage = new FormData();
        formDataImage.append("files", offerFile);
        formDataImage.append("restaurantId", user.restaurantId);

        var ids = null;
        dispatch(uploadImage(formDataImage)).then((res) => {
            if (res) {
                allCss.forEach((cssObj) => {
                    if (cssObj.subCategory === "Logo") {
                        ids = cssObj.id;
                    }
                });
                saveCssData("Offer", 1, offerFileName, ids);
            }
        })
    }

    const deleteOfferClicked = () => {
        console.log("deleteOfferClicked Clicked");
    }

    return (
        <>
            <div class="divStyle">
                {/* <img className="imgStyle" src={pizzaPic} alt="Logo" /> */}
                <IconButton style={{alignItems: "center",fontSize: "0.6125em",color: "#635985",width: 30,height: 30, marginRight:'5px',marginTop:'-3px'}} ><StarBorderRoundedIcon /></IconButton>
                <label className="labelStyle">Trademark | Brand Logo</label>
                <div className={`input-group customerFileBtn`}>
                    <label className="input-group-text selectBtnStyle" for="inputGroupFile"> SELECT FILE</label>
                    <input className="inputStyle" type="file" accept="image/*" onChange={handleChangeforLogo} id="inputGroupFile" />
                    {/* <input className="inputStyle" value={temp} type="text" id="inputGroupFile1" /> */}
                </div>
                <IconButton style={{alignItems: "center",fontSize: "0.6125em",color: "Green",width: 30,height: 30, marginRight:'5px'}} onClick={saveLogoClicked}>
                <SaveRoundedIcon />
                </IconButton>
                {/* <IconButton style={{alignItems: "center",fontSize: "0.6125em",color: "Red", width: 30,height: 30,}} onClick={deleteLogoClicked}>
                <DeleteForeverRoundedIcon />
                </IconButton> */}
                <IconButton style={{alignItems: "center",fontSize: "0.6125em",color: "Blue", width: 30,height: 30, marginRight:'5px'}} onClick={() => toggleDialogs("Logo")}>
                <VisibilityOutlinedIcon />
                </IconButton>
            </div>
            <div class="divStyle">
                <IconButton style={{alignItems: "center",fontSize: "0.6125em",color: "#47B5FF",width: 30,height: 30, marginRight:'5px',marginTop:'-3px'}} ><ConfirmationNumberRoundedIcon /></IconButton>
                <label className="labelStyle">Order Confirmation</label>
                {/* <button className="selectBtnStyle" onClick={selectOrderConfirmation}> SELECT FILE </button> */}
                <div className={`input-group customerFileBtn`}>
                    <label className="input-group-text selectBtnStyle" for="inputOrderConfirm"> SELECT FILE</label>
                    <input className="inputStyle" type="file" accept="image/*" onChange={handleChangeForOrderConfirmation} id="inputOrderConfirm" />
                </div>
                {/* <input className="inputStyle" type="file" accept="image/*" onChange={handleChangeForOrderConfirmation} placeholder='Max 100KB | Approx 3772 X 2653' /> */}
                <IconButton style={{alignItems: "center",fontSize: "0.6125em",color: "Green", width: 30,height: 30, marginRight:'5px'}} onClick={saveOrderCofirmationClicked}>
                <SaveRoundedIcon />
                </IconButton>
                <IconButton style={{alignItems: "center",fontSize: "0.6125em",color: "Blue", width: 30,height: 30, marginRight:'5px'}} onClick={() => toggleDialogs("Order_Information")}>
                <VisibilityOutlinedIcon />
                </IconButton>
            </div>
            <div class="divStyle">
                <IconButton style={{alignItems: "center",fontSize: "0.6125em",color: "#1F8A70",width: 30,height: 30, marginRight:'5px',marginTop:'-3px'}} ><RuleRoundedIcon /></IconButton>
                <label className="labelStyle">Order Tracking</label>
                <div className={`input-group customerFileBtn`}>
                    <label className="input-group-text selectBtnStyle" for="inputOrderTrack"> SELECT FILE</label> 
                    <input className="inputStyle" type="file" accept="image/*" onChange={handleChangeforLogoOrderTracking} id="inputOrderTrack" />
                </div>
                <IconButton style={{alignItems: "center",fontSize: "0.6125em",color: "Green", width: 30,height: 30, marginRight:'5px'}} onClick={saveOrderTrackClicked}>
                <SaveRoundedIcon />
                </IconButton>
                <IconButton style={{alignItems: "center",fontSize: "0.6125em",color: "Blue", width: 30,height: 30, marginRight:'5px'}} onClick={() => toggleDialogs("order_tracking")}>
                <VisibilityOutlinedIcon />
                </IconButton>
            </div>
            <div class="divStyle">
                <IconButton style={{alignItems: "center",fontSize: "0.6125em",color: "#FECE19",width: 30,height: 30, marginRight:'5px',marginTop:'-3px'}} ><LocalOfferRoundedIcon /></IconButton>
                <label className="labelStyle">Offer Icon</label>
                <div className={`input-group customerFileBtn`}>
                    <label className="input-group-text selectBtnStyle" for="inputOffer"> SELECT FILE</label>
                    <input className="inputStyle" type="file" accept="image/*" onChange={handleChangeforOfferIcon} id="inputOffer" />
                </div>
                <IconButton style={{alignItems: "center",fontSize: "0.6125em",color: "Green", width: 30,height: 30, marginRight:'5px'}} onClick={saveOfferClicked}>
                <SaveRoundedIcon />
                </IconButton>
                <IconButton style={{alignItems: "center",fontSize: "0.6125em",color: "Blue", width: 30,height: 30, marginRight:'5px'}} onClick={() => toggleDialogs("Offer")}>
                <VisibilityOutlinedIcon />
                </IconButton>
            </div>

            <div className="container">
                {/* <button className="popup-button" onClick={toggleDialog}>Show Popup Image</button> */}
                {dialog && (
                    <div className="dialog">
                        <div className="dialog-content">
                            <button className="close-icon" onClick={toggleDialog}>&#10005;</button>
                            {imageSrc.length > 0 ?
                            <img className="popup-image" src={imageSrc} alt="Popup Image" /> :
                            <img className="popup-image" src={noImg} alt="Popup Image" />}
                            {/* <img className="popup-image" src={imageSrc} alt="Popup Image" /> */}
                            {/* <img className="popup-image" src={`${imagePathHome}/${window.restId}/${imgPathLogo}`} alt="Popup Image" /> */}
                        </div>
                    </div>
                )}
            </div>
        </>

    );
};