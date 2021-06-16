import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAuthedUser } from '../../actions/authedUser'

class Nav extends Component {
    onlogout = (e) => {
        e.preventDefault()
        this.props.dispatch(setAuthedUser(null))
    }
    render() { 
        const { name, avatar } = this.props
        return (
            <header>
                <div className="header">
                    <h1>React App</h1>
                    <h2>Would You Rather?</h2>
                </div>
                <nav>
                    <div className="container">
                        <div className="nav">
                            <ul>
                                <li>
                                <NavLink exact to='/' activeClassName='active'>
                                    Home
                                </NavLink>
                                </li>
                                <li>
                                <NavLink exact to='/add' activeClassName='active'>
                                    New Question
                                </NavLink>
                                </li>
                                <li>
                                <NavLink exact to='/leaderboard' activeClassName='active'>
                                    Leader Board
                                </NavLink>
                                </li>
                            </ul>
                            <div className="user">
                                {(name === null) ? null : 
                                    <Fragment>
                                        <p>Hello, <span>{name}</span></p>
                                        <img className="authedUser" src={avatar} alt={`Avatar of ${name}`} />
                                        <button className="logout" onClick={this.onlogout} >Logout</button>
                                    </Fragment>
                                }
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        )
    }
}

function mapStateToProps ({ authedUser, users }) {
    let user = users[authedUser]
    return {
        name: user ? user.name : null,
        avatar: user ? user.avatarURL : null
    }
}
    
export default connect(mapStateToProps)(Nav) 
