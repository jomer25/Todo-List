import { useState } from 'react'
import { useAuthContextProvider } from './useAuthContextProvider'

export const useLoginAuth = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useAuthContextProvider()

  const Login = async (email, password) => {
    setError(null)
    setIsLoading(true)

    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const json = await response.json()

      if(response.ok) {
        localStorage.setItem('user', JSON.stringify(json))

        dispatch({ type: 'LOGIN', payload: json })
        setError(null)
        setIsLoading(false)
      } else {
        setError(json.error)
        setIsLoading(true)
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return { Login, error, isLoading }
}
