import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useQuery } from '@apollo/react-hooks'
import { FIND_USER } from '../../../schemas/queries'
import { setCurrentUser } from '../../../redux/reducers/currentUser'
import { clearToken } from '../../../redux/reducers/token'
import UserNotifList from '../utilities/UserNotifList'
import UserSP from '../utilities/UserSP'
import UU from '../../../styles/user/userUtilities.module.css'
import UR from '../../../styles/user/user.module.css'
import {bindActionCreators} from 'redux'
import Link from 'next/link'

const Logged = (props) => {
    const [showUtilities, setShowUtilities] = useState(true)
    const [utilityShown, setUtilityShown] = useState('')

    const currentUserUN = localStorage.getItem('username') ? localStorage.getItem('username') : 'fakeUser'
    const userQuery = useQuery(FIND_USER, {
        variables: {username: currentUserUN}
    })
    const userQueryConditions = () => {
        const query = userQuery.data
        const reducer = props.currentUser
        if (!query) { return null }
        if (!query.findUser) { return null }
        if (reducer) {
            if (query.findUser.username === reducer.username) { return null }
        }
        return query.findUser
    }
    const userResult = userQueryConditions()

    useEffect(() => {
        if (userResult) {
            props.setCurrentUser(userResult)
        }
    }, [props, props.currentUser, userResult])

    if (!props.currentUser) {
        return (
            <div className={`${UR.userContainer} ${UR.LGDUserContainer}`}>
                <div className={UR.userOptionsSplitter}>
                    <div className={UR.userIconContainer}>
                        {/* <img src="/svg/userW.svg" className="user-icon" alt="user" /> */}
                    </div>
                </div>
                <div className={UR.userBanner}>
                </div>
            </div>
        )
    }
    
    const logout = () => {
        localStorage.clear()
        props.clearToken()
    }

    const changeUtilityShown = (changeTo) => {
        if (changeTo === utilityShown) {
            setUtilityShown(null)
        }
        else {
            setUtilityShown(changeTo)
        }
        setShowUtilities(true)
    }
    const changeShowUtilities = (changeTo) => {
        if (!changeTo) {
            setShowUtilities(changeTo)
            setUtilityShown(null)
        }
        else {
            setShowUtilities(changeTo)
        }
    }
    const usernameIcon = props.currentUser.username.substr(0, 1).toUpperCase()

    const iconToShow = showUtilities ?
        <Link href="/user/[username" as={`/user/${encodeURIComponent(props.currentUser.username)}`}>
            <a className={`${UR.userIconContainer} ${UR.UICH} neutralize-link`}>
                <h1 className={`${UR.userUsernameIcon} ${UR.userIconHover}`}>{usernameIcon}</h1>
            </a>
        </Link>
        :
        <Link href="/user/[username]" as={`/user/${encodeURIComponent(props.currentUser.username)}`}>
            <a className="user-icon-container UICH">
                <img src="/svg/userW.svg" className={`${UR.userIcon} ${UR.userIconHover}`} alt="user" />
            </a>
        </Link>

    const basicStyles = {user: {className: '', icon: "/svg/userSB.svg"}, notifications: {className: '', icon: "/svg/bellB.svg"}, following: {className: '', icon: "/svg/heartB.svg"}}
    if (utilityShown === 'user') { basicStyles.user = {className: UR.UUOSelected, icon: "/svg/userW.svg"}}
    if (utilityShown === 'notifications') { basicStyles.notifications = {className: UR.UUOSelected, icon: "/svg/bellW.svg"}}
    if (utilityShown === 'following') { basicStyles.following = {className: UR.UUOSelected, icon: "/svg/heartW.svg"}}
    
    const pendingNotifStats = props.currentUser && props.currentUser.pendingNotifications > 0 ?
        [UR.PNBubble, props.currentUser.pendingNotifications] : [null, null]

    const showInBanner = showUtilities ?
        <React.Fragment>
            <Link href="/postformpage" >
                <a className={`${UR.UUAddPost} ${UR.userUtilityOption} neutralize-link`} style={{gridColumn: '1/3'}}>
                    <img src="/svg/plusB.svg" className={UR.UUAPIcon} alt="add post"/>
                    <h4 className={UR.UUAPText}>add post</h4>
                </a>
            </Link>
            <Link href="/user/[username]" as={`/user/${props.currentUser.username}`} >
                <a className={`${UR.userUtilityOption} ${basicStyles.user.className}`}><img src={basicStyles.user.icon} className={UR.UUIcon} alt="user" /></a>
            </Link>
            <div onClick={() => changeUtilityShown('notifications')} className={`${UR.userUtilityOption} ${UR.PNContainer} ${basicStyles.notifications.className}`}>
                <img src={basicStyles.notifications.icon} className={UR.UUIcon} alt="notifications" />
                <div className={pendingNotifStats[0]}>{pendingNotifStats[1]}</div>
            </div>
            <div onClick={() => changeUtilityShown('following')} className={`${UR.userUtilityOption} ${basicStyles.following.className}`}>
                <img src={basicStyles.following.icon} className={UR.UUIcon} alt="follow" />
            </div>
            <div onClick={() => logout()} className={`${UR.userUtilityOption} ${UR.UULogout}`}>
                <img src="/svg/exitB.svg" className={UR.UULogoutIcon} alt="log out" />
            </div>
        </React.Fragment>
        :
        <div onClick={() => changeShowUtilities(!showUtilities)} className={`${UR.userUsernameContainer} ${UR.SUH}`}><h2 className="user-username">{props.currentUser.username}</h2></div>

    const showBubble = showUtilities ?
        <div />
        :
        <div onClick={() => changeUtilityShown('notifications')} className={UR.userNotificationBubble}>4</div>


    const showUtilityContent = utilityShown ? 
        {display: 'block'} : {display: 'none'}

    const utilityContent = () => {
        // if (utilityShown === 'user') {
        //     return <div><UserInfo /></div>
        // }
        if (utilityShown === 'notifications') {
            return <UserNotifList />
        }
        if (utilityShown === 'following') {
            return <UserSP />
        }
        return null
    }
    
    return (
        <div className={`${UR.userContainer} ${UR.LGDUserContainer}`}>
            <div className={UR.userOptionsSplitter}>
                {iconToShow}
            </div>
            <div className={UR.userBanner}>
                {showInBanner}
            </div>
            {showBubble}
            <div className={UR.UUUtilitiesSplitter} style={showUtilityContent}/>
            <div className={UR.UUContentContainer} style={showUtilityContent}>
                <h3>{utilityShown}</h3>
                {utilityContent()}
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
	return {
        currentUser: state.currentUser
	}
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearToken: bindActionCreators(clearToken, dispatch),
        setCurrentUser: bindActionCreators(setCurrentUser, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Logged)