import React from 'react'
import { CContainer, CFade } from '@coreui/react'

import TheFooter from './TheFooter'
import TheSidebar from './TheSidebar'
import TheHeader from './TheHeader'

import { icons } from 'src/assets/AdminIcons/icons'
// @ts-expect-error
React.icons = icons

export const adminLayout = (WrappedComponent: () => JSX.Element) => {
  const Layout = () => {
    return (
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
    )
  }
  return Layout
}
