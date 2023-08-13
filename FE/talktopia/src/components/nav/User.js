import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../utils";
import { removeCookie } from "../../cookie";

import style from './Nav.module.css';

function User(){
    const navigate = useNavigate();

    const user = useSelector((state) => state.userInfo);
    const [userName, setUserName] = useState("");
    const [userImg, setUserImg] = useState("");

    const [userModalVisible, setUserModalVisible] = useState(false);

    useEffect(() => {
        const userInfoString = localStorage.getItem("UserInfo");
  
        const userInfo = JSON.parse(userInfoString);
        setUserName(userInfo.userName);
        setUserImg(userInfo.profileUrl);
    }, []);

    const handleUserMouseOver = () => {
        setUserModalVisible(true);
      };
    
      const handleUserMouseOut = () => {
        setUserModalVisible(false);
      };
    

    //로그아웃
    const logout = () => {
        axios.get(`${BACKEND_URL}/api/v1/user/logout/${user.userId}`, {
            params: {
                name: user.userId 
            },
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.accessToken}`
            }
          }).then((response)=>{
            removeCookie('refreshToken');
            localStorage.removeItem("UserInfo");
            console.log("로그아웃");
            
            navigate('/');
         })
         .catch((error)=>{
             console.log("로그아웃 실패", error);
         })
    }


    return(
        <div className={`${style["user-space"]}`} onMouseOver={handleUserMouseOver} onMouseOut={handleUserMouseOut}>
            <img className={`${style.user}`} src="/img/nav/user.png" alt="" onMouseOver={handleUserMouseOver} onMouseOut={handleUserMouseOut}></img>
                {
                userModalVisible &&
                    <div onMouseOver={handleUserMouseOver} onMouseOut={handleUserMouseOut}>
                        <div className={`${style.meModal}`}>
                            <img className={`${style.img}`} style={{ width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden'}} src={userImg} alt=""/>
                            <p className={`${style.mytext}`}>{userName}</p>
                            <hr/>
                            <p className={`${style.mytext}`} onClick={()=>{navigate('/myinfo/passwordConfirm')}}>내 정보 보기</p>
                            <p className={`${style.mytext}`} onClick={logout}>로그아웃</p>
                        </div>
                    </div>
                }
        </div>
    )
}

export default User;