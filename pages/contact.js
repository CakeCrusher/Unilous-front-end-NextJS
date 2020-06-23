import React from 'react'
import CT from '../styles/pages/contact.module.css'
import { connect } from 'react-redux'
import Layout from '../components/Layout'
import Contributer from '../components/Contributer'
import Head from 'next/head'

const Contact = () => {
    return (
        <Layout>
            <Head>
                <title>Contact | Unilous</title>
                <meta name="description" content="Contact the Unilous team" key="description"/>
            </Head>
            <div className="navbar-height" />
            <div className={CT.contactsContainer}>
                <Contributer 
                    name="Sebastian Sosa"
                    link="/user/SebastianSosa"
                    image="https://i.imgur.com/zgwIwOS.png"
                    position="Founder, full-stack developer"
                    phone="+1 (786)-270-7297"
                    email="1sebastian1sosa1@gmail.com"
                />
                <Contributer 
                    name="Umyarov Mikhail"
                    link="/user/nesutortik"
                    image="https://images-ext-1.discordapp.net/external/QGS82PyB45LevyTO8rhEeJ7bE-fp2zgNzZNyWWjwmTY/%3Fava%3D1%2C/https/sun9-59.userapi.com/c844720/v844720993/b1248/ttDbUpebJaU.jpg"
                    position="UX\UI designer"
                    phone="+7 (952)-156-9649"
                    email="silverusdragonitos@yandex.ru"
                />
                <Contributer 
                    name="Oliver Fu"
                    link="/user/ofu997"
                    image="https://scontent-sjc3-1.xx.fbcdn.net/v/t1.0-9/82568549_10107194006724684_7566546681110462464_o.jpg?_nc_cat=105&_nc_sid=09cbfe&_nc_ohc=rTPS8BHNVG4AX_bjvT0&_nc_ht=scontent-sjc3-1.xx&oh=3334b94c1b3abe80e2f1219e745b84e1&oe=5EF5CE32"
                    position="Front-end developer"
                    phone="+1 (951)-232-3178"
                    email="ofu997@gmail.com"
                />
                <Contributer 
                    name="Jeffrey Cao"
                    link="/user/JeffreyCao"
                    image="https://i.imgur.com/yAw6Oyk.jpg"
                    position="Front-end developer"
                    phone="+1 (416)-823-6970"
                    email="jeffreycao1998@hotmail.com"
                />
            </div>
        </Layout>
    )
}

export default connect(
    null
)(Contact)