import React, { useEffect } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom';

export default function Home() 
{
  const navigate = useaNavigate()
   axios.defaults.withCredentials= true;
  useEffect(
     ()=>
     {
      axios.get('http://localhost:3000/home').then(response =>
       {
        console.log('this is the res',response)
        if(response.data !=="sucess")
        {
            navigate('/login')
        }
        })
      .catch(error => {
        console.error('Error fetching data:', error)
     })
    }
  )

  return (
    <div>
    this is the Home div
    </div>
  )
}
