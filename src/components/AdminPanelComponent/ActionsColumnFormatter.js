import CIcon from '@coreui/icons-react'
import { CButton } from '@coreui/react'

export const ActionsColumnFormatter = (props) => {
  return (
    <div className="d-flex justify-content-end">
      {props.hasOwnProperty('handleEdit') && (
        <div className="mx-1">
          <CButton variant="ghost" onClick={() => props.handleEdit()} color="primary">
            <CIcon name="cil-pencil" />
          </CButton>
        </div>
      )}
      {props.hasOwnProperty('handleStatusChange') &&
        props.handleStatusChange &&
        (props.status ? (
          <div className="mx-1">
            <CButton
              variant="ghost"
              color="warning"
              onClick={() => props.handleStatusChange.actionBan()}
              disabled={!props.status}
            >
              <CIcon name="cil-ban" />
            </CButton>
          </div>
        ) : (
          <div className="mx-1">
            <CButton
              variant="ghost"
              color="success"
              onClick={() => props.handleStatusChange.actionActivation()}
              disabled={props.status}
            >
              <CIcon name="cil-check-circle" />
            </CButton>
          </div>
        ))}
      {props.hasOwnProperty('handleDelete') && (
        <div className="mx-1">
          <CButton variant="ghost" color="danger" onClick={() => props.handleDelete()}>
            <CIcon name="cil-trash" />
          </CButton>
        </div>
      )}
    </div>
  )
}
