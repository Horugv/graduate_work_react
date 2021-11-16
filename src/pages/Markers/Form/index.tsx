import React, { useEffect, useState } from 'react'
import {
  CCard,
  CTabContent,
  CCardHeader,
  CCardTitle,
  CCardBody,
  CForm,
  CAlert,
  CRow,
  CCol,
  CFormGroup,
  CLabel,
  CInput,
  CTextarea,
  CInvalidFeedback,
  CCardFooter,
  CButton,
} from '@coreui/react'
import * as Yup from 'yup'
import { useHistory, RouteComponentProps } from 'react-router-dom'
import { useFormik } from 'formik'
import cx from 'classnames'

import { getMarkerById, editMarker } from 'src/api/markers'
import { MarkerType, EditMarkerDataType } from 'src/api/markers/types'

type TParams = { id: string }

const MarkerFormSchemaValidation = () => Yup.object().shape({
  name: Yup.string().required("Обов'язкове поле"),
})

const initialState = {
  _id: '',
  latitude: 0,
  longitude: 0,
  name: '',
  owner: {
    _id: '',
    email: '',
    name: '',
    family_name: '',
    username: '',
  },
  description: '',
}

const MarkerForm = ({ match }: RouteComponentProps<TParams>) => {
  const markerId = match.params.id
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory()
  const setFormikData = (data: MarkerType) => {
    for (const key in data) {
      // @ts-ignore:next-line
      formik.setFieldValue(`${key}`, data[key])
    }
  }

  const formik = useFormik({
    initialValues: { ...initialState },
    validationSchema: MarkerFormSchemaValidation(),
    onSubmit: (values) => {
      formik.setStatus(null)
      const transformValue = { ...values }
      editData(transformValue)
    },
  })

  const loadData = async () => {
    setIsLoading(true)
    await getMarkerById(markerId)
      .then((res) => {
        setFormikData(res?.data?.marker)
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false))
  }

  const editData = async (data: EditMarkerDataType) => {
    setIsLoading(true)
    await editMarker(markerId, data)
      .then((res) => {
        setIsLoading(false)
        history.push('/admin/markers')
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    loadData()
  }, [markerId])

  return (
    <CRow>
      <CCol xs="12">
        <CCard>
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <CCardTitle className="mb-0">Редагування точки</CCardTitle>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={formik.handleSubmit}>
              <CTabContent>
                <CRow>
                  <CCol md={6}>
                    <CFormGroup>
                      <CLabel htmlFor="latitude">Latitude</CLabel>
                      <CInput
                        type="text"
                        autoComplete="latitude"
                        id="latitude"
                        name="latitude"
                        value={formik.values.latitude}
                        disabled={true}
                      />
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="longitude">Longitude</CLabel>
                      <CInput
                        type="text"
                        autoComplete="longitude"
                        id="longitude"
                        name="longitude"
                        value={formik.values.longitude}
                        disabled={true}
                      />
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="name">Назва</CLabel>
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
                      <CLabel htmlFor="position">Опис</CLabel>
                      <CTextarea
                        autoComplete="position"
                        id="position"
                        name="position"
                        className={cx({
                          'is-invalid':
                            formik?.errors?.description &&
                            formik?.touched?.description,
                        })}
                        onChange={formik.handleChange}
                        onFocus={() =>
                          formik.setFieldTouched('description', false)
                        }
                        onBlur={() =>
                          formik.setFieldTouched('description', true)
                        }
                        rows={8}
                        value={formik.values.description}
                        disabled={isLoading}
                      />
                      {formik?.errors?.description &&
                        formik?.touched?.description && (
                          <CInvalidFeedback>
                            {formik?.errors?.description}
                          </CInvalidFeedback>
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
                onClick={() => history.push('/admin/markers')}
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

export default MarkerForm
