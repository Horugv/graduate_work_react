import { useState } from 'react'
import GoogleMapReact from 'google-map-react'

import styles from './index.module.scss'

const GoogleMaps = () => {
  const [currentLocation, setCurrentLocation] = useState({
    lat: 48.921797131665286,
    lng: 24.703893728137896,
  })
  const apiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY || ''

  // todo for route on map
  // const apiIsLoaded = (map, maps) => {
  //   const directionsService = new google.maps.DirectionsService();
  //   const directionsRenderer = new google.maps.DirectionsRenderer();
  //   directionsRenderer.setMap(map);
  //   const origin = { lat: 40.756795, lng: -73.954298 };
  //   const destination = { lat: 40.756795, lng: -74.954298 };

  //   directionsService.route(
  //     {
  //       origin: origin,
  //       destination: destination,
  //       travelMode: google.maps.TravelMode.DRIVING,
  //     },
  //     (result, status) => {
  //       if (status === google.maps.DirectionsStatus.OK) {
  //         directionsRenderer.setDirections(result);
  //       } else {
  //         console.error(`error fetching directions ${result}`);
  //       }
  //     }
  //   );
  // };
  return (
    <div className={styles.map}>
      <GoogleMapReact
        bootstrapURLKeys={{ language: 'uk', region: 'uk', key: apiKey }}
        options={{
          zoomControl: false,
          fullscreenControl: false,
        }}
        defaultCenter={currentLocation}
        defaultZoom={14}
        center={currentLocation}
        // yesIWantToUseGoogleMapApiInternals
        // onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
      />
    </div>
  )
}
export default GoogleMaps
