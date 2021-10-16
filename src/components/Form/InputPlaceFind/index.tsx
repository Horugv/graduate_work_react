import AutoComplete from 'react-google-autocomplete'

import { Label } from 'src/components/Form/Label'

import styles from 'src/components/Form/Input/index.module.scss'

type InputPlaceFindType = {
  name: string
  id: string
  onChange: (name: string, value: string) => void
  value: string
  title?: string
  placeholder?: string
  error?: string
}

export const InputPlaceFind = ({
  name,
  id,
  onChange,
  value,
  title,
  placeholder,
  error,
}: InputPlaceFindType) => {
  return (
    <div>
      {title && <Label title={title} id={id} />}
      <AutoComplete
        className={styles.input}
        apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY || ''}
        options={{
          types: ['geocode'],
        }}
        id={id}
        onBlur={() => {
          onChange(name, '')
        }}
        onPlaceSelected={(place) => {
          if (place?.address_components) {
            onChange(name, place?.address_components[0]?.long_name)
          }
        }}
        onChange={(e) => onChange(name, e.currentTarget.value)}
        placeholder={placeholder}
        // @ts-expect-error
        value={value}
      />
      {error && <div className={styles['form-error']}>{error}</div>}
    </div>
  )
}
