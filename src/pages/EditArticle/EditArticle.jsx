import FormArtical from '../../components/UI/FormArticle/FormArticle'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Redirect } from 'react-router-dom'

const EditArticle = () => {
  const [tags, setTags] = useState()

  const updateTags = (data) => {
    const arr = []
    data.map((el) => arr.push(el.value))
    setTags(arr)
  }

  const editArticle = useSelector((state) => state.editArticle.editArticle)
  const { slug, title, description, body, tagList } = editArticle

  const [isSucces, setSucces] = useState(false)

  const userInfo = useSelector((state) => state.authorization.userInfo)
  const { token } = userInfo

  const submitArticle = async (data) => {    
    let dataArticle = {
      article: {
        title: data.title,
        description: data.description,
        body: data.body,
        tagList: tags,
      },
    }

    const response = await fetch(
      `https://blog.kata.academy/api/articles/${slug}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataArticle),
      }
    )
    if (response.ok) {
      setSucces(true)
    }
  }

  return (
    <>
      {isSucces && <Redirect to={`/`} />}
      <FormArtical
        titleForm="Edit Article"
        title={title}
        description={description}
        body={body}
        onSubmit={submitArticle}
        tags={tagList}
        updateTags={updateTags}
      />
    </>
  )
}

export default EditArticle
