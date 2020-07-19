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
import ClubReport from "ClubReport.js";
import DivisionReport from "views/DivisionReport.js";
import UserProfile from "views/UserProfile.js";
import WipView from "views/WipView";

var routes = [
  {
    path: "?division-report",
    name: "Registration Analytics",
    icon: "tim-icons icon-align-center",
    component: DivisionReport,
    layout: "/tli-reports-live"
  },
  {
    path: "?club-report",
    name: "Registration By Area",
    icon: "tim-icons icon-chart-bar-32",
    component: ClubReport,
    layout: "/tli-reports-live"
  },
  {
    path: "?wip",
    name: "Training Materials",
    icon: "tim-icons icon-single-copy-04",
    component: WipView,
    layout: "/tli-reports-live"
  },
  {
    path: "?attendee-check-in",
    name: "Event Check-In",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/tli-reports-live"
  }
];
export default routes;
