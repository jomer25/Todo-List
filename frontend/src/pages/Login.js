import React, { useState } from 'react'
import { useLoginAuth } from '../hooks/useLoginAuth'

export const Login = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const { Login, error, isLoading } = useLoginAuth()

  const handleLogin = async (e) => {
    e.preventDefault()

    await Login(email, password)
  }
  return (
    <div>
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <div>
          <label>Email: </label>
          <input 
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password: </label>
          <input 
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div style={{color: 'red'}}>{error}</div>}
        <button type='submit' disabled={isLoading}>{isLoading ? 'Logging in' : 'Login'}</button>
      </form>
    </div>
  )
}
