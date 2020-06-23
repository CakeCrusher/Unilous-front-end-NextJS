import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { MAKE_NOTIFICATION } from '../../schemas/mutations'
import { FIND_USER, ALL_USERS, LIST_OF_POSTS } from '../../schemas/queries'
import { setAlert, resetAlert } from '../../redux/reducers/alertNotif'
import UP from '../../styles/pages/userPage.module.css';
import PostSmallList from '../../components/post/PostSmallList'
import Loading from '../../components/Loading'
import FormContainer from '../../components/text-field/FormContainer'
import ReferenceLink from '../../components/text-field/ReferenceLink'
import { palletteGenerator, useField, triggerAlert } from '../../functions/functions'
import {bindActionCreators} from 'redux'
import {apolloClient} from '../../lib/apollo'
import {withRouter} from 'next/router'
import Link from 'next/link'
import Layout from '../../components/Layout'
import Head from 'next/head'

const UserPage = withRouter((props) => {
  const currentUser = props.user
  const message = useField('text')
  const onError = (e) => {
    const eMessage = e.message
    if (eMessage.includes('Path `message` (')) {
      triggerAlert('warning', `message$: message of ${message.fields.value.length} characters cannot be more than 800 characters`, props.setAlert, props.resetAlert)
    }
  }
  const [sendMessage] = useMutation(MAKE_NOTIFICATION, {
    onError
  })
  const handleMessage = async () => {
    if (!message.fields.value.length) {
      triggerAlert('warning', `message$: message field is required`, props.setAlert, props.resetAlert)
      return null
    }
    const result = await sendMessage({
        variables: {
            userFromId: props.currentUser._id,
            userToId: currentUser._id,
            message: message.fields.value,
        }
    })
    if (result) {
        message.reset()
        triggerAlert('success', `sent: message has been sent to ${currentUser.username}`, props.setAlert, props.resetAlert)
    }
  }
  const pallette = palletteGenerator("rgb(40,40,40)").colorPallette
  
  const descriptionToShow = () => {
    const amtOfPosts = currentUser.posts.length
    let dFinal = `${currentUser.username} `
    if (amtOfPosts) {
      if (amtOfPosts === 1) dFinal = dFinal + `has ${amtOfPosts} awesome project that needs a team.`
      else dFinal = dFinal + `has ${amtOfPosts} awesome projects that need teams.`
    }
    else dFinal = dFinal + 'is looking fresh and ready to work on a project!'

    return dFinal
  }
  return (
    <Layout>
      <Head>
        <title>{`${currentUser.username} | Unilous user`}</title>
        <meta name="description" content={descriptionToShow()} key="description" />
      </Head>
      <div className={UP.UPContainer}>
        <div className="navbar-height" style={{gridColumn: '1/3'}} />
        <div className={UP.UPContent}>
          <div className={UP.UPTitleContainer}>
            <img className={UP.UPTitleIcon} src="/svg/userB.svg" alt="user" />
            <h2 className={UP.UPTitle}>{currentUser.username}</h2>
          </div>
          <h3 className={UP.UPTitle} style={{opacity: '0.8'}}>profile link</h3>
          <ReferenceLink rl={currentUser.referenceLink} />
          <h2 className={UP.UPTitle}>posts</h2>
          <div className={UP.UPPostsContainer}>
            <PostSmallList posts={props.userPosts} />
          </div>
        </div>
        { props.currentUser !== currentUser.username &&
        <FormContainer pallette={pallette} >
              <h3 className="form-title">contact {currentUser.username}</h3>
              <h4 className="form-title-secondary">message</h4>
              <div className="form-field-container">
                <textarea className="form-field" {...message.fields} />
              </div >
              <div className="form-submit-button-container">
                
              <h4 onClick={() => handleMessage()} className="form-submit-button">send</h4>
              </div>
        </FormContainer>
        }
      </div>
    </Layout>
  )
})

export async function getStaticPaths() {
    const usernamesQuery = await apolloClient.query({query: ALL_USERS}).then((res) => {
        return res
    }).catch(err => console.log(err))
    const paths = usernamesQuery.data.allUsers.map(u => `/user/${encodeURIComponent(u.username)}`)
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params}) {
  const userQuery = await apolloClient.query({
    query: FIND_USER,
    variables: {username: params.username}
  }).catch(err => console.log(err))
  
  const userPostsQuery = await apolloClient.query({
      query: LIST_OF_POSTS,
      variables: {id_list: userQuery.data.findUser.posts.map(p => p._id)}
  }).catch(err => console.log(err))

  return {
    props: {
      user: userQuery.data.findUser,
      userPosts: userPostsQuery.data.getListOfPosts
    }
  }
}

const mapStateToProps = (state) => {
  return {
    alertNotif: state.alertNotif,
    currentUser: state.currentUser
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setAlert: bindActionCreators(setAlert, dispatch),
    resetAlert: bindActionCreators(resetAlert, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPage)

// uses formContainer.css