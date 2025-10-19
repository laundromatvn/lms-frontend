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

    // Debug trace for boot guard decisions
    console.log('[BootGuard] start', {
      currentPath,
      isAuth,
      hasTenant: Boolean(tenant),
      selectedStoreId,
      defaultRoute,
    })

    const isAuthRoute = currentPath.startsWith('/auth')
    const isStoreConfigRoute = currentPath.startsWith('/store-configuration')

    // 1) Not authenticated: only allow auth pages
    if (!isAuth) {
      if (!isAuthRoute) {
        console.log('[BootGuard] redirect: not authenticated → /auth/sign-in')
        navigate('/auth/sign-in', { replace: true })
      } else {
        console.log('[BootGuard] stay: not authenticated but already on auth route')
      }
      return
    }

    // 2) Authenticated but tenant not yet resolved
    if (!tenant) {
      if (!isAuthRoute) {
        console.log('[BootGuard] redirect: authenticated without tenant → /auth/waiting-sso-authentication')
        navigate('/auth/waiting-sso-authentication', { replace: true })
      } else {
        console.log('[BootGuard] stay: authenticated without tenant but on auth route')
      }
      return
    }

    // 3) Authenticated + tenant but store not configured → force store selection flow
    if (!selectedStoreId) {
      if (!isStoreConfigRoute) {
        console.log('[BootGuard] redirect: no selected store → /store-configuration/stores')
        navigate('/store-configuration/stores', { replace: true })
      } else {
        console.log('[BootGuard] stay: no selected store but already on store config route')
      }
      return
    }

    // 4) Kiosk mode active (default route set) → land on default route only once per boot
    if (!defaultAppliedRef.current && defaultRoute && currentPath !== defaultRoute) {
      defaultAppliedRef.current = true
      console.log('[BootGuard] redirect once: kiosk default route →', defaultRoute)
      navigate(defaultRoute, { replace: true })
      return
    }

    console.log('[BootGuard] pass-through: no redirect applied')
  }, [location.pathname, navigate])

  return <>{children}</>
}


