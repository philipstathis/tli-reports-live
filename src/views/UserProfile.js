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
  render() {
    return (
      <>
        <div className="content">
          <Row>
          <Col md="12">
              <Card>
                <CardHeader>
                  <h5 className="title">Please complete the information below to check-in and then proceed to the event evaluation form</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Event Access Code (Shared during Training)</label>
                          <Input
                            placeholder="accesscode"
                            type="password"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Attendee Email address (Same one used in Eventbrite)
                          </label>
                          <Input placeholder="mike@email.com" type="email" />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill" color="primary" type="submit">
                    Check-In
                  </Button>
                </CardFooter>
              </Card>
            </Col>

            <Col md="12">
              <Card className="card-user">
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
