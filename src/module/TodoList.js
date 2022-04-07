import React from 'react';
import { useState,useEffect } from 'react';
import {TodoItems} from './TodoItems';
import {AddTodo} from './AddTodo';
import { Update } from './Update';
import {API_URL} from './API';
import { useNavigate } from "react-router-dom";

const TodoList = () => {
    const [todo,setTodo] = useState([]);
    const [enableUpdate,setEnabaleUpdate] = useState(false);
    const [upadteId,setUpdateId] = useState();
    const [upadteName,setUpdateName] = useState();
    //const [upadteReminderEnable,setUpdateReminderEnable] = useState(false);
    //const [upadteReminderDate,setUpdateReminderDate] = useState();
    
    const navigate = useNavigate();
    
    useEffect(()=>{
      if((localStorage.getItem("username"))){

      }else{
        navigate("/signin");
      }

      fetch(API_URL+/todo/)
        .then(response => response.json())
        .then(json => {
          setTodo(json);
          console.log(json);
        });
      },[]); 

      const parentAlert = () =>{
        fetch(API_URL+/todo/)
        .then(response => response.json())
        .then(json => {
          setTodo(json);
        });
      }


      const todo_update = (_id,name) => {
        setEnabaleUpdate(true);
        setUpdateName(name);
        setUpdateId(_id);
        //setUpdateReminderEnable(enableReimnder);
        //setUpdateReminderDate(reminderDate);
        
      }

      const closeUpdateSection = () =>{
        setEnabaleUpdate(false);
      }
  return (
    <div className='inner_todo'>
        <AddTodo function_data={parentAlert}/>
      {
        todo.map((todoItem,i)=> <TodoItems 
        key={i} 
        data={todoItem} 
        function_data={parentAlert} 
        function_complete={""} 
        function_update={todo_update} />)
      }
      <div className={`todoEditContainer ${enableUpdate ? "enableUpdate" : ""}`}>
        <Update dataName={upadteName}  closeUpdate={closeUpdateSection} dataId={upadteId} function_data={parentAlert}  />
      </div> 
    </div>
  )
}

export default TodoList;