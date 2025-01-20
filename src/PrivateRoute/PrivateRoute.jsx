import React, { useContext } from 'react'
import { authContext } from '../Contexts/AuthContext/AuthContext'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {

    const {user, isLoading} = useContext(authContext)

    if(isLoading){
        return <h1>Loading ...</h1>
    }

    if(user?.email){
        return children
    }

    return <Navigate to={'/authentication/login'}></Navigate>
}

export default PrivateRoute
