import Head from 'next/head'
import React from 'react'
import { connect } from 'react-redux'
import BlogPost from '../../components/blog/BlogPost'
import Layout from '../../components/Layout'

const blogs=[
    {    
        id: 1,
        title: 'Converting a React application with Redux and Apollo to Next.JS (2020)',
        image: 'https://i.imgur.com/mW3nk8o.jpg',
        link: '/blog/react_to_nextjs',
        author: 'SebastianSosa',
        date: 'June 12, 2020',
        description: 'Although Next.JS is already built on the shoulders of React, there are still many challenges which need to be overcome before getting the application up and running. For this guide I will touch on the key changes I had to make when converting my React application with the centralized state management: Redux, and the GraphQL API: Apollo, to Next.JS.',
    },
]

const BlogIndex = () => {
    return (
        <Layout>
            <Head>
                <title>Blog | Unilous</title>
                <meta name="description" content="Blogs made by teams, for all." key="description"/>
            </Head>
            <div className="navbar-height" />
                {blogs.map(item => 
                    <BlogPost 
                        key={item.id} 
                        title={item.title} 
                        description={item.description}
                        link={item.link}
                        image={item.image}
                        author={item.author}
                        date={item.date}
                    />
                )}
        </Layout>
    )
}

const mapStateToProps = (state) => {
	return {
        // currentUser: state.currentUser,
	}
}

const mapDispatchToProps = (dispatch) => {
    return {
        // setUserDD: bindActionCreators(setUserDD, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BlogIndex)