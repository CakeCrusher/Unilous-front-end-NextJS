import React from 'react';
import PSS from '../styles/profileSidebar.module.css';

const Sidebar = () => (
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
        <button className={PSS.viewButton}>Created</button>
        <button className={PSS.viewButton}>Joined</button>
        <button className={PSS.viewButton}>Following</button>
        <button className={PSS.viewButton}>Others</button>
          
      </div>
      <div className={PSS.category}>
        <div className={PSS.iconTextPair}>
          <img src="/svg/astronaut.svg" className={PSS.icon}/>
          <h3 className={PSS.categoryTitle}>Users</h3>
        </div>
        <button className={PSS.viewButton}>In my projects</button>
        <button className={PSS.viewButton}>Invited</button>
        <button className={PSS.viewButton}>Others</button>
      </div>
    </div>
  </React.Fragment>
) 

export default Sidebar; 

