export const setUserDD = (state) => {
    return async dispatch => {
        dispatch({
            type: 'SET_USER_DD',
            data: state
        })
    }
}

export const resetUserDD = () => {
    return async dispatch => {
        dispatch({
            type: 'RESET_USER_DD'
        })
    }
}

const userDD = (state = null, action) => {
    switch (action.type) {
        case 'SET_USER_DD' :
            return action.data
        case 'RESET_USER_DD' :
            return null
        default :
            return state
    }
}

export default userDD