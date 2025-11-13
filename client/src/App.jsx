import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import NavBar from './components/NavBar'
import './App.css'

function PrivateRoute({ children, roles }) {
  const { currentUser } = useAuth()
  if (!currentUser) return <Navigate to="/login" replace />
  // If roles are provided, ensure the current user's role is allowed
  if (roles && roles.length > 0) {
    const userRole = currentUser?.profile?.role || 'student'
    if (!roles.includes(userRole)) return <Navigate to="/" replace />
  }
  return children
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Caretaker/admin dashboard - caretakers only */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute roles={["caretaker"]}>
                  <div style={{ padding: 20 }}>
                    <h2>Caretaker Dashboard</h2>
                    <p className="text-muted">Manage incoming laundry orders and update statuses.</p>
                  </div>
                </PrivateRoute>
              }
            />

            {/* Student dashboard - students only */}
            <Route
              path="/student"
              element={
                <PrivateRoute roles={["student"]}>
                  <div style={{ padding: 20 }}>
                    <h2>Student Dashboard</h2>
                    <p className="text-muted">Submit new orders and track existing ones.</p>
                  </div>
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
