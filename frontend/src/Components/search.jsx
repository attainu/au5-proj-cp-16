import React, { Component } from "react";
import { connect } from 'react-redux'
import axios from 'axios';
import { bindActionCreators } from "redux";
import { render } from "react-dom";

class Search extends Component {
    state = {
        user: null,
        search: "",
        message: "Search here"
    }   

    handleSearchQuery = (search) => {
        this.setState({
            search: search
        })
    }

    onSubmit = () => {
        console.log("submit clicked")
        let index = null
        for (let i = 0; i < this.props.usernames.length; i++) {
            if (this.props.usernames[i] == this.state.search) {
                index = i
            }
        }
        if (index === null) {
            console.log("Nothing found")
            this.setState({
                message: "Sorry! No user found!"
            })
        } else {
            let id = this.props.users[index].id
            axios.get(`http://localhost:3020/user/${id}`)
                    .then(res => {
                        const user = res.data;
                        // console.log("axios call data", user[0])
                        this.setState({
                            user: user[0],
                            message: "Found Below results"
                        })
                    }).catch(error => {
                        console.log(error)
                    })
        }
    }
    

    render() {
        console.log("search page")
        let renderUsers
        if (this.props.loggedInUser === true) {
            renderUsers = (
                <div>
                    {/* Please enter username and press Search */}
                    <input type="text" value={this.state.search} placeholder="Search with username" onChange={(e) => this.handleSearchQuery(e.target.value)}/>
                    <button onClick={this.onSubmit}>Search</button>
                </div>
            )
        } else {
            renderUsers = (
                <div>
                    <b>Please login to continue!</b>
                </div>
            )
        }
        let result
        if (this.state.message == "Search here") {
            result = (
                <div>
                    Please enter your query
                </div>
            )
        } else if(this.state.message == "Sorry! No user found!"){
            result = (<div>
                There is no user with this user name!
            </div>)
        } else {
            result = (
                <div>
                    {this.state.user.first_name} <br/>
                    {this.state.user.last_name} <br/>
                    {this.state.user.user_name} <br/>
                    {this.state.user.age} <br/>
                </div>
            )
        }
        
        return(
            <div>
                {renderUsers}
                {this.props.loggedInUser && (
                    result
                )}
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        loggedInUser: state.auth.isLoggedIn,
        currentUserID: state.auth.currentID,
        following: state.auth.following,
        users: state.auth.users,
        usernames: state.auth.usernames
        // userList: state.auth.users 
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
    // return bindActionCreators({sendUsers}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)