import React from 'react'
import { connect } from 'react-redux'
import PostMedium from './post/PostMedium'
import DS from '../styles/pages/dashboard.module.css'

const ProjectsList = (props) => {
    const projectsData = () => {
        switch (props.filter) {
            case 'created':
                return props.currentUser.posts
            case 'joined':
                //need new model
                return []
            case 'following':
                //need new model
                return props.currentUser.savedPosts
            case 'others':
                //need new model
                return [1,2,3,4,5,6]
            default:
                return []
        }
    }
    const projectsDataActivated = projectsData()
    const projectMaker = projectsDataActivated.map(p => ({
        title: "Unilous",
        user: {
            username: "SebastianSosa"
        },
        color: "rgb(255,200,0)",
        description: "Unilous is a platform uniquely designed for building teams. At the center of Unilous lies the project post which provides both the information a user would want to know about the project, and features necessary for an effective joining process."
    }))
    const projectsHTML = projectMaker.map(p => <PostMedium post={p}/>)
    return (
        <div className={DS.projectsContainer}>
            {projectsHTML}
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
)(ProjectsList)