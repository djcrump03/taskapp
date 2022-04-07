import React from 'react';
import { useState, useEffect, useContext } from 'react';
import {API_URL} from './API';
import {GlobalInfo} from '../App';

export const Update = (props) => {
    let {data, setDataFunction} = useContext(GlobalInfo);
    console.log('cnt Data '+data);
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [reminderDate, setReminderDate] = useState("");
    const [enableReimnder, setEnableReimnder] = useState(false);

    useEffect(() => {
        setName(props.dataName);
        setId(props.dataId);

        if(!props.dataId ==""){
            getDataFromDB();
        } 
    }, [props.dataId]);

    const getDataFromDB = () =>{
        fetch(API_URL+'/todo/search/'+props.dataId).then(response => response.json())
        .then(json => {
            setName(json['name']);
            setEnableReimnder(json['enableReimnder']);
            console.log(json)
        });
    }
        
    const updateData = (event) => {
        
        event.preventDefault();
        setEnableReimnder(!enableReimnder);

        fetch(API_URL+/todo/+id, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name,id:id, complete:false,reminderDate:reminderDate, enableReimnder:enableReimnder})
        }).then((result) => {
            props.function_data();
            props.closeUpdate();
            setId("");
            setName("");
            result.json((resp) => {
                console.log(resp);
                
            });
        });
        setDataFunction();
    }

    const checkinput = () => {
        /*
        setEnableReimnder(!enableReimnder);
        console.log(enableReimnder);
        */
    }
    return (
        <div className='UpdateSection'>
            <form onSubmit={updateData} >
                <h2>Update Todo</h2>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                {/*
                <div className="reminderEnable">
                    <input type="checkbox"  value={enableReimnder} onChange={()=>checkinput()} id="reminder" />
                    <label for="reminder">Reminder</label>
                </div> */}
                <div className="reminderFiled">
                     <input type="datetime-local" value={reminderDate} onChange={(e) => setReminderDate(e.target.value)}/>
                 </div>
                <div className='closeButtons'>
                <input type="submit" />
               <button className='closebtn'>Close</button>
               </div>
            </form>
        </div>
    )
}
