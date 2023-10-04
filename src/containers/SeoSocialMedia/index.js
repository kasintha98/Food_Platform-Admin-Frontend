import React, { useState, useEffect } from "react";
import "./style.css";
import IconButton from "@mui/material/IconButton";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import { useSelector, useDispatch } from "react-redux";

import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { getAllActiveCSS, saveCSS } from "../../actions";

export const SeoSocialMedia = () => {
    const user = useSelector((state) => state.auth.user);
    const allCss = useSelector((state) => state.product.allActiveCSS);
    const dispatch = useDispatch();

    const [youtubeUrl, setYouTubeUrl] = useState('');
    const [twitterUrl, setTwitterUrl] = useState('');
    const [instaeUrl, setInstaUrl] = useState('');
    const [facebookUrl, setFacebookUrl] = useState('');
    const [whatsappUrl, setWhatsAppUrl] = useState('');

    useEffect(()=>{
        dispatch(getAllActiveCSS(user.restaurantId , "ALL")).then((resp) => {
            if(resp){
                console.log("GETALLCSS:::: ", resp);
                resp.forEach((category)=>{
                    if(category.subCategory === "Youtube"){setYouTubeUrl(category.imagePath);}
                    else if(category.subCategory === "Twitter"){setTwitterUrl(category.imagePath);}
                    else if(category.subCategory === "Instagram"){setInstaUrl(category.imagePath);}
                    else if(category.subCategory === "Facebook"){setFacebookUrl(category.imagePath);}
                    else if(category.subCategory === "Whatapp"){setWhatsAppUrl(category.imagePath);}
                })
                
            }
        });
    },[])

    const handleYoutubeaUrl = (event) =>{
        setYouTubeUrl(event.target.value);
    }

    const handleTwitterUrl = (event) =>{
        setTwitterUrl(event.target.value);
    }

    const handleInstaUrl = (event) =>{
        setInstaUrl(event.target.value);
    }

    const handleFacebookaUrl = (event) =>{
        setFacebookUrl(event.target.value);
    }

    const handleWhatsappUrl = (event) =>{
        setWhatsAppUrl(event.target.value);
    }

    const saveYouTubeUrl = () => {
        const cssYoutubeObj = {
            restaurantId: user.restaurantId,
            storeId: "ALL",
            category: "HOME",
            subCategory: "Youtube",
            sorting: 1,
            folderName: user.restaurantId,
            imagePath: youtubeUrl,
            status: "ACTIVE",
        }
        console.log("cssYoutubeObj --- ",cssYoutubeObj);
        dispatch(saveCSS(cssYoutubeObj)).then((resp) => {
            if (resp) {
                console.log("saveCss resp ",resp);
            }
        });
    }

    const saveTwitterUrl = () => {
        const cssTwitterObj = {
            restaurantId: user.restaurantId,
            storeId: "ALL",
            category: "HOME",
            subCategory: "Twitter",
            sorting: 1,
            folderName: user.restaurantId,
            imagePath: twitterUrl,
            status: "ACTIVE",
        }
        console.log("cssTwitterObj --- ",cssTwitterObj);
        dispatch(saveCSS(cssTwitterObj)).then((resp) => {
            if (resp) {
                console.log("saveCss resp ",resp);
            }
        });
    }

    const saveInstaUrl = () => {
        const cssInstaObj = {
            restaurantId: user.restaurantId,
            storeId: "ALL",
            category: "HOME",
            subCategory: "Instagram",
            sorting: 1,
            folderName: user.restaurantId,
            imagePath: instaeUrl,
            status: "ACTIVE",
        }
        console.log("cssInstaObj --- ",cssInstaObj);
        dispatch(saveCSS(cssInstaObj)).then((resp) => {
            if (resp) {
                console.log("saveCss resp ",resp);
            }
        });
    }

    const saveFBUrl = () => {
        const cssFBObj = {
            restaurantId: user.restaurantId,
            storeId: "ALL",
            category: "HOME",
            subCategory: "Facebook",
            sorting: 1,
            folderName: user.restaurantId,
            imagePath: facebookUrl,
            status: "ACTIVE",
        }
        console.log("cssFBObj --- ",cssFBObj);
        dispatch(saveCSS(cssFBObj)).then((resp) => {
            if (resp) {
                console.log("saveCss resp ",resp);
            }
        });
    }

    const saveWhatsappUrl = () => {
        const cssWAObj = {
            restaurantId: user.restaurantId,
            storeId: "ALL",
            category: "HOME",
            subCategory: "Whatapp",
            sorting: 1,
            folderName: user.restaurantId,
            imagePath: whatsappUrl,
            status: "ACTIVE",
        }
        console.log("cssWAObj --- ",cssWAObj);
        dispatch(saveCSS(cssWAObj)).then((resp) => {
            if (resp) {
                console.log("saveCss resp ",resp);
            }
        });
    }

    return (
        <>
            <div class="divStyle">
                <IconButton style={{ alignItems: "center", fontSize: "0.6125em", color: "#635985", width: 30, height: 30, marginRight: '5px', marginTop: '-3px',color:'red' }} ><YouTubeIcon /></IconButton>
                <label className="labelStyle">YOUTUBE CONNECT</label>
                {/* <div style={{backgroundColor:'#E4E4E4',height:'31px'}}> */}
                <button className="selectBtnStyle"> URL </button>
                <input className="inputTextStyle" type="text" name="link" value={youtubeUrl} onChange={handleYoutubeaUrl} />
                {/* </div> */}

                <IconButton style={{ alignItems: "center", fontSize: "0.6125em", color: "Green", width: 30, height: 30, marginRight: '5px', marginLeft: '12px' }} onClick={saveYouTubeUrl}>
                    <SaveRoundedIcon />
                </IconButton>
                {/* <IconButton style={{ alignItems: "center", fontSize: "0.6125em", color: "Red", width: 30, height: 30, }} onClick={deleteYouTubeUrl}>
                    <DeleteForeverRoundedIcon />
                </IconButton> */}
            </div>

            <div class="divStyle">
                <IconButton style={{ alignItems: "center", fontSize: "0.6125em", color: "#635985", width: 30, height: 30, marginRight: '5px', marginTop: '-3px', color:'#469BE9' }} ><TwitterIcon /></IconButton>
                <label className="labelStyle">TWITTER CONNECT</label>
                <button className="selectBtnStyle"> URL </button>
                <input className="inputTextStyle" type="text" name="link" value={twitterUrl} onChange={handleTwitterUrl} />

                <IconButton style={{ alignItems: "center", fontSize: "0.6125em", color: "Green", width: 30, height: 30, marginRight: '5px', marginLeft: '12px' }} onClick={saveTwitterUrl}>
                    <SaveRoundedIcon />
                </IconButton>
                {/* <IconButton style={{ alignItems: "center", fontSize: "0.6125em", color: "Red", width: 30, height: 30, }}>
                    <DeleteForeverRoundedIcon />
                </IconButton> */}
            </div>

            <div class="divStyle">
                <IconButton style={{ alignItems: "center", fontSize: "0.6125em", color: "#635985", width: 30, height: 30, marginRight: '5px', marginTop: '-3px', color:'#CC0055' }} ><InstagramIcon /></IconButton>
                <label className="labelStyle">INSTAGRAM CONNECT</label>
                <button className="selectBtnStyle"> URL </button>
                <input className="inputTextStyle" type="text" name="link" value={instaeUrl} onChange={handleInstaUrl} />

                <IconButton style={{ alignItems: "center", fontSize: "0.6125em", color: "Green", width: 30, height: 30, marginRight: '5px', marginLeft: '12px' }} onClick={saveInstaUrl}>
                    <SaveRoundedIcon />
                </IconButton>
                {/* <IconButton style={{ alignItems: "center", fontSize: "0.6125em", color: "Red", width: 30, height: 30, }}>
                    <DeleteForeverRoundedIcon />
                </IconButton> */}
            </div>

            <div class="divStyle">
                <IconButton style={{ alignItems: "center", fontSize: "0.6125em", color: "#635985", width: 30, height: 30, marginRight: '5px', marginTop: '-3px', color:'#0723B5' }} ><FacebookIcon /></IconButton>
                <label className="labelStyle">FACEBOOK CONNECT</label>
                <button className="selectBtnStyle"> URL </button>
                <input className="inputTextStyle" type="text" name="link" value={facebookUrl} onChange={handleFacebookaUrl}/>

                <IconButton style={{ alignItems: "center", fontSize: "0.6125em", color: "Green", width: 30, height: 30, marginRight: '5px', marginLeft: '12px' }} onClick={saveFBUrl}>
                    <SaveRoundedIcon />
                </IconButton>
                {/* <IconButton style={{ alignItems: "center", fontSize: "0.6125em", color: "Red", width: 30, height: 30, }}>
                    <DeleteForeverRoundedIcon />
                </IconButton> */}
            </div>

            <div class="divStyle">
                <IconButton style={{ alignItems: "center", fontSize: "0.6125em", color: "#635985", width: 30, height: 30, marginRight: '5px', marginTop: '-3px', color:'#3CE74D' }} ><WhatsAppIcon /></IconButton>
                <label className="labelStyle">WHATSAPP CONNECT</label>
                <button className="selectBtnStyle"> URL </button>
                <input className="inputTextStyle" type="text" name="link" value={whatsappUrl} onChange={handleWhatsappUrl}/>

                <IconButton style={{ alignItems: "center", fontSize: "0.6125em", color: "Green", width: 30, height: 30, marginRight: '5px', marginLeft: '12px' }} onClick={saveWhatsappUrl}>
                    <SaveRoundedIcon />
                </IconButton>
                {/* <IconButton style={{ alignItems: "center", fontSize: "0.6125em", color: "Red", width: 30, height: 30, }}>
                    <DeleteForeverRoundedIcon />
                </IconButton> */}
            </div>

        </>

    );
};