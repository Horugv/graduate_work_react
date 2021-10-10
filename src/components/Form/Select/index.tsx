import Select, { components, SingleValue } from 'react-select'

import { Label } from 'src/components/Form/Label'

import styles from './index.module.scss'

type SelectType = {
  name: string
  id: string
  value: {
    label: string
    value: string
  }
  options: {
    label: string
    value: string
  }[]
  onChange: (name: string, value: { value: string; label: string }) => void
  title?: string
  placeholder?: string
  error?: string
  isSearchable?: boolean
}

const DropdownIndicator = (props: any) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <div className={styles.select__arrow} />
      </components.DropdownIndicator>
    )
  )
}

export const SelectComponent = ({
  name,
  id,
  value,
  options,
  onChange,
  title,
  placeholder,
  error,
  isSearchable = false,
}: SelectType) => {
  const _handleSelectChange = (
    newValue: SingleValue<{ label: string; value: string }>
  ) => {
    onChange(name, newValue as { label: string; value: string })
  }
  return (
    <div className={styles.select}>
      {title && <Label title={title} id={id} />}
      <Select
        className="react-select"
        classNamePrefix="react-select"
        name={name}
        isSearchable={isSearchable}
        placeholder={placeholder}
        components={{ DropdownIndicator }}
        options={options}
        value={value}
        onChange={_handleSelectChange}
      />
      {error && <div className={styles['form-error']}>{error}</div>}
    </div>
  )
}
