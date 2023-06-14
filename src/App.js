import './App.css'
import { Route, Switch, Redirect } from 'react-router-dom/cjs/react-router-dom'
import HomeList from './pages/HomeList/HomeList'
import FullArtical from './pages/FullArtical/FullArticall'
import Header from './pages/Header/Header'
import SignUp from './pages/SignUp/SignUp'
import SignIn from './pages/SignIn/SignIn'
import EditProfile from './pages/EditProfile/EditProfile'
import CreateArticle from './pages/NewArticle/CreateArticle'
import EditArticle from './pages/EditArticle/EditArticle'

function App() {
  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home">
          <HomeList />
        </Route>
        <Route path="/artical/:articalId">
          <FullArtical />
        </Route>
        <Route path="/sign-up">
          <SignUp />
        </Route>
        <Route path="/sign-in">
          <SignIn />
        </Route>
        <Route path="/profile">
          <EditProfile />
        </Route>
        <Route path="/new-article">
          <CreateArticle />
        </Route>
        <Route path="/articles/:slug/edit" component={EditArticle}>
          <EditArticle />
        </Route>
        <Redirect to="/home" />
      </Switch>
    </div>
  )
}

export default App
