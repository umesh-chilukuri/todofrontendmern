import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Context,server } from '../main';
import toast from 'react-hot-toast';
import axios from 'axios'

const Login = () => {
    const {isAuthenticated,setisAuthenticated,loading,setloading}=useContext(Context);
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    

    const submitHandler=async (e)=>{
    
        e.preventDefault();
        console.log(password,email);
        try{
        const {data}=await axios.post(
            `${server}/users/login`,
            {
            email,password
        },{
         headers:{ "Content-Type":"application/json"},
         withCredentials:true,  
        }
    )
    toast.success("login ayipoyindi");
    setisAuthenticated(true);
    console.log(data)

    }
    
       catch (err) {
        console.error(err); // Logs the full Axios error object
        toast.error(err.response?.data?.message || "Something went wrong");
        setisAuthenticated(false);
    }
   
    }


    if(isAuthenticated) return <Navigate to={"/"}/>

 
    



  return (
  <div className='login'>
  <section>



     <form onSubmit={submitHandler}>
     
     
     




<input 
value={email}
onChange={(e)=>setEmail(e.target.value)}
type='email'
placeholder='enter your email'
required></input>


<input 
value={password}
onChange={(e)=>setPassword(e.target.value)}
type='password' 
placeholder='enter your password'
required></input>



      <button type='submit'>login</button>
      
      <h4>Or</h4>
      <Link to="/register">Signin</Link>
     </form>
  </section>
 </div>
)
}

  


export default Login