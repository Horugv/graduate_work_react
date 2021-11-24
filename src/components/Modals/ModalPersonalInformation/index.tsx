import { useDispatch, useSelector } from 'react-redux'
import { Col } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { IRootState } from 'src/redux/store'
import { actions as actionsModals } from 'src/redux/modals/action'
import { actions as authActions } from 'src/redux/auth/action'
import { editUser } from 'src/api/users'
import { EditUserDataType } from 'src/api/users/types'

import { ModalLayout } from 'src/hoc/Modal'
import { Input } from 'src/components/Form/Input'
import { Button } from 'src/components/Form/Button'

import styles from './index.module.scss'
import { useEffect } from 'react'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Заповніть поле!'),
  family_name: Yup.string().required('Заповніть поле!'),
  username: Yup.string().required('Заповніть поле!'),
  email: Yup.string().email('Email не коректний').required('Заповніть поле!'),
})

const inititalValues = {
  name: '',
  family_name: '',
  username: '',
  email: '',
}

export const ModalPersonalInformation = () => {
  const dispatch = useDispatch()
  const { isModalPersonalInformationOpen: show } = useSelector(
    (state: IRootState) => state.modals
  )
  const { userInfo } = useSelector((state: IRootState) => state.auth)

  const formik = useFormik({
    initialValues: inititalValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const objData = { ...values, id: userInfo?._id }
      submitData(objData)
    },
  })

  useEffect(() => {
    if (userInfo) {
      for (const key in userInfo) {
        if (
          key === 'name' ||
          key === 'family_name' ||
          key === 'email' ||
          key === 'username'
        ) {
          formik.setFieldValue(`${key}`, userInfo[key], true)
        }
      }
    }
  }, [userInfo, show])

  const submitData = async (value: EditUserDataType) => {
    if (userInfo?._id) {
      await editUser(userInfo?._id, value)
        .then(async (res) =>
          dispatch(authActions.actionSetAuthUserData(res.data.data.user))
        )
        .catch((err) => console.error(err))
        .finally(() => closeModal())
    }
  }

  const closeModal = () => {
    dispatch(actionsModals.actionSetIsModalPersonalInformationOpen(false))
  }

  const _handleInputChange = (name: string, value: string) => {
    formik.setFieldValue(name, value, true)
  }

  return (
    <ModalLayout isShow={show} size="sm" onHide={closeModal} id="modal-filter">
      <form onSubmit={formik.handleSubmit}>
        <div className={styles['form-title']}>Особисті дані</div>
        <div className={styles['form-body']}>
          <div className={styles['form-group']}>
            <Input
              name="name"
              id="input-id-name"
              onChange={_handleInputChange}
              value={formik.values.name}
              title="Ім'я"
              showError={!!formik.errors?.name && !!formik.touched?.name}
              error={formik.errors?.name}
            />
          </div>
          <div className={styles['form-group']}>
            <Input
              name="family_name"
              id="input-id-family_name"
              onChange={_handleInputChange}
              value={`${formik.values?.family_name}`}
              title="Фамілія"
              showError={
                !!formik.errors?.family_name && !!formik.touched?.family_name
              }
              error={formik.errors?.family_name}
            />
          </div>
          <div className={styles['form-group']}>
            <Input
              name="email"
              id="input-id-email"
              onChange={_handleInputChange}
              value={`${formik.values?.email}`}
              title="Email"
              showError={!!formik.errors?.email && !!formik.touched?.email}
              error={formik.errors?.email}
            />
          </div>
          <div className={styles['form-group']}>
            <Input
              name="username"
              id="input-id-username"
              onChange={_handleInputChange}
              value={`${formik.values?.username}`}
              title="Username"
              showError={
                !!formik.errors?.username && !!formik.touched?.username
              }
              error={formik.errors?.username}
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
