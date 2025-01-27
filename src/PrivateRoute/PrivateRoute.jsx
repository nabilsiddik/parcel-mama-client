import React, { useContext } from 'react'
import { authContext } from '../Contexts/AuthContext/AuthContext'
import { Navigate } from 'react-router-dom'
import LoadingPage from '@/Pages/LoadingPage/LoadingPage'

const PrivateRoute = ({children}) => {

    const {user, loading} = useContext(authContext)

    if(loading){
        return <LoadingPage/>
    }

    if(user?.email){
        return children
    }

    return <Navigate to={'/authentication/login'}></Navigate>
}

export default PrivateRoute
