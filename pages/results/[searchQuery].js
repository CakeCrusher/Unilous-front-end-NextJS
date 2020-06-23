import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import resStyle from '../../styles/pages/results.module.css'
import Post from '../../components/post/Post'
import { useQuery } from '@apollo/react-hooks'
import { SEARCH_POSTS, ALL_USERS } from '../../schemas/queries'
import { addPosts } from '../../redux/reducers/posts'
import Link from 'next/link'
import Loading from '../../components/Loading'
import { palletteGenerator } from '../../functions/functions'
import { toggleStretchLayout } from '../../redux/reducers/stretchLayout'
import { setEventSearch } from '../../redux/reducers/eventSearch'
import { setSearchFor } from '../../redux/reducers/searchFor'
import {bindActionCreators} from 'redux'
import {withRouter} from 'next/router'
import {apolloClient} from '../../lib/apollo'
import Layout from '../../components/Layout'
import Head from 'next/head'

const Results = withRouter((props) => {
    const [scrollAtBottom, setScrollAtBottom] = useState(false)
    const [moreResults, setMoreResults] = useState(true)
    const decodedSearch = decodeURIComponent(props.router.query.searchQuery) === 'all' ? '' : decodeURIComponent(props.router.query.searchQuery)
    const onError = (e) => console.log(e)
    const SPQuery = useQuery(SEARCH_POSTS, {
        variables: {
            filterString: decodedSearch,
            postIds: [],
            eventQuery: props.eventSearch,
        },
        onError
    })

    const loadMorePosts = (data, fetchMore) => {
        return fetchMore({
            variables: {postIds: data.searchPosts.map(p => p._id)},
            updateQuery: (previousResult, {fetchMoreResult}) => {
                if (!fetchMoreResult || !fetchMoreResult.searchPosts) {
                    setMoreResults(false)
                    return previousResult
                }
                return Object.assign({}, previousResult, {
                    searchPosts: [...previousResult.searchPosts, ...fetchMoreResult.searchPosts]
                })
            }
        })
    }
    if (typeof window !== 'undefined') {
        const triggerWhenScroll = () => {
            if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 100) && !scrollAtBottom) {
                try {
                    loadMorePosts(SPQuery.data, SPQuery.fetchMore)
                } catch (e) {}
                setScrollAtBottom(true)
            }
            if ((window.innerHeight + window.scrollY) <= (document.body.offsetHeight - 100) && scrollAtBottom) {
                setScrollAtBottom(false)
            }
        }
        window.addEventListener('scroll', triggerWhenScroll, false)
    }

    const eventQuery = props.eventSearch
    const eventKeys = () => {
        if (eventQuery === 'COVID-19') {
            return ['covid', 'coronavirus', 'outbreak', 'virus', 'emergency response']
        }
        if (eventQuery === '2020 Election') {
            return ['election', 'democrat', 'republican', 'vote']
        }
        return null
    }
    const postToShow = (post) => {
        if (eventKeys()) {
            for (const keyWord of eventKeys()) {
                if (post.description.toLowerCase().includes(keyWord) || post.title.toLowerCase().includes(keyWord)) {
                    if (post.title.toLowerCase().includes(decodedSearch.toLowerCase())) return true
                }
            }
            return false
        }
        if (post.title.toLowerCase().includes(decodedSearch.toLowerCase())) return true
        for (const skill of post.skillNames) {
            if (decodedSearch.includes(skill)) return true
        }
        return false
    }
    const postsArray = SPQuery.data ? SPQuery.data.searchPosts.map(p => p) : props.initialPosts
    const postsToShow = postsArray ?  postsArray.map(p => <Post stretch={props.stretchLayout} key={`post${p._id}`} post={p} />) : []
    const usersToShow = props.allUsers.map(u => (
        <Link href="/user/[username]" as={`/user/${encodeURIComponent(u.username)}`}>
            <a className={`${resStyle.userIns} neutralize-link`}>
                <h2 style={{textAlign: 'start'}}>{u.username}</h2>
            </a>
        </Link>
    ))
    const pallette = palletteGenerator('rgb(40,40,40)').colorPallette
    const layoutBtnClass= props.stretchLayout ? resStyle.layoutButtonGrid : resStyle.layoutButtonStretch
    const layoutClass = !props.stretchLayout ? resStyle.resultsContentGrid : resStyle.resultsContentStretch
    
    const eventsList = [
        {name: 'COVID-19', color: 'rgb(237,32,40)', iconB: '/svg/events/virusB.svg', iconW: '/svg/events/virusW.svg', iconC: '/svg/events/virusC.svg'},
        {name: '2020 Election', color: 'rgb(255,0,255)', iconB: '/svg/events/usaB.svg', iconW: '/svg/events/usaW.svg', iconC: '/svg/events/usaC.svg'} 
    ]
    const eventsHTML = eventsList.map(e => e.name === props.eventSearch ? 
        <div className={resStyle.eventSelected} onClick={() => props.setEventSearch(null)} style={{borderColor: e.color, backgroundColor: e.color}} key={`EV${e.name}`}>
            <img src={e.iconW} className={resStyle.eventImage} alt={e.name} />
            <h3 className={resStyle.eventText}>{e.name}</h3>
        </div>
        :
        <div className={resStyle.event} onClick={() => props.setEventSearch(e.name)} style={{borderColor: e.color, color: e.color}} key={`EV${e.name}`}>
            <img src={e.iconC} className={resStyle.eventImage} alt={e.name} />
            <h3 className={resStyle.eventText}>{e.name}</h3>
        </div>
    )
    const eventsContainerClass = props.eventSearch ? resStyle.ECActive : null
    const showLoading = moreResults ? <Loading /> : <h3 style={{opacity: '0.8'}}>no more posts</h3>
    const titlesString = postsArray ? postsArray.map(p => p.title).join(', ') : []

    const descriptionToShow = () => {
        const start = decodeURIComponent(props.router.query.searchQuery) === 'all' ? 'Unilous projects: ' : `Unilous projects found for "${decodeURIComponent(props.router.query.searchQuery)}": ` 
        if (!postsArray) return start + 'No projects found. Be the first!'
        const titlesArray = postsArray.map(p => p.title)
        let dFinal = start
        for (const title of titlesArray) {
            if (dFinal.concat(title).length < 155) {
                if (dFinal === start) dFinal = [dFinal, title].join('')
                else dFinal = [dFinal, title].join(', ')
            }
            else if (dFinal.slice(-3) !== '...') dFinal = dFinal + ' ...'
        }
        if (dFinal.length < 50) dFinal = [dFinal, titlesArray[0].slice(0,95) + ' ...'].join('')

        return dFinal
    }
    const optionSelected = props.searchFor === 'projects' ?
        {projects: resStyle.SFSelected, users: null} : {projects: null, users: resStyle.SFSelected}
    const showUsersOrProject = props.searchFor === 'projects' ? postsToShow : usersToShow
    
    return (
        <Layout>
            <Head>
                <title>Browse for projects in Unilous</title>
                <meta name="description" content={descriptionToShow()} key="description"/>
            </Head>
            <div className="home-wrapper">
                <div className={resStyle.resultsContainer}>
                    <div className="navbar-height"/>
                    {/* <h2 className={resStyle.secondaryTitle}>events</h2>
                    <div className={`${resStyle.eventsContainer} ${eventsContainerClass}`}>
                        {eventsHTML}
                    </div> */}
                    <div className={resStyle.resOptionsContainer}>
                        <div className={resStyle.SFContainer}>
                            <h3 onClick={() => props.setSearchFor('projects')} className={`${resStyle.SFOption} ${optionSelected.projects} ${resStyle.SFOLeft}`}>projects</h3>
                            <h3 onClick={() => props.setSearchFor('users')} className={`${resStyle.SFOption} ${optionSelected.users} ${resStyle.SFORight}`}>users</h3>
                        </div>
                        <div onClick={() => props.toggleStretchLayout(!props.stretchLayout)} className={resStyle.layoutWrapper}>
                            <div className={resStyle.layoutContainer}>
                                <div className={`layoutButton ${layoutBtnClass}`} >
                                    <div className={resStyle.layoutBox}/>
                                    <div className={resStyle.layoutBox}/>
                                    <div className={resStyle.layoutBox}/>
                                    <div className={resStyle.layoutBox}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div />
                    <div className={`resultsContent ${layoutClass}`}>
                        {showUsersOrProject}
                    </div>
                    <div style={{position: 'relative', height: '400px'}}>
                        {showLoading}
                    </div>
                </div>
            </div>
        </Layout>
    )
})

