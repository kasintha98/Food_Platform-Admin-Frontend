import React, { useState, useEffect } from "react";
import "./style.css";
import IconButton from "@mui/material/IconButton";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import { saveCSS, uploadImage, getAllActiveCSS } from "../../actions";
import { useSelector, useDispatch } from "react-redux";

import DoNotStepOutlinedIcon from '@mui/icons-material/DoNotStepOutlined';
import noImg from "../../img/no-img.png";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { imagePathHome } from "../../urlConfig";
import { toast } from "react-toastify";

export const SeoFooter = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    const [allCss, setAllCss] = useState([]);

    const [footerFile, setFooterFile] = useState(null);
    const [footerFileName, setFooterFileName] = useState("");

    const [footerImgPath, setFooterImagePath] = useState("");

    useEffect(() => {
        getCssData();
    }, [])

    /**
     * Model related code
     */
    const [dialog, setDialog] = useState(false);
    const [imageSrc, setImageSrc] = useState("");

    const toggleDialog = () => {
        setDialog(!dialog);
    };


    function toggleDialogs(value) {
        setDialog(!dialog);

        if (value === "Footer") { setImageSrc(footerImgPath); }
        else { setImageSrc(""); }
    };

    function handleChangeforFooter(e) {
        if (e.target.files[0] != undefined) {
            setFooterFileName(e.target.files[0].name);
            setFooterFile(e.target.files[0]);
        }
    }

    function getCssData() {
        dispatch(getAllActiveCSS(user.restaurantId, "ALL")).then((resp) => {
            if (resp) {
                console.log("GETALLCSS:::: ", resp);
                setAllCss(resp);
                resp.forEach((category) => {
                    if (category.subCategory === "Footer") {
                        var path = imagePathHome + "/" + user.restaurantId + "/" + category.imagePath;
                        setFooterImagePath(path);
                    }
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

    const saveFooterClicked = () => {
        const formDataImage = new FormData();
        formDataImage.append("files", footerFile);
        formDataImage.append("restaurantId", user.restaurantId);

        if (footerFile.size > 5 * 1000 * 1024) {
            toast.warn('File with maximum size of 5MB is allowed !');
            return false;
        }

        var ids = null;
        dispatch(uploadImage(formDataImage)).then((res) => {
            if (res) {
                allCss.forEach((cssObj) => {
                    if (cssObj.subCategory === "Footer") {
                        ids = cssObj.id;
                    }
                });
                saveCssData("Footer", 1, footerFileName, ids);
            }
        })
    }

    return (
        <>
            <div class="divStyle">
                <IconButton style={{ alignItems: "center", fontSize: "0.6125em", color: "#CD6688", width: 30, height: 30, marginRight: '5px', marginTop: '-3px' }} ><DoNotStepOutlinedIcon /></IconButton>
                <label className="labelStyle">Footer Image</label>
                <div className={`input-group customerFileBtn`}>
                    <label className="input-group-text selectBtnStyle" for="inputGroupFile"> SELECT FILE</label>
                    <input className="inputStyle" type="file" accept="image/*" onChange={handleChangeforFooter} id="inputGroupFile" />
                </div>
                <IconButton style={{ alignItems: "center", fontSize: "0.6125em", color: "Green", width: 30, height: 30, marginRight: '5px' }} onClick={saveFooterClicked}>
                    <SaveRoundedIcon />
                </IconButton>
                <IconButton style={{ alignItems: "center", fontSize: "0.6125em", color: "Blue", width: 30, height: 30, marginRight: '5px' }} onClick={() => toggleDialogs("Footer")}>
                    <VisibilityOutlinedIcon />
                </IconButton>
            </div>

            <div className="footerImgcontainer">
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

}