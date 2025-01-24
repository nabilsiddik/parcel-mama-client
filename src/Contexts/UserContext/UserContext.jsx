import useAxiosSecure from "@/CustomHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import React, { createContext } from "react";
  
  export const userContext = createContext(null);
  
  const UserContextProvider = ({ children }) => {
    const axiosSecure = useAxiosSecure()

  
    const {
      data: allUsers = [],
      isLoading,
      refetch,
    } = useQuery({
      queryKey: ["users"],
      queryFn: async () => {
        const { data } = await axiosSecure.get('/users')
        return data;
      },
    });
  
  
    const userContextValue = {
      allUsers
    };
  
    return (
      <userContext.Provider value={userContextValue}>
        {children}
      </userContext.Provider>
    );
  };
  
  export default UserContextProvider;
  