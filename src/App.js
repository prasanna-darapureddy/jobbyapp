import {BrowserRouter, Route, Switch} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import AllJobsPage from './components/AllJobsPage'
import JobItemDetails from './components/JobItemDetails'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={AllJobsPage} />
      <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
    </Switch>
  </BrowserRouter>
)

export default App
