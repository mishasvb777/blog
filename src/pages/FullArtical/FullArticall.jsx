import styles from './FullArtical.module.scss'
import styles_user_info from '../HomeList/Artical.module.scss'
import stylesArtical from '../HomeList/Artical.module.scss'
import { useParams } from 'react-router-dom/cjs/react-router-dom'
import { useSelector } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import { Redirect } from 'react-router-dom'
import { useState, useEffect } from 'react'
import editArticalsSlice from '../../stores/editArticleSlice'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Likes from '../../components/Likes/Likes'
import { format } from 'date-fns'
import { Button, Popconfirm } from 'antd'

const FullArtical = () => {
  const [isSucces, setSucces] = useState(false)

  const [dataArticle, setDataArticle] = useState(false)
  const [like, setLike] = useState(dataArticle.favorited)
  const [confirmationWindow, setConfirmationWindow] = useState(false)

  const authorizationStatus = useSelector(
    (state) => state.authorization.authorization
  )
  const params = useParams()

  const userInfo = useSelector((state) => state.authorization.userInfo)

  const dispatch = useDispatch()

  const { addEditArticle } = editArticalsSlice.actions

  const articles = JSON.parse(localStorage.getItem('articles'))
  const getArticle = articles.filter((el) => el.slug === params.articalId)
  const slug = getArticle[0].slug

  const getArticalsDeteils = async () => {
    if (authorizationStatus) {
      const response = await fetch(
        `https://blog.kata.academy/api/articles/${slug}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      )
      const data = await response.json()

      setDataArticle(data.article)
      return data
    } else {
      const response = await fetch(
        `https://blog.kata.academy/api/articles/${slug}`
      )
      const data = await response.json()
      setDataArticle(data.article)
      return data
    }
  }

  const userCreateArticls = getArticle[0].author.username

  //console.log(like)
  const deleteArtical = async () => {
    const response = await fetch(
      `https://blog.kata.academy/api/articles/${slug}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    )
    if (response.ok) {
      setSucces(true)
    }
  }

  const handelGetEditArticle = () => {
    dispatch(addEditArticle(getArticle[0]))
  }

  const handleLike = (value) => {
    setLike(value)
  }

  useEffect(() => {
    getArticalsDeteils()
  }, [like])

  return (
    <div>
      {!dataArticle && <p>Загрузка</p>}
      {dataArticle && (
        <div className={stylesArtical.artical}>
          {confirmationWindow && (
            <div className={styles.confirm_delete_window}>
              <div className={styles.confirm_delete_window_body}>
                <h1>Действительно хотите удалить статью?</h1>
                <button onClick={() => deleteArtical()}>Да</button>
                <button onClick={() => setConfirmationWindow(false)}>
                  Нет
                </button>
              </div>
            </div>
          )}
          {isSucces && <Redirect to="/" />}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div>
                <span className={styles.title}>{getArticle[0].title}</span>
                <Likes
                  dataArticle={dataArticle}
                  slug={slug}
                  setLikes={handleLike}
                />
              </div>
              {dataArticle.tagList[0] !== '' && (
                <div>
                  {dataArticle.tagList.map((el) => (el.length > 0 &&
                    <span className={styles_user_info.tag} key={Math.random()}>
                      {el}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className={styles_user_info.artical_header_publicinfo}>
              <div
                className={styles_user_info.artical_header_publicinfo_userdata}
              >
                <span className={styles_user_info.username}>
                  {dataArticle.author.username}
                </span>
                <span className={styles_user_info.data}>
                  {dataArticle.updatedAt &&
                    format(new Date(dataArticle.updatedAt), 'MMMM d, yyyy')}
                </span>
              </div>
              <img
                className={styles_user_info.artical_header_publicinfo_avatar}
                src={dataArticle.author.image}
                alt="avatar"
              />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 10,
            }}
          >
            <p className={styles_user_info.description_artical}>
              {dataArticle.description}
            </p>
            {userInfo && userInfo.username === userCreateArticls && (
              <div>
                <Popconfirm
                  title="Delete the task"
                  description="Are you sure to delete this article?"
                  onConfirm={() => deleteArtical()}
                  onCancel={() => setConfirmationWindow(false)}
                  okText="Yes"
                  cancelText="No"
                  className={`${styles.button} ${styles.button_delete}`}
                >
                  <Button danger>Delete</Button>
                </Popconfirm>
                <Link
                  to={`/articles/${slug}/edit`}
                  onClick={handelGetEditArticle}
                  className={`${styles.button} ${styles.button_edit}`}
                >
                  Edit Art
                </Link>
              </div>
            )}
          </div>
          <ReactMarkdown>{dataArticle.body}</ReactMarkdown>
        </div>
      )}
    </div>
  )
}

export default FullArtical
