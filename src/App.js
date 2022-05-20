
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Pages/Home/Footer';

import Home from './Pages/Home/Home';
import Navbar from './Pages/Home/Navbar';
import Login from './Pages/Login/Login';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
     <Route path='/' element={<Home/>}></Route>
     <Route path='/login' element={<Login/>}></Route>
     </Routes>
     <Footer />
    </div>
  );
}

export default App;
