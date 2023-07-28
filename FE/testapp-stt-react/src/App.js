import { Routes, Route } from 'react-router-dom';
import Start from './pages/start/Start.js';

import Translation from './apis/translation/GoogleTranslator.js';
import WebSpeechApi from './apis/stt/WebSpeechApi.js';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Start></Start>}></Route>
        <Route path="/translation" element={<Translation></Translation>}></Route>
        <Route path="/webspeechapi" element={<WebSpeechApi></WebSpeechApi>}></Route>

      </Routes>
    </div>
  );
}

export default App;
