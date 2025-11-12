import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    if (!email || !password) {
      setError('Please enter both email and password.')
      return
    }
    setLoading(true)
    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      // provide a user-friendly message when possible
      const msg = err?.code ? `${err.code}: ${err.message}` : err.message
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '70vh' }}>
      <div className="card shadow-sm" style={{ maxWidth: 440, width: '100%' }}>
        <div className="card-body p-4">
          <h3 className="card-title mb-3">Sign in</h3>
          <p className="text-muted small">Use your college account to sign in and track laundry.</p>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-floating mb-3">
              <input
                id="loginEmail"
                className="form-control"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="loginEmail">Email address</label>
            </div>

            <div className="mb-3 position-relative">
              <div className="form-floating">
                <input
                  id="loginPassword"
                  className="form-control"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label htmlFor="loginPassword">Password</label>
              </div>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary position-absolute"
                style={{ right: 10, top: 8 }}
                onClick={() => setShowPassword((s) => !s)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <div className="d-grid">
              <button className="btn btn-primary" type="submit" disabled={loading}>
                {loading ? (
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </form>

          <hr />
          <div className="d-flex justify-content-between small">
            <div>
              <Link to="/register">Create account</Link>
            </div>
            <div>
              <Link to="#">Forgot password?</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
