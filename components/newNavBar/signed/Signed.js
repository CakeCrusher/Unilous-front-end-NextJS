import React, {useState} from 'react'
import { connect } from 'react-redux'
import NB from '../../../styles/newNavBar.module.css'
import Link from 'next/link'
import {bindActionCreators} from 'redux'
import Notifications from '../user/Notifications'
import UserUtilities from '../user/UserUtilities'


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
    const username = props.currentUser ? props.currentUser.username : ''
    return (
        <div className={NB.userWrapper}>
            <div className={NB.userContainer}>
                <button className={NB.userOption} onClick={() => handleUserState('notification')}>
                    <div className={NB.notifContainer}>
                        <img src="/svg/bellW.svg" className={NB.bell} />
                        <div className={NB.nofifCount}>-</div>
                    </div>
                </button>
                <button className={NB.userOption} onClick={() => handleUserState('user')}>
                    <div className={NB.userInfoContainer}>
                        <div className={NB.username}>{username}</div>
                        <img src="/svg/ddW.svg" className={NB.DDArrow} />
                    </div>
                </button>
            </div>
            <div className={NB.userDD} style={showUserDD}>
                <div className="custom-hr" style={{backgroundColor: '#282828'}} />
                {showInDD}
            </div>
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