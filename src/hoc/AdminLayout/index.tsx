import React from 'react'
import { CContainer } from '@coreui/react'
import { ToastProvider } from 'react-toast-notifications'

import TheFooter from './TheFooter'
import TheSidebar from './TheSidebar'
import TheHeader from './TheHeader'

import { icons } from 'src/assets/AdminIcons/icons'
// @ts-expect-error
React.icons = icons

export const adminLayout = (WrappedComponent: () => JSX.Element) => {
  const Layout = () => {
    return (
      <ToastProvider >
        <div className="c-app c-default-layout">
          <TheSidebar />
          <div className="c-wrapper">
            <TheHeader />
            <div className="c-body">
              <main className="c-main">
                <CContainer fluid>
                  <WrappedComponent />
                </CContainer>
              </main>
            </div>
            <TheFooter />
          </div> 
        </div>
      </ToastProvider>
    )
  }
  return Layout
}
