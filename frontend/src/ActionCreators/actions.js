import axios from 'axios'

export function sendUsers() {
    let users = axios({
        method: "get",
        url: "http://localhost:3020/user"
    })
    return (dispatch) => {
        users.then(res => {
            console.log("Axios Response", res)
            dispatch({
                type: "all_current_users",
                payload: res.data
            })
        }).catch(error => {
            console.log("Axios Error", error)
        })
    }
}

export function setLogInStatus(name, id, following) {
    console.log("before logging in ", following)
    return {
        type: "login_status",
        payload: {
            name: name,
            id: id,
            following: following
        }
    }
}

export function setLogOutStatus() {
    return {
        type: "logout_status"
    }
}