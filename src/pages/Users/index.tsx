import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CCardTitle,
  CDataTable,
  CModal,
  CModalBody,
  CModalFooter,
} from '@coreui/react'

import { ActionsColumnStatus } from 'src/components/AdminPanelComponent/ActionsColumnStatus'
import { ActionsColumnFormatter } from 'src/components/AdminPanelComponent/ActionsColumnFormatter'

type userData = {
  id: string
  name: string
  email: string
  date: string
  role: string
  status: string
}

const setFields = () => {
  return [
    { key: 'name', label: 'ФІО', _style: { width: '20%' } },
    { key: 'email', label: 'Email', _style: { width: '20%' } },
    { key: 'date', label: 'Дата створення', _style: { width: '20%' } },
    { key: 'role', label: 'Роль', _style: { width: '15%' } },
    { key: 'status', label: 'Статус', _style: { width: '10%' } },
    { key: 'actions', label: '' },
  ]
}

const dataList: userData[] = [
  {
    id: '0000-0000-0001',
    name: 'Test',
    email: 'test@gmail.com',
    date: '10.10.2021',
    role: 'admin',
    status: 'active',
  },
  {
    id: '0000-0000-0002',
    name: 'Test 2',
    email: 'test@gmail.com',
    date: '10.11.2021',
    role: 'user',
    status: 'banned',
  },
]

const Users = () => {
  const history = useHistory()
  const [isModalShow, setIsModalShow] = useState(false)
  const [activeUser, setActiveUser] = useState<null | string>(null)

  return (
    <CRow>
      <CCol xs="12">
        <CCard>
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <CCardTitle className="mb-0">Список користувачів</CCardTitle>
            <Link to="/users/form">
              <CButton color="primary">Створити користувача</CButton>
            </Link>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              hover
              items={dataList}
              fields={setFields()}
              itemsPerPage={20}
              // loading={isLoading}
              scopedSlots={{
                // date: (item: userData) => <td>{item.date}</td>,
                // role: (item: userData) => <td>{item}</td>,
                status: (item: userData) => (
                  <td>
                    <ActionsColumnStatus status={item.status} />
                  </td>
                ),
                actions: (item: userData) => (
                  <td>
                    <ActionsColumnFormatter
                      handleEdit={() =>
                        history.push(`admin/user/form/${item.id}`)
                      }
                      handleStatusChange={{
                        actionActivation: () => console.log('active'),
                        actionBan: () => console.log('banned'),
                      }}
                      handleDelete={() => {
                        setIsModalShow(true)
                        setActiveUser(item.id)
                      }}
                      status={item.status === 'active'}
                    />
                  </td>
                ),
              }}
            />
          </CCardBody>
        </CCard>
        <CModal
          show={isModalShow}
          color="danger"
          size="sm"
          centered
          onClose={() => {
            setIsModalShow(false)
            setActiveUser(null)
          }}
        >
          <CModalBody>Ви дійсно бажаєте видалити користувача?</CModalBody>
          <CModalFooter>
            <CButton
              onClick={() => {
                console.log(`delete user ${activeUser}`)
                setIsModalShow(false)
                setActiveUser(null)
              }}
              color="danger"
            >
              Так
            </CButton>
            <CButton
              onClick={() => {
                setIsModalShow(false)
                setActiveUser(null)
              }}
              color="secondary"
            >
              Ні
            </CButton>
          </CModalFooter>
        </CModal>
      </CCol>
    </CRow>
  )
}

export default Users
