import React, { useContext } from 'react'
import { Context,server } from '../main';
import Loader from '../components/Loader';



const Profile = () => {
  const {isAuthenticated,loading,user}=useContext(Context);
  console.log(user)
  return  loading ?(
    <Loader/>) :(
    <div>
    <h1>{user?.name}</h1>
    <h4>{user?.email}</h4>


    </div>
  )
}

export default Profile