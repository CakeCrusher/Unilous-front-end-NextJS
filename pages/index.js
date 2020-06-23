import React from 'react'
import HP from '../styles/pages/homePage.module.css'
import { connect } from 'react-redux'
import Layout from '../components/Layout'
import Contributer from '../components/Contributer'
import Head from 'next/head'
import {apolloClient} from '../lib/apollo'
import {FIND_POST, SEARCH_POSTS, SOME_USERS} from '../schemas/queries'
import Post from '../components/post/Post'
import Link from 'next/link'
import {bindActionCreators} from 'redux'
import {setUserDD} from '../redux/reducers/userDD'
import {setSearchFor} from '../redux/reducers/searchFor'

const HomePage = (props) => {

    const listOfUsers = props.someUsers.map(u => (
        <Link href="/user/[username]" as={`/user/${u.username}`}>
            <a className={`${HP.userIns} neutralize-link`}>
                <div className={HP.userPrimary}>{u.username}</div>
                <div className={HP.userSecondary}>0 projects</div>
            </a>
        </Link>
    ))

    const positionInCP = props.currentUser ?
        props.token ? 
            props.currentUser.posts.length ? 2 :
            props.currentUser ? 1 : 0
        : 0
    : 0
    const buttonsForCP = [
        <div style={{ display: 'flex' }}>
            <button onClick={() => props.setUserDD('signin')} className={`${HP.button} ${HP.btnDark} ${HP.adjacentHalfWidthButtons}`}>Sign in</button>
            <button onClick={() => props.setUserDD('register')} className={`${HP.button} ${HP.btnDL} ${HP.adjacentHalfWidthButtons}`}>Register</button>
        </div>,
        <div style={{ display: 'flex' }}>
            <Link href="/postformpage"><a className={`${HP.button} ${HP.btnDark} neutralize-link`}>Create post</a></Link>
        </div>,
        <div style={{ display: 'flex' }}>
            <button onClick={() => props.setUserDD('signin')} className={`${HP.button} ${HP.btnDark}`} style={{opacity: 0.7, cursor: 'auto'}}>Share post</button>
        </div>
    ]
    const colorsForCP = [
        positionInCP >= 1 ? {color: 'rgb(52,166,95)'} : null,
        positionInCP >= 2 ? {color: 'rgb(52,166,95)'} : null,
        positionInCP >= 3 ? {color: 'rgb(52,166,95)'} : null,
    ]
    console.log(props.currentUser)

    const positionInJP = props.currentUser ? 
        props.token ? 
            props.currentUser.notifications.length ? 3 :
            props.currentUser ? 1 : 0
        : 0
    : 0
    const buttonsForJP = [
        <div style={{ display: 'flex' }}>
            <button onClick={() => props.setUserDD('signin')} className={`${HP.button} ${HP.btnDark} ${HP.adjacentHalfWidthButtons}`}>Sign in</button>
            <button onClick={() => props.setUserDD('register')} className={`${HP.button} ${HP.btnDL} ${HP.adjacentHalfWidthButtons}`}>Register</button>
        </div>,
        <div style={{ display: 'flex' }}>
            <Link href="/results/all"><a className={`${HP.button} ${HP.btnDark} neutralize-link`}>Find a project</a></Link>
        </div>,
        <div style={{ display: 'flex' }}>
            <button className={`${HP.button} ${HP.btnDark}`} style={{opacity: 0.7, cursor: 'auto'}}>Join a project</button>
        </div>,
        <div style={{ display: 'flex' }}>
            <button className={`${HP.button} ${HP.btnDark}`} style={{opacity: 0.7, cursor: 'auto'}}>Check notifications</button>
        </div>
    ]
    const colorsForJP = [
        positionInJP >= 1 ? {color: 'rgb(52,166,95)'} : null,
        positionInJP >= 2 ? {color: 'rgb(52,166,95)'} : null,
        positionInJP >= 3 ? {color: 'rgb(52,166,95)'} : null,
        positionInJP >= 4 ? {color: 'rgb(52,166,95)'} : null,
    ]
    

    return (
        <Layout>
            <Head>
                <title>Unilous</title>
                <meta property="og:image" content="https://i.imgur.com/d6bsnRx.png" key="title" />
                <meta name="description" content="Looking to join or make a team, Unilous will help you make it happen! Join our skilled community of people looking to make something great." key="description"/>
            </Head>
            <div className="navbar-height" />
            <div className={HP.wrapper} style={{backgroundColor: '#282828'}}>
                <img className={HP.starsSVG} src="/svg/stars.svg"/>
                <div className={HP.rowContainer} style={{color: 'white'}}>
                    <div className={`${HP.textBox} ${HP.narrow}`}>
                        <h1 className={HP.leftAlign}>Build your team, create your project</h1>
                        <p className={HP.lgPara}>
                            Unilous is a platform uniquely designed for building teams. At the center of Unilous lies the project post which provides both the information a user would want to know about the project, and features necessary for an effective joining process.
                        </p>
                        <div style={{ display: 'flex' }}>
                            <a className={`${HP.button} ${HP.btnLight} ${HP.adjacentHalfWidthButtons} neutralize-link`} href="#CAPCard">Get started</a>
                            <Link href="/results/[searchQuery]" as="/results/all"><a className={`${HP.button} ${HP.btnLD} ${HP.adjacentHalfWidthButtons} neutralize-link`}>Start browsing</a></Link>
                        </div>            
                    </div>
                    <div className={`${HP.imageBox} ${HP.narrow} ${HP.buildYourTeamOuterBox}`}>
                        <div className={`${HP.buildYourTeamImage} ${HP.buildYourTeamInnerBox}`}>
                            <Post post={props.post} short /> 
                        </div>
                    </div>
                </div>
            </div>
            <div id="CAPCard" className={HP.wrapper}>
                <div className={HP.rowContainer} >
                    <div className={HP.card} style={{justifySelf: 'end'}}>
                        <div>
                            <img className={HP.iconTopLeft} src="/svg/rocket.svg"/>
                            <h2 className={HP.leftAlign}>Create a project</h2>
                        </div>
                        <div className={HP.lgPara}>The project serves as the vehicle of Unilous as it is the method to which the team is built. Projects are automatically displayed on our results page where they are <Link href="/"><a className={HP.linkDark} style={{opacity: 1}}>ordered on effectiveness and time of posting</a></Link>. We  provide you with all of the necessary features to pitch your project in an attractive way all the while containing all of the necessary information the user would want.</div>
                        <ol className={HP.cardList}>
                            <li style={colorsForCP[0]} className={HP.cardListItem}>Sign in or Register</li>
                            <li style={colorsForCP[1]} className={HP.cardListItem}>Create post</li>
                            <li style={colorsForCP[2]} className={HP.cardListItem}><span style={{opacity: 0.7}}>(Optional)</span> Share it</li>
                        </ol>
                        <div style={{height: '170px'}} />
                        {buttonsForCP[positionInCP]}
                    </div>
                    <div className={HP.card} style={{justifySelf: 'start'}}>
                        <div>
                            <img className={HP.iconTopLeft} src="/svg/astronaut.svg"/>
                            <h2 className={HP.leftAlign}>Join a project</h2>
                        </div>
                        <div className={HP.lgPara}>While the project is the vehicle of Unilous, its users make it move. Many of the projects posted are rough ideas on what it could be, by joining a project we encourage that the users joining work side by side with the creator to imagine something better. We offer a variety of projects ranging all fields and interests as Unilous was built with everyone in mind. Unilous has made its project joining process as <Link href="/"><a className={HP.linkDark} style={{opacity: 1}}>simple as it can be</a></Link>.</div>
                        <ol className={HP.cardList}>
                            <li style={colorsForJP[0]} className={HP.cardListItem}>Sign in or Register</li>
                            <li style={colorsForJP[1]} className={HP.cardListItem}>Find a project</li>
                            <li style={colorsForJP[2]} className={HP.cardListItem}>Join on a specific skill on the project</li>
                            <li style={colorsForJP[3]} className={HP.cardListItem}>Check notifications for the response</li>
                        </ol>
                        <div style={{height: '170px'}} />
                        {buttonsForJP[positionInJP]}
                    </div>
                </div>
            </div>
            <div className={HP.wrapper}>
                <div id='community' className={`${HP.rowContainer} ${HP.communityOrProjectsDiv}`}>
                    <div className={`${HP.textBox} ${HP.narrow}`}>  
                        <div>
                            <img className={HP.iconTopLeft} src="/svg/astronaut.svg"/>         
                            <h2 className={HP.leftAlign}>Network</h2>
                        </div>
                        <p className={HP.lgPara}>
                        Unilous does the networking so you don't need to. We provide you with access to all of our talented users by directly browsing our users or indirectly posting projects for all of the potentially interested users to see. The Unilous community although with different interests and skill sets are all looking to create and be part of something great.
                        </p>
                        <div style={{display: 'flex'}}>
                            <Link href="/results/[searchQuery]" as="/results/all"><a onClick={() => props.setSearchFor('users')} className={`${HP.button} ${HP.btnDark} ${HP.adjacentHalfWidthButtons} neutralize-link`}>Browse users</a></Link>     
                        </div>
                    </div>
                    <div className={`${HP.imageBox} ${HP.narrow}`}>
                        <div className={HP.userBoxContainer}>
                            <div className={HP.userHeader}>
                                <img src="/svg/logo/logoW.svg" className={HP.logo} />
                                <h3 className={HP.userTitle}>Users</h3>
                            </div>
                            <div className={HP.usersContainer}>
                                {listOfUsers}
                                <div className={HP.userPrimary} style={{textAlign: 'center', gridColumn: '1/3'}}>...</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={HP.wrapper}>
                <div id='projects' className={`${HP.rowContainer} ${HP.communityOrProjectsDiv}`}>
                    <div className={`${HP.textBox} ${HP.narrow}`}>  
                        <div>
                            <img className={HP.iconTopLeft} src="/svg/rocket.svg"/>    
                            <h2 className={HP.leftAlign}>Projects</h2>
                        </div> 
                        <p className={HP.lgPara}>
                            Unilus contains many different kinds of projects with all kinds of skills needed. Although they have different complexities and different skill requirements, all of them need a team. Project Unilous for example is also on display welcoming new members interested in contributing to it.
                        </p>
                        <div style={{display: 'flex'}}>
                            <Link href="/results/[searchQuery]" as="/results/all"><a className={`${HP.button} ${HP.btnDark} ${HP.adjacentHalfWidthButtons} neutralize-link`}>Browse projects</a></Link>     
                        </div>          
                    </div>
                    <div className={HP.imageBox}>
                        <div className={HP.postContaiener}>
                            <Post post={props.otherPosts[0]} short />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
HomePage.getInitialProps = async () => {
    const postQuery = await apolloClient.query({
        query: FIND_POST,
        variables: {title: 'Unilous'} 
    }).catch(err => console.log(err))
    const postsQuery = await apolloClient.query({
        query: SEARCH_POSTS,
        variables: {
            filterString: '',
            postIds: [],
            eventQuery: null,
        }
    }).catch(err => console.log(err))
    const someUsers = await apolloClient.query({
        query: SOME_USERS,
        variables: {
           skip: 0,
           first: 6,
        }
    }).catch(err => console.log(err))
    // console.log(postQuery)
    return {
        post: postQuery.data.findPost,
        otherPosts: postsQuery.data.searchPosts,
        someUsers: someUsers.data.someUsers
    }
}

const mapStateToProps = (state) => {
	return {
        currentUser: state.currentUser,
        token: state.token,
	}
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUserDD: bindActionCreators(setUserDD, dispatch),
        setSearchFor: bindActionCreators(setSearchFor, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage)