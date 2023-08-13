// App.js
import React, { useEffect, useRef, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../../utils';
import { removeCookie } from '../../cookie';
import Nav from '../../nav/Nav';
import { reduxUserInfo } from '../../store';

function Home(){
  const navigate = useNavigate();

  const user = useSelector((state) => state.userInfo);
  console.log(user, '0000000000000000000000000000000000')
  let dispatch = useDispatch();

  const [userName, setUserName] = useState("");
  const [userImg, setUserImg] = useState("");

  useEffect(() => {
      const userInfoString = localStorage.getItem("UserInfo");
      const userInfo = JSON.parse(userInfoString);
      setUserName(userInfo.userName);
      setUserImg(userInfo.profileUrl);
  }, []);

  useEffect(() => {
    // 로컬 스토리지에서 저장된 사용자 정보 불러오기
    const storedUserInfo = localStorage.getItem('UserInfo');
    if (storedUserInfo) {
      const userInfo = JSON.parse(storedUserInfo);
      // Redux 상태를 업데이트하는 액션 디스패치
      dispatch(reduxUserInfo(userInfo));
    }
  }, [dispatch]);


  // useUnload((e) => {
  //   e.preventDefault();
  //   localStorage.removeItem("UserInfo");
  //   removeCookie('refreshToken');
  // });

  return(
  <div className={`${style.body}`}>
    <Nav/>
    <FishGroup />
    <PenguinGroup />
    <BearGroup />
    <FriendGroup />
    <WhaleGroup />
    <CoralGroup />
    <FriendList />
    <WaterGroup />
    <p className={`${styles.guide}`}>마우스를 동물 친구들 <br/> 위로 올려보세요!</p>
    <img className={`${styles.sign}`} src="/img/main/sign1.png" alt=""></img>
  </div>
  )
};

export default Home;