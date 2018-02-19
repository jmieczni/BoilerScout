import React, {Component} from 'react'
import { BrowserRouter as Router, Link, Redirect} from 'react-router-dom'
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import './SignUp.css'

class SignUp extends Component {
    constructor (props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            repeatpassword: "",
            redirect: false,
        };
    }

    validateForm = () => {
        const email = this.state.email.toLowerCase();
        const regex = /^\S+@purdue.edu$/;
        const validEmail = regex.test(email);
        console.log("Good email?: " + validEmail);
        
        const password = this.state.password;
        const repeatpass = this.state.repeatpassword;
        
        // Password must have 8 characters, include an uppercase letter, lowercase letter, one special character  and a number
        const validPassword = password.test("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}");
        const repeatPassword = (password == repeatpass);
        console.log("Password good?" + validPassword);
        console.log("Passwords match?" + repeatpass);
        return (validEmail && validPassword && repeatPassword);
    }

    handleChange = (event) => {
        this.setState({
          [event.target.id]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ redirect: true })
      }

    render () {
    return (
        <div className="SignUp">
            <form onSubmit={this.handleSubmit}>
            <div className="Form">
            <FormGroup controlId="signup" bsSize="large">
              <ControlLabel>Email:</ControlLabel>
              <FormControl
                className="FormInput"
                autoFocus
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password:</ControlLabel>
             <FormControl
                className="FormInput Password"
                autoFocus
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
            <ControlLabel>Repeat Password:</ControlLabel>
             <FormControl
                className="FormInput repeatPassword"
                autoFocus
                type="repeatpassword"
                value={this.state.password}
                onChange={this.handleChange}
              />
              </FormGroup>
              </div>
            <Button
              block
              bsSize="small"
              disabled={!this.validateForm()}
              type="submit">
              SUBMIT        
            </Button>
            </form>
        </div>
    )
    }

}

export default SignUp;