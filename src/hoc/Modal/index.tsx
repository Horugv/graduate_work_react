import { Modal } from 'react-bootstrap'

import styles from './index.module.scss'

type ModalSmType = {
  children: JSX.Element | JSX.Element[]
  isShow: boolean
  size: 'sm' | 'lg' | 'xl'
  onHide: () => void
  id?: string
}

export const ModalLayout = ({
  children,
  isShow,
  size,
  onHide,
  id,
}: ModalSmType) => {
  return (
    <Modal
      show={isShow}
      onHide={onHide}
      centered
      size={size}
      id={id}
      contentClassName={styles.modal__content}
    >
      <button className={styles.modal__close} onClick={onHide}>
        <i className="icon icon-close" />
      </button>
      {children}
    </Modal>
  )
}
