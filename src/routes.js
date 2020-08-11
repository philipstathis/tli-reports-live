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
import ClubOfficers from "ClubOfficers.js";
import DivisionReport from "views/DivisionReport.js";

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
    name: "Area and Club-level Details",
    icon: "tim-icons icon-chart-bar-32",
    component: ClubReport,
    layout: "/tli-reports-live"
  },
  {
    path: "?club-officers",
    name: "Officer Level Details",
    icon: "tim-icons icon-chart-bar-32",
    component: ClubOfficers,
    layout: "/tli-reports-live"
  }
];
export default routes;
