import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const { signup } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    if (!email || !password) {
      setError('Email and password are required')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)
    try {
      await signup(email, password)
      navigate('/')
    } catch (err) {
      const msg = err?.code ? `${err.code}: ${err.message}` : err.message
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '70vh' }}>
      <div className="card shadow-sm" style={{ maxWidth: 520, width: '100%' }}>
        <div className="card-body p-4">
          <h3 className="card-title mb-2">Create account</h3>
          <p className="text-muted small">Register with your college email to start using the LMS.</p>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-floating mb-3">
              <input
                id="regEmail"
                type="email"
                className="form-control"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="regEmail">Email address</label>
            </div>

            <div className="mb-3 position-relative">
              <div className="form-floating">
                <input
                  id="regPassword"
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label htmlFor="regPassword">Password</label>
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

            <div className="form-floating mb-3">
              <input
                id="regConfirm"
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                placeholder="Confirm Password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
              <label htmlFor="regConfirm">Confirm password</label>
            </div>

            <div className="d-grid mb-2">
              <button className="btn btn-success" type="submit" disabled={loading}>
                {loading ? <span className="spinner-border spinner-border-sm" /> : 'Create account'}
              </button>
            </div>
          </form>

          <div className="small text-center">
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
