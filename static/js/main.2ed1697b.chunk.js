/*! For license information please see main.2ed1697b.chunk.js.LICENSE.txt */
(this["webpackJsonptli-reports-live"]=this["webpackJsonptli-reports-live"]||[]).push([[0],{26:function(e,t,a){e.exports=a.p+"static/media/react-logo.eb6be414.png"},27:function(e,t,a){e.exports=a(50)},36:function(e,t,a){},47:function(e,t,a){},48:function(e,t,a){},49:function(e,t,a){},50:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(16),o=a.n(r),s=a(7),c=a(10),i=a(12),m=a(51),p=a(52);class d extends l.a.Component{render(){return l.a.createElement("footer",{className:"footer"},l.a.createElement(m.a,{fluid:!0},l.a.createElement(p.a,null),l.a.createElement("div",{className:"copyright"},"\xa9 ",(new Date).getFullYear()," made with"," ",l.a.createElement("i",{className:"tim-icons icon-heart-2"})," using the template from "," ",l.a.createElement("a",{href:"https://www.creative-tim.com/?ref=bdr-user-archive-footer",target:"_blank"},"Creative Tim")," ","for a better web.")))}}var u,h=d,f=a(11);class g extends l.a.Component{constructor(e){super(e),this.linkOnClick=()=>{document.documentElement.classList.remove("nav-open")},this.activeRoute.bind(this)}activeRoute(e){return this.props.location.pathname.indexOf(e)>-1?"active":""}componentDidMount(){navigator.platform.indexOf("Win")>-1&&(u=new i.a(this.refs.sidebar,{suppressScrollX:!0,suppressScrollY:!1}))}componentWillUnmount(){navigator.platform.indexOf("Win")>-1&&u.destroy()}render(){const e=this.props,t=e.bgColor,a=e.routes,n=e.rtlActive,r=e.logo;let o=null,s=null;return void 0!==r&&(void 0!==r.outterLink?(o=l.a.createElement("a",{href:r.outterLink,className:"simple-text logo-mini",target:"_blank",onClick:this.props.toggleSidebar},l.a.createElement("div",{className:"logo-img"},l.a.createElement("img",{src:r.imgSrc,alt:"react-logo"}))),s=l.a.createElement("a",{href:r.outterLink,className:"simple-text logo-normal",target:"_blank",onClick:this.props.toggleSidebar},r.text)):(o=l.a.createElement(f.a,{to:r.innerLink,className:"simple-text logo-mini",onClick:this.props.toggleSidebar},l.a.createElement("div",{className:"logo-img"},l.a.createElement("img",{src:r.imgSrc,alt:"react-logo"}))),s=l.a.createElement(f.a,{to:r.innerLink,className:"simple-text logo-normal",onClick:this.props.toggleSidebar},r.text))),l.a.createElement("div",{className:"sidebar",data:t},l.a.createElement("div",{className:"sidebar-wrapper",ref:"sidebar"},null!==o||null!==s?l.a.createElement("div",{className:"logo"},o,s):null,l.a.createElement(p.a,null,a.map((e,t)=>e.redirect?null:l.a.createElement("li",{className:this.activeRoute(e.path)+(e.pro?" active-pro":""),key:t},l.a.createElement(f.b,{to:e.layout+e.path,className:"nav-link",activeClassName:"active",onClick:this.props.toggleSidebar},l.a.createElement("i",{className:e.icon}),l.a.createElement("p",null,n?e.rtlName:e.name)))),l.a.createElement("li",{className:"active-pro"}))))}}g.defaultProps={rtlActive:!1,bgColor:"primary",routes:[{}]};var E=g,b=(a(36),a(25));a(45),a(46);class v extends n.Component{constructor(e){super(e),this.state={columnDefs:[{headerName:"First Name",field:"first_name",sortable:!0,filter:!0,resizable:!0},{headerName:"Officer Role Selected",field:"role",sortable:!0,filter:!0,resizable:!0},{headerName:"Toastmasters Club Name",field:"clubName",sortable:!0,filter:!0,resizable:!0},{headerName:"Toastmasters Division",field:"division",sortable:!0,filter:!0,resizable:!0},{headerName:"Toastmasters Area",field:"area",sortable:!0,filter:!0,resizable:!0},{headerName:"Attended",field:"checked_in"}]}}componentDidMount(){Promise.all([fetch("https://a5slwb8wx6.execute-api.us-east-1.amazonaws.com/dev/events/110731167904"),fetch("https://a5slwb8wx6.execute-api.us-east-1.amazonaws.com/dev/events/110731189970"),fetch("https://a5slwb8wx6.execute-api.us-east-1.amazonaws.com/dev/events/110731193982"),fetch("https://a5slwb8wx6.execute-api.us-east-1.amazonaws.com/dev/events/110731204012"),fetch("https://a5slwb8wx6.execute-api.us-east-1.amazonaws.com/dev/events/110731218054"),fetch("https://a5slwb8wx6.execute-api.us-east-1.amazonaws.com/dev/events/110731222066")]).then((function(e){return Promise.all(e.map((function(e){return e.json()})))})).then(e=>e.reduce((function(e,t){return Array.prototype.concat(e,t)}),[])).then(e=>this.setState({rowData:e})).catch((function(e){console.log(e)}))}render(){return l.a.createElement("div",{className:"content ag-theme-alpine",style:{height:"100%",width:"100%"}},l.a.createElement(b.AgGridReact,{columnDefs:this.state.columnDefs,rowData:this.state.rowData}))}}var w=v,x=a(53),N=a(54),k=a(55),C=a(56),S=a(57),y=a(58),O=a(59),D=a(60),L=a(61),A=a(62),T=a(63);class z extends l.a.Component{render(){return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"content"},l.a.createElement(x.a,null,l.a.createElement(N.a,{md:"12"},l.a.createElement(k.a,null,l.a.createElement(C.a,null,l.a.createElement("h5",{className:"title"},"Please complete the information below to check-in and then proceed to the event evaluation form")),l.a.createElement(S.a,null,l.a.createElement(y.a,null,l.a.createElement(x.a,null,l.a.createElement(N.a,{className:"pr-md-1",md:"6"},l.a.createElement(O.a,null,l.a.createElement("label",null,"Event Access Code (Shared during Training)"),l.a.createElement(D.a,{placeholder:"accesscode",type:"password"}))),l.a.createElement(N.a,{className:"pl-md-1",md:"6"},l.a.createElement(O.a,null,l.a.createElement("label",{htmlFor:"exampleInputEmail1"},"Attendee Email address (Same one used in Eventbrite)"),l.a.createElement(D.a,{placeholder:"mike@email.com",type:"email"})))))),l.a.createElement(L.a,null,l.a.createElement(A.a,{className:"btn-fill",color:"primary",type:"submit"},"Check-In")))),l.a.createElement(N.a,{md:"12"},l.a.createElement(k.a,{className:"card-user"},l.a.createElement(T.a,null,l.a.createElement("iframe",{title:"Anonymous evaluation",src:"https://docs.google.com/forms/d/e/1FAIpQLSdXV-PrmBnVumIFYUrAM8PxYDaFu0jLNF1IlMWO5Q3V_-edow/viewform?embedded=true",width:"100%",height:"600em",frameBorder:"0",marginHeight:"0",marginWidth:"0"},"Loading\u2026")))))))}}var I,P=z,F=[{path:"?club-report",name:"Club Registration Report",icon:"tim-icons icon-chart-pie-36",component:w,layout:"/tli-reports-live"},{path:"?attendee-check-in",name:"Check-In",icon:"tim-icons icon-single-02",component:P,layout:"/tli-reports-live"}],R=a(26),W=a.n(R);class B extends l.a.Component{constructor(e){super(e),this.toggleSidebar=()=>{document.documentElement.classList.toggle("nav-open"),this.setState({sidebarOpened:!this.state.sidebarOpened})},this.getRoutes=e=>e.map((e,t)=>l.a.createElement(c.b,{path:e.layout+e.path,component:e.component,key:t})),this.handleBgClick=e=>{this.setState({backgroundColor:e})},this.getBrandText=e=>{for(let t=0;t<F.length;t++)if(-1!==this.props.location.pathname.indexOf(F[t].layout+F[t].path))return F[t].name;return"Brand"},this.state={backgroundColor:"blue",sidebarOpened:-1!==document.documentElement.className.indexOf("nav-open")}}componentDidMount(){if(navigator.platform.indexOf("Win")>-1){document.documentElement.className+=" perfect-scrollbar-on",document.documentElement.classList.remove("perfect-scrollbar-off"),I=new i.a(this.refs.mainPanel,{suppressScrollX:!0});let e=document.querySelectorAll(".table-responsive");for(let t=0;t<e.length;t++)I=new i.a(e[t])}}componentWillUnmount(){navigator.platform.indexOf("Win")>-1&&(I.destroy(),document.documentElement.className+=" perfect-scrollbar-off",document.documentElement.classList.remove("perfect-scrollbar-on"))}componentDidUpdate(e){if("PUSH"===e.history.action){if(navigator.platform.indexOf("Win")>-1){let e=document.querySelectorAll(".table-responsive");for(let t=0;t<e.length;t++)I=new i.a(e[t])}document.documentElement.scrollTop=0,document.scrollingElement.scrollTop=0,this.refs.mainPanel.scrollTop=0}}render(){return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"wrapper"},l.a.createElement(E,Object.assign({},this.props,{routes:F,bgColor:this.state.backgroundColor,logo:{outterLink:"https://toastmasters46.org",text:"TLI DISTRICT 46",imgSrc:W.a},toggleSidebar:this.toggleSidebar})),l.a.createElement("div",{className:"main-panel",ref:"mainPanel",data:this.state.backgroundColor},l.a.createElement(c.d,null,-1===this.props.location.search.indexOf("club-report")?null:l.a.createElement(c.b,{path:"/tli-reports-live",search:"?club-report"},l.a.createElement(w,null)),-1===this.props.location.search.indexOf("attendee-check-in")?null:l.a.createElement(c.b,{path:"/tli-reports-live",search:"?attendee-check-in"},l.a.createElement(P,null)),l.a.createElement(c.b,{path:"/tli-reports-live",search:""},l.a.createElement(w,null)),l.a.createElement(c.a,{from:"*",to:"/tli-reports-live?club-report"})),-1!==this.props.location.pathname.indexOf("maps")?null:l.a.createElement(h,{fluid:!0}))))}}var _=B;a(47),a(48),a(49);const M=Object(s.a)();o.a.render(l.a.createElement(c.c,{history:M},l.a.createElement(c.d,null,l.a.createElement(c.b,{from:"/tli-reports-live",render:e=>l.a.createElement(_,e)}),l.a.createElement(c.a,{from:"*",to:"/tli-reports-live?club-report"}))),document.getElementById("root"))}},[[27,1,2]]]);
//# sourceMappingURL=main.2ed1697b.chunk.js.map