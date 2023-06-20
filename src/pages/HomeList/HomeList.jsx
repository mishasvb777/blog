import Artical from './Artical'
import { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getArticalsData } from '../../stores/articleSlice'
import { useState } from 'react'
import { Pagination } from 'antd'
import styles from './HomeList.module.scss'

let key = 100
const HomeList = () => {
  const [pages, setPages] = useState(localStorage.getItem('currentPage') || 0)
  const [pagePagination, setPagePagination] = useState(localStorage.getItem('pagePagination') || 1)
  const dispatch = useDispatch()
  const articles = useSelector((state) => state.articles.articles)

  useEffect(() => {
    dispatch(getArticalsData(pages))
  }, [pages])

  const pageHandler = (page) => {
    localStorage.setItem('currentPage', page)
    setPages(page)
  }

  const pagePaginationHandler = (page) => {
    localStorage.setItem('pagePagination', page)
    setPagePagination(page)
  }

  const dataArticles = articles.articles
  if (dataArticles) {
    localStorage.setItem('articles', JSON.stringify(dataArticles))
  }
  return (
    <Fragment>
      {dataArticles !== undefined &&
        dataArticles.map((artical) => (
          <Artical key={key++} slug={artical.slug} linkStatus="true" />
        ))}
      <Pagination
        className={styles.pagination}
        defaultCurrent={pagePagination}
        total={50}
        onChange={(page) => {
          pagePaginationHandler(page)
          pageHandler(page * 5 - 5)
        }}
      />
    </Fragment>
  )
}

export default HomeList
