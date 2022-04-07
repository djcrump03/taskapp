import {useEffect, useState, useContext} from 'react';
import { API_URL } from '../API';
import {GlobalInfo} from '../../App';

export const ReminderList = (props) => {
    const [todoList,setTodoList] = useState([]);
    const [lastData,setLastData] = useState(0);
    let {data} = useContext(GlobalInfo);

   useEffect(()=>{
    fetch(API_URL+/todo/)
    .then(response => response.json())
    .then(json => {
      setTodoList(json);
      //console.log(getDates());
    });
   },todoList)

   if(lastData < data){
     fetch(API_URL+/todo/)
    .then(response => response.json())
    .then(json => {
      setTodoList(json);
      //console.log(getDates());
    });
    setLastData(data);
    console.log("Update Hit");
   }

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

  props.count_function(todoList.filter((item)=>{  return item.reminderDate > getDates() }).length);

  return (
    <div className='notificationLabel'>
        {
            todoList.filter((item)=>{  return item.reminderDate > getDates() }).map((item)=> <p>{item.name} - {item.reminderDate}</p>)
        }
    </div>
  )
}
