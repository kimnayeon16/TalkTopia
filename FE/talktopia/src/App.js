import './App.css';
import { Routes, Route } from 'react-router-dom';



// Router
import Start from './pages/start/Start.js';
import Join from './pages/auth/Join.js';
import Login from './pages/auth/Login.js';
import Home from './pages/home/Home.js';
import JJoin from './pages/auth/JJoin.js';

function App() {
  return (
    <div className="App">
      {/* router */}
      <Routes>
        <Route path="/" element={<Start></Start>}></Route>
        <Route path="/join" element={<Join></Join>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/main" element={<Home></Home>}></Route>
        <Route path="/join2" element={<JJoin></JJoin>}></Route>
      </Routes>
    </div>
  );
}

export default App;
