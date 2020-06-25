const authState = {
    isLoggedIn: false,
    users: [],
    usernames: [],
    passwords: [],
    currentUser: "",
    currentID: null,
    following: [],
}

export function authReducerFunction(state = authState, action) {
    console.log("Redux Auth State Here (state.js) =>> ", state, action)
    let stateCopy = JSON.parse(JSON.stringify(state))

    switch (action.type) {
        case "login_status":
            console.log("logging in now", action.payload)
            stateCopy.isLoggedIn = !stateCopy.isLoggedIn
            stateCopy.currentUser = action.payload.name
            stateCopy.currentID = action.payload.id
            console.log("payload following", action.payload.following)
            stateCopy.following = action.payload.following
                // stateCopy.following.push(action.payload.following)
            console.log("Current following after just logging in ---> ", stateCopy.following)
            return stateCopy
        case "logout_status":
            stateCopy.isLoggedIn = false
            stateCopy.currentID = null
            stateCopy.currentUser = ""
            stateCopy.following = []
            return stateCopy
        case "all_current_users":
            stateCopy.users = action.payload
            let usernames = []
            let passwords = []
            for (var i = 0; i < action.payload.length; i++) {
                usernames.push(action.payload[i].user_name)
                passwords.push(action.payload[i].password)
            }
            stateCopy.usernames = usernames
            stateCopy.passwords = passwords
            return stateCopy

            /* default:
                return state */
    }
    return state
}