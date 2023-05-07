import React, { useState } from 'react'
import moment from 'moment'
import { useTodosContext } from '../hooks/useTodosContext'
import { useAuthContextProvider } from '../hooks/useAuthContextProvider'

export const TodosDetails = (props) => {
  const { _id, title, content, createdAt } = props.todo
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch }  = useTodosContext()
  const { user } = useAuthContextProvider()

  const handleDelete = async () => {
    setError(null)
    setIsLoading(true)

    if(!user){
      throw new Error('You must be Logged in')
    }

    const confirmation = window.confirm('Are you sure you want to DELETE this todo?')

    if(confirmation) {
      try {
        const response = await fetch(`/api/todos/${_id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
        const json = await response.json()
  
        if(response.ok) {
          dispatch({ type: 'DELETE_TODO', payload: _id })
          setError(null)
          setIsLoading(false)
          console.log('deleted successfully', json)
        } else {
          setError(json.error)
          setIsLoading(true)
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div>
      <p>Title: {title}</p>
      <p>Content: {content}</p>
      <p>Posted: {moment(createdAt).fromNow()}</p>
      {error && <div style={{color: 'red'}}>Error: {error.message}</div>}
      <button onClick={handleDelete} disabled={isLoading}>
        {isLoading ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  )
}
