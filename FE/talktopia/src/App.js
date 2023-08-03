import './App.css';
import { Routes, Route } from 'react-router-dom';



// Router
//start
import Start from './pages/start/NoStart.js';
import StartReal from './pages/start/Start.js';
//auth
import Join from './pages/auth/MyInfo/Join.js';
import Login from './pages/auth/MyInfo/Login.js';
import IdFind from './pages/auth/FindMyInfo/IdFind.js';
import IdFindSuccess from './pages/auth/FindMyInfo/IdFindSuccess.js';
import IdFindFail from './pages/auth/FindMyInfo/IdFindFail.js';
import PasswordFind from './pages/auth/FindMyInfo/PasswordFind.js';
import ChangePw from './pages/auth/ModifyMyInfo/ChangePw.js';
import MyInfo from './pages/auth/ModifyMyInfo/MyInfo.js';
import MyInfoPw from './pages/auth/ModifyMyInfo/MyInfoPw.js';

//home
import Home from './pages/home/Home.js';
import RealHome from './pages/home/RealHome.js';


import Translation from './apis/translation/GoogleTranslator.js';
import WebSpeechApi from './apis/stt/WebSpeechApi.js';
import Sample from './apis/stt/Sample.js';
import JoinRoom from './pages/video/JoinRoom.js';

import Regist from './pages/auth/MyInfo/JoinLogin.js';

function App() {
  return (
    <div className="App">
      {/* router */}
      <Routes>
        <Route path="/start" element={<Start/>}/>
        <Route path="/" element={<StartReal/>}/>
        <Route path="/join" element={<Join/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/findId" element={<IdFind/>}/>
        <Route path="/findId/success" element={<IdFindSuccess/>}/>
        <Route path="/findId/fail" element={<IdFindFail/>}/>
        <Route path="/findPassword" element={<PasswordFind/>}/>
        <Route path="/changePw" element={<ChangePw/>}/>
        <Route path="/myinfo" element={<MyInfo/>}>
          {/* <Route path="passwordConfirm" element={<MyInfoPw/>}/> */}
        </Route>
        <Route path="/myinfo/passwordConfirm" element={<MyInfoPw/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/realhome" element={<RealHome/>}/>
        <Route path="/translation" element={<Translation/>}/>
        <Route path="/stt" element={<WebSpeechApi/>}/>
        <Route path="/sample" element={<Sample/>}/>
        <Route path="/regist" element={<Regist/>}/>
        <Route path="/joinroom" element={<JoinRoom/>}/>
      </Routes>
    </div>
  );
}

export default App;
