import styles from './index.module.scss'

type ButtonType = {
  title: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

export const Button = ({ title, onClick, type }: ButtonType) => {
  return (
    <button className={styles.button} type={type} onClick={onClick}>
      {title}
    </button>
  )
}
