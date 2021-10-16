import { useEffect, useState } from 'react'

import { PointType } from 'src/components/Map/index'

type SuccessType = {
  coords: {
    latitude: number
    longitude: number
  }
}

type ErrorType = {
  code: number
  message: string
}

export const useCurrentLocation = (options = {}) => {
  const [error, setError] = useState('')
  const [location, setLocation] = useState<PointType | null>(null)

  const handleSuccess = (props: SuccessType) => {
    const { latitude, longitude } = props.coords

    setLocation({
      lat: latitude,
      lng: longitude,
    })
  }

  const handleError = (props: ErrorType) => {
    setError(props.message)
  }

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported.')
    } else {
      navigator.geolocation.getCurrentPosition(
        handleSuccess,
        handleError,
        options
      )
    }
  }, [options])

  return { location, error }
}
