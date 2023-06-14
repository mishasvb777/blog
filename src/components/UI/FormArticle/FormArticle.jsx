import styles from './FormArticle.module.scss'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import MyButton from '../Button/MyButton'

const FormArtical = ({
  titleForm = '',
  title = '',
  description = '',
  body = '',
  onSubmit,
  updateTags,
  tags = '',
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  })
  const [inputsArr, setInputsArr] = useState([{ value: '' }])

  const handleAddInput = () => {
    setInputsArr([...inputsArr, { value: '' }])
  }

  const handleDeleteInput = (index) => {
    const newInputsArr = [...inputsArr]
    newInputsArr.splice(index, 1)
    setInputsArr(newInputsArr)
  }

  useEffect(() => {
    if (tags) {
      const newInputsArr = tags.map((tag) => ({ value: tag.trim() })) // создаем массив объектов для каждого тега
      setInputsArr(newInputsArr)
    }
  }, [tags])

  useEffect(() => {    
    updateTags(inputsArr)
  }, [inputsArr])
  
  return (
    <form className={styles.form_new_article} onSubmit={handleSubmit(onSubmit)}>
      <p className={styles.title}>{titleForm}</p>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        placeholder="Title"
        defaultValue={title}
        {...register('title', {
          required: {
            value: true,
            message: 'Поле обязательно для заполнения',
          },
        })}
      />
      <div>{errors.title && <p>{errors.title.message}</p>}</div>
      <label htmlFor="description">Short description</label>
      <input
        id="description"
        type="text"
        placeholder="Short description"
        defaultValue={description}
        {...register('description', {
          required: {
            value: true,
            message: 'Поле обязательно для заполнения',
          },
        })}
      />
      <div>{errors.description && <p>{errors.description.message}</p>}</div>

      <label htmlFor="body">Text</label>
      <textarea
        className={styles.text_area}
        id="body"
        placeholder="Text"
        rows="15"
        defaultValue={body}
        {...register('body', {
          required: {
            value: true,
            message: 'Поле обязательно для заполнения',
          },
        })}
      />
      <div>{errors.body && <p>{errors.body.message}</p>}</div>

      <div className={styles.tags_wrapper}>
        <label>Tags</label>
        <div className={styles.input_button_wrapper}>
          {inputsArr.map((input, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Tag"
                value={input.value}
                onChange={(e) => {
                  const newInputsArr = [...inputsArr]
                  newInputsArr[index].value = e.target.value
                  setInputsArr(newInputsArr)
                }}
              />
              <button
                className={styles.delete_tag}
                type="button"
                onClick={() => handleDeleteInput(index)}
              >
                Delete
              </button>
            </div>
          ))}
          <button
            className={`${inputsArr.length && styles.add_tag_pos} ${
              styles.add_tag
            }`}
            type="button"
            onClick={handleAddInput}
          >
            Add Tag
          </button>
        </div>
      </div>
      <MyButton style={{ width: 320 }}>Send</MyButton>
    </form>
  )
}

export default FormArtical
