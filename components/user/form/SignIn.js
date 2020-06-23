import React from 'react'
import { connect } from 'react-redux'
import { useMutation } from '@apollo/react-hooks'
import { LOGIN } from '../../../schemas/mutations'
import { useField, triggerAlert } from '../../../functions/functions'
import { setToken } from '../../../redux/reducers/token'
import InputHeader from '../../text-field/InputHeader'
import { setAlert, resetAlert } from '../../../redux/reducers/alertNotif'
import UR from '../../../styles/user/user.module.css'

const SignIn = (props) => {
    const username = useField('text')
    const password = useField('password')

    const onError = (e) => {
        let cleanedMessage = e.message
        console.log(cleanedMessage)
        cleanedMessage = cleanedMessage.split(':')
        cleanedMessage = cleanedMessage.slice(1, cleanedMessage.length).join('$:')
        triggerAlert('warning', cleanedMessage, props.setAlert, props.resetAlert)
    }
    const [signInMutation] = useMutation(LOGIN, { onError })
    
    const handleSumbit = async (e) => {
        e.preventDefault()
        const result = await signInMutation({
            variables: {
                username: username.fields.value,
                password: password.fields.value
            }
        })
        if (result) {
            if (props.changeMenuItem) {
                props.changeMenuItem(null)
            }
            const token = result.data.login.value
            localStorage.setItem('token', token)
            localStorage.setItem('username', username.fields.value)
            username.reset()
            password.reset()
            props.setToken(token)
            try {
                props.onSuccess()
            } catch {}
        }
    }

    const bgStyle = props.noBG ? {backgroundColor: '#282828'} : null

    return (
        <div className={UR.userFormContainer}>
            <h2>sign in</h2>
            <form className={UR.userForm} onSubmit={(e) => handleSumbit(e)}>
                <InputHeader inputFor="SI-username" info={false} title="username" color="dark" />
                <input className={UR.UFInput} {...username.fields} id="SI-username" />
                <InputHeader inputFor="SI-password" info={false} title="password" color="dark" />
                <input className={UR.UFInput} {...password.fields} id="SI-password" />
                <button className={UR.UFSubmit} type="submit"><h3>sign in</h3></button>
            </form>
        </div>
    )
}

// const mapStateToProps = (state) => {
// 	return {
        
// 	}
// }
export default connect(
    null,
    { setToken, setAlert, resetAlert }
)(SignIn)