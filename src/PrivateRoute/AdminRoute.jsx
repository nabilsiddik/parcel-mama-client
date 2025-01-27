import { authContext } from '@/Contexts/AuthContext/AuthContext'
import useAdmin from '@/CustomHooks/useAdmin'
import LoadingPage from '@/Pages/LoadingPage/LoadingPage'
import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'

const AdminRoute = ({children}) => {
    const {user, loading} = useContext(authContext)
    const [isAdmin, isAdminLoading] = useAdmin()

    console.log('test', isAdmin)

    if(loading || isAdminLoading){
        return <LoadingPage/>
    }

    if(user?.email){
        return children
    }

    return <Navigate to={'/authentication/login'}></Navigate>

}

export default AdminRoute
