import React, { Component } from "react";
import { connect } from 'react-redux'
import axios from 'axios';
import { bindActionCreators } from "redux";
import { render } from "react-dom";

class Explore extends Component {
    state = {
        user: []
    }

    componentDidMount() {
        // let id = this.props.id
        axios.get(`http://localhost:3020/user`)
            .then(res => {
                const user = res.data;
                this.setState({ user });
            }).catch(error => {
                console.log(error)
            })
    }

    follow = (id) => {
        console.log(id)
        let currentFollowing
        if (this.props.following === null) {
            currentFollowing = []
        } else {
            currentFollowing = this.props.following
        }
        // let currentFollowing = this.props.following
        console.log(currentFollowing)
        axios.put(`http://localhost:3020/user/${this.props.currentUserID}`, {
            following: [...currentFollowing, id]
        }).then(res => {
            // let id = this.props.id
            console.log("In response")
            console.log(res);
            console.log(res.data);
            axios.get(`http://localhost:3020/user`)
                .then(res => {
                    const user = res.data;
                    this.setState({ user });
                }).catch(error => {
                    console.log(error)
                })
            }).catch(error => {
                console.log("In error")
                console.log(error)
            })
    }
    
    following = (id) => {
        let follow
        if (this.props.following === null || this.props.following.length === 0 ) {
            console.log("you can now add your first follower")
            return follow = (
                <button onClick={() => { this.follow(id) }}>Follow</button>
            )
            
        } else if (this.props.following.length !== 0) {
            if (this.props.following.includes(id)) {
                return follow = (<div>You are following this user!</div>)
            } else {
                return follow = (<button onClick={() => { this.follow(id) }}>Follow</button>)
            }
            /* for(let i = 0 ; i < this.props.following.length; i++){
                console.log("checking", id, this.props.following[i])
                if(this.props.following[i] === id) {
                    return follow = (<div>You are following this user!</div>)
                } else {
                    return follow = (<button onClick={() => { this.follow(id) }}>Follow</button>)
                }
            } */
        } else {
            return(
                <div></div>
            )
        }
    }

    render() {
        console.log("Current following",this.props.following)
        /* if (this.props.following === 0 ) {
            following = (
                <button onClick={() => { this.follow(user.id) }}>Follow</button>
            )
        } else {
            if (this.props.following.includes(user.id)) {
                following =(<div>You are following this user!</div>)
            } else {
                following=(<button onClick={() => { this.follow(user.id) }}>Follow</button>)
            }
        } */
        let renderUsers
        if (this.props.loggedInUser === true) {
            renderUsers = (
                <div className="tablePage">
                    {this.state.user.map((user, index) => {
                        if (user.id === this.props.currentUserID) {
                            return(
                                <div className="table" key={index}>
                                    This is your profile! <br />
                                    Name: {user.first_name} {user.last_name} <br/>
                                    Username: @{user.user_name} <br/>
                                    age: {user.age}
                                </div>
                            )
                        } else {
                            return(
                                <div className="table" key={index}>
                                    ID: {user.id} <br/>
                                    Name: {user.first_name} {user.last_name} <br />
                                    Username: @{user.user_name} <br/>
                                    age: {user.age}
                                    {this.following(user.id)}
                                    {/* {this.props.following === null && (
                                        <button onClick={() => { this.follow(user.id) }}>Follow</button>
                                    )}
                                    {(!this.props.following.includes(user.id) && this.props.following !== 0) && (
                                        <button onClick={() => { this.follow(user.id) }}>Follow</button>
                                    )}
                                    {(this.props.following.includes(user.id) && this.props.following !== 0) && (
                                        <div>You are following this user!</div>
                                    )} */}
                                    {/* {(() => {
                                        if (this.props.following !== 0) {
                                            {!this.props.following.includes(user.id) && (
                                                <button onClick={() => {this.follow(user.id)}}>Follow</button>
                                            )}
                                            {this.props.following.includes(user.id) && (
                                                <div>You are following this user!</div>
                                            )}
                                        }
                                    })()} */}
                                    {/* {!this.props.following.includes(user.id) && (
                                        <button onClick={() => {this.follow(user.id)}}>Follow</button>
                                    )}
                                    {this.props.following.includes(user.id) && (
                                        <div>You are following this user!</div>
                                    )} */}
                                </div>
                            )
                        }
                    })}
                </div>
            )
        } else {
            renderUsers = (
                <div>
                    <b>Please login to continue!</b>
                </div>
            )
        }
        
        return(
            <div>
                {renderUsers}
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        loggedInUser: state.auth.isLoggedIn,
        currentUserID: state.auth.currentID,
        following: state.auth.following
        // userList: state.auth.users 
    }
}

const mapDispatchToProps = (dispatch) => {
    /* return {
        sendUsers: dispatch
    } */
    // return bindActionCreators({sendUsers}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Explore)