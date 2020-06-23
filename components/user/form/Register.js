import React from 'react'
import { connect } from 'react-redux'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_USER, LOGIN } from '../../../schemas/mutations'
import InputHeader from '../../text-field/InputHeader'
import { useField, triggerAlert } from '../../../functions/functions'
import { setAlert, resetAlert } from '../../../redux/reducers/alertNotif'
import { setToken } from '../../../redux/reducers/token'
import UR from '../../../styles/user/user.module.css'

const Register = (props) => {
    const username = useField('text')
    const password = useField('password')
    const rePassword = useField('password')
    const email = useField('email')
    const referenceLink = useField('url')

    const onError = (e) => {
        let cleanedMessage = e.message
        console.log(referenceLink.fields.value)
        console.log(e.message)
        if (cleanedMessage.includes('username')) cleanedMessage = `username$: ${username.fields.value} is already being used`
        if (cleanedMessage.includes('referenceLink')) cleanedMessage = `reference link$: ${referenceLink.fields.value} is already being used`
        if (cleanedMessage.includes('email')) cleanedMessage = `email$: ${email.fields.value} is already being used`
        triggerAlert('warning', cleanedMessage, props.setAlert, props.resetAlert)
    }
    const onLoginError = (e) => console.log(e)

    const [registerMutation] = useMutation(CREATE_USER, { onError })
    const [loginMutation] = useMutation(LOGIN, {onError: onLoginError})
    
    const handleSumbit = async (e) => {
        e.preventDefault()
        if (password.fields.value !== rePassword.fields.value) {
            triggerAlert('warning', 'password$: password and re-password did not match', props.setAlert, props.resetAlert)
            return null
        }
        if (!username.fields.value.length || !password.fields.value.length || !rePassword.fields.value.length || !referenceLink.fields.value.length) {
            triggerAlert('warning', 'all$: all fields must be filled', props.setAlert, props.resetAlert)
            return null
        }
        const result = await registerMutation({
            variables: {
                username: username.fields.value,
                password: password.fields.value,
                referenceLink: referenceLink.fields.value,
            }
        })
        
        if (result) {
            if (props.changeMenuItem) {
                props.changeMenuItem(null)
            }
            const loginResult = await loginMutation({
                variables: {
                    username: username.fields.value,
                    password: password.fields.value
                }
            })
            const token = loginResult.data.login.value
            localStorage.setItem('token', token)
            localStorage.setItem('username', username.fields.value)
            props.setToken(token)
            username.reset()
            password.reset()
            rePassword.reset()
            email.reset()
            referenceLink.reset()
            triggerAlert('success', 'registered$: account successfully created. signing you in now.', props.setAlert, props.resetAlert)
            try {
                props.onSuccess()
            } catch {}
        }
    }

    const bgStyle = props.noBG ? {backgroundColor: '#282828'} : null

    return (
        <div className={UR.userFormContainer}>
            <h2>register</h2>
            <form className={UR.userForm} onSubmit={(e) => handleSumbit(e)}>
                <InputHeader inputFor="SI-username" info={false} title="username" color="dark" />
                <input className={UR.UFInput} {...username.fields} id="SI-username" />
                <InputHeader inputFor="SI-password" info={false} title="password" color="dark" />
                <input className={UR.UFInput} {...password.fields} id="SI-password" />
                <InputHeader inputFor="SI-rePassword" info={false} title="re-type password" color="dark" />
                <input className={UR.UFInput} {...rePassword.fields} id="SI-rePassword" />
                {/* <InputHeader inputFor="SI-email" info={true} title="email" color="dark" >
                    <ul style={{margin: 0}}>
                        <li>untill further policy changes no emails are sent your way</li>
                        <li>only shown to users who you accept after contacting you directly (not through post)</li>
                    </ul>
                </InputHeader>
                <input className={UR.UFInput} {...email.fields} id="SI-email" /> */}
                <InputHeader inputFor="SI-referenceLink" info={true} title="resume link" color="dark" >
                    <p style={{margin: 0, marginBottom: '5px'}}>link on your user page used as a resume to demonstrate your ability</p>
                    <p style={{margin: 0, marginBottom: '5px'}}><strong>always view another users portafolio link before working with them</strong></p>
                    <ul style={{margin: 0}}>
                        <li>sites recommended: <strong>LinkedIn</strong>, <strong>Indeed</strong>, <strong>GitHub</strong>, or <strong>Facebook</strong></li>
                        <li>to further ensure your portafolio link is trustworthy, link your Unilous accout from your portafolio link</li>
                    </ul>
                </InputHeader>
                <input className={UR.UFInput} {...referenceLink.fields} id="SI-referenceLink" />
                <button className={UR.UFSubmit} type="submit"><h3>register</h3></button>
            </form>
        </div>
    )
}

//const mapStateToProps = (state) => {
//	return {
        
//	}
//}
export default connect(
    null,
    { setAlert, resetAlert, setToken }
)(Register)