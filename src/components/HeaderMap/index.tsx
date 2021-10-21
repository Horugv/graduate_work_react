import { useSelector } from 'react-redux'

import { IRootState } from 'src/redux/store'

import Menu from './Menu'
import User from './User'

const HeaderMap = () => {
  const isAddPointShow = useSelector(
    (state: IRootState) => state.global.isAddPointShow
  )
  return (
    <>
      {!isAddPointShow && (
        <>
          <Menu />
          <User />
        </>
      )}
    </>
  )
}

export default HeaderMap
