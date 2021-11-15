import { Label } from 'src/components/Form/Label'

import styles from './index.module.scss'

type TextareaType = {
  name: string
  id: string
  onChange: (name: string, value: string) => void
  value: string
  title?: string
  placeholder?: string
  error?: string
  readonly?: boolean
}

export const Textarea = ({
  name,
  id,
  onChange,
  value,
  title,
  placeholder,
  error,
  readonly,
}: TextareaType) => {
  return (
    <div>
      {title && <Label title={title} id={id} />}
      <textarea
        className={styles.textarea}
        name={name}
        id={id}
        onChange={(e) => onChange(e.target.name, e.target.value)}
        value={value}
        placeholder={placeholder}
        readOnly={readonly}
      />
      {error && <div className={styles['form-error']}>{error}</div>}
    </div>
  )
}
