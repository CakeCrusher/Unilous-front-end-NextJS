import React from 'react';
import style from '../styles/profileSidebar.module.css';

const Sidebar = () => (
  <React.Fragment>
    <div className={style.container}>
      <div className={style.info}>
        <img src="/svg/astronaut.svg" className={style.avatar} />
        <div>
          <h2>Username</h2>
        </div>
      </div>
      <div className={style.projects}>
        <img src="/svg/rocket.svg" className={style.icon}/>
        <h3>Projects</h3>
          <ul>
            <li><button className={style.viewButton}>Created</button></li>
            <li><button className={style.viewButton}>Joined</button></li>
            <li><button className={style.viewButton}>Following</button></li>
            <li><button className={style.viewButton}>Others</button></li>
          </ul>
      </div>
      <div className={style.users}>
        <img src="/svg/astronaut.svg" className={style.icon}/>
        <h3>Users</h3>
          <ul>
            <li><button className={style.viewButton}>In my projects</button></li>
            <li><button className={style.viewButton}>Invited</button></li>
            <li><button className={style.viewButton}>Others</button></li>
          </ul>
      </div>
    </div>
  </React.Fragment>
) 

export default Sidebar; 

