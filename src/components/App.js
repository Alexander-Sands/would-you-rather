import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Login from './pages/Login'
import Home from './pages/Home'
import NewQuestion from './pages/NewQuestion'
import LeaderBoard from './pages/LeaderBoard'
import Nav from './common/Nav'
import ViewCard from './common/ViewCard'
import NotFound from './common/NotFound'
import LoadingBar from 'react-redux-loading'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    const { authedUser } = this.props
    return (
      <Router>
        <div className="App">
          <LoadingBar />
          <Nav />
          {authedUser === null ? (
            <Route component={Login} />
          ) : (
            <Fragment>
              <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/add' exact component={NewQuestion} />
                <Route path='/questions/:id' component={ViewCard} />
                <Route path='/leaderboard' exact component={LeaderBoard} />
                <Route path='/*' component={NotFound} />
              </Switch>              
            </Fragment>
          )}
        </div>
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(App) 