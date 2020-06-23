import React, { useState, useEffect } from 'react'
import { setCurrentUser, setPendingNotifications, setCurrentUserNotifications } from '../redux/reducers/currentUser'
import { setToken } from '../redux/reducers/token'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
// import NavBar from './navBar/NavBar'
import NavBar from './newNavBar/NavBar'
import { FIND_USER, PENDING_NOTIFS, LIST_OF_NOTIFICATIONS } from '../schemas/queries'
import {bindActionCreators} from 'redux'
import Head from 'next/head'

const Layout = (props) => {
    const [query, setQuery] = useState('')

    const onQueryChange = (event) => {
    setQuery(event.target.value)
    }
    if (typeof window === 'undefined') return (
        <div className="wrapper">
            <NavBar query={query} onQueryChange={onQueryChange} noUser />
            {props.children}
        </div>
    )
    else {
        if (localStorage.getItem('token') && props.token === null) {
        props.setToken(localStorage.getItem('token'))
        }
        const currentUserId = props.currentUser ? props.currentUser._id : 'thisisfake'
        const pendingNotifsQuery = useQuery(PENDING_NOTIFS, {
            variables:  {userId: currentUserId}
        })
        const currentUserUN = localStorage.getItem('username') ? localStorage.getItem('username') : 'thisisfake'
        const userQuery = useQuery(FIND_USER, {
            variables: {username: currentUserUN}
        })
        const userNotifs = props.currentUser ? props.currentUser.notifications.map(n => n._id) : []
        const notifsQuery = useQuery(LIST_OF_NOTIFICATIONS, {
            variables: {notifications: userNotifs}
        })
        const notifsQueryConditions = () => {
            if (!notifsQuery.data) return null
            if (!props.currentUser) return null
            if (notifsQuery.loading) return null
            if (notifsQuery.data.listOfNotifications.length < 1) return null
            if (!props.currentUser.notifications.length) return null
            if (props.currentUser.notifications[0].userFrom) return null
            return notifsQuery.data.listOfNotifications
        }
        const pendingNotifsConditions = () => {
            if (!pendingNotifsQuery.data) return null
            if (props.currentUser && props.currentUser.pendingNotifications) return null
            return pendingNotifsQuery.data.searchAwaitingNotifs
        }
        const userConditions = (query, reducer) => {
            if (!query.data) return null
            if (!query.data.findUser) return null
            if (reducer) return null
            return query.data.findUser
        }
        const notifsFilled = notifsQueryConditions()
        const pendingNotifs = pendingNotifsConditions()
        const user = userConditions(userQuery, props.currentUser)
        useEffect(() => {
            if (user) {
                props.setCurrentUser(user)
            }
            if (pendingNotifs) {
                props.setPendingNotifications(pendingNotifs)
            }
            if (notifsFilled) {
                props.setCurrentUserNotifications(notifsFilled)
            }
        }, [notifsFilled, props.setCurrentUserNotifications, user, props.setCurrentUser, pendingNotifs, props.setPendingNotifications, props])
    
        return (
            <div className="wrapper">
                <NavBar query={query} onQueryChange={onQueryChange} />
                {props.children}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
	return {
        token: state.token,
        currentUser: state.currentUser
	}
}
const mapDispatchToProps = (dispatch) => {
    return {
        setToken: bindActionCreators(setToken, dispatch),
        setCurrentUser: bindActionCreators(setCurrentUser, dispatch),
        setPendingNotifications: bindActionCreators(setPendingNotifications, dispatch),
        setCurrentUserNotifications: bindActionCreators(setCurrentUserNotifications, dispatch),
    }
}
setCurrentUser
setPendingNotifications

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Layout)