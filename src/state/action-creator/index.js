export const authData = (auth) => {
    return (dispatch) => {
        dispatch({
            type: 'firebaseAuth',
            authData: auth
        })
    }
}
