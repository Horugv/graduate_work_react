import { useState, useRef, useEffect } from 'react'
import GoogleMapReact, { MapOptions } from 'google-map-react'
import { useDispatch, useSelector } from 'react-redux'

import { MarkerType } from 'src/api/markers/types'
import { IRootState } from 'src/redux/store'
import * as actionsGlobal from 'src/redux/global/action'
import * as actionsModals from 'src/redux/modals/action'
import * as actionsMapMarkers from 'src/redux/mapMarkers/action'
import { useCurrentLocation } from 'src/helpers/useGetCurrentLocation'

import { Marker } from 'src/components/Marker'
import { MarkerUser } from 'src/components/Marker/User'
import { Button } from 'src/components/Form/Button'

import { mockPoint } from './points'

import styles from './index.module.scss'
import { Col } from 'react-bootstrap'

interface IMaps {
  DirectionsService?: any
  DirectionsRenderer?: any
  Polyline?: any
  LatLngBounds?: any
  LatLng?: any
  TravelMode?: any
  DirectionsStatus?: any
}

interface IMap extends MapOptions {
  fitBounds: any
  center: {
    lat: () => number
    lng: () => number
  }
}

interface IMapRefTypeCurrent extends GoogleMapReact {
  map_: IMap
  maps_: IMaps
}

interface MapRefType {
  current: IMapRefTypeCurrent | null
}

export type PointType = {
  lat: number
  lng: number
}

type RoutePolylineType = {
  current: any | null
  setMap?: any
}

const geolocationOptions = {
  timeout: 1000 * 60 * 1,
}

const GoogleMaps = () => {
  const apiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY || ''
  const dispatch = useDispatch()
  const isAddPointShow = useSelector(
    (state: IRootState) => state.global.isAddPointShow
  )
  const { isLoading, dataList } = useSelector(
    (state: IRootState) => state.mapMarker
  )
  const { location: userDefaultLocation } =
    useCurrentLocation(geolocationOptions)
  const [userLocation, setUserLocation] = useState<PointType | null>(null)
  const [selectedCoord, setSelectedCoord] = useState({
    lat: 0,
    lng: 0,
  })
  const [center, setCenter] = useState({
    lat: 48.921797131665286,
    lng: 24.703893728137896,
  })
  const [points, setPoints] = useState<MarkerType[]>([])
  const mapRef: MapRefType | null = useRef(null)
  const routePolyline: RoutePolylineType = useRef()

  // todo for route on map
  const apiIsLoaded = (map: IMap, maps: IMaps) => {
    if (window?.google && userLocation) {
      const directionsService = new maps.DirectionsService()
      const directionsRenderer = new maps.DirectionsRenderer()
      directionsRenderer.setMap(map)
      const origin = { lat: userLocation.lat, lng: userLocation.lng }
      const destination = { lat: selectedCoord.lat, lng: selectedCoord.lng }
      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: maps.TravelMode.WALKING,
        },
        (result: any, status: any) => {
          if (status === maps.DirectionsStatus.OK) {
            if (routePolyline?.current) {
              routePolyline.current.setMap(null)
            }
            routePolyline.current = new maps.Polyline({
              path: result.routes[0].overview_path,
              strokeColor: '#04009a',
              strokeOpacity: 1.0,
              strokeWeight: 4,
            })
            console.log(result)
            routePolyline.current.setMap(map)
          } else {
            console.error(`error fetching directions ${result}`)
          }
        }
      )
      if (mapRef) {
        const bounds = new maps.LatLngBounds()
        bounds.extend(new maps.LatLng(userLocation.lat, userLocation.lng))
        bounds.extend(new maps.LatLng(selectedCoord.lat, selectedCoord.lng))
        map.fitBounds(bounds)
        setCenter({
          lat: (userLocation.lat + selectedCoord.lat) / 2,
          lng: (userLocation.lng + selectedCoord.lng) / 2,
        })
      }
    }
  }

  useEffect(() => {
    if (mapRef?.current) {
      const refValue = mapRef?.current
      if (refValue?.map_ && refValue?.maps_) {
        if (window?.google) {
          apiIsLoaded(refValue?.map_, window?.google?.maps)
        }
      }
    }
  }, [selectedCoord])

  useEffect(() => {
    if (userDefaultLocation) {
      setUserLocation(userDefaultLocation)
      setCenter(userDefaultLocation)
    }
  }, [userDefaultLocation])

  const onCoordClick = (lat: number, lng: number) => {
    if (userLocation) {
      setSelectedCoord({
        lat,
        lng,
      })
    }
  }

  useEffect(() => {
    dispatch(actionsMapMarkers.actions.actionGetDataList())
  }, [])

  useEffect(() => {
    setPoints([...dataList])
  }, [dataList])

  const _handleCloseAddPoint = () => {
    dispatch(actionsGlobal.actions.actionSetIsAddPointShowAction(false))
  }

  const _handleShowModalAddPoint = () => {
    dispatch(actionsGlobal.actions.actionSetIsAddPointShowAction(false))
    dispatch(
      actionsModals.actions.actionSetIsModalAddPointOpen({
        isOpen: true,
        coord: {
          lat: mapRef.current?.map_?.center?.lat(),
          lng: mapRef.current?.map_?.center?.lng(),
        },
      })
    )
  }

  return (
    <div className={styles.map}>
      <GoogleMapReact
        bootstrapURLKeys={{
          language: 'uk',
          region: 'uk',
          key: apiKey,
          libraries: ['places'],
        }}
        options={{
          zoomControl: false,
          fullscreenControl: false,
        }}
        defaultCenter={{
          lat: 48.921797131665286,
          lng: 24.703893728137896,
        }}
        defaultZoom={14}
        center={center}
        ref={mapRef}
        // yesIWantToUseGoogleMapApiInternals
      >
        {userLocation && (
          <MarkerUser lat={userLocation.lat} lng={userLocation.lng} />
        )}
        {points.length &&
          points.map((point) => (
            <Marker
              lat={point.latitude}
              lng={point.longitude}
              type="Тип"
              title={point?.name}
              text={point?.description}
              onCoordClick={onCoordClick}
              key={point?._id}
            />
          ))}
      </GoogleMapReact>
      {isAddPointShow && (
        <div className={styles['map-overlay']}>
          <div className={styles['map-overlay__title']}>
            Вибрати місце на мапі
          </div>
          <div className={styles['map-overlay__marker']}>
            <img
              src={require('src/assets/images/pin-add-point.svg').default}
              alt="point"
            />
          </div>
          <div className={styles['map-overlay__button']}>
            <Col xs={6}>
              <Button
                onClick={() => _handleCloseAddPoint()}
                title="Скасувати"
                color="white"
              />
            </Col>
            <Col xs={6}>
              <Button
                onClick={() => _handleShowModalAddPoint()}
                title="Додати"
              />
            </Col>
          </div>
        </div>
      )}
    </div>
  )
}
export default GoogleMaps
