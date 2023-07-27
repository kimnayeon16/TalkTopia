import './App.css';
import { Routes, Route } from 'react-router-dom';



// Router
import Start from './pages/start/Start.js';
import Join from './pages/auth/Join.js';
import Login from './pages/auth/Login.js';
import Home from './pages/home/Home.js';
import Translation from './apis/translation/GoogleTranslator.js';
// import JoinRoom from './pages/video/JoinRoom.js';

function App() {
  return (
    <div className="App">
      {/* router */}
      <Routes>
        <Route path="/" element={<Start></Start>}></Route>
        <Route path="/join" element={<Join></Join>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/translation" element={<Translation></Translation>}></Route>
      </Routes>
    </div>
  );
}

export default App;
