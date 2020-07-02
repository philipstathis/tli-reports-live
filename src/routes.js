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
import Typography from "views/Typography.js";

var routes = [
  {
    path: "/club-report",
    name: "Club Registration Report",
    icon: "tim-icons icon-puzzle-10",
    component: App,
    layout: "/tli-reports-live"
  },
  {
    path: "/typography",
    name: "Check In (Under Construction)",
    icon: "tim-icons icon-align-center",
    component: Typography,
    layout: "/tli-reports-live"
  }
];
export default routes;
