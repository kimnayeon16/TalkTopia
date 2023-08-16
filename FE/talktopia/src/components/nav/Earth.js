import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../utils";
import { useTranslation } from "react-i18next";
import i18n from "../../locales/i18n"

import style from './Nav.module.css';

function Earth(){
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    // const user = useSelector((state) => state.userInfo);
    // const [userName, setUserName] = useState("");
    // const [userImg, setUserImg] = useState("");

    const [earthModalVisible, setEarthMoalVisible] = useState(false);

    useEffect(() => {
  
    }, []);

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
      };

    const handleEarthMouseOver = () => {
        setEarthMoalVisible(true);
      }
    
      const handleEarthMouseOut = () => {
        setEarthMoalVisible(false);
      }

    return(
        <div className={`${style["earth-space"]}`} onMouseOver={handleEarthMouseOver} onMouseOut={handleEarthMouseOut}>
            <img className={`${style.earth}`} src="/img/nav/earth.png" alt="" onMouseOver={handleEarthMouseOver} onMouseOut={handleEarthMouseOut}></img>
            {
            earthModalVisible &&
                <div onMouseOver={handleEarthMouseOver} onMouseOut={handleEarthMouseOut}>
                    <div className={`${style.earthModal}`}>
                        <p className={`${style.countrytext}`} onClick={() => changeLanguage('ko')}>한국어</p>
                        <p className={`${style.countrytext}`} onClick={() => changeLanguage('en')}>영어</p>
                    </div>
                </div>
            }
        </div>
    )
}

export default Earth;