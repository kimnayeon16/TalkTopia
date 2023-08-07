import './App.css';
import { Routes, Route } from 'react-router-dom';



// Router
//start
import NoStart from './pages/start/NoStart.js';
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
import NoHome from './pages/home/NoHome.js';

//mypage
import MyInfo from './pages/mypage/MyInfo.js';
import MyInfoPw from './pages/mypage/MyInfoPw.js';
import Leave from './pages/mypage/Leave.js';

// faq
import Faq from './pages/faq/Faq.js';
import Counsel from './pages/faq/Counsel.js';

import Translation from './apis/translation/GoogleTranslator.js';
import WebSpeechApi from './apis/stt/WebSpeechApi.js';
import Sample from './apis/stt/Sample.js';
import JoinRoom from './pages/video/JoinRoom.js';


import FriendList from './pages/friend/FriendList';

function App() {
  return (
    <div className="App">
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
        <Route path="/start" element={<NoStart/>}/>
        <Route path="/nohome" element={<NoHome/>}/>

        {/* 친구목록 */}
        <Route path="/friendList" element={<FriendList/>}/>
      </Routes>
    </div>
  );
}

export default App;
