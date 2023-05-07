import React, { useState } from 'react'
import { useTodosContext } from '../hooks/useTodosContext'
import { useAuthContextProvider } from '../hooks/useAuthContextProvider'

export const TodosForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useTodosContext()
  const { user } = useAuthContextProvider()

  const handleAddTodo = async (e) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    if(!user){
      throw new Error('You must be Logged in')
    }

    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if(response.ok) {
        dispatch({ type: 'CREATE_TODO', payload: json })
        setError(null)
        setIsLoading(false)
        setTitle('')
        setContent('')
        console.log('added successfully', json)
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

  return (
    <div>
      <form onSubmit={handleAddTodo}>
        <h1>Add Todo</h1>
        <div>
          <label>Title: </label>
          <input 
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content: </label>
          <textarea 
            type='text'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        {error && <div style={{color: 'red'}}>Error: {error}</div>}
        <button type='submit' disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}
