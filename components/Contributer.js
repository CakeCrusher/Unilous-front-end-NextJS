import React from 'react'
import Link from 'next/link'
import contStyle from '../styles/pages/contact.module.css'
import { connect } from 'react-redux'

const Contributer = ({name, link, image, position, email, phone}) => {
    return (
        <div className={contStyle.contactContainer}>
            <Link href="/user/[username]" as={link} >
                <a className={`${contStyle.contactHeader} neutralize-link`}>
                    <img src="/svg/logo/logoW.svg" className={contStyle.CHIcon} alt="ProjectU" />
                    <h3 className={contStyle.CHName}>{name}</h3>
                </a>
            </Link>
            <img src={image} className={contStyle.profileImage} alt="profile" />
            <div className={contStyle.contactInfoContainer}>
                <div className={contStyle.contactInfo} style={{backgroundColor: '#f6f6f9'}}><strong>position:</strong>{position}</div>
                <div className={contStyle.contactInfo}><strong>email:</strong>{email}</div>
                <div className={contStyle.contactInfo}><strong>phone:</strong> {phone}</div>
            </div>
        </div>
    )
}

export default Contributer