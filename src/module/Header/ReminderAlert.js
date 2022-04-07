import {useEffect, useState} from 'react';
import { API_URL } from '../API';


export const ReminderAlert = () => {
    const [todoList,setTodoList] = useState([]);
    const [name,setName] = useState("");
    const [isAlert,setIsAlert] = useState(false);
    setInterval(()=>{
        fetch(API_URL+/todo/)
        .then(response => response.json())
        .then(json => {
          setTodoList(json);
        });
    },1000);

       const getDates = () =>{
        var today = new Date();
        let t_month = today.getMonth()+1;
        let t_date = today.getDate();
        let t_hours = today.getHours();
        let t_minutes = today.getMinutes();
    
        if(t_month < 10){
          t_month = "0"+t_month;
        }
        if(t_date < 10){
          t_date = "0"+t_date;
        }
    
        if(t_hours < 10){
          t_hours = "0"+t_hours;
        }
    
        if(t_minutes < 10){
          t_minutes = "0"+t_minutes;
        }
    
        var date = today.getFullYear()+'-'+t_month+'-'+t_date+'T'+t_hours+':'+t_minutes;
        return date;
      }

      const checkLaert = () =>{
        setInterval(()=>{
            todoList.filter((item)=>{  
                if(item.reminderDate == getDates()){
                    setName(item.name);
                    setIsAlert(true);
                } 
            })
        },1000)
      }


  return (
    <div>
        <div className={`setAlert ${isAlert ? "active" : ""}`}>
            Set ALert
        </div>
    </div>
  )
}
