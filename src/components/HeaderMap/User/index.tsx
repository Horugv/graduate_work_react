import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAuth, signOut } from 'firebase/auth'
import cx from 'classnames'

import { IRootState } from 'src/redux/store'
import { useClose } from 'src/helpers/useClose'
import { actions as modalActions } from 'src/redux/modals/action'
import { actions as authActions } from 'src/redux/auth/action'

import { ModalSignin } from 'src/components/Modals/ModalSignin'
import { ModalSignup } from 'src/components/Modals/ModalSignup'
import { ModalPersonalInformation } from 'src/components/Modals/ModalPersonalInformation'

import styles from './index.module.scss'

const User = () => {
  const dispatch = useDispatch()
  const [isUserOpen, setIsUserOpen] = useState(false)
  const { isAuth, userInfo } = useSelector((state: IRootState) => state.auth)

  const userRef = useRef(null)

  useClose({ ref: userRef, onClose: () => setIsUserOpen(false) })

  const onUserBtnClick = () => {
    if (isAuth) {
      setIsUserOpen(!isUserOpen)
    } else {
      setIsUserOpen(!isUserOpen)
    }
  }

  const logout = () => {
    const auth = getAuth()
    dispatch(authActions.actionsSetAuthIsLoading(true))
    signOut(auth)
      .then(() => {
        dispatch(authActions.actionSetIsAuth(false))
        dispatch(authActions.actionSetAuthUserData(null))
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => dispatch(authActions.actionsSetAuthIsLoading(false)))
  }

  return (
    <>
      <div className={styles.user} ref={userRef}>
        <div className={styles.user__container}>
          <button className={styles.user__btn} onClick={onUserBtnClick}>
            <i className="icon icon-user" />
          </button>
          <div
            className={cx(styles.user__content, { [styles.show]: isUserOpen })}
          >
            {isAuth && userInfo ? (
              <>
                <div className={styles.user__content_info}>
                  {`${userInfo?.name} ${userInfo.family_name}`}
                </div>
                <ul className={styles.user__content_list}>
                  <li
                    className={styles.user__content_item}
                    onClick={() =>
                      dispatch(
                        modalActions.actionSetIsModalPersonalInformationOpen(
                          true
                        )
                      )
                    }
                  >
                    {/* <Link
                      to={`/user/${id}`}
                      
                    > */}
                    ???????????????? ????????
                    {/* </Link> */}
                  </li>
                  <li
                    className={cx(styles.user__content_item, styles.exit)}
                    onClick={logout}
                  >
                    ??????????
                  </li>
                </ul>
              </>
            ) : (
              <ul className={styles.user__content_list}>
                <li
                  className={styles.user__content_item}
                  onClick={() =>
                    dispatch(modalActions.actionSetIsModalSigninOpen(true))
                  }
                >
                  ??????????????????????
                </li>
                <li
                  className={styles.user__content_item}
                  onClick={() =>
                    dispatch(modalActions.actionSetIsModalSignupOpen(true))
                  }
                >
                  ??????????????????
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <ModalSignin />
      <ModalSignup />
      <ModalPersonalInformation />
    </>
  )
}

export default User
