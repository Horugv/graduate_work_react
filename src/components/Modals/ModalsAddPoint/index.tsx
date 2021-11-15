import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { IRootState } from 'src/redux/store'
import { actions } from 'src/redux/modals/action'
import { createMarker } from 'src/api/markers'
import { CreateMarkerDataType } from 'src/api/markers/types'

import { ModalLayout } from 'src/hoc/Modal'
import { Input } from 'src/components/Form/Input'
import { Textarea } from 'src/components/Form/Textarea'
import { Button } from 'src/components/Form/Button'
import { SelectComponent } from 'src/components/Form/Select'

import styles from './index.module.scss'
import { useEffect } from 'react'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Заповніть поле!'),
  type: Yup.object()
    .shape({
      label: Yup.string().required('Заповніть поле!'),
      value: Yup.string().required('Заповніть поле!'),
    })
    .required('Заповніть поле!'),
})

const optionsType = [
  {
    value: '1',
    label: 'Концерт',
  },
  {
    value: '2',
    label: 'Протест',
  },
]

export const ModalsAddPoint = () => {
  const dispatch = useDispatch()
  const { isModalAddPointOpen: show, modalAddPointCoord: coord } = useSelector(
    (state: IRootState) => state.modals
  )
  const formik = useFormik({
    initialValues: {
      name: '',
      coord: {
        lat: '',
        lng: '',
      },
      type: {
        value: '',
        label: '',
      },
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
      // TODO change owner when auth will be ready
      const objData = {
        latitude: Number(values.coord.lat),
        longitude: Number(values.coord.lng),
        name: values.name,
        description: values.description,
        owner: '61902adcb5af11f928b50b75',
      }
      submitData(objData)
    },
  })

  const submitData = async (value: CreateMarkerDataType) => {
    await createMarker(value)
      .then((res) => console.log(res))
      .catch((err) => console.error(err))
  }

  const closeModal = () => {
    dispatch(
      actions.actionSetIsModalAddPointOpen({
        isOpen: false,
        coord: null,
      })
    )
  }

  const _handleInputChange = (name: string, value: string) => {
    formik.setFieldValue(name, value, false)
  }

  const _handleSelectChange = (
    name: string,
    value: { value: string; label: string }
  ) => {
    formik.setFieldValue(name, value, false)
  }

  useEffect(() => {
    formik.setFieldValue('coord', coord)
  }, [coord])

  return (
    <ModalLayout isShow={show} size="sm" onHide={closeModal} id="modal-filter">
      <form onSubmit={formik.handleSubmit}>
        <div className={styles['form-title']}>Добавити точку</div>
        <div className={styles['form-body']}>
          <div className={styles['form-group']}>
            <Input
              name="name"
              id="input-id-name"
              onChange={_handleInputChange}
              value={formik.values.name}
              title="Назва"
              error={formik.errors?.name}
            />
          </div>
          <div className={styles['form-group']}>
            <Row>
              <Col xs={6}>
                <Input
                  name="coord-lng"
                  id="input-id-coord-lng"
                  onChange={_handleInputChange}
                  value={`${formik.values?.coord?.lng}`}
                  title="Координати lng"
                  error={formik.errors?.coord?.lng}
                  readonly
                />
              </Col>
              <Col xs={6}>
                <Input
                  name="coord-lat"
                  id="input-id-coord-lat"
                  onChange={_handleInputChange}
                  value={`${formik.values?.coord?.lat}`}
                  title="Координати lat"
                  error={formik.errors?.coord?.lat}
                  readonly
                />
              </Col>
            </Row>
          </div>
          <div className={styles['form-group']}>
            <Textarea
              name="description"
              id="description-id-name"
              onChange={_handleInputChange}
              value={formik.values.description}
              title="Опис"
              error={formik.errors?.description}
            />
          </div>
          <div className={styles['form-group']}>
            <SelectComponent
              name="type"
              id="select-id-type"
              title="Тип точки"
              value={formik.values.type}
              options={optionsType}
              onChange={_handleSelectChange}
              error={formik.errors?.type?.label || formik.errors?.type?.value}
            />
          </div>
        </div>
        <div className={styles['form-button']}>
          <Col md={6} className="m-auto">
            <Button type="submit" title="Зберегти" />
          </Col>
        </div>
      </form>
    </ModalLayout>
  )
}
