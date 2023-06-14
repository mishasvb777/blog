import { configureStore } from '@reduxjs/toolkit'
import articalsSlice from './articleSlice'
import authorizationSlice from './authorizationSlice'
import editArticleSlice from './editArticleSlice'

const store = configureStore({
  reducer: {
    articles: articalsSlice.reducer,
    authorization: authorizationSlice.reducer,
    editArticle: editArticleSlice.reducer,
  },
})

export default store
