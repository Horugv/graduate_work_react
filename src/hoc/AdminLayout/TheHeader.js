import React, { useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  CHeader,
  CHeaderBrand,
  CSubheader,
  CBreadcrumb,
  CBreadcrumbItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

// import { LayoutContext } from '../context/LayoutContext'

const TheHeader = () => {
  const dispatch = useDispatch()
  // const { breadcrumbs } = useContext(LayoutContext)

  return (
    <CHeader withSubheader>
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon name="logo" height="48" alt="Logo" />
      </CHeaderBrand>
      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumb className="border-0 c-subheader-nav m-0 px-0 px-md-3">
          <CBreadcrumbItem active href="#" key={`breadcrumbs-1`}>
            Test
          </CBreadcrumbItem>

          {/* {breadcrumbs.map((breadcrumbsItem, breadcrumbsIndex) => {
            return breadcrumbsIndex !== breadcrumbs.length - 1 ? (
              <CBreadcrumbItem href="#" key={`breadcrumbs-${breadcrumbsIndex}`}>
                <Link to={breadcrumbsItem.path}>{breadcrumbsItem.name}</Link>
              </CBreadcrumbItem>
            ) : (
              <CBreadcrumbItem active key={`breadcrumbs-${breadcrumbsIndex}`}>
                {breadcrumbsItem.name}
              </CBreadcrumbItem>
            )
          })} */}
        </CBreadcrumb>
      </CSubheader>
    </CHeader>
  )
}

export default TheHeader
