import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import FormArtical from '../../components/UI/FormArticle/FormArticle'

const CreateArticle = () => {
  const [tags, setTags] = useState()

  const updateTags = (data) => {
    const arr = []
    data.map((el) => arr.push(el.value))
    setTags(arr)
  }

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

    const response = await fetch('https://blog.kata.academy/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataArticle),
    })
    if (response.ok) {
      setSucces(true)
    }
  }

  return (
    <>
      {isSucces && <Redirect to="/" />}
      <FormArtical
        titleForm="Create new Article"
        onSubmit={submitArticle}
        updateTags={updateTags}
      />
    </>
  )
}

export default CreateArticle
