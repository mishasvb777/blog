import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import store from './stores'
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min'
import { Provider } from 'react-redux'


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>  
)


