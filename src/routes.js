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
import App from "App.js";
import ClubReport from "ClubReport.js";
import UserProfile from "views/UserProfile.js";

var routes = [
  {
    path: "?club-report",
    name: "Club Registration Report",
    icon: "tim-icons icon-chart-pie-36",
    component: ClubReport,
    layout: "/tli-reports-live"
  },
  {
    path: "?attendee-report",
    name: "Attendee Report",
    icon: "tim-icons icon-chart-pie-36",
    component: App,
    layout: "/tli-reports-live"
  },
  {
    path: "?attendee-check-in",
    name: "Check-In",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/tli-reports-live"
  }
];
export default routes;
