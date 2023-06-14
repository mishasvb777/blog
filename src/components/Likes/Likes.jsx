import React from 'react'
import styles from '../../pages/HomeList/Artical.module.scss'
import { useSelector } from 'react-redux'
import heart from '../../assets/heart.svg'
import heart_active from '../../assets/heart_active.svg'

const Likes = ({ dataArticle, slug, setLikes }) => {
  const authorizationStatus = useSelector(
    (state) => state.authorization.authorization
  )
  const userInfo = useSelector((state) => state.authorization.userInfo)

  const setFavoriteArticle = async () => {
    if (authorizationStatus) {
      const response = await fetch(
        `https://blog.kata.academy/api/articles/${slug}/favorite`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'Application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      )
      const data = await response.json()
      if (response.ok) {
        setLikes(true)
      }
      return data
    } else {
      alert('Авторизируйтесь чтобы поставить лайк')
    }
  }

  const deletFavoriteAcrtical = async () => {
    if (authorizationStatus) {
      const response = await fetch(
        `https://blog.kata.academy/api/articles/${slug}/favorite`,
        {
          method: 'DELETE',
          headers: {
            'Content-type': 'Application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      )
      const data = await response.json()
      if (response.ok) {
        setLikes(false)
      }
      return data
    } else {
      alert('Авторизируйтесь чтобы удалить лайк')
    }
  }

  return (
    <>
      <img
        src={!dataArticle.favorited ? heart : heart_active}
        className={`${styles.like} ${
          authorizationStatus && dataArticle.favorited && styles.like_active
        }`}
        onClick={
          (dataArticle.favorited && deletFavoriteAcrtical) ||
          (!dataArticle.favorited && setFavoriteArticle)
        }
        alt="like"
      />
      <span>{dataArticle.favoritesCount}</span>
    </>
  )
}

export default Likes
