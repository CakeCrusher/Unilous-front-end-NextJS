import React from 'react'
import { connect } from 'react-redux'
import DS from '../styles/pages/dashboard.module.css'
import PostSmall from './post/PostSmall'

const ProjectInteractionPage = (props) => {
    return(
        <div className={DS.projectContainer}>
            <div className={DS.projectHead}>
                <PostSmall post={props.projectData} />
            </div>
            <div>
                <div className={DS.projectCategoryContainer}>
                    <h2 className={DS.categoryTitle}>Join requests</h2>
                    <div className={DS.categoryInsContainer}>
                        <div className={DS.categoryContent}>
                            <div className={DS.userIconPair}>
                                <img src="/svg/astronaut.svg" className={DS.userIcon} />
                                <p className={DS.username}>Meseeks</p>
                            </div>
                            <p className={DS.message}>This is a message about the user wanting to join this users project since he has skills to contribute</p>
                            <p className={DS.skillToJoinContainer}>Skill: <span className={DS.skill}>astronaut</span></p>
                        </div>
                        <button className={DS.acceptButton}>accept</button>
                        <button className={DS.declineButton}>decline</button>
                    </div>
                    <h3>addressed</h3>
                </div>
            </div>
            <div>
                <div className={DS.projectCategoryContainer}>
                    <h2 className={DS.categoryTitle}>Questions</h2>
                    <div className={DS.categoryInsContainer}>
                        <div className={DS.categoryContent}>
                            <div className={DS.userIconPair}>
                                <img src="/svg/astronaut.svg" className={DS.userIcon} />
                                <p className={DS.username}>Meseeks</p>
                            </div>
                            <p className={DS.message}>This is a question about the post asking for clarification on what the post is about</p>
                        </div>
                        <button className={DS.acceptButton}>answer</button>
                        <button className={DS.declineButton}>decline</button>
                    </div>
                    <h3>addressed</h3>
                    <div className={DS.categoryInsContainer} style={{opacity: 0.8}}>
                        <div className={DS.categoryContent}>
                            <div className={DS.userIconPair}>
                                <img src="/svg/astronaut.svg" className={DS.userIcon} />
                                <p className={DS.username}>Meseeks</p>
                            </div>
                            <p className={DS.message}>This is a question about the post asking for clarification on what the post is about</p>
                        </div>
                        <p className={DS.declinedResponse}>
                            <strong>declined</strong><br/>
                            This is the response he gave for declining the question.
                        </p>
                    </div>
                    <div className={DS.categoryInsContainer} style={{opacity: 0.8}}>
                        <div className={DS.categoryContent}>
                            <div className={DS.userIconPair}>
                                <img src="/svg/astronaut.svg" className={DS.userIcon} />
                                <p className={DS.username}>Meseeks</p>
                            </div>
                            <p className={DS.message}>This is a question about the post asking for clarification on what the post is about</p>
                        </div>
                        <p className={DS.acceptedResponse}>
                            <strong>accepted</strong><br/>
                            This is the response he gave for answering the question.
                        </p>
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
)(ProjectInteractionPage)