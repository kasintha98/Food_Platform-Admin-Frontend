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
    // const allCss = useSelector((state) => state.product.allActiveCSS);

    const[allCss, setAllCss] = useState([]);

    const dispatch = useDispatch();

    const [youtubeUrl, setYouTubeUrl] = useState('');
    const [twitterUrl, setTwitterUrl] = useState('');
    const [instaeUrl, setInstaUrl] = useState('');
    const [facebookUrl, setFacebookUrl] = useState('');
    const [whatsappUrl, setWhatsAppUrl] = useState('');

    const saveCssData = (subCat, sorting, url, id) => {
        var cssObj = null;
        if (id == null) {
            cssObj = {
                restaurantId: user.restaurantId,
                storeId: "ALL",
                category: "HOME",
                subCategory: subCat,
                sorting: sorting,
                folderName: user.restaurantId,
                imagePath: url,
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
                imagePath: url,
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

    function getCssData(){
         dispatch(getAllActiveCSS(user.restaurantId , "ALL")).then((resp) => {
            if(resp){
                setAllCss(resp);
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
    }
//https://www.youtube.com/channel/UCJPY7XvcOOMWNlZcgmxAJLg/featured
    useEffect(()=>{
        getCssData();
    },[])

    // useEffect(()=>{
    //     dispatch(getAllActiveCSS(user.restaurantId , "ALL")).then((resp) => {
    //         if(resp){
    //             console.log("GETALLCSS:::: ", resp);
    //             resp.forEach((category)=>{
    //                 if(category.subCategory === "Youtube"){setYouTubeUrl(category.imagePath);}
    //                 else if(category.subCategory === "Twitter"){setTwitterUrl(category.imagePath);}
    //                 else if(category.subCategory === "Instagram"){setInstaUrl(category.imagePath);}
    //                 else if(category.subCategory === "Facebook"){setFacebookUrl(category.imagePath);}
    //                 else if(category.subCategory === "Whatapp"){setWhatsAppUrl(category.imagePath);}
    //             })
                
    //         }
    //     });
    // },[])

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

        var ids = null;
        allCss.forEach((cssObj) => {
            if (cssObj.subCategory === "Youtube") {
                ids = cssObj.id;
            }
        });
        saveCssData("Youtube", 1, youtubeUrl, ids);
    }

    const saveTwitterUrl = () => {

        var ids = null;
        allCss.forEach((cssObj) => {
            if (cssObj.subCategory === "Twitter") {
                ids = cssObj.id;
            }
        });
        saveCssData("Twitter", 1, twitterUrl, ids);
    }

    const saveInstaUrl = () => {

        var ids = null;
        allCss.forEach((cssObj) => {
            if (cssObj.subCategory === "Instagram") {
                ids = cssObj.id;
            }
        });
        saveCssData("Instagram", 1, instaeUrl, ids);
    }

    const saveFBUrl = () => {

        var ids = null;
        allCss.forEach((cssObj) => {
            if (cssObj.subCategory === "Facebook") {
                ids = cssObj.id;
            }
        });
        saveCssData("Facebook", 1, facebookUrl, ids);
    }

    const saveWhatsappUrl = () => {

        var ids = null;
        allCss.forEach((cssObj) => {
            if (cssObj.subCategory === "Whatapp") {
                ids = cssObj.id;
            }
        });
        saveCssData("Whatapp", 1, whatsappUrl, ids);
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