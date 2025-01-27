import { authContext } from '@/Contexts/AuthContext/AuthContext'
import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import useAxiosSecure from './useAxiosSecure'

const useAdmin = () => {
  const {user} = useContext(authContext)
  const axiosSecure = useAxiosSecure()

  const {data: isAdmin, isPending: isAdminLoading} = useQuery({
    queryKey: [user?.email, 'isAdmin'],
    queryFn: async () => {
        const res = await axiosSecure.get(`/users/admin/${user?.email}`)
        return res?.data?.admin
    },

  }) 

  return [isAdmin, isAdminLoading]
}

export default useAdmin
