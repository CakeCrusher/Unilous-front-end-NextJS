import React from 'react'
import { connect } from 'react-redux'
import Layout from '../../components/Layout'
import ProfileSidebar from '../../components/ProfileSidebar'
import {bindActionCreators} from 'redux'
import DS from '../../styles/pages/dashboard.module.css'
import DashboardContent from '../../components/DashboardContent'

const Dashboard = (props) => {
    return (
        <Layout>
            <div className={DS.container}>
                <ProfileSidebar action={props.action} />
                <div className={DS.contentContainer}>
                    <div className="navbar-height" />
                    <DashboardContent action={props.action} />
                </div>
            </div>
        </Layout>
    )
}

export async function getStaticPaths() {
    const options = [
        'projects_created',
        'projects_joined',
        'projects_following',
        'projects_others',
        'users_in_my_projects',
        'users_invited',
        'users_others'
    ]
    const paths = options.map(o => `/dashboard/${o}`)
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps(context) {
    return {
        props: {
            action: context.params.action
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
)(Dashboard)