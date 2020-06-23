import React from 'react'
import { connect } from 'react-redux'
import { websiteStats } from '../../functions/functions'
import PP from '../../styles/pages/newPostPage.module.css'

const PostLinks = (props) => {
    const links = props.referenceLinks
    if (links.length === 0) {
        return null
    }
const linksToShow = links.map(l => {
    const stats = websiteStats(l)
    let cleanedLink = l.split('/').slice(2,4).join('/')
    if (cleanedLink.length > 40) {
        cleanedLink = `${cleanedLink.slice(0,40)} ...`
    }
    return (
        <a href={l} className={`${PP.PPCReferenceLink} neutralize-link`} style={{backgroundColor: stats.color}} rel="nofollow" key={`referenceLink${l}`}>
            <img className={PP.PPCRLIcon} src="/svg/websites/internet.svg" alt={stats.title} />
            <h4 className="NM">{cleanedLink}</h4>
        </a>
    )
})
    return (
        <div className={PP.PPCLinksContaier} >
            {linksToShow}
        </div>
    )
}

// const mapStateToProps = (state) => {
// 	return {
        
// 	}
// }
export default connect(
    null
)(PostLinks)