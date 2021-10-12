import {
  ReactGoogleAutocompleteInputProps,
  usePlacesWidget,
} from 'react-google-autocomplete'

export const useGoogleAutocomplete = (
  props: ReactGoogleAutocompleteInputProps
) => {
  return usePlacesWidget({
    apiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY || '',
    ...props,
  })
}
