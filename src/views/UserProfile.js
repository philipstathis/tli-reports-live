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
  Col
} from "reactstrap";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
        [e.target.name]: e.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
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

  render() {
    return (
      <>
        <div className="content">
          <Row>
          <Col md="12">
              <Card>
                <CardHeader>
                  <h5 className="title">Please complete the information below to Confirm Attendance</h5>
                </CardHeader>
                  <Form
                    method={this.props.method}
                    onSubmit={this.handleSubmit}>
                  <CardBody>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Event Access Code (Shared during Training)</label>
                          <Input
                            placeholder="accesscode"
                            type="text"
                            name="eventPassword"
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Attendee Email address (Same one used in Eventbrite)
                          </label>
                          <Input placeholder="mike@email.com"
                                 type="email"
                                 name="attendeeEmail"
                                 onChange={this.handleChange} />
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
                  <h5 className="title">Let us know how it went! Your name won't appear in the evaluation!</h5>
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
