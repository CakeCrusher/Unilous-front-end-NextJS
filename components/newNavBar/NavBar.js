import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import NB from '../../styles/newNavBar.module.css'
import {useField} from '../../functions/functions'
import Link from 'next/link'
import NotSigned from './signed/NotSigned'
import Signed from './signed/Signed'
import {bindActionCreators} from 'redux'
import SignIn from '../user/form/SignIn'
import Register from '../user/form/Register'
import {clearToken} from '../../redux/reducers/token'
import {setCurrentUser} from '../../redux/reducers/currentUser'
import UserNotifList from '../user/utilities/UserNotifList'
import { FIND_USER } from '../../schemas/queries'
import { useQuery } from '@apollo/react-hooks'
import Router from 'next/router'
import {setUserDD, resetUserDD} from '../../redux/reducers/userDD'

const NavBar = (props) => {
    if (props.noUser) {
        return (
            <div>
                <div className="HWM">
                    <div className={NB.container}>
                        <Link href="/">
                            <a className={`${NB.brandContainer} neutralize-link`}>
                                <img src="/svg/logo/logoW.svg" className={NB.icon} />
                                <h2 className={NB.name}>Unilous</h2>
                            </a>
                        </Link>
                        <Link href="/blog">
                            <a className={`neutralize-link`}>
                                <div className={NB.CPText}>blogs</div>
                            </a>
                        </Link>
                    </div>
                </div>
                <div className="SWM">
                    <div className={NB.containerM}>
                        <div className={NB.navIcon} />
                        <div className={NB.navIcon} />
                        <Link href="/">
                            <a className={`${NB.brandContainerM} neutralize-link`}>
                                <img src="/svg/logo/logoW.svg" className={NB.icon} />
                                <h2 className={NB.name}>Unilous</h2>
                            </a>
                        </Link>
                        <Link href="/blog">
                            <a className={`neutralize-link`}>
                                <div className={NB.CPText}>blogs</div>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
    const searchQuery = useField('text')
    const currentUserUN = localStorage.getItem('username') ? localStorage.getItem('username') : 'fakeUser'
    const userQuery = useQuery(FIND_USER, {
        variables: {username: currentUserUN}
    })
    const userQueryConditions = () => {
        const query = userQuery.data
        const reducer = props.currentUser
        if (!query) { return null }
        if (!query.findUser) { return null }
        if (reducer) {
            if (query.findUser.username === reducer.username) { return null }
        }
        return query.findUser
    }
    const userResult = userQueryConditions()

    useEffect(() => {
        if (userResult) {
            props.setCurrentUser(userResult)
        }
    }, [props, props.currentUser, userResult])

    const [subNav, setSubNav] = useState(false)
    if (props.userDD) {
        if (!subNav) {
            setSubNav('menu')
        }
    }
    const resetNav = () => {
        setSubNav(false)
        props.resetUserDD()
    }

    const SQCleaned = searchQuery.fields.value === '' ? 'all' : searchQuery.fields.value

    const enterSearch = () => {
        Router.push(`/results/${SQCleaned}`)
        resetNav()
    }

    const handleKeyPress = (e, noState) => {
        if (event.key === 'Enter') {
            if (noState) {
                const SQ = e.target.value === '' ? 'all' : e.target.value
                Router.push(`/results/${SQ}`)
                resetNav()
            }
            else {enterSearch()}
        }
    }

    const handleSubNavState = (state) => {
        if (state === subNav) {setSubNav(false)}
        else {setSubNav(state)}
    }
    const handleSubNavItemState = (state) => {
        if (state === props.userDD) {props.resetUserDD()}
        else {props.setUserDD(state)}
    }
    const logout = () => {
        localStorage.clear()
        props.clearToken()
        resetNav()
    }

    const signedState = props.token ? <Signed /> : <NotSigned />
    const username = props.currentUser ? props.currentUser.username : ''
    const SubNav = () => {
        if (!subNav) {return null}
        else if (subNav === 'search') {
            return (
                <div className={NB.subNavContainer}>
                    <div className={NB.searchContainerM}>
                        <Link href="/results/[searchQuery]" as={`/results/${SQCleaned}`}>
                            <a className={NB.searchBtn}><img src="/svg/searchWW.svg" className={NB.magnifier} /></a>
                        </Link>
                        <input id="search" className={NB.searchBar} placeholder="Search" onKeyPress={(e) => handleKeyPress(e, true)} />
                    </div>
                </div>
            )
        }
        else if (subNav === 'menu') {
            if (props.noUser) {
                return (
                    <div className={NB.subNavContainer}>
                        <div className={NB.menuContainer}>
                            <button className={NB.userOption} onClick={() => handleSubNavItemState('notification')} />
                            <button className={NB.userOption} onClick={() => handleSubNavItemState('user')} />
                            <button className={NB.moreContainer} onClick={() => handleSubNavItemState('more')} >
                                <img src="/svg/moreW.svg" className={NB.more} />
                            </button>
                        </div>
                    </div>
                )
            }
            if (props.token) {
                return (
                    <div className={NB.subNavContainer}>
                        <div className={NB.menuContainer}>
                            <button className={NB.userOption} onClick={() => handleSubNavItemState('notification')}>
                                <div className={NB.notifContainerM}>
                                    <img src="/svg/bellW.svg" className={NB.bell} />
                                    <div className={NB.nofifCount}>-</div>
                                </div>
                            </button>
                            <button className={NB.userOption} onClick={() => handleSubNavItemState('user')}>
                                <div className={NB.username}>{username}</div>
                            </button>
                            <button className={NB.moreContainer} onClick={() => handleSubNavItemState('more')} >
                                <img src="/svg/moreW.svg" className={NB.more} />
                            </button>
                        </div>
                    </div>
                )
            }
            else {
                return (
                    <div className={NB.subNavContainer}>
                        <div className={NB.menuContainer}>
                            <button className={NB.signOption} onClick={() => handleSubNavItemState('signin')} >sign in</button>
                            <button className={NB.signOption} onClick={() => handleSubNavItemState('register')} >register</button>
                            <button className={NB.moreContainer} onClick={() => handleSubNavItemState('more')} >
                                <img src="/svg/moreW.svg" className={NB.more} />
                            </button>
                        </div>
                    </div>
                )
            }
        }
    }
    const SubNavItem = () => {
        if (!props.userDD) {return null}
        if (props.userDD === 'signin') {
            return (
                <div className={NB.SNIContainer}>
                    <SignIn onSuccess={resetNav} />
                </div>
            )
        }
        if (props.userDD === 'register') {
            return (
                <div className={NB.SNIContainer}>
                    <Register onSuccess={resetNav}/>
                </div>
            )
        }
        if (props.userDD === 'notification') {
            return (
                <div className={NB.SNIContainer}>
                    <img src="/svg/bellW.svg" className={NB.titleBell} />
                    <UserNotifList />
                </div>
            )
        }
        if (props.userDD === 'user') {
            return (
                <div className={NB.SNIContainer}>
                    <h2>{props.currentUser.username}</h2>
                    <Link onClick={() => resetNav()} href="/user/[username]" as={`/user/${decodeURIComponent(props.currentUser.username)}`}>
                        <a className="neutralize-link" style={{color: 'white'}}><h3 className={NB.ddOption}>account details</h3></a>
                    </Link>
                    <h3 className={NB.ddOption} onClick={() => logout()} style={{color: 'rgb(254,52,77)'}}>Sign out</h3>
                </div>
            )
        }
        if (props.userDD === 'more') {
            return (
                <div className={NB.SNIContainer}>
                    <img src="/svg/moreW.svg" className={NB.titleMore} />
                    <Link onClick={() => resetNav()} href="/postformpage" >
                        <a className="neutralize-link" style={{color: 'white'}}><h3 className={NB.ddOption}>create project</h3></a>
                    </Link>
                    <Link onClick={() => resetNav()} href="/blog">
                        <a className="neutralize-link" style={{color: 'white'}}><h3 className={NB.ddOption}>blogs</h3></a>
                    </Link>
                </div>
            )
        }
    }
 
    return (
        <div>
            <div className="HWM">
                <div className={NB.container}>
                    <Link href="/">
                        <a className={`${NB.brandContainer} neutralize-link`}>
                            <img src="/svg/logo/logoW.svg" className={NB.icon} />
                            <h2 className={NB.name}>Unilous</h2>
                        </a>
                    </Link>
                    <div className={NB.searchContainer}>
                        <Link href="/results/[searchQuery]" as={`/results/${SQCleaned}`}>
                            <a className={NB.searchBtn}><img src="/svg/searchWW.svg" className={NB.magnifier} /></a>
                        </Link>
                        <input className={NB.searchBar} placeholder="Search" onKeyPress={(e) => handleKeyPress(e)} {...searchQuery.fields} />
                    </div>
                    <Link href="/postformpage">
                        <a className={`${NB.CPContainer} neutralize-link`}>
                            <img src="/svg/plusW.svg" className={NB.plus} />
                            <div className={NB.CPText}>create project</div>
                        </a>
                    </Link>
                    {signedState}
                    <Link href="/blog">
                        <a className={`neutralize-link`}>
                            <div className={NB.CPText}>blogs</div>
                        </a>
                    </Link>
                </div>
            </div>
            <div className="SWM">
                <div className={NB.containerM}>
                    <div className={NB.navIcon} />
                    <div className={NB.navIcon} />
                    <Link href="/">
                        <a className={`${NB.brandContainerM} neutralize-link`}>
                            <img src="/svg/logo/logoW.svg" className={NB.icon} />
                            <h2 className={NB.name}>Unilous</h2>
                        </a>
                    </Link>
                    <button onClick={() => handleSubNavState('search')} className={NB.navItem}>
                        <label htmlFor="search">
                            <img src="/svg/searchWW.svg" className={NB.navIcon} />
                        </label>
                    </button>
                    <button onClick={() => handleSubNavState('menu')} className={NB.navItem}>
                        <img src="/svg/hamburgerW.svg" className={NB.navIcon} />
                    </button>
                    <SubNav />
                    <SubNavItem />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
	return {
        currentUser: state.currentUser,
        token: state.token,
        userDD: state.userDD,
        // alertNotif: state.alertNotif
	}
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearToken: bindActionCreators(clearToken, dispatch),
        setCurrentUser: bindActionCreators(setCurrentUser, dispatch),
        setUserDD: bindActionCreators(setUserDD, dispatch),
        resetUserDD: bindActionCreators(resetUserDD, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavBar)