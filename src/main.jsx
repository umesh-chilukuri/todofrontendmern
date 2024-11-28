import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import  './styles/app.scss'
import { createContext  } from 'react'

export const server="https://backendtodo-8pjm.onrender.com/api/v1";
export const server2="https://backendtodo-8pjm.onrender.com/api/v1/tasks";

export const Context=createContext({isAuthenticated:false})


const AppWrapper=()=>{
  const [isAuthenticated,setisAuthenticated]=useState(false);
  const [loading,setloading]=useState(false);
  const [user,setuser]=useState({});

  return(
    <Context.Provider
    value={{
      isAuthenticated,
      setisAuthenticated,
      loading,
      setloading,
      user,
      setuser}}
    >
    <App />
      </Context.Provider>  
   
  )
}


createRoot(document.getElementById('root')).render(
  

   <AppWrapper/>


  
)
