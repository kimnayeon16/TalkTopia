import './App.css';
import { Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';


// Router
//start
import Start from './pages/start/Start.js';
//auth
import Regist from './pages/auth/MyInfo/JoinLogin.js';
import SocialLogin from './pages/auth/MyInfo/SocialLogin.js';
import IdFind from './pages/auth/FindMyInfo/IdFind.js';
import IdFindSuccess from './pages/auth/FindMyInfo/IdFindSuccess.js';
import IdFindFail from './pages/auth/FindMyInfo/IdFindFail.js';
import PasswordFind from './pages/auth/FindMyInfo/PasswordFind.js';
import PasswordFindSuccess from './pages/auth/FindMyInfo/PasswordFindSuccess.js';
import PasswordFindFail from './pages/auth/FindMyInfo/PasswordFindFail.js';

//home
import Home from './pages/home/Home.js';
import Home1 from './pages/home/NoHome.js';

//mypage
import MyInfo from './pages/mypage/MyInfo.js';
import MyInfoPw from './pages/mypage/MyInfoPw.js';
import Leave from './pages/mypage/Leave.js';

// faq
import Faq from './pages/faq/Faq.tsx';
import Counsel from './pages/faq/Counsel.js';

import Translation from './apis/translation/GoogleTranslator.js';
import WebSpeechApi from './apis/stt/WebSpeechApi.js';
import Sample from './apis/stt/Sample.js';
import JoinRoom from './pages/video/JoinRoom.js';


import FriendList from './pages/friend/FriendList';
import ChatWindow from './pages/friend/ChatWindow';

import GoogleLoginButton from './pages/auth/MyInfo/GoogleLoginButton';
import { AnimatePresence } from "framer-motion";

// FCM
import ServiceWorkerListener from './pages/auth/fcm/ServiceWorkerListener';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleMessage = (payload) => {
    setModalContent(payload.notification.body); // 받는 내용
    setShowModal(true);
  };

  const handleConfirmClick = () => {
    console.log("확인 버튼이 클릭되었습니다.");
    setShowModal(false);
  };

  return (
    <div className="App">
      <AnimatePresence>
      {/* router */}
      <Routes>
        {/* start */}
        <Route path="/" element={<Start/>}/>
        {/* auth */}
        <Route path="/regist" element={<Regist/>}/>
        <Route path="/snsRegist" element={<SocialLogin/>}/>
        <Route path="/findId" element={<IdFind/>}/>
        <Route path="/findId/success" element={<IdFindSuccess/>}/>
        <Route path="/findId/fail" element={<IdFindFail/>}/>
        <Route path="/findPassword" element={<PasswordFind/>}/>
        <Route path="/findPassword/success" element={<PasswordFindSuccess/>}/>
        <Route path="/findPassword/fail" element={<PasswordFindFail/>}/>
        {/* home */}
        <Route path="/home1" element={<Home1/>}/>
        <Route path="/home" element={<Home/>}/>
        {/* myInfo */}
        <Route path="/myinfo" element={<MyInfo/>}/>
        <Route path="/myinfo/passwordConfirm" element={<MyInfoPw/>}/>
        {/* faq */}
        <Route path="/faq" element={<Faq/>}></Route>
        <Route path="/counsel" element={<Counsel/>}></Route>

        <Route path="/translation" element={<Translation/>}/>
        <Route path="/stt" element={<WebSpeechApi/>}/>
        <Route path="/sample" element={<Sample/>}/>
        <Route path="/joinroom" element={<JoinRoom/>}/>
        <Route path="/bye" element={<Leave/>}/>

        {/* 삭제할거 */}
        <Route path="/google" element={<GoogleLoginButton/>}/>

        {/* 친구목록 */}
        <Route path="/friendList" element={<FriendList/>}/>
        <Route path="/chat" element={<ChatWindow />} />
      </Routes>
      </AnimatePresence>

      <ServiceWorkerListener onMessage={handleMessage} />
      {showModal && (
        <div className="fcm-modal">
          <div className="fcm-modal-content">
            {modalContent}
            <button className="fcm-modal-content-button" onClick={handleConfirmClick}>확인</button>
            <button className="fcm-modal-content-button" onClick={() => setShowModal(false)}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
