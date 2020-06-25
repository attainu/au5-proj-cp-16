import React, { Component } from "react";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import SignUp from "./Sign-up";
import Login from "./Log-in";
// import axios from 'axios';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import Home from "./home";
import Explore from "./explore";
import UserProfile from "./user-profile";
import AddPost from "./add-post";
import {sendUsers} from './../ActionCreators/actions'
import Search from "./search";


class Navbar extends Component {

    componentDidMount() {
        this.props.sendUsers()    
    }

    render() {
        console.log("Navbar Props ===> ", this.props)
        return (
            <div>
                <div className="App-header">
                    {(() => {
                        if (this.props.loggedInUser === true) {
                            return (
                                <Link to="/home">Home</Link>
                            )
                        }
                    })()}
                    {(() => {
                        if (this.props.loggedInUser === true) {
                            return (
                                <Link to="/my-profile">My Profile</Link>
                            )
                        }
                    })()}
                    {this.props.loggedInUser && (
                        <Link to="/add-post">New Post</Link>
                    )}
                    {(() => {
                        if (this.props.loggedInUser === true) {
                            return (
                                <Link to="/explore">Explore</Link>
                            )
                        }
                    })()}
                    {(() => {
                        if (this.props.loggedInUser === true) {
                            return (
                                <Link to="/search">Search</Link>
                            )
                        }
                    })()}
                   {/*  {this.props.loggedInUser && (
                        <Link to="/home">Home</Link>
                    )} */}
                    {/* <Link to="/home">Home</Link>
                    <Link to="/my-profile">My Profile</Link>
                    <Link to="/explore">Explore</Link> */}
                     {!this.props.loggedInUser && (
                        <Link to="/signup">Sign-Up</Link>
                    )}
                    <Link to="/login">Log-In</Link>
                </div>
                <div>
                    <Route path="/signup">
                        <div>
                            <SignUp />
                        </div>
                    </Route>
                    <Route path="/login">
                        <div>
                            <Login />
                        </div>
                    </Route>
                    <Route path="/home">
                        <div>
                            <Home />
                        </div>
                    </Route>
                    <Route path="/my-profile">
                        <div>
                            <UserProfile />
                        </div>
                    </Route>
                    <Route path="/add-post">
                        <div>
                            <AddPost />
                        </div>
                    </Route>
                    <Route path="/explore">
                        <div>
                            <Explore />
                        </div>
                    </Route>
                    <Route path="/search">
                        <div>
                            <Search />
                        </div>
                    </Route>
                </div>
            </div>
        )
    }
}

// export default Navbar;

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.auth.isLoggedIn,
        userList: state.auth.users 
    }
}

const mapDispatchToProps = (dispatch) => {
    /* return {
        sendUsers: dispatch
    } */
    return bindActionCreators({sendUsers}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)