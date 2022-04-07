import './App.css';
import Module from './module/';
import TodoList from './module/TodoList';
import { Register } from './module/SignUpSignIn/Register';
import { Login } from './module/SignUpSignIn/Login';
import {createContext, useState} from 'react';

//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HashRouter as Router, Routes, Route} from "react-router-dom";

export const GlobalInfo = createContext();


const App = () => {

  let [data,setData] = useState(0);
  let setDataFunction = () =>{
    setData(data+1);
  }
  
  return ( 
    <div className="App">
       <GlobalInfo.Provider value={{data, setDataFunction}} > 
      <Router>
        <Routes>
          <Route path="/"  element={<Module />}></Route>
          <Route path="/signup"  element={<Register />}></Route>
          <Route path="/signin"  element={<Login />}></Route>
          <Route path="/todolist"  element={<Login />}></Route>
          <Route path="*"  element={<Module />}></Route>
        </Routes>
      </Router> 
      </GlobalInfo.Provider>
    </div>
  );
}
export default App;