import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useQuery } from '@apollo/react-hooks'
import { LIST_OF_NOTIFICATIONS } from '../../../schemas/queries'
import { setCurrentUserNotifications } from'../../../redux/reducers/currentUser'
import Notif from './Notif'
import Loading from '../../Loading'
import apollo, {apolloClient} from '../../../lib/apollo'
import {bindActionCreators} from 'redux'
import UR from '../../../styles/user/user.module.css'
import UU from '../../../styles/user/userUtilities.module.css'



const UserNotifList = (props) => {
    
    // const notifsListQuery = useQuery(LIST_OF_NOTIFICATIONS, {
    //     variables: {notifications: props.currentUser.notifications.map(n => n._id)}
    // })
    // console.log(notifsListQuery)
    // const notifsListQuery = apolloClient.query({
    //     query: LIST_OF_NOTIFICATIONS,
    //     variables: {notifications: props.currentUser.notifications.map(n => n._id)}
    // }).catch(err => console.log(err))

    const [sentFilter, setSentFilter] = useState('to you')
    const [showSFDD, setShowSFDD] = useState(false)
    const [statusFilter, setStatusFilter] = useState('pending')
    const [showStatusDD, setShowStatusDD] = useState(false)

    // const notifsListConditions = (query, reducer) => {
    //     if (!query) { return null }
    //     if (reducer.length === 0) { return null }
    //     if (reducer[0].userTo) {
    //         if (query._id === reducer[0]._id ) { return null }
    //     }
    //     return query
    // }
    

    // const notifsList = notifsListConditions(notifsListQuery.data.listOfNotifications, props.currentUser.notifications)

    // useEffect(() => {
    //     if (notifsList) {
    //         props.setCurrentUserNotifications(notifsList)
    //     }
    // }, [notifsList, props, props.setCurrentUserNotifications])

    if (props.currentUser.notifications.length > 0) {
        if (!props.currentUser.notifications[0].userTo) {
            return (
                <div style={{gridColumn: '1/3'}}>
                    <div style={{height: '5vh'}}/>
                    <Loading color="white" />
                </div>
            )
        }
    }

    const Filter = () => {
        const sentOptions = () => {
            const allOptions = ['from you', 'to you']
            const onOptionClick = (option) => {
                setSentFilter(option)
                setShowSFDD(!showSFDD)
            }
            return allOptions.map(o => o !== sentFilter ? <div onClick={() => onOptionClick(o)} className={UU.NFDDOption} key={`SFDD${o}`}>{o}</div> : null)
        }
        const sentDD = showSFDD ? (
                <div className={UU.NFropdown}>
                    <div className={UU.NFSplitter} />
                    {sentOptions()}
                </div>
            ): null

            const statusOptions = () => {
                const allOptions = ['all', 'accepted', 'declined', 'pending', 'messages']
                const onOptionClick = (option) => {
                    setStatusFilter(option)
                    setShowStatusDD(!showStatusDD)
                }
                return allOptions.map(o => o !== statusFilter ? <div onClick={() => onOptionClick(o)} className={`${o}-option ${UU.NFDDOption}`} key={`StatusDD${o}`}>{o}</div> : null)
            }
            const statusDD = showStatusDD ? (
                    <div className={UU.NFDropdown}>
                        <div className={UU.NFSplitter} />
                        {statusOptions()}
                    </div>
                ): null
            return (
                <div className={UU.notifFilterContainer}>
                    <div className={UU.NFCreatorContainer}>
                        <h4 className={UU.NFLabel}>status</h4>
                        <div className={UU.NFOptionContainer}>
                            <div onClick={() => setShowStatusDD(!showStatusDD)} className={`${statusFilter}-option ${UU.NFOption}`}>{statusFilter}</div>
                            {statusDD}
                        </div>
                    </div>
                <div className={UU.NFCreatorContainer} style={{marginLeft: '15px'}}>
                    <h4 className={UU.NFLabel}>sent</h4>
                    <div className={UU.NFOptionContainer}>
                        <div onClick={() => setShowSFDD(!showSFDD)} className={UU.NFOption}>{sentFilter}</div>
                        {sentDD}
                    </div>
                </div>
            </div>
        )
    }

    const statusConditions = (notif) => {
        if (statusFilter === 'all') return true
        const notifStatus = notif.accepted === null ?
            'pending' : 
            notif.accepted ?
            notif.post ?
                'accepted' : 'messages'
            : 'declined'
        if (statusFilter === notifStatus) return true
        return false
    }
    const sentConditions = (notif) => {
        if (sentFilter === 'all') return true
        const sentStatus = notif.userFrom.username === props.currentUser.username ?
            'from you' : 'to you'
        if (sentFilter === sentStatus) return true
        return false
    }
    const showNotifications = props.currentUser.notifications.map(n => {
        if (statusConditions(n) && sentConditions(n)){
            return <Notif notif={n} key={`UN${n._id}`}/>
        }
        return null
    }).reverse()
    console.log(props.currentUser.notifications.length)
    return (
        <div className="userUtil-notif">
            <Filter />
            <div style={{height: '10px'}} />
            <div style={{display: 'grid', rowGap: '10px', width: '95%', margin: 'auto', marginTop: '10px'}}>
            {showNotifications}
            </div>
            <div style={{height: '10px'}} />
        </div>
    )
}

const mapStateToProps = (state) => {
	return {
        currentUser: state.currentUser
	}
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentUserNotifications: bindActionCreators(setCurrentUserNotifications, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserNotifList)