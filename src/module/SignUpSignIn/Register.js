import { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import './index.css';
import {API_URL} from '../API';
import { Header } from "../Header";

export const Register = () => {
    const [firstName,setFirstName] = useState();
    const [lastName,setLastName] = useState();
    const [email,setEmail] = useState();
    const [phone,setPhone] = useState();
    const [password,setPassword] = useState();

    let navigate = useNavigate();


    useEffect(()=>{
        if((localStorage.getItem("username"))){
            navigate("/");
        }
    },[]);

    const signUp = (event) =>{
        event.preventDefault();


        fetch(API_URL+'/users/',{
            method:"POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({name:firstName,lastName:lastName,email:email,phone:phone,password:password})
          }).then((result)=>{
            console.log(result.status);
            ClearForm();
            navigate("/signin");
            result.json((resp)=>{
              console.log(resp);
            });
          });



    }

    const ClearForm = () =>{
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setPassword("");
    }

    return (
    <>
    <Header />    
    <div className='signupSection'>
        <div className='innerSignUpSection'>
            <form onSubmit={signUp}>
                <h2>Sign Up</h2>
                
                <div className='input_field'>
                    <input type="text" placeholder='First Name' value={firstName} onChange={(e)=> setFirstName(e.target.value)} required />
                    <label>{/*firstName_error*/}</label>
                </div>

                <div className='input_field'>
                    <input type="text" placeholder='Last Name' value={lastName} onChange={(e)=> setLastName(e.target.value)} required />
                    <label>{/*firstName_error*/}</label>
                </div>

                <div className='input_field'>
                    <input type="tel" placeholder='Phone' value={phone} onChange={(e)=> setPhone(e.target.value)} required />
                    <label>{/*firstName_error*/}</label>
                </div>

                <div className='input_field'>
                    <input type="email" placeholder='Email Address' value={email} onChange={(e)=> setEmail(e.target.value)} required />
                    <label>{/*email_error*/}</label>
                </div>

                <div className='input_field'>
                    <input type="password" placeholder='Password' value={password} onChange={(e)=> setPassword(e.target.value)} required />
                    <label>{/*firstName_error*/}</label>
                </div>
                <div className='input_field'>
                    <input type="submit" value="Sign Up" />
                </div>
                <p className="newAccountNumber" >If you are registerd user <Link to="/signin">click here</Link> to Login</p>
            </form>
        </div>
    </div>
    </>
  )
}
