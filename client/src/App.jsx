import { useState } from 'react'
import {useForm } from "react-hook-form"
import axios from 'axios';
import login from './login';

function App() {


  const {
    register,
    formState: { errors, isSubmitting  },
    handleSubmit,
    reset
  } = useForm()

  const submit = async (data) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log('hnji yeh hu m');
        resolve();
      }, 4000);
    });
    
    console.log(data);
    console.log(isSubmitting);
    reset()
  };
  


  return (
    <>
    <div className='flex  w-full justify-center align-middle content-centre items-center border-2 border-white h-screen  '>
    {  isSubmitting && <div>Submitting... </div>}
    <form onSubmit={handleSubmit(submit)} >
     <label >Username</label>
      <input type="text" className='block'   {...register("username", {required:{value: true , message:" username is required"}, minLength:{value:6, message:"username should be atleast 7 alphabet"}, pattern:{value:/^[a-z0-9_]+$/, message:"must contain lowercase alphabet and '_' allowed"}})}/>
      {errors.username && <div className=' text-red-600'> {errors.username.message}</div>}
      Password
      <input type="text" className='block'   {...register("password", {required:{value: true , message:"password is required"}, minLength:{value:6, message:"should be atleast 8 alphabet"}, pattern:{value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\d!@#$%^&*()-_+=]{8,}$/ 
, message:"must contain uppercase ,lowercase ,number and special key"}})}/>
      {errors.password && <div className=' text-red-600'> {errors.password.message}</div>}
      <button disabled={isSubmitting} type='submit'>Sign In</button>
    </form>
    </div>

    </>
  )
}

export default App
