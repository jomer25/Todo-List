import React, { useState } from 'react'
import { useSignupAuth } from '../hooks/useSignupAuth'

export const Signup = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const { Signup, error, isLoading } = useSignupAuth()

  const handleSignup = async (e) => {
    e.preventDefault()

    await Signup(email, password)
  }
  return (
    <div>
      <form onSubmit={handleSignup}>
        <h2>Signup</h2>
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
        <button type='submit' disabled={isLoading}>{isLoading ? 'Signing up' : 'Signup'}</button>
      </form>
    </div>
  )
}
