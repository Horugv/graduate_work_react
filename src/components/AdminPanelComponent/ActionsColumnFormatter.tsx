import CIcon from '@coreui/icons-react'
import { CButton } from '@coreui/react'

type ActionsColumnFormatterProps = {
  handleEdit?: () => void
  handleDelete?: () => void
}

export const ActionsColumnFormatter = (props: ActionsColumnFormatterProps) => {
  return (
    <div className="d-flex justify-content-end">
      {props.hasOwnProperty('handleEdit') && (
        <div className="mx-1">
          <CButton
            variant="ghost"
            onClick={() => !!props?.handleEdit && props.handleEdit()}
            color="primary"
          >
            <CIcon name="cil-pencil" />
          </CButton>
        </div>
      )}
      {props.hasOwnProperty('handleDelete') && (
        <div className="mx-1">
          <CButton
            variant="ghost"
            color="danger"
            onClick={() => !!props.handleDelete && props.handleDelete()}
          >
            <CIcon name="cil-trash" />
          </CButton>
        </div>
      )}
    </div>
  )
}
