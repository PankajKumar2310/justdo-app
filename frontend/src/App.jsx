import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import ProtectedRoute from './pages/ProtectedRoute'


function App() {

  const appRouter=createBrowserRouter([
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/",
      element:<ProtectedRoute><Home/></ProtectedRoute>
    },
    {
      path:"/signup",
      element:<Register/>
    }
  ])
  

  return (
    <>
    <RouterProvider router={appRouter} />
    </>
  );
}

export default App
