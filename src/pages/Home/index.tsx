import HeaderMap from 'src/components/HeaderMap'
import Map from 'src/components/Map'
import { ModalFilter } from 'src/components/Modals/ModalFilter'
import { ModalsAddPoint } from 'src/components/Modals/ModalsAddPoint'

import styles from './index.module.scss'

const Home = () => {
  return (
    <div className={styles.home}>
      <HeaderMap />
      <Map />
      <ModalFilter />
      <ModalsAddPoint />
    </div>
  )
}

export default Home
