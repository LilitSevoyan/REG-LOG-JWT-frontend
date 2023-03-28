import './App.css';
import Home from './page/Home';
import Register from './page/Register'
import Login from "./page/Login"
import {Routes,Route} from "react-router-dom";

function App() {
  return (
    <div className = "container">
      <Routes>
        <Route path="/"  element={<Home/>}/>
        <Route path = "/register" element={<Register/>}/>
        <Route path ="/login" element ={<Login/>}/>
      </Routes>
    </div>
    
  );
}

export default App;
