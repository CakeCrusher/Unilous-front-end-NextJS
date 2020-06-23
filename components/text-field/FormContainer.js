import React, { useState } from 'react'
import { connect } from 'react-redux'

const FormContainer = (props) => {
    const [expanded, setExpanded] = useState(false)

    const signInWarning = props.token ? null : (
        // <h3 className="warning-container">must be signed to perform the these actions</h3>
        null
    )
    const bc = props.pallette.color ? {color: props.pallette.color, textColor: props.pallette.textColor, shrinkIcon: props.pallette.shrinkIcon} : {color: '#282828', textColor: 'white', shrinkIcon: '/svg/shrinkW.svg'}
    if (expanded) {
        return (
            <div className="form-wrapper">
                <div className="form-container" style={{borderTopColor: bc.color}}>
                    <div onClick={() => setExpanded(!expanded)} className="expanded-overlay SWM" style={{backgroundColor: bc.color}}>
                        <img src={bc.shrinkIcon} className="overlay-image-expanded" alt="shrink form" />
                    </div>
                    {/* {signInWarning} */}
                    {props.children}
                </div>
            </div>
        )

    }
    return (
        <React.Fragment>
            <div className="form-wrapper HWM">
                <div className="form-container" style={{borderTopColor: bc.color}}>
                    {signInWarning}
                    {props.children}
                </div>
            </div>
            <div className="form-wrapper-m">
                <div onClick={() => setExpanded(!expanded)} className="expand-overlay SWM" style={{backgroundColor: bc.color, color: bc.textColor}}>
                    <h2 style={{marginRight: 0, marginBottom: 0}}>skills</h2>
                    {/* <img src={props.pallette.handshakeIcon} className="overlay-image" alt="expand form" /> */}
                </div>                
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
	return {
        token: state.token
	}
}
export default connect(
    mapStateToProps
)(FormContainer)