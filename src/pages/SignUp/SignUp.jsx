import styles from './SignUp.module.scss'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import { useForm } from 'react-hook-form'
import MyButton from '../../components/UI/Button/MyButton'

const SignUp = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm({
    mode: 'onBlur',
  })

  const password = watch('password')
  const agreeChecked = watch('agreement')

  const onSubmit = (data) => {
    fetch('https://blog.kata.academy/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username: data.username,
          email: data.email_adress,
          password: data.password,
        },
      }),
    })
      .then((response) => {
        if (!response.ok) {
          alert('Email или UserName занят, выберите другое')
        }
        return response.json()
      })
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
    reset()
  }

  return (
    <div className={styles.sign_up}>
      <span className={styles.form_article}>Create new account</span>
      <form className={styles.sign_up_form} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          placeholder="Username"
          type="text"
          {...register('username', {
            required: 'Поле обязательное к заполнению',
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
            <p className={styles.errorForm}>{errors.email_adress.message}</p>
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

        <label htmlFor="repeat_password">Repeat Password</label>
        <input
          id="repeat_password"
          placeholder="Password"
          type="password"
          {...register('repeat_password', {
            required: 'Поле обязательное к заполнению',
            validate: (value) => value === password || 'Пароли не совпадают',
          })}
        ></input>
        <div>
          {errors.repeat_password && (
            <p className={styles.errorForm}>{errors.repeat_password.message}</p>
          )}
        </div>
        <div className={styles.agreement_wrapper}>
          <label htmlFor="agreement">
            I agree to the processing of my personal information
          </label>
          <input
            id="agreement"
            type="checkbox"
            {...register('agreement', {
              required: 'Примите соглашение',
              validate: (value) => value === agreeChecked,
            })}
          />
        </div>
        <div>
          {errors.agreement && (
            <p className={styles.errorForm}>{errors.agreement.message}</p>
          )}
        </div>
        <MyButton style={{ width: '100%' }}>Create</MyButton>
        <span className={styles.form_footer}>
          Already have an account? <Link to="/sign-in">Sign In.</Link>
        </span>
      </form>
    </div>
  )
}

export default SignUp
