import React, {useState} from 'react'
import { connect } from 'react-redux'
import NB from '../../../styles/newNavBar.module.css'
import Link from 'next/link'
import {bindActionCreators} from 'redux'
import Register from '../../user/form/Register'
import SignIn from '../../user/form/SignIn'
import {setUserDD, resetUserDD} from '../../../redux/reducers/userDD'

const NotSigned = (props) => {
    const handleUserState = (state) => {
        if (state === props.userDD) {props.resetUserDD()}
        else {props.setUserDD(state)}
    }

    const showUserDD = props.userDD ? {display: 'block'} : {display: 'none'}
    const showInDD = props.userDD ? 
        props.userDD === 'register' ? <Register /> :
        props.userDD === 'signin' ? <SignIn /> : null
    : null
   
    return (
        <div className={NB.userWrapper}     >
            <div className={NB.userContainer}>
                <button className={NB.signOption} onClick={() => handleUserState('signin')} >sign in</button>
                <button className={NB.signOption} onClick={() => handleUserState('register')} >register</button>
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
        userDD: state.userDD,
	}
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUserDD: bindActionCreators(setUserDD, dispatch),
        resetUserDD: bindActionCreators(resetUserDD, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NotSigned)