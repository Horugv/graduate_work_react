import CIcon from '@coreui/icons-react'

const _nav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Користувачі',
    to: '/admin/users',
    icon: <CIcon name="cil-user" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Категорії',
    to: '/admin/category',
    icon: <CIcon name="cil-spreadsheet" customClasses="c-sidebar-nav-icon" />,
  },
]

export default _nav
