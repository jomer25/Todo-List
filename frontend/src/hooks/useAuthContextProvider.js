import { useContext } from 'react'
import { AuthContext } from '../context/AuthContextProvider'

export const useAuthContextProvider = () => {
  const context = useContext(AuthContext)

  if(!context){
    throw new Error('AuthContext must be used inside of AuthContextProvider')
  }

  return context
}
