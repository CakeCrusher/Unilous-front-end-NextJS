import React, { useState } from 'react'
import { connect } from 'react-redux'
import UserContainer from './UserContainer'
import NB from '../../styles/navBar.module.css'
import Link from 'next/link'
import SkillSugg from '../text-field/SkillSugg'
import UserNotifList from '../user/utilities/UserNotifList'
import UserSP from '../user/utilities/UserSP'
import SignIn from '../user/form/SignIn'
import Register from '../user/form/Register'
import { clearToken } from '../../redux/reducers/token'
import { resetAlert } from '../../redux/reducers/alertNotif'
import {bindActionCreators} from 'redux'
import Router from 'next/router'

const NavBar = (props) => {
    const [utilityShown, setUtilityShown] = useState(null)
    const [menuItemShown, setMenuItemShown] = useState(null)

    const changeUtility = (name) => {
        setMenuItemShown(null)
        if (name === utilityShown) setUtilityShown(null)
        else setUtilityShown(name)
    }

    const changeMenuItem = (item) => {
        if (item === menuItemShown) setMenuItemShown(null)
        else setMenuItemShown(item)
    }

    const linkToPush = props.query ? `/results/${encodeURIComponent(props.query)}` : '/results/all'
    
    const enterQuery = () => {
        Router.push(linkToPush)
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter'){
            enterQuery()
        }
    }

    const onSuggestionClicked = (skill) => {
        const splitQuery = props.query.split(' ')
        const newQuery = splitQuery.length === 1 ? `${skill} ` : `${splitQuery.slice(0, -1).join(' ')} ${skill} `
        props.onQueryChange({target: {value: newQuery}})
    }

    const handleLogout = () => {
        localStorage.clear()
        props.clearToken()
    }

    const menuStyle = menuItemShown ? {borderBottomColor: '#282828'} : null
    const alertBarStyle = props.alertNotif.color ?
        {backgroundColor: props.alertNotif.color, color: props.alertNotif.textColor}
        :
        {display: 'none', backgroundColor: props.alertNotif.color, color: props.alertNotif.textColor}

    if (props.noUser) {
        return (
            <div>
                <div className={`${NB.navContainer} HWM`}>
                    <div className={NB.navBarContainer}>
                        <Link href="/"  >
                            <a className={NB.iconContainer}>
                                <img src="/svg/logo/logoB.svg" alt="icon" className={NB.navBarIcon} />
                            </a>
                        </Link>
                        <div className={NB.searchBar}>
                            <Link href='/results/[searchQuery]' as={linkToPush}  onClick={() => enterQuery()}>
                                <a className={`neutralize-link ${NB.enterSearch} ${NB.searchHover}`}><img src="/svg/searchW.svg" className={NB.searchIcon} alt="search" /></a>
                            </Link>
                            <div className={NB.searchHr} style={{backgroundColor: 'white'}} />
                            <input value={props.query} className={NB.searchInput} type="text" onChange={(e) => props.onQueryChange(e)} onKeyPress={(e) => handleKeyPress(e)} placeholder="search or enter nothing for all results" />
                            <div className={NB.SBSeparator} />
                            <SkillSugg query={props.query} onSuggestionClicked={onSuggestionClicked} />
                        </div>
                    </div>
                    <div className={NB.alertBarContainer} style={alertBarStyle}>
                        <div className={NB.message}>{props.alertNotif.message}</div>
                        <h2 onClick={() => props.resetAlert()} className={NB.close}>x</h2>
                    </div>
                </div>
                <div className={`${NB.navContainerM} SWM`}>
                    <div className={NB.navBarContainerM}>
                        <Link href="/">
                            <a className={`${NB.NBBrand} neutralize-link`}>
                                <img src="/svg/logo/logoB.svg" className={NB.NBLogo} alt="logo" />
                                <h2>Unilous</h2>
                            </a>
                        </Link>
                        <div className={NB.NBPrimaryUtilities}>
                            <img src="/svg/searchSB.svg" onClick={() => changeUtility('search')} className={NB.PUSearch} alt="search" />
                            <div onClick={() => changeUtility('menu')} className={`${NB.PUHamburgerContainer} ${NB.PNContainer}`}>
                                <img src="/svg/hamburger.svg" className={NB.PUHamburger} alt="menu" />
                            </div>
                        </div>
                    </div>
                    <div onClick={() => props.resetAlert()} className={NB.alertBarContainer} style={alertBarStyle}>
                        <div className={NB.message}>{props.alertNotif.message}</div>
                        <h2 className={NB.close}>x</h2>
                    </div>
                </div>
            </div>
        )
    }

    const pendingNotifStats = props.currentUser && props.currentUser.pendingNotifications > 0 ?
        [NB.PNBubble, props.currentUser.pendingNotifications] : [null, null]
    
    const ShowInSubNav = () => {
        const moreItemButton = menuItemShown === 'more' ?
            <img src="/svg/moreW.svg" onClick={() => changeMenuItem('more')} className={NB.menuItemSelected} alt="more" />
            :
            <img src="/svg/moreSB.svg" onClick={() => changeMenuItem('more')} className={NB.menuItem} alt="more" />
        if (utilityShown === 'menu') {
            if (props.token) {
                // const allItems = [
                //     {name: 'notifications', iconB: bellIconB, iconW: bellIconW},
                //     {name: 'following', iconB: heartIconB, iconW: heartIconW},
                // ]
                const notifItemButton = menuItemShown === 'notifications' ?
                    <div onClick={() => changeMenuItem('notifications')} className={`${NB.menuItemSelected} ${NB.PNContainer}`}>
                        <img src={bellIconW}  className={NB.notificationItem} alt={'notifications'} key={`UO${'notifications'}`} />
                        <div className={pendingNotifStats[0]} >{pendingNotifStats[1]}</div>
                    </div>
                    :
                    <div onClick={() => changeMenuItem('notifications')} className={`${NB.menuItem} ${NB.PNContainer}`}>
                        <img src="/svg/bellB.svg" className={NB.notificationItem} alt={'notifications'} key={`UO${'notifications'}`} />
                        <div className={pendingNotifStats[0]} >{pendingNotifStats[1]}</div>
                    </div>
            
                const followingItemButton = menuItemShown === 'following' ? 
                    <img src="/svg/heartW.svg" onClick={() => changeMenuItem('following')} className={NB.menuItemSelected} alt={'following'} key={`UO${'following'}`} />
                    :
                    <img src="/svg/heartB.svg" onClick={() => changeMenuItem('following')} className={NB.menuItem} alt={'following'} key={`UO${'following'}`} />
                
    
                return (
                    <div className={NB.navBarSubContainerM} style={menuStyle}>
                        <Link href="/postformpage" onClick={() => changeMenuItem(null)} >
                            <a className={NB.menuItem} style={{padding: 0, margin: 0}}><img src="/svg/plusB.svg" className={NB.menuItem} alt="add project" /></a>
                        </Link>
                        <Link href="user/[username]" as={`/user/${props.currentUser.username}`} onClick={() => changeMenuItem(null)} >
                            <a className={NB.menuItem} style={{padding: 0, margin: 0}}><img src="/svg/userSB.svg" className={NB.menuItem} alt="user page" /></a>
                        </Link>
                        {notifItemButton}
                        {followingItemButton}
                        <img src="/svg/exitB.svg" onClick={() => handleLogout()} className={NB.menuItem} alt="log out" />
                        {moreItemButton}
                    </div>
                )
            }
            const allItems = ['sign in', 'register']
            const modalItemButtons = allItems.map(i => menuItemShown === i ? 
                <h3 onClick={() => changeMenuItem(i)} className={NB.menuItemSelected} key={`MI${i}`} >{i}</h3>
                :
                <h3 onClick={() => changeMenuItem(i)} className={NB.menuItem} key={`MI${i}`} >{i}</h3>
            )
            return (
                <div className={`${NB.navBarSubContainerM} ${NB.loginBar}`} style={menuStyle}>
                    {modalItemButtons}
                    {moreItemButton}
                </div>
            )

        }
        return null
    }


    const MenuItemToShow = () => {
        if (menuItemShown === 'sign in') {
            return (
                <div className={NB.menuModalContainer}>
                    <SignIn noBG={true} changeMenuItem={changeMenuItem} />
                </div>
            )
        }
        if (menuItemShown === 'register') {
            return (
                <div className={NB.menuModalContainer}>
                    <Register noBG={true} changeMenuItem={changeMenuItem} />
                </div>
            )
        }
        if (menuItemShown === 'notifications') {
            return (
                <div className={NB.menuModalContainer}>
                    <h2>notifications</h2>
                    <UserNotifList />
                </div>
            )
        }
        if (menuItemShown === 'following') {
            return (
                <div className={NB.menuModalContainer}>
                    <h2>saved posts</h2>
                    <UserSP />
                </div>
            )
        }
        if (menuItemShown === 'more') {
            return (
                <div className={NB.menuModalContainer}>
                    <Link href="/contact/" >
                        <a className="neutralize-link"><h1 className={NB.moreLink}>contact us</h1></a>
                    </Link>
                </div>
            )
        }
        return null
    }
    const showWhenSB = utilityShown === 'search' ? {display: 'block'} : {display: 'none'}
    

    return (
        <div>
            <div className={`${NB.navContainer} HWM`}>
                <div className={NB.navBarContainer}>
                    <Link href="/"  >
                        <a className={NB.iconContainer}>
                            <img src="/svg/logo/logoB.svg" alt="icon" className={NB.navBarIcon} />
                        </a>
                    </Link>
                    <div className={NB.searchBar}>
                        <Link href='/results/[searchQuery]' as={linkToPush}  onClick={() => enterQuery()}>
                            <a className={`neutralize-link ${NB.enterSearch} ${NB.searchHover}`}><img src="/svg/searchW.svg" className={NB.searchIcon} alt="search" /></a>
                        </Link>
                        <div className={NB.searchHr} style={{backgroundColor: 'white'}} />
                        <input value={props.query} className={NB.searchInput} type="text" onChange={(e) => props.onQueryChange(e)} onKeyPress={(e) => handleKeyPress(e)} placeholder="search or enter nothing for all results" />
                        <div className={NB.SBSeparator} />
                        <SkillSugg query={props.query} onSuggestionClicked={onSuggestionClicked} />
                    </div>
                    <UserContainer />
                </div>
                <div className={NB.alertBarContainer} style={alertBarStyle}>
                    <div className={NB.message}>{props.alertNotif.message}</div>
                    <h2 onClick={() => props.resetAlert()} className={NB.close}>x</h2>
                </div>
            </div>
            <div className={`${NB.navContainerM} SWM`}>
                <div className={NB.navBarContainerM}>
                    <Link href="/">
                        <a className={`${NB.NBBrand} neutralize-link`}>
                            <img src="/svg/logo/logoB.svg" className={NB.NBLogo} alt="logo" />
                            <h2>Unilous</h2>
                        </a>
                    </Link>
                    <div className={NB.NBPrimaryUtilities}>
                        <img src="/svg/searchSB.svg" onClick={() => changeUtility('search')} className={NB.PUSearch} alt="search" />
                        <div onClick={() => changeUtility('menu')} className={`${NB.PUHamburgerContainer} ${NB.PNContainer}`}>
                            <img src="/svg/hamburger.svg" className={NB.PUHamburger} alt="menu" />
                            <div className={`${pendingNotifStats[0]} ${NB.PNBubbleHamburger}`}>{pendingNotifStats[1]}</div>
                        </div>
                    </div>
                </div>
                <div onClick={() => props.resetAlert()} className={NB.alertBarContainer} style={alertBarStyle}>
                    <div className={NB.message}>{props.alertNotif.message}</div>
                    <h2 className={NB.close}>x</h2>
                </div>
                <div className={NB.navBarSubContainer} style={showWhenSB}>
                    <div className={NB.searchBar}>
                        <Link href='/results/[searchQuery]' as={linkToPush}  onClick={() => enterQuery()}>
                            <a className={`neutralize-link ${NB.enterSearch} ${NB.searchHover}`}>
                                <img src="/svg/searchW.svg" className={NB.searchIcon} alt="search" />
                            </a>
                        </Link>
                        <div className={NB.searchHr} style={{backgroundColor: 'white', height: '0'}} />
                        <input value={props.query} className={NB.searchInput} type="text" onChange={(e) => props.onQueryChange(e)} onKeyPress={(e) => handleKeyPress(e)} placeholder="search or enter nothing for all results" />
                        <SkillSugg query={props.query} onSuggestionClicked={onSuggestionClicked} />
                    </div>
                </div>
                <ShowInSubNav />
                <MenuItemToShow />
            </div>
        </div>
    )
}

// NavBar = withRouter(NavBar)

const mapStateToProps = (state) => {
	return {
        currentUser: state.currentUser,
        token: state.token,
        alertNotif: state.alertNotif
	}
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearToken: bindActionCreators(clearToken, dispatch),
        resetAlert: bindActionCreators(resetAlert, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavBar)