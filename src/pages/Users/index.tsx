import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CCardTitle,
  CCardFooter,
  CPagination,
  CDataTable,
  CModal,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import { useToasts } from 'react-toast-notifications'

import { getUsers, deletUser } from 'src/api/users'
import { UserType, UserMetaPagerType } from 'src/api/users/types'

import { useQuery } from 'src/helpers/useQuery'

import { ActionsColumnFormatter } from 'src/components/AdminPanelComponent/ActionsColumnFormatter'

const setFields = () => {
  return [
    { key: 'name', label: "Ім'я", _style: { width: '20%' } },
    { key: 'family_name', label: 'Фамілія', _style: { width: '20%' } },
    { key: 'email', label: 'Email', _style: { width: '20%' } },
    // { key: 'role', label: 'Роль', _style: { width: '15%' } },
    { key: 'actions', label: '' },
  ]
}

const Users = () => {
  const history = useHistory()
  const [activeUser, setActiveUser] = useState<null | string>(null)
  const query = useQuery()
  const page = parseInt(String(query.get('page'))) || 1
  query.delete('page')
  const queryString = query.toString()
  const [isModalShow, setIsModalShow] = useState(false)
  const [activeMarker, setActiveMarker] = useState<null | string>(null)
  const [data, setData] = useState<UserType[]>([])
  const [meta, setMeta] = useState<UserMetaPagerType>({
    count: 0,
    total: 0,
    page: 1,
    pages: 1,
    per_page: 20,
  })
  const [isLoading, setIsLoading] = useState(false)

  const loadData = async (page: number = 1, query: string = '') => {
    setIsLoading(true)
    await getUsers(page, query)
      .then((res) => {
        setData(res?.data?.data)
        setMeta(res?.data?.meta?.pager)
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    loadData(page, queryString)
  }, [page, queryString])

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
              items={data}
              fields={setFields()}
              itemsPerPage={20}
              loading={isLoading}
              scopedSlots={{
                // role: (item: UserType) => <td>{item}</td>,
                actions: (item: UserType) => (
                  <td>
                    <ActionsColumnFormatter
                      handleEdit={() =>
                        history.push(`/admin/users/${item._id}`)
                      }
                      // handleDelete={() => {
                      //   setIsModalShow(true)
                      //   setActiveUser(item.id)
                      // }}
                    />
                  </td>
                ),
              }}
            />
          </CCardBody>
          <CCardFooter>
            {Boolean(data.length) && (
              <CPagination
                activePage={page}
                pages={meta.pages}
                onActivePageChange={(page: string) => {
                  if (page) {
                    query.set('page', page)
                    history.push(`/admin/users?${query.toString()}`)
                  }
                }}
              />
            )}
          </CCardFooter>
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
