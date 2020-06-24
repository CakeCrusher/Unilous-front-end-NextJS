import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PostSmall from '../../post/PostSmall'
import NS from '../../../styles/notif.module.css'
import Link from 'next/link'


// components/newNavBar/user
const Notif = (props) => {
    const n = props.notif
    const typeIcon = () => {
        switch (n.type) {
            case 'join request':
                return <img className={NS.joinIcon} src="/svg/rocket.svg" />
            case 'question':
                return <div className={NS.questionIcon}>?</div>
            default:
                return null
        }
    }
    const readStyle = n.read ? {opacity: '0.7'} : null
    let cleanedTime = new Date(Number(n.date))
    cleanedTime = cleanedTime.toString().split(' ')
    cleanedTime = cleanedTime.slice(1,3).join(' ') + ', ' + cleanedTime[3]
    return(
        <Link href="/">
            <a className="neutralize-link">
                <div className={NS.notifContainer} style={readStyle}>
                    <div className={NS.iconNamePair}>
                        <img src="/svg/astronaut.svg" className={NS.userIcon} />
                        <p className={NS.userUsername}>{n.user_from.username}</p>
                    </div>
                    <div className={NS.iconNamePair}>
                        <p className={NS.typeTitle}>{n.type}</p>
                        {typeIcon()}
                    </div>
                    <PostSmall post={n.post} />
                    <p className={NS.message}>{n.message}</p>
                    <div className={NS.date}>{cleanedTime}</div>
                </div>
            </a>
        </Link>
    )
}

export default connect(
    null
)(Notif)