import styles from './Header.module.scss'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { authorizationSliceActions } from '../../stores/authorizationSlice'
import { useHistory } from 'react-router-dom'

const Header = ({ title, textArtical }) => {
  const dispatch = useDispatch()
  const { LogOut } = authorizationSliceActions
  const authorizationStatus = useSelector(
    (state) => state.authorization.authorization
  )
  const userInfo = useSelector((state) => state.authorization.userInfo)
  const history = useHistory()

  const logOut = () => {
    dispatch(LogOut())
    localStorage.removeItem('userInfo')
    localStorage.removeItem('userData')
    localStorage.removeItem('authorizationStatus')
    history.push('/home')
  }

  return (
    <div className={styles.header}>
      <Link to="/home" className={styles.logo_text}>
        Realworld Blog
      </Link>
      <div className={styles.sign_link}>
        {!authorizationStatus && (
          <>
            <Link to="/sign-in" className={styles.sign_in}>
              Sign In
            </Link>
            <Link to="/sign-up" className={styles.sign_up}>
              Sign Up
            </Link>
          </>
        )}
        {authorizationStatus && userInfo && (
          <>
            <Link to="/new-article" className={styles.create_article}>
              Create Article
            </Link>
            <Link to="/profile" className={styles.username}>
              {userInfo.username}
            </Link>
            <Link to="/profile">
              <img className={styles.avatar} src={userInfo.image} alt="logo" />
            </Link>
            <button onClick={logOut} className={styles.logout}>
              Log Out
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Header
