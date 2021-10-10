import { Label } from 'src/components/Form/Label'

import styles from './index.module.scss'

type InputType = {
  name: string
  id: string
  onChange: (name: string, value: string) => void
  value: string
  title?: string
  placeholder?: string
  type?: string
  error?: string
  readonly?: boolean
}

export const Input = ({
  name,
  id,
  onChange,
  value,
  title,
  placeholder,
  type = 'text',
  error,
  readonly,
}: InputType) => {
  return (
    <div>
      {title && <Label title={title} id={id} />}
      <input
        className={styles.input}
        name={name}
        id={id}
        type={type}
        onChange={(e) => onChange(e.target.name, e.target.value)}
        value={value}
        placeholder={placeholder}
        readOnly={readonly}
      />
      {error && <div className={styles['form-error']}>{error}</div>}
    </div>
  )
}
