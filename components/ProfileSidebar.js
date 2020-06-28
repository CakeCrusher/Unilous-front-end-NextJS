import React from 'react';
import PSS from '../styles/profileSidebar.module.css';
import Link from 'next/link'

const Sidebar = (props) => {
  const buttonSelected = (path) => {
    if (props.action === path) {
      return PSS.buttonSelected
    } else {
      return null
    }
  }
  return (
    <React.Fragment>
      <div className={PSS.container}>
        <div className={PSS.header}>
          <div className={PSS.iconTextPair}>
            <img src="https://avatarfiles.alphacoders.com/560/56030.jpg" className={PSS.avatar} />
            <div>
              <h2 className={PSS.username}>Username</h2>
              <p className={PSS.secondary}>Sebastian Sosa</p>
            </div>
          </div>
          <p className={PSS.secondary} style={{marginLeft: '5px'}}>Sebastian Sosa</p>
        </div>
        <div className={PSS.category}>
          <div className={PSS.iconTextPair}>
            <img src="/svg/rocket.svg" className={PSS.icon}/>
            <h3 className={PSS.categoryTitle}>Projects</h3>
          </div>
          <Link href="/dashboard/[action]" as="/dashboard/projects_created">
            <a className={`${PSS.viewButton} ${buttonSelected('projects_created')} neutralize-link`}>Created</a>
          </Link>
          <Link href="/dashboard/[action]" as="/dashboard/projects_joined">
            <a className={`${PSS.viewButton} ${buttonSelected('projects_joined')} neutralize-link`}>Joined</a>
          </Link>
          <Link href="/dashboard/[action]" as="/dashboard/projects_following">
            <a className={`${PSS.viewButton} ${buttonSelected('projects_following')} neutralize-link`}>Following</a>
          </Link>
          <Link href="/dashboard/[action]" as="/dashboard/projects_others">
            <a className={`${PSS.viewButton} ${buttonSelected('projects_others')} neutralize-link`}>Others</a>
          </Link>
        </div>
        <div className={PSS.category}>
          <div className={PSS.iconTextPair}>
            <img src="/svg/astronaut.svg" className={PSS.icon}/>
            <h3 className={PSS.categoryTitle}>Users</h3>
          </div>
          <Link href="/dashboard/[action]" as="/dashboard/users_in_my_projects">
            <a className={`${PSS.viewButton} ${buttonSelected('users_in_my_projects')} neutralize-link`}>In my projects</a>
          </Link>
          <Link href="/dashboard/[action]" as="/dashboard/users_invited">
            <a className={`${PSS.viewButton} ${buttonSelected('users_invited')} neutralize-link`}>Invited</a>
          </Link>
          <Link href="/dashboard/[action]" as="/dashboard/users_others">
            <a className={`${PSS.viewButton} ${buttonSelected('users_others')} neutralize-link`}>Others</a>
          </Link>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Sidebar; 

