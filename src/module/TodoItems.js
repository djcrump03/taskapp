import { useState, useContext } from "react";
import {API_URL} from './API';
import {GlobalInfo} from '../App';

export const TodoItems = (props) =>{
const [completeStatus,setCompleteStatus] = useState();
let {data, setDataFunction} = useContext(GlobalInfo);

    const deleteTodo = (id) =>{
     fetch(API_URL+/todo/+id,{
        method:"delete"
      }).then((result)=>{
        result.json().then((resp)=>{
          console.warn(resp);
        })
        props.function_data();
      });
      setDataFunction();
    }


    const add_To_Complete = (id,name,complete) =>{
      if(complete){
            setCompleteStatus(false);
        }else{
            setCompleteStatus(true);
        }

        fetch(API_URL+/todo/+id, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name,id:id, complete:complete })
        }).then((result) => {
            props.function_data();
            result.json((resp) => {
                console.log(resp);
            });
        });
        props.function_data();
    }
  
    const {name,_id, complete,enableReimnder,reminderDate} = props.data;
    return(
      <div className={`todoItem ${complete ? "completed" : ""}`}>
        {/*<p onClick={()=>add_To_Complete(_id,name,complete)} className="addToComplete"></p>*/}
        {
          complete ? <p onClick={()=>add_To_Complete(_id,name,false)} className="addToComplete"></p> : <p onClick={()=>add_To_Complete(_id,name,true)} className="addToComplete"></p>
        }
        <p className="title">{name} </p>
        <p className="delete" onClick={()=>deleteTodo(_id)}><i className="fa fa-trash-o"></i></p> 
        <p className="upadate" onClick={()=>props.function_update(_id,name)}><i className="fa fa-pencil-square-o "></i></p>
        <hr />
      </div>
    );
  }