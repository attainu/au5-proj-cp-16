import React, { Component } from "react";
import { connect } from 'react-redux'
import axios from 'axios';
import { bindActionCreators } from "redux";

class UserProfile extends Component {
    state = {
        post: []
    }

    componentDidMount() {
        let id = this.props.id
        axios.get(`http://localhost:3020/post/${id}`)
            .then(res => {
                const post = res.data;
                this.setState({ post });
            })
    }

    /* deleteCurrentItem = (id) => {
        axios.delete(`http://localhost:3020/menu/${id}`)
            .then(res => {
                const menu = res.data;
                console.log(menu)
                // this.setState({ menu });
                axios.get(`http://localhost:3020/menu/${this.props.id}`)
                    .then(res => {
                        const menu = res.data;
                        this.setState({ menu });
                    })
            })
    }
 */
    render() {
        let renderHome
        let orderHistory
        if (this.state.post.length === 0) {
            orderHistory = (
                <div style={{height: '450px'}}>
                    <b>You have not added any posts on your timeline!</b>
                </div>
            )
        } else {
            orderHistory = (
                <div className="tablePage">
                    {this.state.post.map((post, index) => {
                        return (
                            <div className="table" key={index}>
                                Sr. No. : {index+1}<br />
                                {post.data}<br />
                                Current Likes:-<br />
                                Current Comments :-
                                {/* <button onClick={()=>{this.deleteCurrentItem(post.id)}}>Delete Item</button> */}
                            </div>
                        )
                    })}
                </div>
            )

        }
        let text 
        if (this.state.post.length !== 0) {
            text = (
                <h3>Current posts on your timeline :-</h3>
            )
        }
        if (this.props.loggedInStatus === true) {
            renderHome = (
                <div>
                    <b>
                        Hi, @{this.props.currentUser}
                    </b> <br />
                    {text}
                    {orderHistory}
                </div>
            )
        } else {
            renderHome = (
                <div style={{height: '450px'}}>
                    <b>Please login to continue</b>
                </div>
            )
        }

        return (
            <div style={{height: 'fit-content'}}>
                {renderHome}
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        loggedInStatus: state.auth.isLoggedIn,
        id: state.auth.currentID,
        currentUser: state.auth.currentUser
        // userList: state.auth.users 
    }
}

const mapDispatchToProps = (dispatch) => {
    return{

    }
    /* return {
        sendUsers: dispatch
    } */
    // return bindActionCreators({sendUsers}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)