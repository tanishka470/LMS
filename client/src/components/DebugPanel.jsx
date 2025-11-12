import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { firebaseConfig, firebaseInitialized } from '../firebase'

export default function DebugPanel() {
  if (!import.meta.env.DEV) return null

  const { currentUser, lastError } = useAuth()

  const maskedKey = (k) => (k ? k.slice(0, 6) + '...' + k.slice(-4) : '')

  return (
    <div className="container mt-3">
      <div className="card bg-light text-dark">
        <div className="card-body small">
          <strong>Debug Panel (dev only)</strong>
          <div>Firebase initialized: {String(firebaseInitialized)}</div>
          <div>Project: {firebaseConfig?.projectId}</div>
          <div>Auth domain: {firebaseConfig?.authDomain}</div>
          <div>API key: {maskedKey(firebaseConfig?.apiKey)}</div>
          <div>Current user: {currentUser ? currentUser.email : 'none'}</div>
          <div>Last auth error: {lastError ? lastError.message || String(lastError) : 'none'}</div>
        </div>
      </div>
    </div>
  )
}
