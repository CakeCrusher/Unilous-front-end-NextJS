import React, { useState } from 'react'
import { connect } from 'react-redux'
import IH from '../../styles/inputHeader.module.css'

const InputHeader = (props) => {
    const [expanded, setExpanded] = useState(false)

    if (!props.info) {
        return <label htmlFor={props.inputFor}><h3 className={IH.infoTitleText}>{props.title}</h3></label>
    }

    const showInfo = expanded ? {display: 'block'} : {display: 'none'} 
    const colorInfo = props.color === 'white' ?
        {textColor: '#282828', icon: '/svg/infoB.svg'} : {textColor: 'white', icon: '/svg/infoW.svg'}
    return (
        <div className={IH.formInfoContainer} style={{color: colorInfo.textColor}}>
            <div className={IH.infoHeaderContainer}>
                <label htmlFor={props.inputFor}><h3 className={IH.infoTitleText}>{props.title}</h3></label>
                <img onClick={() => setExpanded(!expanded)} src={colorInfo.icon} className={IH.infoIcon} alt="info" />
            </div>
            <div className={IH.infoContent} style={showInfo}>
                {props.children}
            </div>
        </div>

    )
}

//const mapStateToProps = (state) => {
//	return {
        
//	}
//}
export default connect(
    null
)(InputHeader)