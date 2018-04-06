import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './EditProfile.css'
import { Button, FormGroup, FormControl, ControlLabel, Radio, Checkbox, DropdownButton, InputGroup, MenuItem, ButtonGroup } from "react-bootstrap";
import './CreateAThread.css'
import TopNavBar from './TopNavBar.js'

class CreateAThread extends Component {
    constructor() {
      super()
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.getAccessToken = this.getAccessToken.bind(this);
         this.getID = this.getID.bind(this);
   
         this.state = {
          threadTitle: "",
          threadBody: "",
      }
    }
   
    // Return user id if signed in, null if not
    signedIn = () => {
      return this.state.signedIn
    }
   
    // handle auth, set userid
    handleAuth = (user) => {
      localStorage.setItem('userid', user.uid)
   
      this.setState( 
        {uid: user.uid}
      )
    }
   
   
    getLocalStorage = (key) => {
      return localStorage.getItem(key);
    }
   
    handleSubmit = (event) => {
      event.preventDefault();
      this.setState({ redirect: true })
      const _this = this;
      const id = _this.getLocalStorage("id");
      let token = _this.getLocalStorage("token");
      let forum_id = this.getLocalStorage("forum_id");
      let title = document.getElementById('threadTitle').textContent;
      let body = document.getElementById('threadBody').textContent;
      console.log(title);
      this.setState ({
          threadTitle: title,
      });

      var payload = JSON.stringify({
        "userId": id,
        "token": token,
        "forum_id": forum_id,
        "threadTitle": this.state.threadTitle,
        "threadBody": this.state.threadBody,
      });
      
      fetch('http://localhost:8080/communitys/start-thread', {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json;charset=UTF-8',
         'transfer-encoding': 'chunked',
       },
       body: payload,
     })
     .then(function(response) {
       if (response.ok) {
         // redirect to profile?
         //_this.setState({ redirect: true })
         document.getElementById("success").value="Your profile was successfully updated!";
         response.json().then(json => {
           console.log(json);
         });
   
       } else {
         alert("Error in updating profile");
       }     
     })
      }
   
   
      handleChange = (event) => {
          this.setState({
            [event.target.id]: event.target.value
          });        
      }

      getAccessToken = () => {
          // The type of token might be JSON
          const token = localStorage.getItem("token");
          if (!token) {
              throw new Error('No Token Found');
          }
          return token;
      }
   
     
      getID = () => {
          // The type of token might be JSON
          const id = localStorage.getItem("id");
          if (!id) {
              throw new Error('No ID Found');
          }
          return id;
      }
    componentDidUpdate = () => {
      console.log(this.state);
    }
    // handle unauth, remove userid
    handleUnauth = () => {
      localStorage.removeItem('uid')
    }
   
    render() {
      return (
        <div className="CreateAThread">
          <div className="Container">
          <TopNavBar/>
          <form onSubmit={this.handleSubmit}>
            <div className="Form">
            <h1> Create A Thread </h1>
                <div 
                    id="threadTitle"
                    contenteditable="true"> 
                    Enter a title
                </div>
                <div 
                    id="threadBody"
                    contenteditable="true"> 
                    Body
                </div>
                <Button
                bsSize="small"
                type="submit">
                SUBMIT       
              </Button>
            </div>
          </form>
          </div>
        </div>
      )
    }
   }
   
   export default CreateAThread;
   
   