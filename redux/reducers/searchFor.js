export const setSearchFor = (to) => {
    return async dispatch => {
        dispatch({
            type: 'SET_SF',
            data: to
        })
    }
}

const searchFor = (state = 'projects', action) => {
    switch (action.type) {
        case 'SET_SF' :
            return action.data
        default :
            return state
    }
}

export default searchFor