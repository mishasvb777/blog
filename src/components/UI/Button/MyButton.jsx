import styles from './MyButton.module.scss'

const MyButton = ({children, style}) => {
  return (
    <button className={styles.button} style={style} type="submit">
      {children}
    </button>
  )
}

export default MyButton