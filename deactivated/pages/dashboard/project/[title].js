import React from 'react'
import { connect } from 'react-redux'
import Layout from '../../../components/Layout'
import ProfileSidebar from '../../../components/ProfileSidebar'
import {bindActionCreators} from 'redux'
import DS from '../../../styles/pages/dashboard.module.css'
import ProjectInteractionPage from '../../../components/ProjectInteractionPage'

const Title = (props) => {
    return (
        <Layout>
            <div className={DS.container}>
                <ProfileSidebar />
                <div className={DS.contentContainer}>
                    <div className="navbar-height" />
                    <ProjectInteractionPage projectData={props.project} />
                </div>
            </div>
        </Layout>
    )
}

export async function getStaticPaths() {
    const ids = [
        'Unilous'
    ]
    const paths = ids.map(un => `/dashboard/project/${encodeURIComponent(un)}`)
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps(context) {
    return {
        props: {
            project: {
                title: "Unilous",
                user: {username: "SebastianSosa"},
                color: 'rgb(100, 255,50)'
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
)(Title)