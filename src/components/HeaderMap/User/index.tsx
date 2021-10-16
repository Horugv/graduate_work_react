import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'

import { useClose } from 'src/helpers/useClose'

import styles from './index.module.scss'

const User = () => {
  const [isUserOpen, setIsUserOpen] = useState(false)
  const id = '0000-000001'
  const userRef = useRef(null)

  useClose({ ref: userRef, onClose: () => setIsUserOpen(false) })

  return (
    <div className={styles.user} ref={userRef}>
      <div className={styles.user__container}>
        <button
          className={styles.user__btn}
          onClick={() => setIsUserOpen(!isUserOpen)}
        >
          <i className="icon icon-user" />
        </button>
        <div
          className={cx(styles.user__content, { [styles.show]: isUserOpen })}
        >
          <div className={styles.user__content_info}>Євгеній Ігонін</div>
          <ul className={styles.user__content_list}>
            <li className={styles.user__content_item}>
              <Link to={`/user/${id}`}>Особисті дані</Link>
            </li>
            <li className={cx(styles.user__content_item, styles.exit)}>
              Вийти
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default User
