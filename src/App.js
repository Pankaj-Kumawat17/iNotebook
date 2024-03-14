import './App.css';
import EditorPage from './components/EditorPage';
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
    <div>
      <Toaster position='top-right' toastOptions={{success:{theme:{primary:'#4aed88'}}}} ></Toaster>
    </div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route exact path="/editor/:roomId" element={<EditorPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;