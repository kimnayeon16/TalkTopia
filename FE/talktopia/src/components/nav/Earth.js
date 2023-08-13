import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../utils";

import style from './Nav.module.css';

function Earth(){
    const navigate = useNavigate();

    const user = useSelector((state) => state.userInfo);
    const [userName, setUserName] = useState("");
    const [userImg, setUserImg] = useState("");

    const [earthModalVisible, setEarthMoalVisible] = useState(false);

    useEffect(() => {
        const userInfoString = localStorage.getItem("UserInfo");
  
        const userInfo = JSON.parse(userInfoString);
        setUserName(userInfo.userName);
        setUserImg(userInfo.profileUrl);
    }, []);

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
                        <p className={`${style.countrytext}`}>한국어</p>
                        <p className={`${style.countrytext}`}>영어</p>
                    </div>
                </div>
            }
        </div>
    )
}

export default Earth;