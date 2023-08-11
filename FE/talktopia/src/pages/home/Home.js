// App.js
import React, { useEffect, useState } from 'react';
import BearGroup from '../../components/main/BearGroup';
import CoralGroup from '../../components/main/CoralGroup';
import FishGroup from '../../components/main/FishGroup';
import FriendGroup from '../../components/main/FriendGroup';
import FriendList from '../../components/main/FriendList';
import PenguinGroup from '../../components/main/PenguinGroup';
import WaterGroup from '../../components/main/WaterGroup';
import WhaleGroup from '../../components/main/WhaleGroup';
import style from '../../components/main/mainComponent.module.css';
import styles from "./Home.module.css";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../../utils';
import { removeCookie } from '../../cookie';

function Home(){
  const navigate = useNavigate();
  const [userModalVisible, setUserModalVisible] = useState(false);
  const [ddingModalVisible, setDdingMoalVisible] = useState(false);
  const [faqModalVisible, setFaqMoalVisible] = useState(false);

  const handleUserMouseOver = () => {
    setUserModalVisible(true);
  };

  const handleUserMouseOut = () => {
    setUserModalVisible(false);
  };

  const handleEarthMouseOver = () => {
    setDdingMoalVisible(true);
  }

  const handleEarthMouseOut = () => {
    setDdingMoalVisible(false);
  }

  const handleFaqMouseOver = () => {
    setFaqMoalVisible(true);
  }

  const handleFaqMouseOut = () => {
    setFaqMoalVisible(false);
  }

  return(
  <div className={`${style.body}`}>
    <span className={`${styles.title}`} onClick={()=>{navigate('/home')}}>TalkTopia</span>
    <img className={`${styles.user}`} src="/img/nav/user.png" alt="" onMouseOver={handleUserMouseOver} onMouseOut={handleUserMouseOut}></img>
    {userModalVisible && <Me handleUserMouseOver={handleUserMouseOver} handleUserMouseOut={handleUserMouseOut}/>}
    <img className={`${styles.dding}`} src="/img/nav/dding.png" alt=""></img>
    <img className={`${styles.earth}`} src="/img/nav/earth.png" alt="" onMouseOver={handleEarthMouseOver} onMouseOut={handleEarthMouseOut}></img>
    {ddingModalVisible && <Earth handleEarthMouseOver={handleEarthMouseOver} handleEarthMouseOut={handleEarthMouseOut}/>}
    <img className={`${styles.faq}`} src="/img/nav/faq1.png" alt="" onMouseOver={handleFaqMouseOver} onMouseOut={handleFaqMouseOut}></img>
    {faqModalVisible && <Faq handleFaqMouseOver={handleFaqMouseOver} handleFaqMouseOut={handleFaqMouseOut}/>}
    <FishGroup />
    <PenguinGroup />
    <BearGroup />
    <FriendGroup />
    <WhaleGroup />
    <CoralGroup />
    <FriendList />
    <WaterGroup />
  </div>
  )
};

export default Home;


function Me(props){
  const navigate = useNavigate();

  const user = useSelector((state) => state.userInfo);
  const [userName, setUserName] = useState("");
  const [userImg, setUserImg] = useState("");
  
  useEffect(()=>{
    const userInfoString = localStorage.getItem("UserInfo");
    const userInfo = JSON.parse(userInfoString);
    const name = userInfo.userName;
    const imgurl = userInfo.profileUrl;
    setUserName(name);
    setUserImg(imgurl);
  },[])

  const logout = () => {
    axios.get(`${BACKEND_URL}/api/v1/user/logout/${user.userId}`, {
        params: {
            name: user.userId
        },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.accessToken}`
        }
    })
  }


  return(
    <div className={`${styles.meModal}`}  onMouseOver={props.handleUserMouseOver} onMouseOut={props.handleUserMouseOut}>
      <img className={`${styles.img}`} style={{ width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden'}} src={userImg} alt=""/>
      <p className={`${styles.mytext}`}>{userName}</p>
      <hr/>
      <p className={`${styles.mytext}`} onClick={()=>{navigate('/myinfo/passwordConfirm')}}>내 정보 보기</p>
      <p className={`${styles.mytext}`} onClick={logout}>로그아웃</p>
    </div>
  )
}

function Earth(props){
  return(
    <div className={`${styles.earthModal}`} onMouseOver={props.handleEarthMouseOver} onMouseOut={props.handleEarthMouseOut}>
      <p className={`${styles.countrytext}`}>한국어</p>
      <p className={`${styles.countrytext}`}>영어</p>
    </div>
  )
}

function Faq(props){
  const navigate = useNavigate();
  return(
    <div className={`${styles.faqModal}`} onMouseOver={props.handleFaqMouseOver} onMouseOut={props.handleFaqMouseOut}>
    <p className={`${styles.faqtext}`} onClick={()=>{navigate('/faq')}}>FAQ</p>
    <p className={`${styles.faqtext}`} onClick={()=>{navigate('/counsel')}}>1:1 문의</p>
  </div>
  )
}