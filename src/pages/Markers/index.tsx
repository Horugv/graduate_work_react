import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
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

import { getMarkers, deletMarker } from 'src/api/markers'
import { MarkerType, MarkerMetaPagerType } from 'src/api/markers/types'

import { useQuery } from 'src/helpers/useQuery'

import { ActionsColumnFormatter } from 'src/components/AdminPanelComponent/ActionsColumnFormatter'

const setFields = () => {
  return [
    { key: 'name', label: 'Назва', _style: { width: '20%' } },
    { key: 'createdAt', label: 'Дата створення', _style: { width: '20%' } },
    { key: 'owner', label: 'Власник', _style: { width: '20%' } },
    { key: 'actions', label: '' },
  ]
}

const Markers = () => {
  const { addToast } = useToasts()
  const history = useHistory()
  const query = useQuery()
  const page = parseInt(String(query.get('page'))) || 1
  query.delete('page')
  const queryString = query.toString()
  const [isModalShow, setIsModalShow] = useState(false)
  const [activeMarker, setActiveMarker] = useState<null | string>(null)
  const [data, setData] = useState<MarkerType[]>([])
  const [meta, setMeta] = useState<MarkerMetaPagerType>({
    count: 0,
    total: 0,
    page: 1,
    pages: 1,
    per_page: 20,
  })
  const [isLoading, setIsLoading] = useState(false)

  const loadData = async (page: number = 1, query: string = '') => {
    setIsLoading(true)
    await getMarkers(page, query)
      .then((res) => {
        setData(res?.data?.data)
        setMeta(res?.data?.meta?.pager)
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false))
  }

  const deleteItem = async (id: string) => {
    await deletMarker(id)
      .then(() => {
        addToast('Точка успішно видалена', { appearance: 'success', autoDismiss: true })
        loadData(page, queryString)
      })
      .catch((err) => {
        addToast(err.response?.data?.error?.message, {
          appearance: 'error',
          autoDismiss: true,
        })
      })
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
            <CCardTitle className="mb-0">Список точок</CCardTitle>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              hover
              items={data}
              fields={setFields()}
              itemsPerPage={meta.per_page ? meta.per_page : 10}
              loading={isLoading}
              scopedSlots={{
                owner: (item: MarkerType) => <td>{item?.owner?.username}</td>,
                actions: (item: MarkerType) => (
                  <td>
                    <ActionsColumnFormatter
                      handleEdit={() =>
                        history.push(`/admin/marker/${item._id}`)
                      }
                      handleDelete={() => {
                        setIsModalShow(true)
                        setActiveMarker(item._id)
                      }}
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
                    history.push(`/admin/markers?${query.toString()}`)
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
            setActiveMarker(null)
          }}
        >
          <CModalBody>Ви дійсно бажаєте видалити точку?</CModalBody>
          <CModalFooter>
            <CButton
              onClick={() => {
                activeMarker && deleteItem(activeMarker)
                setIsModalShow(false)
                setActiveMarker(null)
              }}
              color="danger"
            >
              Так
            </CButton>
            <CButton
              onClick={() => {
                setIsModalShow(false)
                setActiveMarker(null)
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

export default Markers
