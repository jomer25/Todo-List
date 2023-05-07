import { useAuthContextProvider } from './useAuthContextProvider'
import { useTodosContext } from './useTodosContext'

export const useLogoutAuth = () => {
  const { dispatch } = useAuthContextProvider()
  const { dispatch: TodosDispatch } = useTodosContext()

  const Logout = () => {
    localStorage.removeItem('user')
  
    dispatch({ type: 'LOGOUT '})
    TodosDispatch({ type: 'SET_TODOS', payload: null })
  }

  return { Logout }
}
