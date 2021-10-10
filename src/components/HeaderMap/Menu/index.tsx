import { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import cx from 'classnames'

import { actions } from 'src/redux/modals/action'
import { useClose } from 'src/helpers/useClose'

import styles from './index.module.scss'

const Menu = () => {
  const dispatch = useDispatch()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useClose({ ref: menuRef, onClose: () => setIsMenuOpen(false) })

  const _handleOpenFilterModal = () => {
    setIsMenuOpen(false)
    dispatch(actions.actionSetIsModalFilterOpen(true))
  }

  return (
    <div className={styles.menu} ref={menuRef}>
      <div className={styles.menu__container}>
        <button
          className={styles.menu__hamburger}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <i className="icon icon-menu" />
        </button>
        <div
          className={cx(styles.menu__content, { [styles.show]: isMenuOpen })}
        >
          <ul className={styles.menu__content_list}>
            <li
              className={styles.menu__content_item}
              onClick={_handleOpenFilterModal}
            >
              <span className="icon icon-filter"></span>
              <span className={styles.menu__content_item_text}>Фільтр</span>
            </li>
            <li className={styles.menu__content_item}>
              <span className="icon icon-add-circle-outline"></span>
              <span className={styles.menu__content_item_text}>
                Добавити точку
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Menu
