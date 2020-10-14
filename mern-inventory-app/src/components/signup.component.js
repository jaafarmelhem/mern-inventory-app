import React, { Component } from 'react';
import axios from 'axios';

/**test command **/
export default class signup extends Component {

    constructor(props) {
        super(props);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            password: ''
        }
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`Email: ${this.state.email}`);
        console.log(`Password: ${this.state.password}`);

        const User = {
            email: this.state.email,
            password: this.state.password
        };

        axios.post('http://localhost:4000/users/add', User)
            .then(res => console.log(res.data));

        this.setState({
            email: '',
            password: ''
        })
    }


    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Sign Up</h3>
                <form onSubmit={this.onSubmit}>

                <div className="form-group"> 
                        <label>Email: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                                />
                    </div>

                    <div className="form-group"> 
                        <label>Password: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                                />
                    </div>


                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
