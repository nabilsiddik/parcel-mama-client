import { authContext } from '@/Contexts/AuthContext/AuthContext'
import axios from 'axios'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'


const axiosSecure = axios.create({
    baseURL: `${import.meta.env.VITE_MAIN_URL}`
})


const useAxiosSecure = () => {

 // request interceptor to add authorization header for every secure call to the api
  axiosSecure.interceptors.request.use(function(config){
    const token = localStorage.getItem('access-token')
    config.headers.authorization = `Bearer ${token}`
    return config
  }, function(error){
    return Promise.reject(error)
  })


  // interceptor 401 and 403 status
  axiosSecure.interceptors.response.use(function(response){
    return response
  }, async(error) => {
    const status = error.response.status
    console.log('status error in the interceptor', error)

    if(status === 401 || status === 403){
        
    }
    return Promise.reject(error)
  })

  return axiosSecure
}

export default useAxiosSecure
