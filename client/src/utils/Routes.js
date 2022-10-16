import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'

import { AuthContext } from '../context/auth'

export function AuthRoute() {
  const { user } = useContext(AuthContext)

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export function NoAuthRoute() {
  const { user } = useContext(AuthContext)

  if (user) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
