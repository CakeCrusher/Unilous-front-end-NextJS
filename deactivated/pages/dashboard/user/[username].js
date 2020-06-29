import React from 'react'
import { connect } from 'react-redux'
import Layout from '../../../components/Layout'
import ProfileSidebar from '../../../components/ProfileSidebar'
import {bindActionCreators} from 'redux'
import DS from '../../../styles/pages/dashboard.module.css'
import UserInteractionPage from '../../../components/UserInteractionPage'

const Username = (props) => {
    return (
        <Layout>
            <div className={DS.container}>
                <ProfileSidebar />
                <div className={DS.contentContainer}>
                    <div className="navbar-height" />
                    <UserInteractionPage userData={props.user} />
                </div>
            </div>
        </Layout>
    )
}

export async function getStaticPaths() {
    const ids = [
        'Meseeks'
    ]
    const paths = ids.map(un => `/dashboard/user/${encodeURIComponent(un)}`)
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps(context) {
    return {
        props: {
            user: {
                username: "Meseeks",
                profilePicture: "https://i.pinimg.com/originals/ef/3d/b0/ef3db0a0105d3c61942d9c95968ae7c3.png"
            }
        }
    }
}

const mapStateToProps = (state) => {
	return {
        
	}
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Username)