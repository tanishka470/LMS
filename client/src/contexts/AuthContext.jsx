import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from '../firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastError, setLastError] = useState(null)

  async function signup(email, password, role = 'student') {
    try {
      console.debug('signup: starting createUserWithEmailAndPassword')
      const cred = await createUserWithEmailAndPassword(auth, email, password)
      console.debug('signup: user created', cred?.user?.uid)
      // create a simple user profile in Firestore
      console.debug('signup: writing user profile to Firestore')
      await setDoc(doc(db, 'users', cred.user.uid), {
        email,
        role,
        createdAt: new Date().toISOString(),
      })
      console.debug('signup: user profile written')
      setLastError(null)
      return cred
    } catch (err) {
      console.error('signup error', err)
      setLastError(err)
      // Improve guidance for configuration errors
      if (err?.code === 'auth/configuration-not-found') {
        throw new Error(
          'Authentication configuration not found. Check Firebase Console: enable Email/Password sign-in and add your app domain (e.g. localhost) to Authorized domains.'
        )
      }
      throw err
    }
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password).catch((err) => {
      console.error('login error', err)
      setLastError(err)
      if (err?.code === 'auth/configuration-not-found') {
        throw new Error(
          'Authentication configuration not found. Please enable Email/Password sign-in in Firebase Console and add your dev domain (e.g. localhost) to Authorized domains.'
        )
      }
      throw err
    })
  }

  function logout() {
    return signOut(auth)
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // load profile from firestore if available
        try {
          const snap = await getDoc(doc(db, 'users', user.uid))
          const profile = snap.exists() ? snap.data() : { role: 'student' }
          setCurrentUser({ uid: user.uid, email: user.email, profile })
        } catch (err) {
          console.error('error loading user profile', err)
          setLastError(err)
          setCurrentUser({ uid: user.uid, email: user.email })
        }
      } else {
        setCurrentUser(null)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    lastError,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export default AuthContext
