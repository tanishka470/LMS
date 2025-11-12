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

  async function signup(email, password, role = 'student') {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password)
      // create a simple user profile in Firestore
      await setDoc(doc(db, 'users', cred.user.uid), {
        email,
        role,
        createdAt: new Date().toISOString(),
      })
      return cred
    } catch (err) {
      console.error('signup error', err)
      throw err
    }
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password).catch((err) => {
      console.error('login error', err)
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
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export default AuthContext
