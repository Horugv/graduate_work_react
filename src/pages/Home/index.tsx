import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from 'src/redux/store'

import { actions } from 'src/redux/global/action'

const Home = () => {
  const dispatch = useDispatch()
  const { global } = useSelector((state: IRootState) => state)
  const _handleClick = () => {
    dispatch(actions.actionIncrement())
  }
  return (
    <div className="App">
      <button onClick={_handleClick}>test</button>
    </div>
  )
}

export default Home
