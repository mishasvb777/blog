import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const state = {
  authorization: false || localStorage.getItem('authorizationStatus'),
  userInfo: null || JSON.parse(localStorage.getItem('userInfo')),
  userData: null || JSON.parse(localStorage.getItem('userData')),
}

export const authorization = createAsyncThunk(
  'authorization/authorization',
  async function (dataUser) {
    const response = await fetch('https://blog.kata.academy/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email: dataUser.email_adress,
          password: dataUser.password,
        },
      }),
    })
    try {
      const responseAuthorization = await response.json()      
      const responseUserInfo = await fetch(
        `https://blog.kata.academy/api/profiles/${responseAuthorization.user.username}`
      )
      const userInfo = await responseUserInfo.json()      
      const data = { ...responseAuthorization, ...userInfo }
      return data
    } catch (error) {
      console.log('Ошибка :', error)
    }
  }
)

export const getUserInfo = createAsyncThunk(
  'authorization/getUserInfo',
  async function (username) {
    try {
      const responseUserInfo = await fetch(
        `https://blog.kata.academy/api/profiles/${username}`
      )
      const userInfo = await responseUserInfo.json()
      return userInfo
    } catch (error) {
      console.log('Ошибка :', error)
    }
  }
)

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState: state,
  reducers: {
    LogIn(state, actions) {
      //state.authorization = true
    },
    LogOut(state, actions) {
      state.authorization = false
      state.userInfo = null
    },
    UpdateUserInfo(state, actions) {      
      state.userInfo = actions.payload
      const userInfo = JSON.stringify(actions.payload)
      localStorage.setItem('userInfo', userInfo)
    },
  },
  extraReducers: {
    [authorization.pending]: (state) => {      
    },
    [authorization.fulfilled]: (state, actions) => {      
      if (!actions.payload) {
        alert('Введены неверные данные')
      } else if (actions.payload.user) {
        state.userInfo = actions.payload.user
        const userInfo = JSON.stringify(actions.payload.user)
        localStorage.setItem('userInfo', userInfo)

        state.userInfo = JSON.parse(localStorage.getItem('userInfo'))

        const userData = JSON.stringify(actions.payload.user)
        localStorage.setItem('userData', userData)
        localStorage.setItem('authorizationStatus', true)
        state.authorization = localStorage.getItem('authorizationStatus')        
      }
    },
    [authorization.rejected]: (state, actions) => {      
    },   
  },
})

export const authorizationSliceActions = authorizationSlice.actions
export default authorizationSlice
