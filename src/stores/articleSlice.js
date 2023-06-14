import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const state = {
  articles: [],
}

export const getArticalsData = createAsyncThunk(
  'articals/getArticals',
  async function (id) {
    try {
      const response = await fetch(
        `https://blog.kata.academy/api/articles?limit=5&offset=${id}`
      )
      const data = await response.json()
      return data
    } catch (error) {
      console.log('Ошибка ' + error)
    }
  }
)

const articalsSlice = createSlice({
  name: 'articles',
  initialState: state,
  reducers: {
    getArticles(state, actions) {
      state.articles = actions.payload
    },
  },
  extraReducers: {
    [getArticalsData.pending]: (state) => {},
    [getArticalsData.fulfilled]: (state, actions) => {
      state.articles = actions.payload
    },
    [getArticalsData.rejected]: (state, actions) => {},
  },
})

export const articlesSliseActions = articalsSlice.actions

export default articalsSlice
