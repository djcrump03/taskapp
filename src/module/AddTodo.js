import {useState,useEffect} from 'react';
import {API_URL} from './API';

export const AddTodo = (props) =>{
    const [data,setData] = useState("");
    const [userId,setUserId] = useState("");
    const [todoTime,setTodoTime] = useState("");
    const [deviceAddress,setDeviceAddress] = useState("");

    useEffect(()=>{
      if((localStorage.getItem("username"))){
        let userEmail = localStorage.getItem("email");

        fetch(API_URL+'/users/search/'+userEmail)
        .then(response => response.json())
        .then(json => {
          setUserId(json[0]['_id']);
          setDeviceAddress(Math.random().toString(16).slice(2));
        });
        
      }else{
        setUserId();
        setDeviceAddress(Math.random().toString(16).slice(2));
      }

      },[]); 


    const submitdata = (event) =>{
      event.preventDefault();
      fetch(API_URL+'/todo/',{
        method:"POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({name:data,deviceAddress:deviceAddress,complete:false,userId:userId,time:Date.now()})
      }).then((result)=>{
        props.function_data();
        result.json((resp)=>{
          console.log(resp);
        });
      });
      setData("");
    }
  
    return(
      <div className='addTOTaskForm'>
        <h2>Task</h2>
      <form onSubmit={submitdata}>
        <span>+</span><input type="text" placeholder="Add New Task" value={data} onChange={(e)=> setData(e.target.value)} />
  
        <input type="submit" /> 
      </form>
      </div>
    )
  }
  