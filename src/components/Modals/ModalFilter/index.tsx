import { useDispatch, useSelector } from 'react-redux'
import { Col } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { IRootState } from 'src/redux/store'
import { actions } from 'src/redux/modals/action'

import { ModalLayout } from 'src/hoc/Modal'
import { Input } from 'src/components/Form/Input'
import { InputPlaceFind } from 'src/components/Form/InputPlaceFind'
import { Button } from 'src/components/Form/Button'
import { SelectComponent } from 'src/components/Form/Select'

import styles from './index.module.scss'

const validationSchema = Yup.object().shape({
  city: Yup.string().required('Заповніть поле!'),
  type: Yup.object()
    .shape({
      lable: Yup.string().required('Заповніть поле!'),
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

export const ModalFilter = () => {
  const dispatch = useDispatch()
  const show = useSelector(
    (state: IRootState) => state.modals.isModalFilterOpen
  )
  const formik = useFormik({
    initialValues: {
      name: '',
      city: '',
      type: {
        value: '',
        label: '',
      },
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    },
  })

  const closeModal = () => {
    dispatch(actions.actionSetIsModalFilterOpen(false))
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

  return (
    <ModalLayout isShow={show} size="sm" onHide={closeModal} id="modal-filter">
      <form onSubmit={formik.handleSubmit}>
        <div className={styles['form-title']}>Фільтр</div>
        <div className={styles['form-body']}>
          <div className={styles['form-group']}>
            <Input
              name="name"
              id="input-id-name"
              onChange={_handleInputChange}
              value={formik.values.name}
              title="Назва"
              showError={!!formik.errors?.name && !!formik.touched?.name}
              error={formik.errors?.name}
            />
          </div>
          <div className={styles['form-group']}>
            <InputPlaceFind
              name="city"
              id="input-id-city"
              onChange={_handleInputChange}
              value={formik.values.city}
              title="Місто"
              error={formik.errors?.city}
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
            <Button type="submit" title="Виконати" />
          </Col>
        </div>
      </form>
    </ModalLayout>
  )
}
