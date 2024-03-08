import React, { useState } from 'react'

import {useForm} from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Login() {
  const {
    register,
     formState:{errors},
    handleSubmit,
    reset
  }= useForm()
  axios.defaults.withCredentials= true;
  const [isexist, setisexist]= useState()
  const navigate= useNavigate()
// const submiit= async(data)=>
// {
//   console.log('this is the the onsubmit:', data)
  
//      const x= await axios.post('http://localhost:3000/login', data).catch((e)=>{console.log('this is the erro',e)})
//   console.log('our post  request is send on the backend server  http://localhost:3000/login', x )
//   if(x.data.exist)
//   {
//     navigate('/home')
//   }
//   else { console.log('this we get from the database', x.data.exist);
//     setisexist(true)
// }
// reset()
// }

const submiit = async (data) => {
  console.log('this is the onsubmit:', data);

  try {
    const x = await axios.post('http://localhost:3000/login', data);
    console.log('our post request is sent to the backend server http://localhost:3000/login', x);
    if (x.data.exist) {
      navigate('/home');
    } else {
      console.log('this we get from the database', x.data.exist);
      setisexist(true);
    }
    reset();
  } catch (e) {
    console.log('this is the error:', e);

  }
};

  return (
    <div className='  flex  w-full h-screen border-2 gap-10   border-solid border-white  items-center justify-center'>

      <form className='mt-12 border-red-50 border-2' onSubmit={handleSubmit(submiit)}>
        {isexist && <p className='text-red-600'> Your password and the username didnot match</p> }
        <p className='  text-xl m-4'>Login</p>
      <label htmlFor="" className='mt-12 '   > Username</label>
        <input type="text" {...register("username", {required:{value:true, message:"please enter the username"}})} />
        {errors.username && <div className='text-red-600'>{errors.username.message}</div>}
<br />
      <label htmlFor=""> Password</label>
        <input type="text" className='mt-4' {...register("password", {required:{value:true, message:"please enter the username"}})}/>
        {errors.password && <div className='text-red-600'>{errors.password.message}</div>}
 
      <br />
        <button className='mt-4'>Login</button>
      </form>
    </div>
  )
}
