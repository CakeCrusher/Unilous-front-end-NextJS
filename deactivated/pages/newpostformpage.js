import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_PROJECT } from '../schemas/mutations'
import Link from 'next/link'
import ppStyle from '../styles/pages/newPostPage.module.css'
import pfPage from '../styles/pages/newPostForm.module.css'
import PFP from '../styles/pages/postForm.module.css'
import FormContainer from '../components/text-field/FormContainer'
import Layout from '../components/Layout'
import Head from 'next/head'
import UploadImage from '../components/UploadImage'
import {palletteGenerator} from '../functions/functions'

let PostFormPage = (props) => {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [image, setImage] = useState('')
    const [contentList, setContentList] = useState([])
    const [contentTypeList, setContentTypeList] = useState([])
    const [addContent, setAddContent] = useState(true)
    const [skillName, setSkillName] = useState('')
    const [skillAmt, setSkillAmt] = useState('')
    const [skillNameList, setSkillNameList] = useState([])
    const [skillAmtList, setSkillAmtList] = useState([])
    const [addSkill, setAddSkill] = useState(true)
    const [color, setColor] = useState(null)

    const onError = (err) => console.log(err)
    const [createProject] = useMutation(CREATE_PROJECT, {onError})    

    const onTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const onTextChange = (e) => {
        setText(e.target.value)
    }

    const onImageSet = (url) => {
        setContentList(contentList.concat(url))
        setContentTypeList(contentTypeList.concat('image'))
        setAddContent(false)
    }

    const onTextSet = () => {
        setContentList(contentList.concat(text))
        setContentTypeList(contentTypeList.concat('text'))
        setText('')
        setAddContent(false)
    }

    const pallette = color ? palletteGenerator(color).colorPallette : {color: null, heigherColor: null}

    const textAreaToShow = !text ?
        <div className={pfPage.textInputContainer}>
            <textarea value={text} onChange={(e) => onTextChange(e)} className={`${pfPage.textInputBare} ${pfPage.textInput}`} rows="10" />
        </div>
        :
        <div className={pfPage.textInputContainer}>
            <textarea value={text} onChange={(e) => onTextChange(e)} className={pfPage.textInput} rows="10" />
            <button onClick={() => onTextSet()} className={pfPage.textSetButton}>set</button>
        </div>

    const showContentOption = () => {
        switch (addContent) {
            case 'text' :
                return textAreaToShow
            case 'image' :
                return (
                    <div className={pfPage.projectImageWrapper}>
                        <div className={pfPage.projectImageContainer}>
                            <UploadImage onSuccess={onImageSet} />
                        </div>
                    </div>
                )
            default :
                return null
        }
    }

    const showContentButtons = addContent === true ?
        <div className={pfPage.inputOptionsContainer}>
            <button onClick={() => setAddContent('text')} className={pfPage.inputOption}>
                <img src="/svg/textB.svg" className={pfPage.inputIcon} />
                <h3>add text</h3>
            </button>
            <button onClick={() => setAddContent('image')} className={pfPage.inputOption}>
                <img src="/svg/imageUploadB.svg" className={pfPage.inputIcon} />
                <h3>add image</h3>
            </button>
        </div>
        : null

    const contentHTML = () => {
        let content = []
        for (const i in contentList) {
            if (contentTypeList[i] === 'text') {
                content.push(
                    <p className={ppStyle.PPCDescription}>
                        {contentList[i]}
                    </p>
                )
            }
            if (contentTypeList[i] === 'image') {
                content.push(
                    <div className={pfPage.projectImageWrapper}>
                        <div className={pfPage.projectImageContainer}>
                            <img className={pfPage.projectImage} src={contentList[i]} alt="project picture" style={{borderColor: pallette.color, backgroundColor: pallette.higherColor}} />
                        </div>
                    </div>
                )
            }
        }
        return content
    }

    const onSkillNameChange = (e) => {
        setSkillName(e.target.value)
    }

    const onSkillAmtChange = (e) => {
        setSkillAmt(e.target.value)
    }

    const onSkillSet = () => {
        setSkillNameList(skillNameList.concat(skillName))
        setSkillAmtList(skillAmtList.concat(Number(skillAmt)))
        setSkillName('')
        setSkillAmt('')
        setAddSkill(false)
    }

    const skillButton = addSkill ?
        <button onClick={() => onSkillSet()} className={pfPage.skillInputButton}>
            <p className={pfPage.skillButtonTitle}>set</p>
        </button>
        :
        <button onClick={() => setAddSkill(true)} className={pfPage.skillInputButton}>
            <p className={pfPage.skillButtonTitle}>add skill</p>
        </button>

    const skillInputs = addSkill ?
        <React.Fragment>
            <div className={ppStyle.PPSDivision} />
            <div className={pfPage.skillInputsContainer}>
                <input className={pfPage.skillInputName} type="text" value={skillName} onChange={(e) => onSkillNameChange(e)} placeholder="name of skill" />
                <input className={pfPage.skillInputAmt} type="number" value={skillAmt} onChange={(e) => onSkillAmtChange(e)} placeholder="amount of help" />
            </div>
        </React.Fragment>
        :
        null


    const skillsHTML = () => {
        let finalHTML = []
        for (const i in skillNameList) {
            finalHTML.push(
                <div className={ppStyle.PPSSkill}>
                    <div className={ppStyle.PPSDivision} />
                    <p className={ppStyle.PPSSkillName}>{skillNameList[i]}</p>
                    <div className={ppStyle.PPSSkillSecondary}>
                        <p className={ppStyle.PPSSkillInfo}>0/{skillAmtList[i]}</p>
                        <h4 className={ppStyle.PPSButton}>join</h4>
                    </div>
                </div>
            )
        }
        return finalHTML
    }

    const colors = [
        'rgb(199,0,57)', 'rgb(224,52,77)', 'rgb(245,165,0)', 'rgb(250,116,79)', 'rgb(246,172,200)',
        'rgb(16,79,37)', 'rgb(15,138,95)', 'rgb(140,186,81)', 'rgb(152,183,49)', 'rgb(127,205,145)', 
        'rgb(2,66,73)', 'rgb(15,76,117)', 'rgb(50,62,221)', 'rgb(1,152,173)', 'rgb(113,112,255)',  
        'rgb(20,20,20)', 'rgb(60,60,60)', 'rgb(133,156,177)'
    ]
    const colorsHTML = colors.map(c => <div onClick={() => setColor(c)} className={PFP.colorIns} style={{backgroundColor: c}} key={`PFC${c}`} />)

    const submitProject = async () => {
        let cleanedTitle = []
        for (const word of title.split(' ')) {
            if (word.length) cleanedTitle.push(word)
        }
        cleanedTitle = cleanedTitle.join(' ')

        const projectCreated = await createProject({
            variables: {
                title: title,
                user: props.currentUser._id,
                contactLink: `https://${title}.com`,
                skillNames: skillNameList,
                skillCapacities: skillAmtList,
                skillFills: new Array(skillNameList.length).fill(0),
                content_types: contentTypeList,
                content_data: contentList,
                color: color,
            }
        })
        if (projectCreated) {
            console.log(projectCreated)
            alert('SUCCESS')
        }
        else {
            console.log(projectCreated)
            alert('FAILED')
        }
    }
    const username = props.currentUser ? props.currentUser.username : 'I am not signed in'
    let cleanedTime = new Date()
    cleanedTime = cleanedTime.toString().split(' ')
    cleanedTime = cleanedTime.slice(1,3).join(' ') + ', ' + cleanedTime[3]
    const showFPPadding = skillsHTML().length > 2 ? null : 
        <div className="SWM" style={{height: '90px'}} />
    return (
        <div>
            <div>
                <Layout>
                    <Head>
                        <title>Unilous</title>
                    </Head>
                    <div className="navbar-height" />
                    <div className={ppStyle.postPageContainer}>
                        <div className={ppStyle.PPContent}>
                            <input className={pfPage.inputTitle} value={title} onChange={(e) => onTitleChange(e)} placeholder="A Creative Title"></input>
                            <div className={ppStyle.PPCSubHeader}>
                                <Link href="/user/[username]" as={`/user/${encodeURIComponent(username)}`}>
                                    <a className={`${ppStyle.PPCUserContainer} neutralize-link`}>
                                        <img className={ppStyle.PPCUserIcon} src='/svg/userB.svg' alt="user" />
                                        <p className="NM">{username}</p>
                                    </a>
                                </Link>
                                <p className={ppStyle.PPCTime}>{cleanedTime}</p>
                            </div>
                            {contentHTML()}
                            {showContentOption()}
                            {showContentButtons}
                            <div className={pfPage.addContentContainer}>
                                <button onClick={() => setAddContent(true)} className={pfPage.ACButton}>
                                    <img src="/svg/plusW.svg" className={pfPage.ACIcon} />
                                </button>
                            </div>
                            <h3 className={ppStyle.PPCTitle}>Q and A</h3>
                            <div className={ppStyle.PPCAllQandaContainer}>
                                <div className={ppStyle.qandaText}>no question and answer pairs yet</div>
                            </div>
                            <h3 className={ppStyle.PPCTitle}>team</h3>
                            <div className={ppStyle.teamInfo}>0 team members</div>
                            <h3 className={pfPage.colorTitle}>Color schemes</h3>
                            <div className={PFP.PFDisplayColor} style={{backgroundColor: pallette.color}} >
                                <div className={PFP.PFDisplayPart} style={{backgroundColor: pallette.color, color: pallette.textColor}}><h4 style={{margin: 'auto'}}>primary</h4></div>
                                <div className={PFP.PFDisplayPart} style={{backgroundColor: pallette.higherColor, color: pallette.textColor}}><h4 style={{margin: 'auto'}}>secondary</h4></div>
                            </div>
                            <div className={PFP.PFInputColors}>
                                {colorsHTML}
                            </div>
    <button onClick={() => submitProject()} className={pfPage.submitButton}><h2>submit "{title}"</h2></button>
                        </div>
                        <FormContainer pallette={pallette}>
                            <div  className={ppStyle.PPSFollowHeader} >
                                <div onClick={() => handleFollow()} className={ppStyle.PPSFollowHeader} style={{borderTop: '2px solid currentPost.color'}}>
                                    <svg className={ppStyle.PPCUserIcon} fill={color} viewBox="0 -28 512.00002 512" xmlns="http://www.w3.org/2000/svg"><path d="m471.382812 44.578125c-26.503906-28.746094-62.871093-44.578125-102.410156-44.578125-29.554687 0-56.621094 9.34375-80.449218 27.769531-12.023438 9.300781-22.917969 20.679688-32.523438 33.960938-9.601562-13.277344-20.5-24.660157-32.527344-33.960938-23.824218-18.425781-50.890625-27.769531-80.445312-27.769531-39.539063 0-75.910156 15.832031-102.414063 44.578125-26.1875 28.410156-40.613281 67.222656-40.613281 109.292969 0 43.300781 16.136719 82.9375 50.78125 124.742187 30.992188 37.394531 75.535156 75.355469 127.117188 119.3125 17.613281 15.011719 37.578124 32.027344 58.308593 50.152344 5.476563 4.796875 12.503907 7.4375 19.792969 7.4375 7.285156 0 14.316406-2.640625 19.785156-7.429687 20.730469-18.128907 40.707032-35.152344 58.328125-50.171876 51.574219-43.949218 96.117188-81.90625 127.109375-119.304687 34.644532-41.800781 50.777344-81.4375 50.777344-124.742187 0-42.066407-14.425781-80.878907-40.617188-109.289063zm0 0"/></svg>
                                    <p className="NM">follow</p>
                                </div>
                            </div>
                            {skillsHTML()}
                            <div className={ppStyle.PPSSkill}>
                                {skillInputs}
                                {skillButton}
                            </div>
                            {showFPPadding}

                        </FormContainer>
                    </div>
                    {/* <div className={pfPage.submitPadding} /> */}
                </Layout>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
	return {
        token: state.token,
        currentUser: state.currentUser,
	}
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostFormPage)