import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'
import Login from "./Login"
import PasswordSent from './PasswordSent'
import "./ForgotPassword.css"

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      redirect: false,
    };
  }

  validateForm = () => {
    const email = this.state.email.toLowerCase();
    const regex = /^\S+@purdue.edu$/;
    const validEmail = regex.test(email);

    console.log("Good email?: " + validEmail);
    return (validEmail);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ redirect: true })

    console.log("Button Clicked");
  }

  render() {
    return (
      <div className="ForgotPassword" class="fg">
        <form onSubmit={this.handleSubmit}>
          <div className="Form" class="Form">
            <FormGroup controlId="email" bsSize="large">
              <ControlLabel>Email:</ControlLabel>
              <FormControl
                className="FormInput"
                autoFocus
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </FormGroup>
          </div>
            <Button
              block
              bsSize="small"
              disabled={!this.validateForm()}
              type="submit">
              Submit        
            </Button>
        </form>
        <Link to="/login">Return to Login</Link>
        {this.state.redirect && (
          <Redirect to={'/password-reset-sent'}/>   
        )}
      </div>
    );
  }
}

export default ForgotPassword