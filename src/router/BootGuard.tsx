import React, { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { tokenManager } from '@core/auth/tokenManager'
import { tenantStorage } from '@core/storage/tenantStorage'
import { storeStorage } from '@core/storage/storeStorage'
import { defaultRouteStorage } from '@core/storage/defaultRouteStorage'

type Props = { children: React.ReactNode }

export const BootGuard: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const defaultAppliedRef = useRef(false)
  useEffect(() => {
    const currentPath = location.pathname
    const isAuth = tokenManager.isAuthenticated()
    const tenant = tenantStorage.load()
    const selectedStoreId = storeStorage.load()
    const defaultRoute = defaultRouteStorage.load()

    // (logs removed)

    const isAuthRoute = currentPath.startsWith('/auth')
    const isStoreConfigRoute = currentPath.startsWith('/store-configuration')

    // 1) Not authenticated: only allow auth pages
    if (!isAuth) {
      if (!isAuthRoute) navigate('/auth/sign-in', { replace: true })
      return
    }

    // 2) Authenticated but tenant not yet resolved
    if (!tenant) {
      if (!isAuthRoute) navigate('/auth/waiting-sso-authentication', { replace: true })
      return
    }

    // 3) Authenticated + tenant but store not configured → force store selection flow
    if (!selectedStoreId) {
      if (!isStoreConfigRoute) navigate('/store-configuration/stores', { replace: true })
      return
    }

    // 4) Kiosk mode active (default route set) → land on default route only once per boot
    if (!defaultAppliedRef.current && defaultRoute && currentPath !== defaultRoute) {
      defaultAppliedRef.current = true
      navigate(defaultRoute, { replace: true })
      return
    }
    // (logs removed)
  }, [location.pathname, navigate])

  return <>{children}</>
}


