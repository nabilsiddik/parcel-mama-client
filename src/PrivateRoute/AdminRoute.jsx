import { authContext } from '@/Contexts/AuthContext/AuthContext'
import useAdmin from '@/CustomHooks/useAdmin'
import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'

const AdminRoute = ({children}) => {
    const {user, loading} = useContext(authContext)
    const [isAdmin, isAdminLoading] = useAdmin()

    if(loading || isAdminLoading){
        return <h1>Loading ...</h1>
    }

    if(user?.email && isAdmin){
        return children
    }

    return <Navigate to={'/authentication/login'}></Navigate>

}

export default AdminRoute
