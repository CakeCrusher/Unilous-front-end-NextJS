import React from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import { useMutation } from '@apollo/react-hooks'
import { REMOVE_SAVED_POST } from '../../schemas/mutations'
import { setCurrentUserPosts, setCurrentUserSP } from '../../redux/reducers/currentUser'
import { setAlert, resetAlert } from '../../redux/reducers/alertNotif'
import { triggerAlert, palletteGenerator } from '../../functions/functions'
import PT from '../../styles/post.module.css'

const PostSmall = (props) => {
    const handleError = (e) => {
        console.log(e)
    }
    // const [ deletePostMutation ] = useMutation(DELETE_POST, {
    //     onError: handleError
    // })
    const [ removeSPMutation ] = useMutation(REMOVE_SAVED_POST, {
        onError: handleError
    })
    const p = props.post
    const user = props.post.user ? props.post.user.username : props.user
    const pallette = palletteGenerator(p.color).colorPallette
    // const handleRemove = async () => {
    //     const result = await deletePostMutation({
    //         variables: {postId: props.post._id}
    //     })
    //     if (result) {
    //         props.setCurrentUserPosts(props.currentUser.posts.filter(p => p._id !== props.post._id))
    //         triggerAlert('danger', `deleted $: deleted post '${p.title}'`, props.setAlert, props.resetAlert)
    //     }
    // }
    const handleSaveRemove = async () => {
        const result = await removeSPMutation({
            variables: {
                user: props.currentUser._id,
                postId: p._id
            }
        })
        if (result) {
            const newSavedPosts = props.currentUser.savedPosts.filter(post => post._id !== p._id)
            props.setCurrentUserSP(newSavedPosts)
            triggerAlert('danger', `unfollowed$: unfollowed post '${p.title}'`, props.setAlert, props.resetAlert)
        }
    }
    
    if (props.type === 'saved') {
        return (
            <div className={PT.postWrapperSm}>
                <div className={PT.postColorIndicator} style={{backgroundColor: pallette.color}} />
                <div className={PT.postContainer}>
                    <div className={PT.postHeader}>
                        <Link href="/user/[username]" as={`/user/${encodeURIComponent(user)}`}>
                            <a className={`${PT.PHUser} neutralize-link`}>
                                <img className={PT.PHUIcon} src="/svg/userB.svg" alt="user" />
                                <div>{user}</div>
                            </a>
                        </Link>
                    </div>
                    <Link href="/post/[title]" as={`/post/${encodeURIComponent(p.title)}`} >
                        <a className="neutralize-link">
                            <h3 className={PT.postTitle} style={{marginBottom: '7px'}}>{p.title}</h3>
                        </a>
                    </Link>
                </div>
                <div onClick={() => handleSaveRemove()} className={PT.postSmRemove}>x</div>
            </div>
        )
    }

    if (props.currentUser) {
        if (user === props.currentUser.username) {
            return (
                <div className={PT.postWrapperSm}>
                    <div className={PT.postColorIndicator} style={{backgroundColor: pallette.color}} />
                    <div className={PT.postContainer}>
                        <div className={PT.postHeader}>
                            <Link href="/user/[username]" as={`/user/${encodeURIComponent(user)}`} >
                                <a className={`${PT.PHUser} neutralize-link`}>
                                    <img className={PT.PHUIcon} src="/svg/userB.svg" alt="user" />
                                    <div>{user}</div>
                                </a>
                            </Link>
                        </div>
                        <Link href="/post/[title]" as={`/post/${encodeURIComponent(p.title)}`} >
                            <a className="neutralize-link">
                                <h3 className={PT.postTitle} style={{marginBottom: '7px'}}>{p.title}</h3>
                            </a>
                        </Link>
                    </div>
                    {/* <div onClick={() => handleRemove()} className="post-sm-remove">x</div> */}
                </div>
            )
        }
    }

    return (
        <div className={PT.postWrapperSm} style={{gridTemplateColumns: '8px auto'}}>
            <div className={PT.postColorIndicator} style={{backgroundColor: pallette.color}} />
            <div className={PT.postContainer}>
                <div className={PT.postHeader}>
                    <Link href="/user/[username]" as={`/user/${encodeURIComponent(user)}`}>
                        <a className={`${PT.PHUser} neutralize-link`}>
                            <img className={PT.PHUIcon} src="/svg/userB.svg" alt="user" />
                            <div>{user}</div>
                        </a>
                    </Link>
                </div>
                <Link href="/post/[title]" as={`/post/${encodeURIComponent(p.title)}`}>
                    <a className="neutralize-link">
                        <h3 className={PT.postTitle} style={{marginBottom: '7px'}}>{p.title}</h3>
                    </a>
                </Link>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
	return {
        currentUser: state.currentUser,
	}
}
export default connect(
    mapStateToProps,
    { setCurrentUserPosts, setCurrentUserSP, setAlert, resetAlert }
)(PostSmall)