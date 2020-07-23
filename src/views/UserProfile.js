/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import logo from "../assets/img/logo-main-2020.png";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Media
} from "reactstrap";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        errors: {}
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    document.body.classList.add("white-content");
  }

  handleChange(e) {
    console.log(e);
    this.setState({
        [e.target.name]: e.target.value
    });
  }

  handleValidation(){
    let errors = {};
    let formIsValid = true;
    const attendeeEmail = this.state.attendeeEmail;
    const eventPassword = this.state.eventPassword;

    //Name
    if(!eventPassword){
       formIsValid = false;
       errors["eventPassword"] = "Cannot be empty";
    }

    //Email
    if(!attendeeEmail){
       formIsValid = false;
       errors["attendeeEmail"] = "Cannot be empty";
    }

    if(typeof attendeeEmail !== "undefined"){
       let lastAtPos = attendeeEmail.lastIndexOf('@');
       let lastDotPos = attendeeEmail.lastIndexOf('.');

       if (!(lastAtPos < lastDotPos && lastAtPos > 0 && attendeeEmail.indexOf('@@') === -1 && lastDotPos > 2 && (attendeeEmail.length - lastDotPos) > 2)) {
          formIsValid = false;
          errors["attendeeEmail"] = "attendeeEmail is not valid";
        }
    }  

    this.setState({errors: errors});
    return formIsValid;
  }

  handleSubmit(event) {
    event.preventDefault();
    if(!this.handleValidation()){
      alert("Please fill out both the event password and your e-mail.")
    }
    else {
      fetch('https://a5slwb8wx6.execute-api.us-east-1.amazonaws.com/dev/todos', {
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify( {
            'attendeeEmail': this.state.attendeeEmail,
            'eventPassword': this.state.eventPassword 
          }),
          method: 'POST'
      }).then( response => response.json()).then(res => {
        console.log(res);
        if (res.id){
          this.setState({disabled: true, completeMessage: 'Check-In Complete, Thank You!'});
        }else {
          alert("Message failed to send. Did you enter the Correct Access Code? E-mail district46officerstraining@gmail.com for support.");
        }
      }).catch(e => console.log(e));
    }
  }

  render() {
    return (
      <>
        <div className="content">
        <Media middle>
          <img src={logo} alt="Toastmasters District 46" />
        </Media>
        <h1> </h1>
          <Row>
          <Col md="12">
              <Card>
                <CardHeader>
                  <h3 className="title">Step 1. Fill in the 2 Boxes Below and Click Check-In</h3>
                </CardHeader>
                  <Form
                    method={this.props.method}
                    onSubmit={this.handleSubmit}>
                  <CardBody>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Event Access Code (6 digit number - Shared During Training)</label>
                          <Input
                            placeholder="accesscode"
                            type="text"
                            name="eventPassword"
                            onChange={this.handleChange}
                          />
                          <span style={{color: "red"}}>{this.state.errors["eventPassword"]}</span>
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Your Email Address (Same one used in Eventbrite)
                          </label>
                          <Input placeholder="mike@email.com"
                                 type="email"
                                 name="attendeeEmail"
                                 onChange={this.handleChange} />
                          <span style={{color: "red"}}>{this.state.errors["attendeeEmail"]}</span>
                        </FormGroup>
                      </Col>
                    </Row>
                </CardBody>
                <CardFooter>
                  <Button name="checkin" className="btn-fill" color="primary" disabled={this.state.disabled} type="submit">
                    {this.state.completeMessage || 'Check In'}
                  </Button>
                </CardFooter>
                </Form>
              </Card>
            </Col>

            <Col md="12">
              <Card className="card-user">
                <CardHeader>
                  <h3 className="title">Step 2: Fill out the anonymous survey!</h3>
                </CardHeader>
                <CardText>
                <iframe title="Anonymous evaluation" src="https://docs.google.com/forms/d/e/1FAIpQLSdXV-PrmBnVumIFYUrAM8PxYDaFu0jLNF1IlMWO5Q3V_-edow/viewform?embedded=true" width="100%" height="600em" frameBorder="0" marginHeight="0" marginWidth="0">Loading…</iframe>
                </CardText>
              </Card>
            </Col>
            
          </Row>
        </div>
      </>
    );
  }
}

export default UserProfile;
