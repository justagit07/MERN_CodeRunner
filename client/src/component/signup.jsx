import React, { useState } from 'react'
import {useForm } from "react-hook-form"
import axios from 'axios'
import {useNavigate} from "react-router-dom"

export default function Signup() {
 const navigate= useNavigate()
    const {
        register,
        formState: { errors, isSubmitting  },
        handleSubmit,
        reset
      } = useForm()
      const [isexist, setisexist]= useState()
    
      const submit = async (data) => {
        console.log('this is the data', data)
     const x=   await axios.post('http://localhost:3000/user', data).catch(err=> console.log('this is the error',err))
        if(x.data.isalreadyexist)
        {
         setisexist(true)   
        }
        else{
            console.log(' A new user is created ')
            navigate('/login')
            setisexist(false)
        }
        reset()

      };

  return (
    <div className='flex  w-full justify-center align-middle content-centre items-center border-2 border-white h-screen  '>
    {  isSubmitting && <div>Submitting... </div>}
    <form onSubmit={handleSubmit(submit)} >
     <label >Username</label>
      <input type="text" className='block'   {...register("username", {required:{value: true , message:" username is required"}, minLength:{value:6, message:"username should be atleast 7 alphabet"}, pattern:{value:/^[a-z0-9_]+$/, message:"must contain lowercase alphabet and '_' allowed"}})}/>
      {errors.username && <div className=' text-red-600'> {errors.username.message}</div>}
      {isexist && <div className='text-red-600'>This username is already exists</div>}
      Password
      <input type="text" className='block'   {...register("password", {required:{value: true , message:"password is required"}, minLength:{value:6, message:"should be atleast 8 alphabet"}, pattern:{value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\d!@#$%^&*()-_+=]{8,}$/ 
, message:"must contain uppercase ,lowercase ,number and special key"}})}/>
      {errors.password && <div className=' text-red-600'> {errors.password.message}</div>}
      <button disabled={isSubmitting} type='submit'>Sign In</button>
    </form>
    </div>
  )
}
