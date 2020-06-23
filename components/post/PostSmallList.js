import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PostSmall from '../post/PostSmall'

const PostSmallList = (props) => {

    const postListReady = props.posts.map(p => <PostSmall post={p} user={p.user.username} key={`PSL${p.title}`} />)

    return (
        <React.Fragment>
            {postListReady}
        </React.Fragment>
    )
}

// const mapStateToProps = (state) => {
// 	return {
//         
// 	}
// }
export default connect(
    null
)(PostSmallList)