// const mapStateToProps = (state) => {
// 	return {
//         posts: state.posts,
//         search: state.search,
//         stretchLayout: state.stretchLayout,
//         eventSearch: state.eventSearch,
// 	}
// }
// export default connect(
//     mapStateToProps,
//     { addPosts, toggleStretchLayout, setEventSearch }
// )(Results)

Results.getInitialProps = async (context) => {
    const decodedSearch = decodeURIComponent(context.query.searchQuery) === 'all' ? '' : decodeURIComponent(context.query.searchQuery)
    const postsQuery = await apolloClient.query({
        query: SEARCH_POSTS,
        variables: {
            filterString: decodedSearch,
            postIds: [],
            eventQuery: null,
        }
    }).catch(err => console.log(err))
    const usersQuery = await apolloClient.query({
        query: ALL_USERS,
    }).catch(err => console.log(err))
    return {
        initialPosts: postsQuery.data.searchPosts,
        allUsers: usersQuery.data.allUsers
    }
}


const mapStateToProps = (state) => {
	return {
        posts: state.posts,
        stretchLayout: state.stretchLayout,
        eventSearch: state.eventSearch,
        searchFor: state.searchFor,
	}
}
const mapDispatchToProps = (dispatch) => {
    return {
        addPosts: bindActionCreators(addPosts, dispatch),
        toggleStretchLayout: bindActionCreators(toggleStretchLayout, dispatch),
        setEventSearch: bindActionCreators(setEventSearch, dispatch),
        setSearchFor: bindActionCreators(setSearchFor, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Results)