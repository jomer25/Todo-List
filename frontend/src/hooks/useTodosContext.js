import { useContext } from 'react'
import { TodosContext } from '../context/TodosContextProvider'

export const useTodosContext = () => {
  const context = useContext(TodosContext)

  if(!context) {
    throw new Error('TodosContext must be used inside in TodosContextProvider')
  }
  
  return context
}
