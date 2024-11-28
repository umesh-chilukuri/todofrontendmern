import React, { useEffect, useState,useContext } from 'react'
import axios from "axios"
import { Context,server, server2 } from '../main';
import TodoIttem from '../components/TodoIttem';
import {toast} from 'react-hot-toast';
import { Navigate } from 'react-router-dom';



const Home = () => {

const[title,settitle]=useState("");
const[description,setdescription]=useState("")
const[loading,setloading]=useState(false);
const [task,settask]=useState([]);
const [refresh,setrefresh]=useState(false)


const {isAuthenticated}=useContext(Context);

const updatehandler=async(id)=>{

  try{
 const {data}=  await axios.put(`${server2}/${id}`,
    {},
    {
      withCredentials:true,
    }
   );

    toast.success(data.message)
    setrefresh((pre)=>!pre)

  }catch(error){
toast.error(error.response.data.message)
  }
}


const deletehandler=async (id)=>{
  try{
    const {data}=  await axios.delete(`${server2}/${id}`,
      
       {
         withCredentials:true,
       }
      )
   
       toast.success(data.message)
       setrefresh((pre)=>!pre)
   
     }catch(error){
   toast.error(error.response.data.message)
     }
}



const submithandler=async (e)=>{
  try{
    e.preventDefault();
    setloading(true)

    const { data } = await axios.post(
      `${server2}/new`,
      {
        title,
        description,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    settitle("");
      setdescription("")
    toast.success(data.message)
    setloading(false);
    setrefresh((pre)=>!pre)
  }catch(error){
    toast.error("task not added")
    setloading(false);
  }
}


  useEffect(()=>{
   axios.get(`${server2}/my`,{
    withCredentials:true,
   
  }).then((res)=>{
    settask(res.data.tasks)
  }).catch((e)=>{
    toast.error(e.response.data.message)
  })
  },[refresh])


  if(!isAuthenticated) return <Navigate to={"/login"}/>

  return(
    
    
<div className='container'>
<div className='login'>
  <section>
     <form  onSubmit={submithandler} >
     

<input 
value={title}
onChange={(e)=>settitle(e.target.value)}
type='text'
placeholder='Title'
required/>



<input 
value={description}
onChange={(e)=>setdescription(e.target.value)}
type='text'
placeholder='description'
required/> 



<button  disabled={loading} type='submit'>Add task</button> 
 </form>
 </section>
 </div>




 <section className='todosContainer'>
{
  task.map((i)=>(
      <TodoIttem  
      title={i.title}  
      description={i.description}
      isCompleted={i.isCompleted}
      updatehandler={updatehandler}
      deletehandler={deletehandler}
      id={i._id}
      key={i._id}
      />
  ))
}


    </section>
  </div>
)
}


export default Home