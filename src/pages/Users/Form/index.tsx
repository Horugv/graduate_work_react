import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CCard,
  CTabContent,
  CCardHeader,
  CCardTitle,
  CCardBody,
  CForm,
  CRow,
  CCol,
  CFormGroup,
  CLabel,
  CInput,
  CInvalidFeedback,
  CCardFooter,
  CButton,
  CListGroup,
  CListGroupItem,
} from '@coreui/react'
import * as Yup from 'yup'
import { useHistory, RouteComponentProps } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import { useFormik } from 'formik'
import cx from 'classnames'

import { getUserById, editUser } from 'src/api/users'
import { UserType, EditUserDataType } from 'src/api/users/types'
import { MarkerType } from 'src/api/markers/types'

type TParams = { id: string }

const UserFormSchemaValidation = () =>
  Yup.object().shape({
    name: Yup.string().required("Обов'язкове поле"),
    family_name: Yup.string().required("Обов'язкове поле"),
    username: Yup.string().required("Обов'язкове поле"),
    email: Yup.string().email('Email не коректний').required('Заповніть поле!'),
  })

const initialState = {
  name: '',
  family_name: '',
  username: '',
  email: '',
}

const UserForm = ({ match }: RouteComponentProps<TParams>) => {
  const userId = match.params.id
  const { addToast } = useToasts()
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const [markers, setMarkers] = useState<MarkerType[]>([])

  const setFormikData = (data: UserType) => {
    for (const key in data) {
      if (
        key === 'name' ||
        key === 'family_name' ||
        key === 'username' ||
        key === 'email'
      )
        formik.setFieldValue(`${key}`, data[key])
      if (key === 'markers') {
        setMarkers(data[key])
      }
    }
  }

  const formik = useFormik({
    initialValues: { ...initialState },
    validationSchema: UserFormSchemaValidation(),
    onSubmit: (values) => {
      formik.setStatus(null)
      const transformValue = { ...values, id: userId }
      editData(transformValue)
    },
  })

  const loadData = async () => {
    setIsLoading(true)
    await getUserById(userId)
      .then((res) => {
        setFormikData(res?.data?.user)
      })
      .catch((err) =>
        addToast(err.response?.data?.error?.message, {
          appearance: 'error',
          autoDismiss: true,
        })
      )
      .finally(() => setIsLoading(false))
  }

  const editData = async (data: EditUserDataType) => {
    setIsLoading(true)
    await editUser(userId, data)
      .then((res) => {
        addToast('Користувач успішно оновлений', {
          appearance: 'success',
          autoDismiss: true,
        })
        setIsLoading(false)
        history.push('/admin/users')
      })
      .catch((err) =>
        addToast(err.response?.data?.error?.message, {
          appearance: 'error',
          autoDismiss: true,
        })
      )
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    loadData()
  }, [userId])

  console.log(markers)

  return (
    <CRow>
      <CCol xs="12">
        <CCard>
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <CCardTitle className="mb-0">Редагування користувача</CCardTitle>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={formik.handleSubmit}>
              <CTabContent>
                <CRow>
                  <CCol md={6}>
                    <CFormGroup>
                      <CLabel htmlFor="name">Ім'я</CLabel>
                      <CInput
                        type="text"
                        autoComplete="name"
                        id="name"
                        name="name"
                        className={cx({
                          'is-invalid':
                            formik?.errors?.name && formik?.touched?.name,
                        })}
                        onChange={formik.handleChange}
                        onFocus={() => formik.setFieldTouched('name', false)}
                        onBlur={() => formik.setFieldTouched('name', true)}
                        value={formik.values.name}
                        disabled={isLoading}
                      />
                      {formik?.errors?.name && formik?.touched?.name && (
                        <CInvalidFeedback>
                          {formik?.errors?.name}
                        </CInvalidFeedback>
                      )}
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="family_name">Прізвище</CLabel>
                      <CInput
                        type="text"
                        autoComplete="family_name"
                        id="family_name"
                        name="family_name"
                        className={cx({
                          'is-invalid':
                            formik?.errors?.family_name &&
                            formik?.touched?.family_name,
                        })}
                        onChange={formik.handleChange}
                        onFocus={() =>
                          formik.setFieldTouched('family_name', false)
                        }
                        onBlur={() =>
                          formik.setFieldTouched('family_name', true)
                        }
                        value={formik.values.family_name}
                        disabled={isLoading}
                      />
                      {formik?.errors?.family_name &&
                        formik?.touched?.family_name && (
                          <CInvalidFeedback>
                            {formik?.errors?.family_name}
                          </CInvalidFeedback>
                        )}
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="email">Email</CLabel>
                      <CInput
                        type="email"
                        autoComplete="email"
                        id="email"
                        name="email"
                        className={cx({
                          'is-invalid':
                            formik?.errors?.email && formik?.touched?.email,
                        })}
                        onChange={formik.handleChange}
                        onFocus={() => formik.setFieldTouched('email', false)}
                        onBlur={() => formik.setFieldTouched('email', true)}
                        value={formik.values.email}
                        disabled={isLoading}
                      />
                      {formik?.errors?.email && formik?.touched?.email && (
                        <CInvalidFeedback>
                          {formik?.errors?.email}
                        </CInvalidFeedback>
                      )}
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="username">Username</CLabel>
                      <CInput
                        type="username"
                        autoComplete="username"
                        id="username"
                        name="username"
                        className={cx({
                          'is-invalid':
                            formik?.errors?.username &&
                            formik?.touched?.username,
                        })}
                        onChange={formik.handleChange}
                        onFocus={() =>
                          formik.setFieldTouched('username', false)
                        }
                        onBlur={() => formik.setFieldTouched('username', true)}
                        value={formik.values.username}
                        disabled={isLoading}
                      />
                      {formik?.errors?.username &&
                        formik?.touched?.username && (
                          <CInvalidFeedback>
                            {formik?.errors?.username}
                          </CInvalidFeedback>
                        )}
                    </CFormGroup>
                  </CCol>
                  <CCol md={6}>
                    <CFormGroup>
                      <CLabel htmlFor="username">
                        Точки які створив користувач
                      </CLabel>
                      {!!markers.length && (
                        <CListGroup>
                          {markers.map((item) => (
                            <Link
                              to={`/admin/marker/${item?._id}`}
                              key={item?._id}
                            >
                              <CListGroupItem>{item.name}</CListGroupItem>
                            </Link>
                          ))}
                          {/* <CListGroupItem component="a" href="#" active>
                            Cras justo odio
                          </CListGroupItem>
                          <CListGroupItem component="a" href="#">
                            Dapibus ac facilisis in
                          </CListGroupItem>
                          <CListGroupItem component="a" href="#">
                            Morbi leo risus
                          </CListGroupItem>
                          <CListGroupItem component="a" href="#">
                            Porta ac consectetur ac
                          </CListGroupItem>
                          <CListGroupItem component="a" href="#" disabled>
                            Vestibulum at eros
                          </CListGroupItem> */}
                        </CListGroup>
                      )}
                    </CFormGroup>
                  </CCol>
                </CRow>
              </CTabContent>
            </CForm>
          </CCardBody>
          <CCardFooter>
            <div className="d-flex justify-content-center">
              <CButton
                onClick={() => history.push('/admin/users')}
                color="dark"
                variant="ghost"
                className="mx-2"
              >
                Назад
              </CButton>
              <CButton
                type={'submit'}
                color="primary"
                onClick={formik.handleSubmit}
              >
                Зберегти
              </CButton>
            </div>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default UserForm
