import styles from './index.module.scss'

type LabelType = {
  title: string
  id: string
}

export const Label = ({ title, id }: LabelType) => {
  return (
    <label className={styles.label} htmlFor={id}>
      {title}
    </label>
  )
}
