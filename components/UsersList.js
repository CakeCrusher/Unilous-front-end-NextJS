import React from 'react'
import { connect } from 'react-redux'
import DS from '../styles/pages/dashboard.module.css'
import PSS from '../styles/profileSidebar.module.css'
import {palletteGenerator} from '../functions/functions'

const UsersList = (props) => {
    const userData = () => {
        switch (props.filter) {
            case 'in_my_projects':
                //need new model
                return [1,2,3,4,5]
            case 'invited':
                //need new model
                return [1,2]
            case 'others':
                //need new model
                return [1,2,3,4]
            default:
                return []
        }
    }
    const userDataActivated = userData()
    console.log(userDataActivated)
    const userHTML = () => {
        if (props.filter === 'others') {
            const usersMaker = userDataActivated.map(u => ({
                username: "SebastianSosa",
                profilePicture: "https://avatarfiles.alphacoders.com/560/56030.jpg",
                projects: [1,2,3]
            }))
            const allUsersHTML = usersMaker.map(u => (
                <div className={DS.userContainer}>
                    <img src={u.profilePicture} className={PSS.avatar} />
                    <div>
                        <h2 className={PSS.username}>{u.username}</h2>
                        <p className={PSS.secondary}>{u.projects.length} projects</p>
                    </div>
                </div>
            ))
            return (
                <div className={DS.usersContainer}>
                    {allUsersHTML}
                </div>
            )
        } else {
            const projectWithUserMaker = userDataActivated.map(p => ({
                title: "Unilous",
                user: {
                    username: "SebastianSosa"
                },
                color: "rgb(255,100,200)",
                skills: [
                    {
                        collaborators: [
                            {username: "Meseeks"},
                            {username: "Poopy"},
                            {username: "Morty"}
                        ]
                    },
                    {
                        collaborators: [
                            {username: "Birdman"}
                        ]
                    },
                ]
            }))
            const projectWithUserHTML = projectWithUserMaker.map(p => {
                const colorPallette = palletteGenerator(p.color).colorPallette
                const containerStyle = {
                    backgroundColor: colorPallette.higherColor,
                    borderColor: colorPallette.color,
                    color: colorPallette.textColor
                }
                let allUsersInProject = []
                for (const s of p.skills) {
                    for (const u of s.collaborators) {
                        allUsersInProject.push(u)
                    }
                }

                const usersInProjectHTML = allUsersInProject.map(u => (
                    <div className={DS.userContainer}>
                        <img src="https://pixy.org/src/60/604186.png" className={PSS.avatar} />
                        <div>
                            <h2 className={PSS.username}>{u.username}</h2>
                            <p className={PSS.secondary}>2 projects</p>
                        </div>
                    </div>
                ))
                return(
                    <div className={DS.projectWithUserContainer} style={containerStyle}>
                        <h2 className={DS.UCTitle}>{p.title}</h2>
                        <div className={DS.usersInProjectContainer} style={{borderColor: colorPallette.color}}>
                            {usersInProjectHTML}
                        </div>
                    </div>
                )
            })
            return (
                <div className={DS.usersContainer}>
                    {projectWithUserHTML}
                </div>
            )
        }
    }
    return userHTML()
}

const mapStateToProps = (state) => {
	return {
        
	}
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UsersList)