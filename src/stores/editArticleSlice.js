import { createSlice } from '@reduxjs/toolkit'

const state = {
  editArticle: null || JSON.parse(localStorage.getItem('editArticel')),
}

const editArticalsSlice = createSlice({
  name: 'articles',
  initialState: state,
  reducers: {
    addEditArticle(state, actions) {
      localStorage.setItem('editArticel', JSON.stringify(actions.payload))
      state.editArticle = actions.payload
    },
  },
})

export const editArticlesSliseActions = editArticalsSlice.actions

export default editArticalsSlice
