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
import { Card, CardHeader, CardTitle, Row, Col } from "reactstrap";

class WipView extends React.Component {
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader className="mb-5">
                  <h5 className="card-category">Message from District 46 TLI</h5>
                  <CardTitle tag="h3">
                    PAGE UNDER CONSTRUCTION, COME BACK SOON
                  </CardTitle>
                </CardHeader>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default WipView;
