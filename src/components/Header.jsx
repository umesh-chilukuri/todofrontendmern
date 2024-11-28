import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context,server } from '../main'
import axios from "axios"
import {toast} from "react-hot-toast"


const Header = () => {


const {isAuthenticated,setisAuthenticated,loading,setloading}=useContext(Context);


const logoutHandler=async (e)=>{
    setloading(true);
   
    try{
    const {data}=await axios.get(
        `${server}/users/logout`,
       {
     withCredentials:true,  
    }
)
toast.success("logout ayipoyindi");
setisAuthenticated(false);
setloading(false);
console.log(data)
}

   catch (err) {
    console.error(err); // Logs the full Axios error object
    toast.error(err.response?.data?.message || "Something went wrong");
    setisAuthenticated(false);
    setloading(false);
}

}




  return (
  <nav className='header'>
     <div>
      <h2>todo app</h2>

     </div>
     <article>
          <Link  to={"/"}>Home</Link>
          <Link  to={"/profile"}>Profile</Link>
          {
            isAuthenticated?(<button disabled={loading} onClick={logoutHandler} className='btn'>logout</button>):(<Link  to={"/login"}>login</Link>)
          }
          
          
     </article>
  </nav>
  )
}

export default Header