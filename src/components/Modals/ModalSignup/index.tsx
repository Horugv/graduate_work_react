import { useDispatch, useSelector } from 'react-redux'
import { Col } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

import { IRootState } from 'src/redux/store'
import { actions as modalActions } from 'src/redux/modals/action'
import { actions as authActions } from 'src/redux/auth/action'
import { signUp } from 'src/api/auth/index'

import { ModalLayout } from 'src/hoc/Modal'
import { Input } from 'src/components/Form/Input'
import { Button } from 'src/components/Form/Button'

import styles from './index.module.scss'

type FormikValuesProps = {
  username: string
  name: string
  family_name: string
  email: string
  password: string
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Заповніть поле!'),
  family_name: Yup.string().required('Заповніть поле!'),
  username: Yup.string().required('Заповніть поле!'),
  email: Yup.string().email('Не коректний email!').required('Заповніть поле!'),
  password: Yup.string().required('Заповніть поле!'),
})

export const ModalSignup = () => {
  const dispatch = useDispatch()

  const show = useSelector(
    (state: IRootState) => state.modals.isModalSignupOpen
  )
  const formik = useFormik({
    initialValues: {
      username: '',
      name: '',
      family_name: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      formik.setStatus(null)
      formikSubmit(values)
    },
  })

  const closeModal = () => {
    dispatch(modalActions.actionSetIsModalSignupOpen(false))
  }

  const _handleInputChange = (name: string, value: string) => {
    formik.setFieldValue(name, value, false)
  }

  const formikSubmit = (values: FormikValuesProps) => {
    const { email, password } = values
    const auth = getAuth()
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // const user = userCredential.user
        const body = {
          ...values,
          email_verified: userCredential.user.emailVerified,
        }
        signUp(body)
          .then((res) => {
            dispatch(authActions.actionSetIsAuth(true))
            dispatch(authActions.actionSetAuthUserData(res.data.data))
            closeModal()
          })
          .catch((err) => formik.setStatus('Some Error'))
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        formik.setStatus(errorMessage)
      })
  }

  return (
    <ModalLayout isShow={show} size="sm" onHide={closeModal} id="modal-filter">
      <form onSubmit={formik.handleSubmit}>
        <div className={styles['form-title']}>Реєстрація</div>
        {formik.status && (
          <div className={styles['form-alert']}>{formik.status}</div>
        )}
        <div className={styles['form-body']}>
          <div className={styles['form-group']}>
            <Input
              name="username"
              id="input-id-username"
              onChange={_handleInputChange}
              value={formik.values.username}
              title="Логін"
              error={formik?.touched?.username && formik.errors?.username}
            />
          </div>
          <div className={styles['form-group']}>
            <Input
              name="name"
              id="input-id-name"
              onChange={_handleInputChange}
              value={formik.values.name}
              title="Ім'я"
              error={formik?.touched?.name && formik.errors?.name}
            />
          </div>
          <div className={styles['form-group']}>
            <Input
              name="family_name"
              id="input-id-family_name"
              onChange={_handleInputChange}
              value={formik.values.family_name}
              title="Фамілія"
              error={formik?.touched?.family_name && formik.errors?.family_name}
            />
          </div>
          <div className={styles['form-group']}>
            <Input
              name="email"
              type="email"
              id="input-id-email"
              onChange={_handleInputChange}
              value={formik.values.email}
              title="Email"
              error={formik?.touched?.email && formik.errors?.email}
            />
          </div>
          <div className={styles['form-group']}>
            <Input
              name="password"
              type="password"
              id="input-id-password"
              onChange={_handleInputChange}
              value={formik.values.password}
              title="Пароль"
              error={formik?.touched?.password && formik.errors?.password}
            />
          </div>
        </div>
        <div className={styles['form-button']}>
          <Col md={6} className="m-auto">
            <Button type="submit" title="Вхід" />
          </Col>
        </div>
      </form>
    </ModalLayout>
  )
}
