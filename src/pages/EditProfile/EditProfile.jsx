import styles from './../SignUp/SignUp.module.scss'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { authorizationSliceActions } from '../../stores/authorizationSlice'
import MyButton from '../../components/UI/Button/MyButton'

const EditProfile = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  })

  const dispatch = useDispatch()

  const userInfo = useSelector((state) => state.authorization.userInfo)

  const { UpdateUserInfo } = authorizationSliceActions

  const { username, email, token, image } = userInfo

  const onSubmit = (data) => {
    let dataUserInfo = {
      user: {
        email: data.email_adress,
        username: data.username,
        bio: '',
        image: data.avatar,
      },
    }

    if (data.password) {
      dataUserInfo.user.password = data.password
    }

    fetch('https://blog.kata.academy/api/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataUserInfo),
    })
      .then((response) => {
        if (!response.ok) {
          console.log('error')
        }
        return response.json()
      })
      .then((data) => {
        if (data.user.username !== 'is already taken.') {
          dispatch(UpdateUserInfo(data.user))
        } else if (data.errors.username !== 'is already taken.') {
          console.log('ИМЯ ЗАНЯТО')
        }
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  return (
    <>
      <div className={styles.sign_up}>
        <form className={styles.sign_up_form} onSubmit={handleSubmit(onSubmit)}>
          <span style={{ textAlign: 'center' }}>Edit Profile</span>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            defaultValue={username}
            type="text"
            {...register('username', {
              minLength: {
                value: 3,
                message: 'Мнимум 3 символов',
              },
              maxLength: {
                value: 20,
                message: 'Максимум 20 символов',
              },
            })}
          />
          <div>
            {errors.username && (
              <p className={styles.errorForm}>{errors.username.message}</p>
            )}
          </div>

          <label htmlFor="email_adress">Email adress</label>
          <input
            id="email_adress"
            defaultValue={email}
            type="email"
            {...register('email_adress', {
              pattern: {
                value: /[A-Za-z]\S+@\S+\.\S+/,
                message: 'Введите коректный емаил',
              },
            })}
          />
          <div>
            {errors.email_adress && (
              <p className={styles.errorForm}>{errors.email_adress.message}</p>
            )}
          </div>

          <label htmlFor="password">Password</label>
          <input
            id="password"
            placeholder="New password"
            type="password"
            {...register('password', {
              minLength: {
                value: 6,
                message: 'пароль должен содержать от 6 до 40 символов',
              },
            })}
          />
          <div>
            {errors.password && (
              <p className={styles.errorForm}>{errors.password.message}</p>
            )}
          </div>

          <label htmlFor="avatar">Password</label>
          <input
            id="avatar"
            placeholder="Avatar image"
            defaultValue={image}
            {...register('avatar', {})}
          />
          <MyButton style={{ width: `100%` }} type="submit">
            Save
          </MyButton>
        </form>
      </div>
    </>
  )
}

export default EditProfile
