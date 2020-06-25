import React, { Component, useState, useEffect } from "react";
import { connect } from 'react-redux'
import axios from 'axios';
import { bindActionCreators } from "redux";

const Comment = ({ id }) => {
    const [currentComments, setCurrentComments] = useState([])
    let response = axios.get(`http://localhost:3020/comment/${id}`)
    // console.log(response)
    response.then(res => {
        console.log(res)
        if (res.data.length !== 0) {
            return (
                <div>
                    {res.data.map(data => {
                        setCurrentComments(currentComments.concat(data.data))
                    })}
                </div>
            )
        }
    }).catch(error => {
        console.log(error)
    })
    return (
        currentComments.map(comm => {
            return <div>
                {comm}
            </div>
        })
    )
}


class Home extends Component {
    state = {
        post: [],
        message: "Please follow someone",
        comment: "",
        selectComment: null,
        postID: [],
        comments: [],
        commentMessage: "Click *Show Button* to see comments*"
    }

    componentDidMount() {
        let variable = []
        if (this.props.following !== null) {
            let id = this.props.id
            let getPostsOfID = this.props.following
            for (let index = 0; index < getPostsOfID.length; index++) {
                let currentid = getPostsOfID[index]
                axios.get(`http://localhost:3020/post/${currentid}`)
                    .then(res => {
                        const post = res.data;
                        // console.log("axios call data",post)
                        post.map(post => {
                            axios.get(`http://localhost:3020/comment/${post.id}`).then(res => {
                                // console.log("Comment of post", res)
                                if (res.data.length !== 0) {
                                    res.data.map(data => {
                                        // console.log("Comment",post.id,data.data)

                                        let obj = {
                                            post_id: post.id,
                                            comment: data.data
                                        }
                                        variable.push(obj)
                                    })
                                }
                            })
                        })
                        this.setState({
                            post: [...this.state.post, post]
                        });
                    }).catch(error => {
                        console.log(error)
                    })
            }
        }
        console.log("All comments and related post id", variable)
        this.setState({
            comments: variable
        })
    }

    handleCommentChange = (comment) => {
        this.setState({
            comment: comment
        })
    }

    selectComment = (id) => {
        console.log("Post ID selected", id)
        this.setState({
            selectComment: id,
            comment: ""
        })
    }

    postComment = (id) => {
        // console.log(this.state.comment)
        let newItem = {
            data: "@" + this.props.currentUser + "-->" + this.state.comment,
            post_id: id
        }
        console.log(newItem)
        axios.post(`http://localhost:3020/comment`, newItem)
            .then(res => {
                console.log(res);
                console.log(res.data);
            }).catch(error => {
                console.log(error)
            })
        this.setState({
            comment: "",
            selectComment: null
        })
        this.forceUpdate()
    }

    /* getCommentsForPost = (id) => {
        axios.get(`http://localhost:3020/comment/${id}`)
            .then(res => {
                const post = res.data;
                // console.log(post)
                return post.map((post, index) => {
                    return <Comment key={index} data={post.data}/>
                })
            }).catch(error => {
                console.log(error)
            })
    } */

    showComments = () => {
        this.forceUpdate()
        if (this.state.comments.length == 0) {
            this.setState({
                commentMessage: "No comment on any post"
            })
        }
    }

    render() {
        // console.log("all posts on home page ---> ", this.state.post)
        let renderHome
        let orderHistory
        if (this.state.post.length === 0) {
            orderHistory = (
                <div style={{ height: '450px' }}>
                    <b>{this.state.message}</b>
                </div>
            )
        } else {
            orderHistory = (
                <div className="tablePage">
                    {this.state.post.map((post, index) => {
                        // console.log("postttt",post)
                        return post.map((pos, inde) => {
                            // console.log("posss", pos)
                            return (
                                <div className="table" key={inde}>
                                    Post ID : {pos.id}<br />
                                     @{pos.user.user_name} <br />
                                    {pos.data}<br />
                                     Current Likes :-<br />
                                     Current Comments :-
                                    {(() => {
                                        // console.log("HIII", this.state.comments)
                                        if (this.state.comments.length !== 0) {
                                            console.log(this.state.comments)
                                            let finalComments = []
                                            for (let i = 0; i < this.state.comments.length; i++) {
                                                const element = this.state.comments[i];
                                                // console.log(element, pos.id)
                                                if (element.post_id === pos.id) {
                                                    // console.log("comment should come", element)
                                                    finalComments.push(element.comment)
                                                } 
                                            }
                                            if (finalComments.length !== 0) {
                                                console.log("final comments for this post", finalComments)
                                                {return finalComments.map(comment => {
                                                    console.log("individual comment", comment)
                                                    return(
                                                        <div>
                                                            {comment}
                                                        </div>
                                                    )
                                                })}
                                            } else {
                                                return(
                                                    <div>
                                                        This post has no comments
                                                    </div>
                                                )
                                            }
                                        } else {
                                            return(
                                            <div>{this.state.commentMessage}</div>
                                            )
                                        }
                                    })()}
                                    {/* <Comment id={pos.id}/> */}
                                    {/* {this.getCommentsForPost(pos.id)} */}
                                    <button onClick={() => { this.selectComment(pos.id) }}>Select to comment!</button>
                                </div>
                            )
                        })
                        /*  return (
                             {<div className="table" key={inde}>
                                     Sr. No. : {inde+1}<br />
                                     {pos.data}<br />
                                     Current Likes:-<br />
                                     Current Comments :-
                                 </div>}
                         ) */
                    })}
                    <br />
                    {this.state.selectComment === null && (
                        <div>Select a post to comment on it!</div>
                    )}
                    {this.state.selectComment !== null && (
                        <div>
                            Currently selected post with ID {this.state.selectComment} <br />
                            Add your comment below and press enter to post Comment <br />
                            <input value={this.state.comment} onChange={(e) => { this.handleCommentChange(e.target.value) }} type="text" /> <br />
                            <button onClick={() => this.postComment(this.state.selectComment)}>Enter</button>
                        </div>
                    )}
                </div>
            )

        }
        let text
        if (this.state.post.length !== 0) {
            text = (
                <div>
                    <h3>Current posts on your timeline :-</h3>
                    <button onClick={this.showComments}>Show Comments</button>
                </div>
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
                <div style={{ height: '450px' }}>
                    <b>Please login to continue</b>
                </div>
            )
        }
        console.log("final", this.state.comments)
        return (
            <div style={{ height: 'fit-content' }}>
                {renderHome}
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        loggedInStatus: state.auth.isLoggedIn,
        id: state.auth.currentID,
        currentUser: state.auth.currentUser,
        following: state.auth.following
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
    /* return {
        sendUsers: dispatch
    } */
    // return bindActionCreators({sendUsers}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)