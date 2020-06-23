import React, {useState} from 'react'
import { connect } from 'react-redux'
import NB from '../../../styles/newNavBar.module.css'
import Link from 'next/link'
import {bindActionCreators} from 'redux'
import UserNotifList from '../../user/utilities/UserNotifList'

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

    return (
        <div>
            <img src="/svg/bellW.svg" className={NB.titleBell} />
            <UserNotifList />
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