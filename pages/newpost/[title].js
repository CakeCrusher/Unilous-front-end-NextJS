import React, { useState } from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {useMutation} from '@apollo/react-hooks'
import {SAVE_POST} from '../../schemas/mutations'
import {FIND_PROJECT, GET_POST_TITLES} from '../../schemas/queries'
import Link from 'next/link'
import ppStyle from '../../styles/pages/newPostPage.module.css'
import pfPage from '../../styles/pages/newPostForm.module.css'
import InputHeader from '../../components/text-field/InputHeader'
import FormContainer from '../../components/text-field/FormContainer'
import { setCurrentUserSP } from '../../redux/reducers/currentUser'
import { setAlert, resetAlert } from '../../redux/reducers/alertNotif'
import { useField, triggerAlert, palletteGenerator } from '../../functions/functions'
import {apolloClient} from '../../lib/apollo'
import {withRouter} from 'next/router'
import Layout from '../../components/Layout'
import Head from 'next/head'

const PostPage = withRouter((props) => {
    const [skillExpanded, setSkillExpanded] = useState(null)
    const question = useField('text')
    const message = useField('text')

    const onFollowError = (e) => {
        console.log(e)
    }

    const [followMutation] = useMutation(SAVE_POST, {
        onError: onFollowError
    })

    const handleFollow = async () => {
        if (!props.token) {
            triggerAlert('warning', 'sign in$: must be signed in to perform this action', props.setAlert, props.resetAlert)
        }
        const result = await followMutation({
            variables: {
                user: props.currentUser._id,
                postId: props.post._id
            }
        })

        if (result) {
            props.setCurrentUserSP(props.currentUser.savedPosts.concat(props.post))
            triggerAlert('success', 'followed$: you are now following this post', props.setAlert, props.resetAlert)
        }
    }

    let cleanedTime = new Date(Number(props.post.time))
    cleanedTime = cleanedTime.toString().split(' ')
    cleanedTime = cleanedTime.slice(1,3).join(' ') + ', ' + cleanedTime[3]
    // skills{
    //     skill{
    //         name
    //     }
    //     skill_help_needed
    //     collaborators{
    //         username
    //     }
    //     _id
    // }
    const skillsData = {
        skills: [
            {
                skill: {name: "job1"},
                skill_help_needed: 3,
                collaborators: [
                    {username: "John"},
                    {username: "Sam"},
                ]
            },
            {
                skill: {name: "job2"},
                skill_help_needed: 2,
                collaborators: [
                    {username: "Don"},
                ]
            },
        ]
    }
    const questionStyle = skillExpanded ? {display: 'none'} : {display: 'block'}
    const skillsHTML = skillsData.skills.map(sb => {
        const messageStyle = skillExpanded === sb.skill.name ? {display: 'block'} : {display: 'none'}
        const buttonToShown = skillExpanded === sb.skill.name ?
            <h4 onClick={() => setSkillExpanded(null)} className={ppStyle.PPSButtonExit}>X</h4>
            :
            sb.collaborators.length < sb.skill_help_needed ?
                <h4 onClick={() => setSkillExpanded(sb.skill.name)} className={ppStyle.PPSButton}>join</h4>
                :
                <h4 className={ppStyle.PPSButtonDisabled}>join</h4>
        return (
            <div className={ppStyle.PPSSkill} key={`PPSS${sb.skill.name}`}>
                <div className={ppStyle.PPSDivision} />
                <p className={ppStyle.PPSSkillName}>{sb.skill.name}</p>
                <div className={ppStyle.PPSSkillSecondary}>
                    <p className={ppStyle.PPSSkillInfo}>{sb.skill_help_needed}/{sb.collaborators.length}</p>
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
                        <h4 className={ppStyle.PPSButtonSubmit}>join</h4>
                    </div>
                </div>
            </div>
        )
    })
    // const skillsHTML = []
    // const questionStyle = skillExpanded ? {display: 'none'} : {display: 'block'}
    // for (const ins in props.post.skillNames) {
    //     const skillName = props.post.skillNames[ins]
    //     const skillFill = props.post.skillFills[ins]
    //     const skillCap = props.post.skillCapacities[ins]
    //     const messageStyle = skillExpanded === skillName ? {display: 'block'} : {display: 'none'}
    //     const buttonToShown = skillExpanded === skillName ?
    //         <h4 onClick={() => setSkillExpanded(null)} className={ppStyle.PPSButtonExit}>X</h4>
    //         :
    //         skillFill < skillCap ?
    //             <h4 onClick={() => setSkillExpanded(skillName)} className={ppStyle.PPSButton}>join</h4>
    //             :
    //             <h4 className={ppStyle.PPSButtonDisabled}>join</h4>

    //     skillsHTML.push( 
    //         <div className={ppStyle.PPSSkill} key={`PPSS${skillName}`}>
    //             <div className={ppStyle.PPSDivision} />
    //             <p className={ppStyle.PPSSkillName}>{skillName}</p>
    //             <div className={ppStyle.PPSSkillSecondary}>
    //                 <p className={ppStyle.PPSSkillInfo}>{skillFill}/{skillCap}</p>
    //                 {buttonToShown}
    //             </div>
    //             <div className={ppStyle.PPSSkillForm} style={messageStyle}>
    //                 <div className={ppStyle.PPSTitle}>
    //                     <InputHeader inputFor="PPS-message" info={false} title="message" color="white" />
    //                 </div>
    //                 <div className={ppStyle.PPSInputContainer}>
    //                     <textarea className={ppStyle.PPSInput} id="PPS-message" {...message.fields}></textarea>
    //                 </div>
    //                 <div className={ppStyle.PPCSubmitContainer}>
    //                     <h4 className={ppStyle.PPSButtonSubmit}>join</h4>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }
    const teamTable = () => {
        const teamContent = skillsData.skills.map(s => (
            <React.Fragment>
                <h3 className={ppStyle.TTSkill}>{s.skill.name} ({s.collaborators.length})</h3>
                <div className={ppStyle.collaboratorsContainer}>
                    {s.collaborators.map(c => (
                        <Link href="/user/[username]" as={`/user/${encodeURIComponent(c.username)}`}>
                            <a className={`${ppStyle.TTTeamMemberContainer} neutralize-link`}>
                                <img className={ppStyle.TTUserIcon} src='/svg/astronaut.svg' alt="user" />
                                <p className="NM">{c.username}</p>
                            </a>
                        </Link>
                    ))}
                </div>
            </React.Fragment>
        ))
        return (
            <div className={ppStyle.teamTableContainer}>
                {teamContent}
            </div>
        )
    }
    const pallette = palletteGenerator(props.post.color).colorPallette
    
    const contentHTML = () => {
        let content = []
        for (const i in props.post.content) {
            if (props.post.content[i].__typename === 'ContentText') {
                content.push(
                    <p className={ppStyle.PPCDescription} key={`ContentText${i}`}>
                        {props.post.content[i].text}
                    </p>
                )
            }
            if (props.post.content[i].__typename === 'ContentImage') {
                content.push(
                    <div className={pfPage.projectImageWrapper} key={`ContentImage${i}`}>
                        <div className={pfPage.projectImageContainer}>
                            <img className={pfPage.projectImage} src={props.post.content[i].image} alt="project picture" style={{borderColor: pallette.color, backgroundColor: pallette.higherColor}} />
                        </div>
                    </div>
                )
            }
        }
        return content
    }

    const headImage = props.post.content.find(c => c.__typename === 'ContentImage') ? props.post.content.find(c => c.__typename === 'ContentImage').image : 'https://i.imgur.com/6z9eNzV.png'
    const descriptionToShow = () => {
        const content = props.post.content.find(c => c.__typename === 'ContentText').text
        const dSentences = content
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
                <title>{props.post.title} | Unilous</title>
                <meta property="og:image" content={headImage} key="title" />
                <meta name="description" content={descriptionToShow()} key="description"/>
            </Head>
            <div className="navbar-height" />
            <div className={ppStyle.postPageContainer}>
                <div className={ppStyle.PPContent}>
                    <h2 className={ppStyle.PPCTitle}>{props.post.title}</h2>
                    <div className={ppStyle.PPCSubHeader}>
                        <Link href="/user/[username]" as={`/user/${encodeURIComponent(props.post.user.username)}`}>
                            <a className={`${ppStyle.PPCUserContainer} neutralize-link`}>
                                <img className={ppStyle.PPCUserIcon} src='/svg/userB.svg' alt="user" />
                                <p className="NM">{props.post.user.username}</p>
                            </a>
                        </Link>
                        <p className={ppStyle.PPCTime}>{cleanedTime}</p>
                    </div>
                    {contentHTML()}
                    <h3 className={ppStyle.PPCTitle}>Q and A</h3>
                    <div className={ppStyle.PPCAllQandaContainer}>
                        <div className={ppStyle.qandaText}>no question and answer pairs yet</div>
                    </div>
                    <h3 className={ppStyle.PPCTitle} style={{opacity: 0.8}}>team</h3>
                    <div className={ppStyle.teamInfo}>{skillsData.skills.reduce((t, s) => t + s.collaborators.length, 0)} team members</div>
                    {teamTable()}
                    <div style={{marginBottom: '50px'}} />
                </div>
                <FormContainer pallette={pallette}>
                    <div  className={ppStyle.PPSFollowHeader} >
                        <div onClick={() => handleFollow()} className={ppStyle.PPSFollowHeader}>
                            <svg className={ppStyle.PPCUserIcon} fill={props.post.color} viewBox="0 -28 512.00002 512" xmlns="http://www.w3.org/2000/svg"><path d="m471.382812 44.578125c-26.503906-28.746094-62.871093-44.578125-102.410156-44.578125-29.554687 0-56.621094 9.34375-80.449218 27.769531-12.023438 9.300781-22.917969 20.679688-32.523438 33.960938-9.601562-13.277344-20.5-24.660157-32.527344-33.960938-23.824218-18.425781-50.890625-27.769531-80.445312-27.769531-39.539063 0-75.910156 15.832031-102.414063 44.578125-26.1875 28.410156-40.613281 67.222656-40.613281 109.292969 0 43.300781 16.136719 82.9375 50.78125 124.742187 30.992188 37.394531 75.535156 75.355469 127.117188 119.3125 17.613281 15.011719 37.578124 32.027344 58.308593 50.152344 5.476563 4.796875 12.503907 7.4375 19.792969 7.4375 7.285156 0 14.316406-2.640625 19.785156-7.429687 20.730469-18.128907 40.707032-35.152344 58.328125-50.171876 51.574219-43.949218 96.117188-81.90625 127.109375-119.304687 34.644532-41.800781 50.777344-81.4375 50.777344-124.742187 0-42.066407-14.425781-80.878907-40.617188-109.289063zm0 0"/></svg>
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
                            <h4 onClick={() => handleQuestion()} className={ppStyle.PPSButtonSubmit} >ask</h4>
                        </div>
                    </div>
                </FormContainer>
            </div>
        </Layout>
    )
})

export async function getStaticPaths() {
    const titlesQuery = await apolloClient.query({query: GET_POST_TITLES}).then((res) => {
        return res
    }).catch(err => console.log(err))
    const paths = titlesQuery.data.allPosts.map(p => `/newpost/${encodeURIComponent(p.title)}`)
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps(context) {
    const projectQuery = await apolloClient.query({
        query: FIND_PROJECT,
        fetchPolicy: 'no-cache',
        variables:{title: decodeURIComponent(context.params.title)}
    }).catch(err => console.log(err))
    return {
        props: {
            post: projectQuery.data.findPost
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
        setCurrentUserSP: bindActionCreators(setCurrentUserSP, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostPage)