import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function NavBar() {
  const { currentUser, logout } = useAuth()

  async function handleLogout() {
    try {
      await logout()
    } catch (err) {
      console.error('Logout failed', err)
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">LMS</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav" aria-controls="nav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            {currentUser ? (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to={currentUser?.profile?.role === 'caretaker' ? '/dashboard' : '/student'}
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-sm btn-light ms-2" onClick={handleLogout}>Sign out</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}
