import { useState, useRef } from 'react'

import { useClose } from 'src/helpers/useClose'

import styles from './index.module.scss'

type MarkerType = {
  lat: number
  lng: number
  type: string
  title: string
  text: string
  onCoordClick: (lat: number, lng: number) => void
}

export const Marker = ({
  lat,
  lng,
  text,
  type,
  title,
  onCoordClick,
}: MarkerType) => {
  const [isShowTooltip, setIsShowTooltip] = useState(false)
  const tooltipRef = useRef(null)
  useClose({ ref: tooltipRef, onClose: () => setIsShowTooltip(false) })
  return (
    <div className={styles.marker}>
      {isShowTooltip && text && (
        <div className={styles.marker__tooltip} ref={tooltipRef}>
          <div className={styles.marker__tooltip__inner}>
            <div className={styles.marker__tooltip__type}>{type}</div>
            <div className={styles.marker__tooltip__title}>{title}</div>
            <div className={styles.marker__tooltip__text}>{text}</div>
            <div className={styles.marker__tooltip__coords}>
              <button
                onClick={() => onCoordClick(lat, lng)}
              >{`${lat}, ${lng}`}</button>
            </div>
            {/* <div className={styles.marker__tooltip__comments}>Коментарі</div> */}
          </div>
          <button
            className={styles.marker__tooltip__close}
            onClick={() => setIsShowTooltip(false)}
          >
            <i className="icon icon-close" />
          </button>
          <div className={styles.marker__tooltip__triangle}>
            <div className={styles.marker__tooltip__triangle__block}></div>
          </div>
        </div>
      )}
      <div
        className={styles.marker__point}
        onClick={() => setIsShowTooltip(!isShowTooltip)}
      >
        <span className="icon icon-pin"></span>
      </div>
    </div>
  )
}
