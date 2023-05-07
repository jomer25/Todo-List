import React, { createContext, useReducer } from 'react'

export const TodosContext = createContext()

const todosReducer = (state, action) => {
  switch(action.type) {
    case 'SET_TODOS':
      return {
        todos: action.payload
      }
    case 'CREATE_TODO':
      return {
        todos: [...state.todos, action.payload]
      }
    case 'DELETE_TODO':
      return {
        todos: state.todos.filter((todo) => todo._id !== action.payload)
      }
    default:
      return state
  }
}

export const TodosContextProvider = (props) => {
  const [state, dispatch] = useReducer(todosReducer, {
    todos: []
  })

  console.log('TodosContext State', state)

  return (
    <TodosContext.Provider value={{...state, dispatch}}>
      {props.children}
    </TodosContext.Provider>
  )
}