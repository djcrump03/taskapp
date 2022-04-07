import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import './index.css';
import { useNavigate } from "react-router-dom";
import { API_URL } from '../API';
import {ReminderList} from './ReminderList';
import {ReminderAlert} from './ReminderAlert';


export const Header = () => {
  const [loginStatus,setLoginStatus] = useState(false);
  const [username,setUsername] = useState("");
  const [notification,setNotification] = useState(false);
  const [notificationCount,setNotificationCount] = useState("");

  const navigate = useNavigate();
  
  useEffect(()=>{
    checkLoginStatus();
  },[]);

  const checkLoginStatus = () =>{
    if(localStorage.getItem('username')){
      setUsername(localStorage.getItem('username'));
      setLoginStatus(true);
    }else{
      setLoginStatus(false);
    }
  }

  const logout = () =>{
    localStorage.clear("username");
    localStorage.clear("email");
    setLoginStatus(false);
    navigate("/signin");
  }

  const setCountUpcommingTodo = (count) =>{
    setNotificationCount(count);
  }

  return (
    <header>
      <div className='container'>
          <div className='todoLeftHeader'><Link to='/'>TODO APP</Link></div>
          <div className='todoRightHeader'>
            <div className='innerRightHeader'>
              
              <p><Link to="/">Home</Link></p>
              <p className='profile notification'><i className='fa fa-bell'></i><span>{notificationCount}</span> <ReminderList count_function={setCountUpcommingTodo} /></p>
              {
                loginStatus ? 
                <>
                  <p className='profile'><i className='fa fa-user'></i> {username}</p>
                  <p className='logout' onClick={()=>logout()}><i className='fa fa-sign-out'></i> Logout</p>
                </> 
                : <p className='loginRegister' onClick={()=>{checkLoginStatus();}}><i className='fa fa-lock'></i> <Link to="/signin">Login/Register</Link></p>
              }
            
            </div>
          </div>
          {/*<ReminderAlert /> */}
      </div> 
    </header>
  )
}
