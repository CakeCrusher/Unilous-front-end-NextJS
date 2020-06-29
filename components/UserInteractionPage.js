import React from 'react'
import { connect } from 'react-redux'
import DS from '../styles/pages/dashboard.module.css'
import PSS from '../styles/profileSidebar.module.css'
import PostSmall from './post/PostSmall'

const UserInteractionPage = (props) => {
    const postsInvited = [
        {
            title: "Unilous",
            user: {username: "SebastianSosa"},
            color: 'rgb(20, 100, 255)'
        },
        {
            title: "Unilous",
            user: {username: "SebastianSosa"},
            color: 'rgb(20, 100, 255)'
        },
    ]
    const postsAccepted = [
        {
            title: "Unilous",
            user: {username: "SebastianSosa"},
            color: 'rgb(20, 100, 255)'
        },
    ]
    return (
        <div className={DS.userContainer}>
            <div className={DS.userBanner}>
                <img src={props.userData.profilePicture} className={PSS.avatar} />
                <div>
                    <h2 className={PSS.username}>{props.userData.username}</h2>
                    <p className={PSS.secondary}>Sebastian Sosa</p>
                </div>
            </div>
            <div className={DS.userProjectRelationContainer}>
                <button className={DS.inviteButton}><h3>Invite</h3></button>
                {postsInvited.map(p => (
                    <div className={DS.invitedProjectContainer}>
                        <PostSmall post={p} />
                    </div>
                ))}
                <h3>accepted</h3>
                {postsAccepted.map(p => <PostSmall post={p}/>)}
            </div>
            <div className={DS.chatContainer}>
                <div className={DS.chatToBanner}>
                    <div className={DS.userBanner}>
                        <img src={props.userData.profilePicture} className={PSS.avatar} />
                        <div>
                            <h2 className={PSS.username}>{props.userData.username}</h2>
                            <p className={PSS.secondary}>Sebastian Sosa</p>
                        </div>
                    </div>
                </div>
                <div className={DS.chatFromBanner}>
                    <div className={DS.userBanner}>
                        <img src="https://avatarfiles.alphacoders.com/560/56030.jpg" className={PSS.avatar} />
                        <div>
                            <h2 className={PSS.username}>SebastianSosa</h2>
                            <p className={PSS.secondary}>Sebastian Sosa</p>
                        </div>
                    </div>
                </div>
                <div className={DS.messagesContainer}>
                    <div className={DS.sendMessage}>
                        <textarea className={DS.sendMessageInput} placeholder="Send message?" />
                        <button className={DS.sendMessageSend}>send</button>
                    </div>
                </div>
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

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserInteractionPage)