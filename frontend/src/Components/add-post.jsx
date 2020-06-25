import React, { Component } from "react";
import { connect } from 'react-redux'
import axios from 'axios';
import { bindActionCreators } from "redux";

class AddPost extends Component {
    state = {
        data: "",
        message: "Click here to upload new post!"
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submit = (e) => {
        console.log("submittttttttt")
        if (this.state.data == "" ) {
            this.setState({
                message: "Please write something!"
            })
        } else {
            this.setState({
                message: "This post has been successfully uploaded!"
            })

            let newItem = {
                data: this.state.data,
                user_id: this.props.currentUserID
            }

            axios.post(`http://localhost:3020/post`, newItem)
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                }).catch(error => {
                    console.log(error)
                })

            this.setState({
                data: "",
                message: "Click here to upload new post!"
            })
        }
    }


    render() {
        let form
        if (this.props.isLoggedIn === true) {
            form = (
                <div className="user-form">
                    <div className="form-group">
                        <label>Enter Post Data</label>
                        <input type="text" onChange={(e) => { this.handleChange(e) }} className="form-control" value={this.state.data} name="data" aria-describedby="emailHelp" required />
                    </div>
                    <button onClick={(e) => { this.submit(e) }} type="submit" className="btn btn-primary">Submit</button>
                    <p>{this.state.message}</p>
                </div>
            )
        } else {
            form = (
                <div style={{height: '450px'}}>
                    <b>Please login to continue</b>
                </div>
            )
        }

        // console.log("Current State: ", this.state)
        // console.log("Current Props: ", this.props)
        return (
            <div>
                {form}
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        currentUserID: state.auth.currentID
        // userList: state.auth.users 
    }
}

const mapDispatchToProps = (dispatch) => {
    /* return {
        sendUsers: dispatch
    } */
    // return bindActionCreators({sendUsers}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPost)