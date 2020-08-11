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
import { Route, Switch, Redirect } from "react-router-dom";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import App from "App.js";
import ClubReport from "ClubReport.js";
import ClubOfficers from "ClubOfficers.js";
import VerifiedOnly from "VerifiedOnly.js";
import UserProfile from "views/UserProfile.js";
// import WipView from "views/WipView.js";
import HomeReport from "views/HomeReport.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import routes from "routes.js";
import logo from "assets/img/react-logo.png";
import DivisionReport from "views/DivisionReport";
import WipView from "views/WipView";

var ps;

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "blue",
      sidebarOpened:false
        // document.documentElement.className.indexOf("nav-open") !== -1
    };
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(this.refs.mainPanel, { suppressScrollX: true });
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.documentElement.className += " perfect-scrollbar-off";
      document.documentElement.classList.remove("perfect-scrollbar-on");
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      if (navigator.platform.indexOf("Win") > -1) {
        let tables = document.querySelectorAll(".table-responsive");
        for (let i = 0; i < tables.length; i++) {
          ps = new PerfectScrollbar(tables[i]);
        }
      }
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }

  // this function opens and closes the sidebar on small devices
  toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    this.setState({ sidebarOpened: !this.state.sidebarOpened });
  };

  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/tli-reports-live") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  handleBgClick = color => {
    this.setState({ backgroundColor: color });
  };

  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Toastmasters District 46: TLI Club Officer Training Status Report";
  };

  render() {
    return (
      <>
        {this.props.location.search.indexOf("attendee-check-in") === 1 ? 
          <div
            ref="mainPanel"
            data={this.state.backgroundColor}
          ><Route path="/tli-reports-live" search="?attendee-check-in" ><UserProfile/></Route> 
          </div>: ( <> {this.props.location.search.indexOf("?embed") > -1 ?
          <div
          ref="mainPanel"
          data={this.state.backgroundColor}
        ><Route path="/tli-reports-live" search="?embed" ><HomeReport/></Route></div> : (
        <div className="wrapper">
              <Sidebar
               {...this.props}
               routes={routes}
               bgColor={this.state.backgroundColor}
               logo={{
                 outterLink: "https://toastmasters46.org",
                 text: "Detailed Reports",
                 imgSrc: logo
               }}
               toggleSidebar={this.toggleSidebar}
             />
          <div
            className="main-panel"
            ref="mainPanel"
            data={this.state.backgroundColor}
          >
            <AdminNavbar
              {...this.props}
              brandText={this.getBrandText(this.props.location.pathname)}
              toggleSidebar={this.toggleSidebar}
              sidebarOpened={this.state.sidebarOpened}
            />
            <Switch>
              {this.props.location.search.indexOf("club-report") === -1 ? null : (
                <Route path="/tli-reports-live" search="?club-report" ><ClubReport/></Route>
              )}
              {this.props.location.search.indexOf("verified-only") === -1 ? null : (
                <Route path="/tli-reports-live" search="?verified-only" ><VerifiedOnly/></Route>
              )}
              {this.props.location.search.indexOf("club-officers") === -1 ? null : (
                <Route path="/tli-reports-live" search="?club-officers" ><ClubOfficers/></Route>
              )}
              {this.props.location.search.indexOf("attendee-report") === -1 ? null : (
                <Route path="/tli-reports-live" search="?attendee-report" ><App/></Route>
              )}
              {this.props.location.search.indexOf("attendee-check-in") === -1 ? null : (
                <Route path="/tli-reports-live" search="?attendee-check-in" ><UserProfile/></Route>
              )}
              {this.props.location.search.indexOf("wip") === -1 ? null : (
                <Route path="/tli-reports-live" search="?wip" ><WipView/></Route>
              )}
              <Route path="/tli-reports-live" search=""><DivisionReport/></Route>
              <Redirect from="*" to="/tli-reports-live"/>
            </Switch>
          </div>
        </div>)}</>)
    }
    </>
    );
  }
}

export default Admin;