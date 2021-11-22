import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import { IRootState } from 'src/redux/store'
import { actions as authActions } from 'src/redux/auth/action'
import { signIn } from 'src/api/auth'

type AppProps = {
  children: JSX.Element | JSX.Element[]
}

const App = (props: AppProps) => {
  const dispatch = useDispatch()
  const isLoading = useSelector((state: IRootState) => state.auth.isLoading)

  const getUserData = async () => {
    const auth = getAuth()
    dispatch(authActions.actionsSetAuthIsLoading(true))
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (user?.email) {
          await signIn({ email: user.email })
            .then((res) => {
              dispatch(authActions.actionSetIsAuth(true))
              dispatch(authActions.actionSetAuthUserData(res.data.data.user))
            })
            .catch((err) => console.log(err))
        }
      }
    })

    dispatch(authActions.actionsSetAuthIsLoading(true))
  }
  useEffect(() => {
    getUserData()
  }, [])

  return (
    <>
      {props.children}
      {isLoading && console.log('isLoading')}
    </>
  )
}

export default App
