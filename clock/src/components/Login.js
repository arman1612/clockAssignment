import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import "./login.css";
import {useNavigate} from 'react-router-dom';

const Login = () => {
 
  const navigate = useNavigate();
  const [type,settype]=useState("password");
  const [icon,seticon]=useState("bi bi-eye-slash-fill");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  function handletoggle(){
    if(type==='password'){
      settype('text');
      seticon('bi bi-eye-fill')
    } 
    else{
      seticon('bi bi-eye-slash-fill')
      settype('password')
    }
  }
  
  function handleGoogleLogin(){
    window.location.href='https://clockassignment-2.onrender.com/auth/google';
  }

  async function handleSubmit(e){
     e.preventDefault();
     try {
       const login= await axios.post("https://clockassignment-2.onrender.com/login",{email,password});
       
       if(login.data.success){
        toast.success("Login Successfull !", {
          position: "top-center",autoClose: 2000
        });

        setTimeout(() => {
          navigate('/home');
        }, 2000);
        
       }
       
     } catch (error) {

        if (error.response) {
            toast.error(`${error.response.data.message}`, { position: "top-center",autoClose: 2000 });
        } else if (error.request) {
            toast.error("No response received from the server", { position: "top-center",autoClose: 2000 });
        } else {
            toast.error("An error occurred. Please try again.", { position: "top-center",autoClose: 2000 });
        }
     }

  }

  return (
    <div className='container'>

        <div className='login'>
            <h2> Login to your account</h2>
            <h5>Please sign in to your account</h5>
        </div>

        <div className='input-fields'>
          <form>
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" onChange={(e)=>setEmail(e.target.value)} class="form-control" required="true" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type={type} onChange={(e)=>setPassword(e.target.value)} class="form-control" required="true" id="exampleInputPassword1" placeholder="Password" />
                <span className='eyeicon' onClick={handletoggle}><i class={icon}></i></span>
            </div>
            
   
            <button type="submit" onClick={handleSubmit} class="submit btn btn-primary">  Sign In </button>

          </form>
        </div>


        <div className='googlelogin'>
             
            <div className="separator">
                <hr className="line" />
                <span>Or sign in with</span>
                <hr className="line" />
            </div>
            
            <div className='logo'> 
                <img src='./images/googlelogo.jpg' onClick={handleGoogleLogin} alt='Google logo'></img>
            </div>
            
            <div className='register'>
              <span>Don't have an account</span> <a href='register'> <span id='register'> ?Register </span></a> 
            </div>


        </div>
        <ToastContainer />
    </div>
  )
}

export default Login
