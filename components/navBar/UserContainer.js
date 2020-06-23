import React from 'react'
import { connect } from 'react-redux'
import UC from '../../styles/user/user.module.css'
import NotLogged from '../user/structure/NotLogged'
import Logged from '../user/structure/Logged'


const UserContainer = (props) => {
    const logStateToShow = props.token ? <Logged /> : <NotLogged />
    
    return (
        <div className={UC.userWrapper}>
            {logStateToShow}
        </div>
    )
}

const mapStateToProps = (state) => {
	return {
        token: state.token
	}
}
export default connect(
    mapStateToProps
)(UserContainer)