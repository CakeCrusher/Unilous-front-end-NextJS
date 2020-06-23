import React, { useState } from 'react'
import { connect } from 'react-redux'
import Layout from '../components/Layout'
import UploadImage from '../components/UploadImage'
import ProfileSidebar from '../components/ProfileSidebar'
import style from '../styles/pages/test.module.css'

const Test = () => {
    const [imageURL, setImageURL] = useState(null)
    
    const onSuccess = (url) => {
        setImageURL(url)
    }

    const showUploadImage = imageURL ?
        <img src={imageURL} style={{width: '300px'}} />
        :
        <UploadImage onSuccess={onSuccess} />
    
    return (
        <Layout>
            
            <div className={style.wrapper}>
                <ProfileSidebar className={style.sidebar} />
                <div className={style.main}>
                    <div className="navbar-height" />
                    <h1 className="testt">test</h1>
                    <div style={{width: '300px', height: '300px', marginLeft: '20px'}}>
                        {showUploadImage}
                    </div>
              </div>
            </div>
        </Layout>
    )
}

export default connect(
    null
)(Test)
// cc972a94b762b77
