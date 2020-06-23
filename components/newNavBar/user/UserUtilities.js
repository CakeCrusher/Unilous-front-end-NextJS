import React, {useState} from 'react'
import { connect } from 'react-redux'
import NB from '../../../styles/newNavBar.module.css'
import Link from 'next/link'
import {clearToken} from '../../../redux/reducers/token'
import {bindActionCreators} from 'redux'

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
    const logout = () => {
        localStorage.clear()
        props.clearToken()
    }
    const username = props.currentUser ? props.currentUser.username : ''
    return (
        <div>
            <h2>{username}</h2>
            <Link href="/user/[username]" as={`/user/${decodeURIComponent(props.currentUser.username)}`}>
                <a className="neutralize-link" style={{color: 'white'}}><h3 className={NB.ddOption}>account details</h3></a>
            </Link>
            <h3 className={NB.ddOption} onClick={() => logout()} style={{color: 'rgb(254,52,77)'}}>sign out</h3>
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
        clearToken: bindActionCreators(clearToken, dispatch),
        // resetAlert: bindActionCreators(resetAlert, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Signed)