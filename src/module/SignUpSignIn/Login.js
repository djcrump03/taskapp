import { useNavigate, Link } from "react-router-dom";
import { useState,useEffect } from 'react';
import './index.css';
import {API_URL} from '../API';
import { Header } from "../Header";

export const Login = () => {
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [message,setMessage] = useState([]);
    let navigate = useNavigate();
    
    useEffect(()=>{
        if((localStorage.getItem("username"))){
            navigate("/");
        }
    },[]);
    


    const signIn = (event) =>{ 
        event.preventDefault();
        
        fetch(`${API_URL}/login/${email}/${password}`)
        .then(response => response.json())
        .then(json => { 
            if(json)
            {
                localStorage.setItem("username",json.name);
                localStorage.setItem("email",json.email);
                setMessage("");
                return navigate("/");
            }else{
                setMessage("Uername or Password is not Correct.");
                setPassword("");
                setEmail("");
            }
        });

        
    }
  return (
    <>
    <Header />
    <div className='signupSection login'>
        <div className='innerSignUpSection'>
            <form onSubmit={signIn}>
                <h2>Sign In</h2>
                <div className='input_field'>
                    <input type="email" placeholder='Email Address' value={email} onChange={(e)=> setEmail(e.target.value)} required />
                    <label>{/*email_error*/}</label>
                </div>

                <div className='input_field'>
                    <input type="password" placeholder='Password' value={password} onChange={(e)=> setPassword(e.target.value)} required />
                    <label>{/*firstName_error*/}</label>
                </div>
                <div className='input_field'>
                    <input type="submit" value="Sign In" />
                </div>
                <p className='message'>{message}</p>
                <p className="newAccountNumber" >If you don't have account <Link to="/signup">click here</Link> to create new account</p>
            </form>
        </div>
    </div>
    </>
  )
}
