import { CBadge } from '@coreui/react'

export const ActionsColumnStatus = ({ status }) => {
  const getBadge = (status) => {
    switch (status) {
      case 'active':
      case 'enabled':
        return 'success'
      case 'wait':
        return 'secondary'
      case 'banned':
      case 'disabled':
      case 'draft':
      case 'used':
        return 'danger'
      default:
        return 'primary'
    }
  }

  return <CBadge color={getBadge(status)}>{status}</CBadge>
}
