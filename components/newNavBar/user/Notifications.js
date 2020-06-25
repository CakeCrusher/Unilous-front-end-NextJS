import React, {useState} from 'react'
import { connect } from 'react-redux'
import NB from '../../../styles/newNavBar.module.css'
import Link from 'next/link'
import {bindActionCreators} from 'redux'
import UserNotifList from '../../user/utilities/UserNotifList'
import Notif from './NewNotif'

const Signed = (props) => {
    const [userState, setUserState] = useState(false)
    const handleUserState = (state) => {
        if (state === userState) {setUserState(false)}
        else {setUserState(state)}
    }
    const showUserDD = userState ? {display: 'block'} : {display: 'none'}
    const showInDD = userState ? 
        userState === 'notification' ? <Notifications /> : <UserUtilities />
    : null

    const notifData = {
        notifications: [
            {
                user_from: {
                    username: "John"
                },
                type: "join request",
                message: "John wants to Join your project and offers the 'Job1' skill",
                link: "/",
                read: false,
                date: "1587860506318",
                post: {
                    title: "This is a project",
                    user: {
                        username: "Meseeks"
                    },
                    color: "rgb(0,255,0)"
                }
            },
            {
                user_from: {
                    username: "Poopy"
                },
                type: "question",
                message: "Poopy asks: Do you have a but?",
                link: "/",
                read: true,
                date: "1587860506318",
                post: {
                    title: "This is a project",
                    user: {
                        username: "Meseeks"
                    },
                    color: "rgb(255,0,0)"
                }
            },
        ]
    }
    const NotifList = () => {
        return notifData.notifications.map(n => <Notif notif={n} />)
    }

    return (
        <div>
            <img src="/svg/bellW.svg" className={NB.titleBell} />
            {/* <UserNotifList /> */}
            <NotifList />
        </div>
    )
}

const mapStateToProps = (state) => {
	return {
        currentUser: state.currentUser,
        token: state.token,
        // alertNotif: state.alertNotif
	}
}

const mapDispatchToProps = (dispatch) => {
    return {
        // clearToken: bindActionCreators(clearToken, dispatch),
        // resetAlert: bindActionCreators(resetAlert, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Signed)