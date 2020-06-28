import React from 'react'
import { connect } from 'react-redux'
import Layout from '../../components/Layout'
import ProfileSidebar from '../../components/ProfileSidebar'
import {bindActionCreators} from 'redux'
import DS from '../../styles/pages/dashboard.module.css'

const Dashboard = (props) => {
    return (
        <Layout>
            <div className={DS.container}>
                <ProfileSidebar />
                <div className={DS.contentContainer}>
                    <div className={DS.indexContainer}>
                    
                    </div>
                </div>
            </div>
        </Layout>
    )
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