import React, { useContext, useState } from 'react'
import { Link,Navigate } from 'react-router-dom'
import axios from 'axios'
import { Context, server } from '../main';
import toast from"react-hot-toast"
import Home from './Home';


const Register = () => {

const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const {isAuthenticated,setisAuthenticated}=useContext(Context);


const submitHandler=async (e)=>{
    
    e.preventDefault();
    console.log(name,password,email);
    try{
    const {data}=await axios.post(
        `${server}/new`,
        {
        name,email,password
    },{
     headers:{ "Content-Type":"application/json"},
     withCredentials:true,  
    }
)
toast.success("register ayipoyindi");
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
        value={name}
        onChange={(e)=>setName(e.target.value)}
        type='text' 
        placeholder='enter your name'
        required></input>




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



         <button type='submit'>Signup</button>
         
         <h4>Or</h4>
         <Link to="/Login">login</Link>
        </form>
     </section>
    </div>
  )
}

export default Register