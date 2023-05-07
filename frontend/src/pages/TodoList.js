import React, { useEffect } from 'react'
import { TodosDetails } from '../components/TodosDetails'
import { useTodosContext } from '../hooks/useTodosContext'
import { TodosForm } from '../components/TodosForm'
import { useAuthContextProvider } from '../hooks/useAuthContextProvider'

export const TodoList = () => {
  const {todos, dispatch} = useTodosContext()
  const { user } = useAuthContextProvider()

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('/api/todos', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
        const json = await response.json()

        if(response.ok) {
          dispatch({ type: 'SET_TODOS', payload: json })
        } else {
          console.error(json.error)
        }
      } catch (error) {
        console.error(error.message)
      }
    }

    fetchTodos()
  }, [dispatch, user])

  return (
    <div>
      <div>
        <TodosForm />
      </div>
      <div>
        {todos && todos.map((todo) => (
          <TodosDetails key={todo._id} todo={todo}/>
        ))}
      </div>
    </div>
  )
}
