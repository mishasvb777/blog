import styles from './Artical.module.scss'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { format } from 'date-fns'
import Likes from '../../components/Likes/Likes'

const Artical = ({ slug, linkStatus }) => {
  const [dataArticle, setDataArticle] = useState(false)
  const [like, setLike] = useState(dataArticle.favorited)
  const userInfo = useSelector((state) => state.authorization.userInfo)
  const authorizationStatus = useSelector(
    (state) => state.authorization.authorization
  )

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

  const handleLike = (value) => {
    setLike(value)
  }

  useEffect(() => {
    getArticalsDeteils()
  }, [like])

  const link = `/artical/${slug}`
  return (
    <>
      <div className={styles.artical}>
        {!dataArticle && <p>Загрузка</p>}
        {dataArticle && (
          <>
            <div className={styles.artical_header}>
              <div className={styles.artical_header_articalinfo}>
                {dataArticle.title && linkStatus && (
                  <Link to={link} className={styles.title}>
                    {dataArticle.title}
                  </Link>
                )}
                {!dataArticle.title && (
                  <p className={styles.title}>{dataArticle.title}</p>
                )}

                <Likes
                  dataArticle={dataArticle}
                  slug={slug}
                  setLikes={handleLike}
                />

                {dataArticle.tagList[0] !== '' && (
                  <div>
                    {dataArticle.tagList.map((el) => (
                      <span className={styles.tag} key={Math.random()}>
                        {el}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className={styles.artical_header_publicinfo}>
                <div className={styles.artical_header_publicinfo_userdata}>
                  <span className={styles.username}>
                    {dataArticle.author.username}
                  </span>
                  <span className={styles.data}>
                    {dataArticle.updatedAt &&
                      format(new Date(dataArticle.updatedAt), 'MMMM d, yyyy')}
                  </span>
                </div>
                <img
                  className={styles.artical_header_publicinfo_avatar}
                  src={dataArticle.author.image}
                  alt="avatar"
                />
              </div>
            </div>
            <p className={styles.description_artical}>
              {dataArticle.description}
            </p>
          </>
        )}
      </div>
    </>
  )
}

export default Artical
