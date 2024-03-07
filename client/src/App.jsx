
import Signup from './component/signup.jsx';
import Login from './component/login.jsx';
import Home from './component/home.jsx';
import      {createBrowserRouter, RouterProvider}   from 'react-router-dom'
function App() {
       const routes= createBrowserRouter(
        [
          {
            path:'/',
            element:<Signup/>
          },

          {
            path:'/login',
            element:<Login/>
          },
          {
            path:'/home',
            element:<Home/>
          }
        ]
       )

  return (
    <>
   <RouterProvider router={routes}/>
    </>
  )
}

export default App
