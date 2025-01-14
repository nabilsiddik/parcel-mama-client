import React, { useContext } from 'react'
import { authContext } from '../Contexts/AuthContext/AuthContext'
import LoadingPage from '../Pages/LoadingPage/LoadingPage'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {

  const {loading, user} = useContext(authContext)

  if(loading){
    return <LoadingPage/>
  }else if(user?.email){
    return children
  }

  return <Navigate to='/login' replace/>
}

export default PrivateRoute
