import React, { useState } from 'react';
import axios from 'axios'
import "./register.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom';

const Register = () => {

  const navigate = useNavigate();
  const [type,settype]=useState("password");
  const [icon,seticon]=useState("bi bi-eye-slash-fill");

  const [email,setEmail]=useState("");
  const [userName,setUserName]=useState("");
  const [password,setPassword]=useState("");

  async function handleSubmit(event){
  
      event.preventDefault();
      try {
        const register=await axios.post("http://localhost:8080/register",{email,password,userName});

        if(register.data.success){
          toast.success("Registration Successfull !", {
            position: "top-center",autoClose: 2000
          });


        setTimeout(() => {
          navigate('/home');
        }, 2000);
        
        }
        else{
          alert('Server Error');
        }

      } catch (error) {
        toast.warning("User already exists !", {
          position: "top-center",autoClose: 2000
        });
      }
  }
   
  function handleGoogleLogin(){
    window.location.href='http://localhost:8080/auth/google';
  }

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

  return (
    <div className='container'>

        <div className='login'>
            <h2> Create your new account</h2>
            <h5>Create an account </h5>
        </div>

        <div className='input-fields'>
          <form>
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input onChange={(e)=> setEmail(e.target.value)} type="email" class="form-control" required="true" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div class="form-group">
                <label for="userName">User Name</label>
                <input onChange={(e)=> setUserName(e.target.value)} type="text" class="form-control" required="true" id="userName" aria-describedby="emailHelp" placeholder="Enter User Name" />
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input onChange={(e)=> setPassword(e.target.value)} type={type} class="form-control" required="true" id="exampleInputPassword1" placeholder="Password" />
                <span className='eyeicon' onClick={handletoggle}><i class={icon}></i></span>
            </div>

            <div className='checkBox'>
              <span> <input type='checkbox' required="true" /> <span id='text'>I Agree with <span className='coloredText'>Terms of Service</span> and  <span className='coloredText'>Privacy Policy</span>  </span>  </span>
            </div>
            
            <button type="submit" onClick={handleSubmit} class="submit btn btn-primary">  <a>Register</a> </button>

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
              <span>Have an account</span> <a href='/login'> <span id='register'> ?Sign in </span> </a>
            </div>


        </div>
        <ToastContainer />
    </div>
  )
}

export default Register