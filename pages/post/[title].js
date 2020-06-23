import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { MAKE_NOTIFICATION, ASK_QUESTION, SAVE_POST } from '../../schemas/mutations'
import { GET_POST_TITLES, FIND_POST, Q_AND_A_NOTIFS } from '../../schemas/queries'
import Link from 'next/link'
import Loading from '../../components/Loading'
import ppStyle from '../../styles/pages/newPostPage.module.css'
import PostImages from '../../components/postPage/PostImages'
import PostLinks from '../../components/postPage/PostLinks'
import PostQandA from '../../components/postPage/PostQandA'
import InputHeader from '../../components/text-field/InputHeader'
import FormContainer from '../../components/text-field/FormContainer'
import { setCurrentUserSP } from '../../redux/reducers/currentUser'
import { setAlert, resetAlert } from '../../redux/reducers/alertNotif'
import { useField, triggerAlert, palletteGenerator } from '../../functions/functions'
import {bindActionCreators} from 'redux'
import {setToken} from '../../redux/reducers/token'
import apollo, {apolloClient} from '../../lib/apollo'
import {withRouter} from 'next/router'
import Layout from '../../components/Layout'
import Head from 'next/head'

const PostPage = withRouter((props) => {
    const [currentPost, setCurrentPost] = useState(props.post)
    const [skillExpanded, setSkillExpanded] = useState(null)
    const question = useField('text')
    const message = useField('text')
    const onJoinError = (e) => {
        if (e.message.includes('is longer than the maximum allowed length')) {
            triggerAlert('warning', `message$: message of ${message.fields.value.length} characters exceeded the maximum of 800 characters.`, props.setAlert, props.resetAlert)
        }
    }
    const onQuestionError = (e) => {
        if (e.message.includes('is longer than the maximum allowed length')) {
            triggerAlert('warning', `question$: question of ${question.fields.value.length} characters exceeded the maximum of 800 characters.`, props.setAlert, props.resetAlert)
        }
    }
    const onFollowError = (e) => {
        console.log(e)
    }

    const [followMutation] = useMutation(SAVE_POST, {
        onError: onFollowError
    })
    const [makeNotification] = useMutation(MAKE_NOTIFICATION, {
        onError: onJoinError
    })
    const [askQuestion] = useMutation(ASK_QUESTION, {
        onError: onQuestionError
    })

    const handleFollow = async () => {
        if (!props.token) {
            triggerAlert('warning', 'sign in$: must be signed in to perform this action', props.setAlert, props.resetAlert)
        }
        const result = await followMutation({
            variables: {
                user: props.currentUser._id,
                postId: currentPost._id
            }
        })

        if (result) {
            props.setCurrentUserSP(props.currentUser.savedPosts.concat(currentPost))
            triggerAlert('success', 'followed$: you are now following this post', props.setAlert, props.resetAlert)
        }
    }
    
    const qandaQuery = useQuery(Q_AND_A_NOTIFS, {
        variables: {title: decodeURIComponent(props.postTitle)}
    })
    // const postQuery = useQuery(FIND_POST, {
    //     variables: {title: decodeURIComponent(props.postTitle)}
    // })
    const qandaChangeConditions = () => {
        const query = qandaQuery.data
        const reducer = currentPost
        if (!query) return null
        if (!query.searchAnsweredQToPost) return null
        if (!reducer) return null
        if (reducer.qanda) return null
        return query.searchAnsweredQToPost
    }
    // const postChangeConditions = () => {
    //     const query = postQuery.data
    //     const reducer = currentPost
    //     if (!query) return null
    //     if (!query.findPost) return null
    //     if (reducer) {
    //         if (reducer.title === query.findPost.title) return null
    //     }
    //     return query.findPost
    // }
    const qanda = qandaChangeConditions()
    // const post = postChangeConditions()
    useEffect(() => {
        if (qanda) {
            setCurrentPost({...currentPost, qanda})
        }
        // if (post) {
        //     setCurrentPost(post)
        // }
    }, [qanda, setCurrentPost, currentPost])
    if (!currentPost) {
        return <Loading />
    }

    let cleanedTime = new Date(Number(currentPost.time))
    cleanedTime = cleanedTime.toString().split(' ')
    // cleanedTime = cleanedTime.slice(1,4).join(' ') + ' ' + cleanedTime[4].split(':').slice(0,2).join(':')
    cleanedTime = cleanedTime.slice(1,3).join(' ') + ', ' + cleanedTime[3]

    let qandaList = currentPost.qanda ? currentPost.qanda.map(i => <PostQandA qanda={i} key={`QandA${i.question}`} />) : <Loading />
    qandaList = qandaList.length ? qandaList : <div className={ppStyle.qandaText}>no question and answer pairs yet</div>
    const skillsHTML = []
    const questionStyle = skillExpanded ? {display: 'none'} : {display: 'block'}
    const handleNotification = async (proposedContribution) => {
        if (!props.currentUser) {
            triggerAlert('warning', `sign in$: must be signed in to perform this action`, props.setAlert, props.resetAlert)
            return null
        }
        if (!message.fields.value.length) {
            triggerAlert('warning', `message$: message field is required`, props.setAlert, props.resetAlert)
            return null
        }
        const result = await makeNotification({
            variables: {
                userFromId: props.currentUser._id,
                userToId: currentPost.user._id,
                message: message.fields.value,
                postId: currentPost._id,
                proposedContribution
            }
        })
        if (result) {
            setSkillExpanded(null)
            message.reset()
            triggerAlert('success', `sent$: (check your answered notifications for the response) request has been sent to ${currentPost.user.username}`, props.setAlert, props.resetAlert)
        }
    }
    for (const ins in currentPost.skillNames) {
        const skillName = currentPost.skillNames[ins]
        const skillFill = currentPost.skillFills[ins]
        const skillCap = currentPost.skillCapacities[ins]
        const messageStyle = skillExpanded === skillName ? {display: 'block'} : {display: 'none'}
        const buttonToShown = skillExpanded === skillName ?
            <h4 onClick={() => setSkillExpanded(null)} className={ppStyle.PPSButtonExit}>X</h4>
            :
            skillFill < skillCap ?
                <h4 onClick={() => setSkillExpanded(skillName)} className={ppStyle.PPSButton}>join</h4>
                :
                <h4 className={ppStyle.PPSButtonDisabled}>join</h4>

        const skillProposition = Array(currentPost.skillNames.length).fill(0)
        skillProposition[ins] = 1
        skillsHTML.push( 
            <div className={ppStyle.PPSSkill} key={`PPSS${skillName}`}>
                <div className={ppStyle.PPSDivision} />
                <p className={ppStyle.PPSSkillName}>{skillName}</p>
                <div className={ppStyle.PPSSkillSecondary}>
                    <p className={ppStyle.PPSSkillInfo}>{skillFill}/{skillCap}</p>
                    {buttonToShown}
                </div>
                <div className={ppStyle.PPSSkillForm} style={messageStyle}>
                    <div className={ppStyle.PPSTitle}>
                        <InputHeader inputFor="PPS-message" info={false} title="message" color="white" />
                    </div>
                    <div className={ppStyle.PPSInputContainer}>
                        <textarea className={ppStyle.PPSInput} id="PPS-message" {...message.fields}></textarea>
                    </div>
                    <div className={ppStyle.PPCSubmitContainer}>
                        {<h4 onClick={() => handleNotification(skillProposition)} className={ppStyle.PPSBButton} style={{borderColor: currentPost.color}}>join</h4>}
                    </div>
                </div>
            </div>
        )
    }

    const handleQuestion = async () => {
        if (!props.currentUser) {
            triggerAlert('warning', `sign in$: must be signed in to perform this action`, props.setAlert, props.resetAlert)
            return null
        }
        if (!question.fields.value.length) {
            triggerAlert('warning', `question$: question field is required`, props.setAlert, props.resetAlert)
            return null
        }
        const result = await askQuestion({
            variables: {
                userFromId: props.currentUser._id,
                userToId: currentPost.user._id,
                postId: currentPost._id,
                question: question.fields.value
            }
        })
        if (result) {
            question.reset()
            triggerAlert('success', `sent$: (check your answered notifications for the response) question has been sent to ${currentPost.user.username}`, props.setAlert, props.resetAlert)
        }
    }
    const pallette = palletteGenerator(currentPost.color).colorPallette

    const teamHTML = currentPost.team ? currentPost.team.map(un =>
        <Link href="/user/username" as={`/user/${un}`} key={`PT${un}`}>
            <a className={`${ppStyle.PPCUserContainer} neutralize-link`}>
                <img className={ppStyle.PPCUserIcon} src='/svg/userB.svg' alt="user" />
                <p className="NM">{un}</p>
            </a>
        </Link>
        
    ): null

    const ModifiedDescription = () => {
        const spacedDis = currentPost.description.split(' ')
        for (const i in spacedDis) {
            if (spacedDis[i].includes('https://')) {
                spacedDis[i] = `<a href="${spacedDis[i]}" class="p-link neutralize-link" rel="nofollow">${spacedDis[i]}</a>`
            }
            if (spacedDis[i].includes('http://')) {
                spacedDis[i] = `<a href="${spacedDis[i]}" class="p-link neutralize-link" rel="nofollow">${spacedDis[i]}</a>`
            }
        }
        const finalDis = spacedDis.join(' ')
        return <p className={ppStyle.PPCDescription} dangerouslySetInnerHTML={{__html: finalDis}} />
    }
    const headImage = currentPost.imageLinks.length ? currentPost.imageLinks[0] : 'https://i.imgur.com/6z9eNzV.png'
    const descriptionToShow = () => {
        const d = currentPost.description
        const dSentences = d.split('. ')
        let dFinal = dSentences[0]
        for (const sentence of dSentences.slice(1,dSentences.length)) {
            if (dFinal.concat(sentence).length < 155) dFinal = [dFinal, sentence].join('. ')
            else if (dFinal.slice(-3) !== '...') dFinal = dFinal + ' ...'
        }
        if (dFinal.length < 50 || dFinal.length >= 160) dFinal = d.slice(0, 155) + ' ...'

        return dFinal
    }
    
    return (
        <Layout>
            <Head>
                <title>{currentPost.title} | Unilous</title>
                <meta property="og:image" content={headImage} key="title" />
                <meta name="description" content={descriptionToShow()} key="description"/>
            </Head>
            <div className="navbar-height" />
            <div className={ppStyle.postPageContainer}>
                <div className={ppStyle.PPContent}>
                    <h2 className={ppStyle.PPCTitle}>{currentPost.title}</h2>
                    <div className={ppStyle.PPCSubHeader}>
                        <Link href="/user/[username]" as={`/user/${encodeURIComponent(currentPost.user.username)}`}>
                            <a className={`${ppStyle.PPCUserContainer} neutralize-link`}>
                                <img className={ppStyle.PPCUserIcon} src='/svg/userB.svg' alt="user" />
                                <p className="NM">{currentPost.user.username}</p>
                            </a>
                        </Link>
                        <p className={ppStyle.PPCTime}>{cleanedTime}</p>
                    </div>
                    <ModifiedDescription />
                    <PostImages imageLinks={currentPost.imageLinks} color={currentPost.color} />
                    <PostLinks referenceLinks={currentPost.referenceLinks} />
                    <h3 className={ppStyle.PPCTitle}>Q and A</h3>
                    <div className={ppStyle.PPCAllQandaContainer}>
                        {qandaList}
                    </div>
                    <h3 className={ppStyle.PPCTitle}>team</h3>
                    <div className={ppStyle.teamInfo}>{teamHTML.length} team members</div>
                    <div className={ppStyle.PPCTeamContainer}>
                        {teamHTML}
                    </div>
                </div>
                <FormContainer pallette={pallette}>
                    <div  className={ppStyle.PPSFollowHeader} >
                        <div onClick={() => handleFollow()} className={ppStyle.PPSFollowHeader} style={{borderTop: '2px solid currentPost.color'}}>
                            <svg className={ppStyle.PPCUserIcon} fill={currentPost.color} viewBox="0 -28 512.00002 512" xmlns="http://www.w3.org/2000/svg"><path d="m471.382812 44.578125c-26.503906-28.746094-62.871093-44.578125-102.410156-44.578125-29.554687 0-56.621094 9.34375-80.449218 27.769531-12.023438 9.300781-22.917969 20.679688-32.523438 33.960938-9.601562-13.277344-20.5-24.660157-32.527344-33.960938-23.824218-18.425781-50.890625-27.769531-80.445312-27.769531-39.539063 0-75.910156 15.832031-102.414063 44.578125-26.1875 28.410156-40.613281 67.222656-40.613281 109.292969 0 43.300781 16.136719 82.9375 50.78125 124.742187 30.992188 37.394531 75.535156 75.355469 127.117188 119.3125 17.613281 15.011719 37.578124 32.027344 58.308593 50.152344 5.476563 4.796875 12.503907 7.4375 19.792969 7.4375 7.285156 0 14.316406-2.640625 19.785156-7.429687 20.730469-18.128907 40.707032-35.152344 58.328125-50.171876 51.574219-43.949218 96.117188-81.90625 127.109375-119.304687 34.644532-41.800781 50.777344-81.4375 50.777344-124.742187 0-42.066407-14.425781-80.878907-40.617188-109.289063zm0 0"/></svg>
                            <p className="NM">follow</p>
                        </div>
                    </div>
                    {skillsHTML}
                    <div style={questionStyle}>
                        <div className={ppStyle.PPSDivision} />
                        <div className={ppStyle.PPSTitle}>
                            <InputHeader inputFor="PPS-question" info={true} title="question" color="white" >
                                <ul style={{margin: 0}}>
                                    <li>if answered it will be shown on post</li>
                                </ul>
                            </InputHeader>
                        </div>
                        <div className={ppStyle.PPSInputContainer}>
                            <textarea className={ppStyle.PPSInput} id="PPS-question" {...question.fields}></textarea>
                        </div>
                        <div className={ppStyle.PPCSubmitContainer}>
                            <h4 onClick={() => handleQuestion()} className={ppStyle.PPSButton} style={{borderColor: currentPost.color}}>ask</h4>
                        </div>
                    </div>
                </FormContainer>
            </div>
        </Layout>
    )
})

