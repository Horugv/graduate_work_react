import { useDispatch, useSelector } from 'react-redux'
import { Col } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

import { IRootState } from 'src/redux/store'
import { actions as modalActions } from 'src/redux/modals/action'
import { actions as authActions } from 'src/redux/auth/action'
import { signIn } from 'src/api/auth'

import { ModalLayout } from 'src/hoc/Modal'
import { Input } from 'src/components/Form/Input'
import { Button } from 'src/components/Form/Button'

import styles from './index.module.scss'

type FormikValuesProps = {
  email: string
  password: string
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Не коректний email!').required('Заповніть поле!'),
  password: Yup.string().required('Заповніть поле!'),
})

export const ModalSignin = () => {
  const dispatch = useDispatch()
  const show = useSelector(
    (state: IRootState) => state.modals.isModalSigninOpen
  )
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      formikSubmit(values)
    },
  })

  const closeModal = () => {
    dispatch(modalActions.actionSetIsModalSigninOpen(false))
  }

  const _handleInputChange = (name: string, value: string) => {
    formik.setFieldValue(name, value, false)
  }

  const formikSubmit = (values: FormikValuesProps) => {
    const { email, password } = values
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // const user = userCredential.user
        signIn({
          email,
        })
          .then((res) => {
            dispatch(authActions.actionSetIsAuth(true))
            dispatch(authActions.actionSetAuthUserData(res.data.data.user))
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
        <div className={styles['form-title']}>Авторизація</div>
        {formik.status && (
          <div className={styles['form-alert']}>{formik.status}</div>
        )}
        <div className={styles['form-body']}>
          <div className={styles['form-group']}>
            <Input
              name="email"
              type="email"
              id="input-id-email"
              onChange={_handleInputChange}
              value={formik.values.email}
              title="Email"
              error={formik.errors?.email}
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
              error={formik.errors?.password}
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
