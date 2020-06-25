import React from 'react';
// import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
// import axios from 'axios';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import {setLogInStatus} from './../ActionCreators/actions'
import {setLogOutStatus} from './../ActionCreators/actions'

class Login extends React.Component {

    state = {
        username: "",
        password: "",
        message: "Click here to Login!"
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submit = (e) => {
        e.preventDefault()
        for (let i = 0; i < this.props.usernames.length; i++) {
            if (this.props.usernames[i] === this.state.username) {
                if (this.props.passwords[i] === this.state.password) {
                    console.log("logged in")
                    this.setState({
                        message: "You have successfully logged in!"
                    })
                    /* let action = {
                        type: "login_status",
                        payload: {
                            name: this.props.userList[i].first_name + " " + this.props.userList[i].last_name,
                            id: this.props.userList[i].id
                        }
                    }
                    this.props.setLogInStatus(action) */
                    let payload = {
                        name: this.props.userList[i].first_name + " " + this.props.userList[i].last_name,
                        id: this.props.userList[i].id,
                        following: this.props.userList[i].following
                    }
                    this.props.setLogInStatus(payload.name, payload.id, payload.following)

                    break
                } else {
                    console.log("Incorrent password")
                    this.setState({
                        message: "Incorrect password, please try again."
                    })
                    break
                }
            } else {
                console.log("username does not exist")
                this.setState({
                    message: "Sorry! This username does not exist"
                })
            }
        }
    }

    logout = () => {
        this.setState({
            username: "",
            password: "",
            nameR: "",
            passwordR: "",
            message: "Click here to Login!"
        })
        /* let action = {
            type: "logout_status"
        }
        this.props.setLogOutStatus(action) */
        this.props.setLogOutStatus()
    }

    render() {
        console.log("Login Props ========> ", this.props)
        console.log("Login State ===> ", this.state)
        let renderLogIn
        let selectForLogIn
        if (this.props.loggedInStatus === true) {
            selectForLogIn = (
                <div>
                    Currently logged in as user, please click below to logout!
                </div>
            )
            renderLogIn = (
                <button onClick={() => { this.logout() }} className="btn btn-primary">
                    Logout
                </button>
            )
        } else {
            renderLogIn = (
                <div>
                    <form>
                        <div className="form-group">
                            <label>Enter Username</label>
                            <input type="text" onChange={(e) => { this.handleChange(e) }} className="form-control" value={this.state.username} name="username" aria-describedby="emailHelp" />
                        </div>
                        <div className="form-group">
                            <label >Password</label>
                            <input type="password" onChange={(e) => { this.handleChange(e) }} value={this.state.password} name="password" className="form-control" id="exampleInputPassword1" />
                        </div>
                        <button onClick={(e) => { this.submit(e) }} type="submit" className="btn btn-primary">Login</button>
                    </form>
                    <p>
                        {this.state.message}
                    </p>
                </div>
            )
        }


        return (
            <div className="user-form" style={{ height: '350px' }}>
                {selectForLogIn}
                {renderLogIn}
            </div>
        )
    }
}

// export default Login;

const mapStateToProps = (state) => {
    return {
        userList: state.auth.users,
        usernames: state.auth.usernames,
        passwords: state.auth.passwords,
        loggedInStatus: state.auth.isLoggedIn,
    }
}

const mapDispatchToProps = (dispatch) => {
    /* return {
        setLogInStatus: dispatch,
        setLogOutStatus: dispatch
    } */
    return bindActionCreators({setLogInStatus, setLogOutStatus}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