// const mapStateToProps = (state) => {
// 	return {
//         currentUser: state.currentUser,
//         token: state.token
// 	}
// }
// export default connect(
//     mapStateToProps, 
//     { setAlert, resetAlert, setCurrentUserSP }
// )(PostPage)

export async function getStaticPaths() {
    const titlesQuery = await apolloClient.query({query: GET_POST_TITLES}).then((res) => {
        return res
    }).catch(err => console.log(err))
    const paths = titlesQuery.data.allPosts.map(p => `/post/${encodeURIComponent(p.title)}`)
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps(context) {
    const postQuery = await apolloClient.query({
        query: FIND_POST,
        variables: {title: context.params.title} 
    }).catch(err => console.log(err))
    return {
        props: {
            post: postQuery.data.findPost,
        }
    }
}

const mapStateToProps = (state) => {
	return {
        currentUser: state.currentUser,
        token: state.token,
        alertNotif: state.alertNotif,
	}
}
const mapDispatchToProps = (dispatch) => {
    return {
        setAlert: bindActionCreators(setAlert, dispatch),
        resetAlert: bindActionCreators(resetAlert, dispatch),
        setToken: bindActionCreators(setToken, dispatch),
        setCurrentUserSP: bindActionCreators(setCurrentUserSP, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostPage)