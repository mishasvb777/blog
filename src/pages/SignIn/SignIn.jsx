import styles from '../SignUp/SignUp.module.scss'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import { useForm } from 'react-hook-form'
import { authorization } from '../../stores/authorizationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import MyButton from '../../components/UI/Button/MyButton'

const SignIn = () => {
  const dispatch = useDispatch()

  const authorizationStatus = useSelector(
    (state) => state.authorization.authorization
  )
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onBlur',
  })

  const onSubmit = async (data) => {
    await dispatch(authorization(data))
    reset()
  }

  return (
    <>
      {!authorizationStatus && (
        <div className={styles.sign_up}>
          <span className={styles.form_article}>Sign In</span>
          <form
            className={styles.sign_up_form}
            onSubmit={handleSubmit(onSubmit)}
          >
            <label htmlFor="email_adress">Email adress</label>
            <input
              id="email_adress"
              placeholder="Email adress"
              type="email"
              {...register('email_adress', {
                required: 'Поле обязательное к заполнению',
                pattern: {
                  value: /[A-Za-z]\S+@\S+\.\S+/,
                  message: 'Введите коректный емаил',
                },
              })}
            />
            <div>
              {errors.email_adress && (
                <p className={styles.errorForm}>
                  {errors.email_adress.message}
                </p>
              )}
            </div>

            <label htmlFor="password">Password</label>
            <input
              id="password"
              placeholder="Password"
              type="password"
              {...register('password', {
                required: 'Поле обязательное к заполнению',
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
            <MyButton style={{ width: '100%' }}>Login</MyButton>
            <span className={styles.form_footer}>
              Don’t have an account? <Link to="/sign-up">Sign Up.</Link>
            </span>
          </form>
        </div>
      )}
      {authorizationStatus && <Redirect to="/home" />}
    </>
  )
}

export default SignIn
