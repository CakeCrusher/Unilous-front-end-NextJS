import React, { useState } from 'react'
import { connect } from 'react-redux'
import UR from '../../../styles/user/user.module.css'
// import userIcon from '../../../static/svg/userW.svg'
import SignIn from '../form/SignIn'
import Register from '../form/Register'


const NotLogged = (props) => {
    const [userOption, setUserOption] = useState(null)

    const optionStyle = userOption ? 
        userOption === 'sign in' ?
            {signIn: {backgroundColor: '#484848', color: 'white'}, register: null}
            :
            {signIn: null, register: {backgroundColor: '#484848', color: 'white'}}
        : {signIn: null, register: null}

    const formToShow = userOption ? 
        userOption === 'sign in' ?
            <SignIn /> : <Register />
        : null

    const changeOption = (changeTo) => {
        if (userOption === changeTo) {
            setUserOption(null)
        } else {
            setUserOption(changeTo)
        }
    }
    return (
        <div className={`${UR.userContainer} ${UR.NLUserContainer}`}>
            <div onClick={() => changeOption('sign in')} className={UR.userOptionContainer} style={optionStyle.signIn}>
                <h3 className={UR.userOptions} style={{paddingRight: '10px'}}>sign in</h3>
            </div>
            <div className={UR.userOptionsSplitter}>
                <div className={UR.userIconContainer}>
                    <img src="/svg/userW.svg" className={UR.userIcon} alt="user" />
                </div>
            </div>
            <div onClick={() => changeOption('register')} className={UR.userOptionContainer} style={optionStyle.register}>
                <h3 className={UR.userOptions} style={{paddingLeft: '10px'}}>register</h3>
            </div>
            {formToShow}
        </div>
    )
}

//const mapStateToProps = (state) => {
//	return {
        
//	}
//}
export default connect(
    null
)(NotLogged)