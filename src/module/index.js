import React from 'react';
import { useState,useEffect } from 'react';
import {TodoItems} from './TodoItems';
import {AddTodo} from './AddTodo';
import { Update } from './Update';
import {API_URL} from './API';
import { useNavigate } from "react-router-dom";
import {Header} from './Header/';

const Module = () => {
    const [todo,setTodo] = useState([]);
    const [enableUpdate,setEnabaleUpdate] = useState(false);
    const [upadteId,setUpdateId] = useState();
    const [upadteName,setUpdateName] = useState();
    
    const navigate = useNavigate();
    
    useEffect(()=>{
      if((localStorage.getItem("username"))){
        //navigate("/signin");
      }else{
        
      }
      
      fetch(API_URL+'/todo/')
        .then(response => response.json())
        .then(json => {
          setTodo(json);
          console.log(json);
          console.log(API_URL+'/todo/');
        });
      },[]); 

      const parentAlert = () =>{
        fetch(API_URL+'/todo/')
        .then(response => response.json())
        .then(json => {
          setTodo(json);
        });
      }


      const todo_update = (_id,name) => {
        setEnabaleUpdate(true);
        setUpdateName(name);
        setUpdateId(_id);
      }

      const closeUpdateSection = () =>{
        setEnabaleUpdate(false);
      }
  return (
    <>
    <Header />
    <div className='inner_todo'>
        <AddTodo function_data={parentAlert}/>
      {
        todo.sort((a, b) => (a.time < b.time) ? 1 : -1).map((todoItem,i)=> <TodoItems 
        key={i} 
        data={todoItem} 
        function_data={parentAlert} 
        function_complete={""} 
        function_update={todo_update} />)
      }
      <div className={`todoEditContainer ${enableUpdate ? "enableUpdate" : ""}`}>
        <Update dataName={upadteName} closeUpdate={closeUpdateSection} dataId={upadteId} function_data={parentAlert}  />
      </div>
    </div>
    </>
  )
}

export default Module;