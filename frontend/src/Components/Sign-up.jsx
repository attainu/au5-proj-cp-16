import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux'

class Signup extends React.Component {
    state = {
        username: "",
        firstname: "",
        lastname: "",
        age: null,
        email: "",
        password: "",
        mobile: "",
        message: "Click here to sign up!"
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submit = (e) => {
        console.log("submittttttttt")
        if (this.state.username == "" || this.state.firstname == "" || this.state.lastname == "" || this.state.age == "" || this.state.email == "" || this.state.password == "" || this.state.mobile == "" || this.state.address == "" ) {
            this.setState({
                message: "Please fill all the inputs"
            })
        } else {
            if (this.props.userList.length === 0) {
                this.setState({
                    message: "Your profile has been successfully created!"
                })
                
                let newUser = {
                    user_name: this.state.username,
                    first_name: this.state.firstname,
                    last_name: this.state.lastname,
                    email: this.state.email,
                    password: this.state.password,
                    mobile: this.state.mobile,
                    age: this.state.age,
                    address: this.state.address
                }
    
                axios.post(`http://localhost:3020/user`, newUser)
                    .then(res => {
                        console.log(res);
                        console.log(res.data);
                    }).catch(error => {
                        console.log(error)
                    })

            } else {
                for (var i = 0; i < this.props.userList.length; i++) {
                    if (this.props.userList[i].user_name === this.state.username) {
                        e.preventDefault()
                        console.log("username not unique")
                        this.setState({
                            message: "Sorry! This username already exists."
                        })
                        break
                    }
                    
                    if (this.props.userList[i].email === this.state.email) {
                        e.preventDefault()
                        console.log("email not unique")
                        this.setState({
                            message: "Sorry! This email already exists."
                        })
                        break
                    }
    
                    if (this.props.userList[i].mobile === this.state.mobile) {
                        e.preventDefault()
                        console.log("mobile not unique")
                        this.setState({
                            message: "Sorry! This contact number already exists."
                        })
                        break
                    }
    
                    console.log("creating new user ...")

                    this.setState({
                        message: "Your profile has been successfully created!"
                    })

                    let newUser = {
                        user_name: this.state.username,
                        first_name: this.state.firstname,
                        last_name: this.state.lastname,
                        email: this.state.email,
                        password: this.state.password,
                        mobile: this.state.mobile,
                        age: this.state.age,
                        address: this.state.address
                    }
    
                    axios.post(`http://localhost:3020/user`, newUser)
                        .then(res => {
                            console.log(res);
                            console.log(res.data);
                        }).catch(error => {
                            console.log(error)
                        })
                }
            }
        }
    }


    render() {
        let form = (
            <form className="user-form">
                <div className="form-group">
                    <label>Enter Username</label>
                    <input type="text" onChange={(e) => { this.handleChange(e) }} className="form-control" value={this.state.username} name="username" aria-describedby="emailHelp" required />
                </div>
                <div className="form-group">
                    <label>Enter Firstname</label>
                    <input type="text" onChange={(e) => { this.handleChange(e) }} className="form-control" value={this.state.firstname} name="firstname" aria-describedby="emailHelp" required />
                </div>
                <div className="form-group">
                    <label>Enter Lastname</label>
                    <input type="text" onChange={(e) => { this.handleChange(e) }} className="form-control" value={this.state.lastname} name="lastname" aria-describedby="emailHelp" required />
                </div>
                <div className="form-group">
                    <label>Enter Age</label>
                    <input type="integer" onChange={(e) => { this.handleChange(e) }} className="form-control" value={this.state.age} name="age" aria-describedby="emailHelp" required />
                </div>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" onChange={(e) => { this.handleChange(e) }} className="form-control" value={this.state.email} name="email" aria-describedby="emailHelp" required />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label >Password</label>
                    <input type="password" onChange={(e) => { this.handleChange(e) }} value={this.state.password} name="password" className="form-control" id="exampleInputPassword1" required />
                </div>
                <div className="form-group">
                    <label>Enter Mobile Number</label>
                    <input type="text" onChange={(e) => { this.handleChange(e) }} className="form-control" value={this.state.mobile} name="mobile" aria-describedby="emailHelp" required />
                </div>
                {/* <div className="form-group">
                    <label>Address</label>
                    <input type="text" onChange={(e) => { this.handleChange(e) }} className="form-control" value={this.state.address} name="address" aria-describedby="emailHelp" required/>
                </div> */}
                <button onClick={(e) => { this.submit(e) }} type="submit" className="btn btn-primary">Submit</button>
            </form>
        )

        let message = <p style={{marginLeft:"350px"}}>{this.state.message}</p>


        console.log("Current User: ", this.state)
        console.log("Signup Props ===> ", this.props.userList)
        return (
            <div>
                {form}
                {message}
            </div>
        )
    }
}

// export default Signup;

const mapStateToProps = (state) => {
    return {
        userList: state.auth.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // createNewUser: dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)