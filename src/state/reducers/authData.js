const myAuth = {
    name : "",
    photoUrl : "",
    emailId : "" ,
    uid: ""
} 


const reducers = (state=myAuth, action) => {
    if (action.type === 'firebaseAuth') {
        myAuth.name = action.authData.currentUser.displayName 
        myAuth.photoUrl = action.authData.currentUser.photoURL 
        myAuth.emailId = action.authData.currentUser.email 
        myAuth.uid = action.authData.currentUser.uid 
        return myAuth
    }
    else{
        return state    
    }
}
export default reducers

