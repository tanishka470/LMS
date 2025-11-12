import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Home() {
  const { currentUser, logout } = useAuth()

  async function handleLogout() {
    try {
      await logout()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="row">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h1 className="card-title">Laundry Management System</h1>
            <p className="card-text">Quickly submit and track laundry orders for students.</p>
            {currentUser ? (
              <div>
                <p>Welcome, <strong>{currentUser.email}</strong></p>
                <p>Role: <strong>{currentUser.profile?.role ?? 'student'}</strong></p>
                <button className="btn btn-danger btn-sm" onClick={handleLogout}>Sign out</button>
                <p className="mt-2">Go to <Link to="/dashboard">Dashboard</Link></p>
              </div>
            ) : (
              <div>
                <p>Please <Link to="/login">log in</Link> or <Link to="/register">register</Link> to continue.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
