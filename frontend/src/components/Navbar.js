import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useLogoutAuth } from '../hooks/useLogoutAuth'
import { useAuthContextProvider } from '../hooks/useAuthContextProvider'

export const Navbar = () => {
  const { user } = useAuthContextProvider()
  const { Logout } = useLogoutAuth()

  const handleLogout = () => {
    Logout()
  }

  return (
    <div>
      <nav>
        <div>
          <h1>
            <Link>
              Todo-List
            </Link>
          </h1>
        </div>
        {user ? (
          <div>
            <span>{user.email}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <Link to='/signup'>Signup</Link>
            <Link to='/login'>Login</Link>
          </div>
        )}
      </nav>
      <Outlet/>
    </div>
  )
}
