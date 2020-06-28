import React from 'react'
import { connect } from 'react-redux'
import ProjectsList from './ProjectsList'
import UsersList from './UsersList'

const DashboardContent = (props) => {
    if (typeof window === 'undefined' || !props.currentUser) {
        return null
    } else {
        switch (props.action) {
            case 'projects_created':
                return <ProjectsList filter="created" />
            case 'projects_joined':
                return <ProjectsList filter="joined" />
            case 'projects_following':
                return <ProjectsList filter="following" />
            case 'projects_others':
                return <ProjectsList filter="others" />
            case 'users_in_my_projects':
                return <UsersList filter="in_my_projects" />
            case 'users_invited':
                return <UsersList filter="invited" />
            case 'users_others':
                return <UsersList filter="others" />
            default:
                return <h1>not a valid path</h1>
        }
    }
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
)(DashboardContent)