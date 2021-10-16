import styles from '../index.module.scss'

type MarkerUserType = {
  lat: number
  lng: number
}

export const MarkerUser = ({ lat, lng }: MarkerUserType) => {
  return (
    <div className={styles.marker}>
      <div className={styles.marker__point}>
        <span className="icon icon-pin-user"></span>
      </div>
    </div>
  )
}
