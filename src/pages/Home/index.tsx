import HeaderMap from 'src/components/HeaderMap'
import Map from 'src/components/Map'

import styles from './index.module.scss'

const Home = () => {
  return (
    <div className={styles.home}>
      <HeaderMap />
      <Map />
    </div>
  )
}

export default Home
