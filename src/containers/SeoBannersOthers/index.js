import React, { useState, useEffect } from "react";
import "./style.css";
import IconButton from "@mui/material/IconButton";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import { getAllActiveCSS, saveCSS, uploadImage } from "../../actions";
import { useSelector, useDispatch } from "react-redux";

import CollectionsRoundedIcon from '@mui/icons-material/CollectionsRounded';
import WorkspacesRoundedIcon from '@mui/icons-material/WorkspacesRounded';
import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded';
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded';
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';
import { imagePathHome } from "../../urlConfig";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

import pizzaPic from "../../img/pizzaPic.jpg";
import noImg from "../../img/no-img.png";
import { toast } from "react-toastify";


export const SeoBanners = () => {
    const [file, setFile] = useState();
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    const [banner1File, setBanner1File] = useState(null);
    const [banner1FileName, setBanner1FileName] = useState(null);

    const [banner2File, setBanner2File] = useState(null);
    const [banner2FileName, setBanner2FileName] = useState(null);

    const [banner3File, setBanner3File] = useState(null);
    const [banner3FileName, setBanner3FileName] = useState(null);

    const [banner4File, setBanner4File] = useState(null);
    const [banner4FileName, setBanner4FileName] = useState(null);

    const [banner5File, setBanner5File] = useState(null);
    const [banner5FileName, setBanner5FileName] = useState(null);


    const [aboutFile, setAboutFile] = useState(null);
    const [aboutFileName, setAboutFileName] = useState(null);

    const [offersFile, setOffersFile] = useState(null);
    const [offersFileName, setOffersFileName] = useState(null);

    const [restAddressFile, setRestAddressFile] = useState(null);
    const [restAddressFileName, setRestAddressFileName] = useState(null);

    const [allCss, setAllCss] = useState([]);
    const [imgPathBanner1, setimgPathBanner1] = useState("");
    const [imgPathBanner2, setimgPathBanner2] = useState("");
    const [imgPathBanner3, setimgPathBanner3] = useState("");
    const [imgPathBanner4, setimgPathBanner4] = useState("");
    const [imgPathBanner5, setimgPathBanner5] = useState("");
    const [imgPathAbout, setimgPathAbout] = useState("");
    const [imgPathOffer, setimgPathOffer] = useState("");
    const [imgPathAddres, setimgPathAddres] = useState("");

    /**
        * Popup configuration code
        */
    const [dialog, setDialog] = useState(false);
    const [imageSrc, setImageSrc] = useState("https://storage.googleapis.com/hangries/R001/Logo.jpg");

    const toggleDialog = () => {
        setDialog(!dialog);
    };


    function toggleDialogs(value) {
        setDialog(!dialog);

        if (value === "Banner1") { setImageSrc(imgPathBanner1); }
        else if (value === "Banner2") { setImageSrc(imgPathBanner2); }
        else if (value === "Banner3") { setImageSrc(imgPathBanner3); }
        else if (value === "Banner4") { setImageSrc(imgPathBanner4); }
        else if (value === "Banner5") { setImageSrc(imgPathBanner5); }
        else if (value === "About") { setImageSrc(imgPathAbout); }
        else if (value === "Offer") { setImageSrc(imgPathOffer); }
        else if (value === "AddRes") { setImageSrc(imgPathAddres); }
        else {
            setImageSrc("");
        }
    };

    /** Popup code Ends */

    function getCssData() {
        dispatch(getAllActiveCSS(user.restaurantId, "ALL")).then((resp) => {
            if (resp) {
                console.log("GETALLCSS:::: ", resp);
                setAllCss(resp);
                resp.forEach((category) => {
                    if (category.subCategory === "Banner" && category.sorting === 1) {
                        var path = imagePathHome + "/" + user.restaurantId + "/" + category.imagePath;
                        setimgPathBanner1(path);
                    } else if (category.subCategory === "Banner" && category.sorting === 2) {
                        var path = imagePathHome + "/" + user.restaurantId + "/" + category.imagePath;
                        setimgPathBanner2(path);
                    } else if (category.subCategory === "Banner" && category.sorting === 3) {
                        var path = imagePathHome + "/" + user.restaurantId + "/" + category.imagePath;
                        setimgPathBanner3(path);
                    } else if (category.subCategory === "Banner" && category.sorting === 4) {
                        var path = imagePathHome + "/" + user.restaurantId + "/" + category.imagePath;
                        setimgPathBanner4(path);
                    } else if (category.subCategory === "Banner" && category.sorting === 5) {
                        var path = imagePathHome + "/" + user.restaurantId + "/" + category.imagePath;
                        setimgPathBanner5(path);
                    } else if (category.subCategory === "About_us") {
                        var path = imagePathHome + "/" + user.restaurantId + "/" + category.imagePath;
                        setimgPathAbout(path);
                    } else if (category.subCategory === "Offers") {
                        var path = imagePathHome + "/" + user.restaurantId + "/" + category.imagePath;
                        setimgPathOffer(path);
                    } else if (category.subCategory === "Restaurant_address_background") {
                        var path = imagePathHome + "/" + user.restaurantId + "/" + category.imagePath;
                        setimgPathAddres(path);
                    }
                })
            }
        });
    }

    useEffect(() => {
        getCssData();
    }, [])

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


    function handleChangeBanner1(e) {
        if (e.target.files[0] != undefined) {
            setBanner1FileName(e.target.files[0].name);
            setBanner1File(e.target.files[0]);
        }
    }
    const saveBanner1Clicked = () => {
        const formDataImage = new FormData();
        formDataImage.append("files", banner1File);
        formDataImage.append("restaurantId", user.restaurantId);

        if (banner1File.size > 5 * 1000 * 1024) {
            toast.warn('File with maximum size of 5MB is allowed !');
            return false;
        }

        var ids = null;
        dispatch(uploadImage(formDataImage)).then((res) => {
            if (res) {
                allCss.forEach((cssObj) => {
                    if (cssObj.subCategory === "Banner" && cssObj.sorting === 1) {
                        ids = cssObj.id;
                    }
                });
                saveCssData("Banner", 1, banner1FileName, ids);
            }
        })
    }

    const deleteBanner1Clicked = () => {
        setBanner1File(null);
    }


    function handleChangeBanner2(e) {
        if (e.target.files[0] != undefined) {
            setBanner2FileName(e.target.files[0].name);
            setBanner2File(e.target.files[0]);
        }
    }
    const saveBanner2Clicked = () => {
        const formDataImage = new FormData();
        formDataImage.append("files", banner2File);
        formDataImage.append("restaurantId", user.restaurantId);

        if (banner2File.size > 5 * 1000 * 1024) {
            toast.warn('File with maximum size of 5MB is allowed !');
            return false;
        }

        var ids = null;
        dispatch(uploadImage(formDataImage)).then((res) => {
            if (res) {
                allCss.forEach((cssObj) => {
                    if (cssObj.subCategory === "Banner"  && cssObj.sorting === 2) {
                        ids = cssObj.id;
                    }
                });
                saveCssData("Banner", 2, banner2FileName, ids);
            }
        })
    }

    const deleteBanner2Clicked = () => {
        setBanner2FileName(null);
        setBanner2File(null);
    }

    function handleChangeBanner3(e) {
        if (e.target.files[0] != undefined) {
            setBanner3FileName(e.target.files[0].name);
            setBanner3File(e.target.files[0]);
        }
    }
    const saveBanner3Clicked = () => {
        const formDataImage = new FormData();
        formDataImage.append("files", banner3File);
        formDataImage.append("restaurantId", user.restaurantId);

        if (banner3File.size > 5 * 1000 * 1024) {
            toast.warn('File with maximum size of 5MB is allowed !');
            return false;
        }

        var ids = null;
        dispatch(uploadImage(formDataImage)).then((res) => {
            if (res) {
                allCss.forEach((cssObj) => {
                    if (cssObj.subCategory === "Banner" && cssObj.sorting === 3) {
                        ids = cssObj.id;
                    }
                });
                saveCssData("Banner", 3, banner3FileName, ids);
            }
        })
    }
    const deleteBanner3Clicked = () => {
        setBanner3FileName(null);
        setBanner3File(null);
    }

    function handleChangeBanner4(e) {
        if (e.target.files[0] != undefined) {
            setBanner4FileName(e.target.files[0].name);
            setBanner4File(e.target.files[0]);
        }
    }
    const saveBanner4Clicked = () => {
        const formDataImage = new FormData();
        formDataImage.append("files", banner4File);
        formDataImage.append("restaurantId", user.restaurantId);

        if (banner4File.size > 5 * 1000 * 1024) {
            toast.warn('File with maximum size of 5MB is allowed !');
            return false;
        }

        var ids = null;
        dispatch(uploadImage(formDataImage)).then((res) => {
            if (res) {
                allCss.forEach((cssObj) => {
                    if (cssObj.subCategory === "Banner" && cssObj.sorting === 4) {
                        ids = cssObj.id;
                    }
                });
                saveCssData("Banner", 4, banner4FileName, ids);
            }
        })

        // dispatch(uploadImage(formDataImage)).then((res)=>{
        //     if(res){
        //       console.log("Uploaded"+ res);

        //       const cssBanner4Obj = {
        //         restaurantId: user.restaurantId,
        //         storeId: "ALL",
        //         category: "HOME",
        //         subCategory: "Banner",
        //         sorting: 4,
        //         folderName: user.restaurantId,
        //         imagePath: banner4FileName,
        //         status: "ACTIVE",
        //     }
        //     console.log("cssBanner4Obj --- ",cssBanner4Obj);
        //     dispatch(saveCSS(cssBanner4Obj)).then((resp) => {
        //         if (resp) {
        //             console.log("saveCss resp ",resp);
        //         }
        //     });
        //     }
        //   })

    }

    function handleChangeBanner5(e) {
        if (e.target.files[0] != undefined) {
            setBanner5FileName(e.target.files[0].name);
            setBanner5File(e.target.files[0]);
        }
    }
    const saveBanner5Clicked = () => {
        const formDataImage = new FormData();
        formDataImage.append("files", banner5File);
        formDataImage.append("restaurantId", user.restaurantId);

        if (banner5File.size > 5 * 1000 * 1024) {
            toast.warn('File with maximum size of 5MB is allowed !');
            return false;
        }

        var ids = null;
        dispatch(uploadImage(formDataImage)).then((res) => {
            if (res) {
                allCss.forEach((cssObj) => {
                    if (cssObj.subCategory === "Banner" && cssObj.sorting === 5) {
                        ids = cssObj.id;
                    }
                });
                saveCssData("Banner", 5, banner5FileName, ids);
            }
        })
    }

    function handleChangeForAbout(e) {
        if (e.target.files[0] != undefined) {
            setAboutFileName(e.target.files[0].name);
            setAboutFile(e.target.files[0]);
        }
    }
    const saveAboutClicked = () => {
        const formDataImage = new FormData();
        formDataImage.append("files", aboutFile);
        formDataImage.append("restaurantId", user.restaurantId);

        if (aboutFile.size > 5 * 1000 * 1024) {
            toast.warn('File with maximum size of 5MB is allowed !');
            return false;
        }

        var ids = null;
        dispatch(uploadImage(formDataImage)).then((res) => {
            if (res) {
                allCss.forEach((cssObj) => {
                    if (cssObj.subCategory === "About_us") {
                        ids = cssObj.id;
                    }
                });
                saveCssData("About_us", 1, aboutFileName, ids);
            }
        })
    }

    function handleChangeforOffers(e) {
        if (e.target.files[0] != undefined) {
            setOffersFileName(e.target.files[0].name);
            setOffersFile(e.target.files[0]);
        }
    }
    const saveOffersClicked = () => {
        const formDataImage = new FormData();
        formDataImage.append("files", offersFile);
        formDataImage.append("restaurantId", user.restaurantId);

        if (offersFile.size > 5 * 1000 * 1024) {
            toast.warn('File with maximum size of 5MB is allowed !');
            return false;
        }

        var ids = null;
        dispatch(uploadImage(formDataImage)).then((res) => {
            if (res) {
                allCss.forEach((cssObj) => {
                    if (cssObj.subCategory === "Offers") {
                        ids = cssObj.id;
                    }
                });
                saveCssData("Offers", 1, offersFileName, ids);
            }
        })
    }

    function handleChangeforRestAddress(e) {
        if (e.target.files[0] != undefined) {
            setRestAddressFileName(e.target.files[0].name);
            setRestAddressFile(e.target.files[0]);
        }
    }
    const saveRestAddressClicked = () => {
        const formDataImage = new FormData();
        formDataImage.append("files", restAddressFile);
        formDataImage.append("restaurantId", user.restaurantId);

        if (restAddressFile.size > 5 * 1000 * 1024) {
            toast.warn('File with maximum size of 5MB is allowed !');
            return false;
        }

        var ids = null;
        dispatch(uploadImage(formDataImage)).then((res) => {
            if (res) {
                allCss.forEach((cssObj) => {
                    if (cssObj.subCategory === "Restaurant_address_background") {
                        ids = cssObj.id;
                    }
                });
                saveCssData("Restaurant_address_background", 1, restAddressFileName, ids);
            }
        })
    }

    return (
        <>
            <div class="divStyle">
                {/* <img className="imgStyle" src={pizzaPic} alt="Logo" /> */}
                <IconButton style={{ alignItems: "center", fontSize: "0.6125em", color: "#3F979B", width: 30, height: 30, marginRight: '5px', marginTop: '-3px' }} ><CollectionsRoundedIcon /></IconButton>
                <label className="labelStyle">Banner 1 | Promotion</label>
                <div className={`input-group customerFileBtn`}>
                    <label className="input-group-text selectBtnStyle" for="inputBan1"> SELECT FILE</label>
                    <input className="inputStyle" type="file" accept="image/*" onChange={handleChangeBanner1} id="inputBan1" />
                </div>
                <IconButton style={{ alignItems: "center", fontSize: "0.6125em", color: "Green", width: 30, height: 30, marginRight: '5px' }} onClick={saveBanner1Clicked}>
                    <SaveRoundedIcon />
                </IconButton>
                <IconButton style={{ alignItems: "center", fontSize: "0.6125em", color: "Blue", width: 30, height: 30, }} onClick={() => toggleDialogs("Banner1")}>
                    <VisibilityOutlinedIcon />
                </IconButton>
            </div>
            <div class="divStyle">
                <IconButton style={{ alignItems: "center", fontSize: "0.6125em", color: "#3F979B", width: 30, height: 30, marginRight: '5px', marginTop: '-3px' }} ><CollectionsRoundedIcon /></IconButton>
                <label className="labelStyle">Banner 2 | Promotion</label>
                <div className={`input-group customerFileBtn`}>
                    <label className="input-group-text selectBtnStyle" for="inputBan3"> SELECT FILE</label>
                    <input className="inputStyle" type="file" accept="image/*" onChange={handleChangeBanner2} id="inputBan3" />
                </div>
                <IconButton style={{ alignItems: "center", fontSize: "0.6125em", color: "Green", width: 30, height: 30, marginRight: '5px' }} onClick={saveBanner2Clicked}>
                    <SaveRoundedIcon />
                </IconButton>
                <IconButton style={{ alignItems: "center", fontSize: "0.6125em", color: "Blue", width: 30, height: 30, }} onClick={() => toggleDialogs("Banner2")}>
                    <VisibilityOutlinedIcon />
                </IconButton>
            </div>
            <div class="divStyle">
                <IconButton style={{ alignItems: "center", fontSize: "0.6125em", color: "#3F979B", width: 30, height: 30, marginRight: '5px', marginTop: '-3px' }} ><CollectionsRoundedIcon /></IconButton>
                <label className="labelStyle">Banner 3 | Promotion</label>
                <div className={`input-group customerFileBtn`}>
                    <label className="input-group-text selectBtnStyle" for="inputBan3"> SELECT FILE</label>
                    <input className="inputStyle" type="file" accept="image/*" onChange={handleChangeBanner3} id="inputBan3" />
                </div>
                <IconButton style={{ alignItems: "center", fontSize: "0.6125em", color: "Green", width: 30, height: 30, marginRight: '5px' }} onClick={saveBanner3Clicked}>
                    <SaveRoundedIcon />
                </IconButton>
                <IconButton style={{ alignItems: "center", fontSize: "0.6125em", color: "Blue", width: 30, height: 30, }} onClick={() => toggleDialogs("Banner3")}>
                    <VisibilityOutlinedIcon />
                </IconButton>
            </div>
            <div class="divStyle">
                <IconButton style={{ alignItems: "center", fontSize: "0.6125em", color: "#3F979B", width: 30, height: 30, marginRight: '5px', marginTop: '-3px' }} ><CollectionsRoundedIcon /></IconButton>
                <label className="labelStyle">Banner 4 | Promotion</label>
                <div className={`input-group customerFileBtn`}>
                    <label className="input-group-text selectBtnStyle" for="inputBan4"> SELECT FILE</label>
                    <input className="inputStyle" type="file" accept="image/*" onChange={handleChangeBanner4} id="inputBan4" />
                </div>
                <IconButton style={{ alignItems: "center", fontSize: "0.6125em", color: "Green", width: 30, height: 30, marginRight: '5px' }} onClick={saveBanner4Clicked}>
                    <SaveRoundedIcon />
                </IconButton>
                <IconButton style={{ alignItems: "center", fontSize: "0.6125em", color: "Blue", width: 30, height: 30, }} onClick={() => toggleDialogs("Banner4")}>
                    <VisibilityOutlinedIcon />
                </IconButton>
            </div>
            <div class="divStyle">
                <IconButton style={{ alignItems: "center", fontSize: "0.6125em", color: "#3F979B", width: 30, height: 30, marginRight: '5px', marginTop: '-3px' }} ><CollectionsRoundedIcon /></IconButton>
                <label className="labelStyle">Banner 5 | Promotion</label>
                <div className={`input-group customerFileBtn`}>
                    <label className="input-group-text selectBtnStyle" for="inputBan5"> SELECT FILE</label>
                    <input className="inputStyle" type="file" accept="image/*" onChange={handleChangeBanner5} id="inputBan5" />
                </div>
                <IconButton style={{ alignItems: "center", fontSize: "0.6125em", color: "Green", width: 30, height: 30, marginRight: '5px' }} onClick={saveBanner5Clicked}>
                    <SaveRoundedIcon />
                </IconButton>
                <IconButton style={{ alignItems: "center", fontSize: "0.6125em", color: "Blue", width: 30, height: 30, }} onClick={() => toggleDialogs("Banner5")}>
                    <VisibilityOutlinedIcon />
                </IconButton>
            </div>
            <div style={{ height: '40px' }}></div>

            <div class="divStyle">
                <IconButton style={{ alignItems: "center", fontSize: "0.6125em", color: "#1B9C85", width: 30, height: 30, marginRight: '5px', marginTop: '-3px' }} ><WorkspacesRoundedIcon /></IconButton>
                <label className="labelStyle">About Us</label>
                <div className={`input-group customerFileBtn`}>
                    <label className="input-group-text selectBtnStyle" for="inputAbout"> SELECT FILE</label>
                    <input className="inputStyle" type="file" accept="image/*" onChange={handleChangeForAbout} id="inputAbout" />
                </div>
                <IconButton style={{ alignItems: "center", fontSize: "0.6125em", color: "Green", width: 30, height: 30, marginRight: '5px' }} onClick={saveAboutClicked}>
                    <SaveRoundedIcon />
                </IconButton>
                <IconButton style={{ alignItems: "center", fontSize: "0.6125em", color: "Blue", width: 30, height: 30, }} onClick={() => toggleDialogs("About")}>
                    <VisibilityOutlinedIcon />
                </IconButton>
            </div>

            <div class="divStyle">
                <IconButton style={{ alignItems: "center", fontSize: "0.6125em", color: "#FECE19", width: 30, height: 30, marginRight: '5px', marginTop: '-3px' }} ><LocalOfferRoundedIcon /></IconButton>
                <label className="labelStyle">Offers</label>
                <div className={`input-group customerFileBtn`}>
                    <label className="input-group-text selectBtnStyle" for="inputOffer"> SELECT FILE</label>
                    <input className="inputStyle" type="file" accept="image/*" onChange={handleChangeforOffers} id="inputOffer" />
                </div>
                <IconButton style={{ alignItems: "center", fontSize: "0.6125em", color: "Green", width: 30, height: 30, marginRight: '5px' }} onClick={saveOffersClicked}>
                    <SaveRoundedIcon />
                </IconButton>
                <IconButton style={{ alignItems: "center", fontSize: "0.6125em", color: "Blue", width: 30, height: 30, }} onClick={() => toggleDialogs("Offer")}>
                    <VisibilityOutlinedIcon />
                </IconButton>
            </div>

            <div class="divStyle">
                <IconButton style={{ alignItems: "center", fontSize: "0.6125em", color: "#47B5FF", width: 30, height: 30, marginRight: '5px', marginTop: '-3px' }} ><StoreRoundedIcon /></IconButton>
                <label className="labelStyle">Restaurant Address & Timings</label>
                <div className={`input-group customerFileBtn`}>
                    <label className="input-group-text selectBtnStyle" for="inputAdTm"> SELECT FILE</label>
                    <input className="inputStyle" type="file" accept="image/*" onChange={handleChangeforRestAddress} id="inputAdTm" />
                </div>
                <IconButton style={{ alignItems: "center", fontSize: "0.6125em", color: "Green", width: 30, height: 30, marginRight: '5px' }} onClick={saveRestAddressClicked}>
                    <SaveRoundedIcon />
                </IconButton>
                <IconButton style={{ alignItems: "center", fontSize: "0.6125em", color: "Blue", width: 30, height: 30, }} onClick={() => toggleDialogs("AddRes")}>
                    <VisibilityOutlinedIcon />
                </IconButton>
            </div>

            <div className="others-container">
                {dialog && (
                    <div className="dialog">
                        <div className="dialog-content">
                            <button className="close-icon" onClick={toggleDialog}>&#10005;</button>
                            {imageSrc.length > 0 ?
                                <img className="popup-image" src={imageSrc} alt="Popup Image" /> :
                                <img className="popup-image" src={noImg} alt="Popup Image" />}
                        </div>
                    </div>
                )}
            </div>
        </>

    );
};