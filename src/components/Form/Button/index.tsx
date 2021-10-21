import cx from 'classnames'

import styles from './index.module.scss'

type ButtonType = {
  title: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  color?: 'white'
}

export const Button = ({ title, onClick, type, color }: ButtonType) => {
  return (
    <button
      className={cx(styles.button, { [styles[`${color}`]]: color })}
      type={type}
      onClick={onClick}
    >
      {title}
    </button>
  )
}
