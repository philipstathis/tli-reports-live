import React, { Component } from 'react';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
const clubData = require('variables/clubData');

class VerifiedOnly extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [{
        headerName: "Division", field: "division", sort: 'asc', chartDataType: 'category'
      },{
        headerName: "Area", field: "area",  sort: 'asc', chartDataType: 'category'
      },{
        headerName: "Club Name", field: "clubName", sortable: true
      },{
        headerName: "Dashboard Shows", field: "trained", sortable: true
      },{
        headerName: "Eventbrite Shows",
        valueGetter: function(params) {
          return parseInt(params.getValue("President") || 0) + 
            parseInt(params.getValue("Vice President of Education") || 0) +
            parseInt(params.getValue("Vice President of Membership") || 0) +
            parseInt(params.getValue("Vice President of PR") || 0) +
            parseInt(params.getValue("Secretary") || 0) +
            parseInt(params.getValue("Treasurer") || 0) +
            parseInt(params.getValue("Sergeant at Arms") || 0);
        },sortable: true
      },{
        headerName: "Needs Update",
        valueGetter: function(params) {
          return parseInt(params.getValue("President") || 0) + 
          parseInt(params.getValue("Vice President of Education") || 0) +
          parseInt(params.getValue("Vice President of Membership") || 0) +
          parseInt(params.getValue("Vice President of PR") || 0) +
          parseInt(params.getValue("Secretary") || 0) +
          parseInt(params.getValue("Treasurer") || 0) +
          parseInt(params.getValue("Sergeant at Arms") || 0) - params.getValue("trained");
        },sortable: true
      },{
        headerName: "Pres", field: "President"
      },{
        headerName: "VPE", field: "Vice President of Education"
      },{
        headerName: "VPM", field: "Vice President of Membership"
      },{
        headerName: "VPPR", field: "Vice President of PR"
      },{
        headerName: "Secr", field: "Secretary"
      },{
        headerName: "Treas", field: "Treasurer"
      },{
        headerName: "SAA", field: "Sergeant at Arms"
      }],
      statusBar: {
        statusPanels: [
            { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left' }
        ]
      },
      defaultColDef: {
        sortable: true,
        filter: true,
        resizable: true,
      },
      autoGroupColumnDef: {
        cellRendererParams: {
          suppressCount: true,
        },
      },
      groupMultiAutoColumn: true,
      popupParent: document.body,
      groupIncludeFooter: true,
      sideBar: false,
      enableRangeSelection: true,
      enableCharts: true,
      onGridReady: this.onFirstDataRendered,
      processChartOptions: this.processChartOptions,
    }
  }

  processChartOptions(params) {
    var options = params.options;
  
    // console.log('chart options:', options);
  
    // we are only interested in processing bar type.
    // so if user changes the type using the chart control,
    // we ignore it.
    if (
      [
        'stackedBar',
        'groupedBar',
        'normalizedBar',
        'stackedColumn',
        'groupedColumn',
        'normalizedColumn',
      ].indexOf(params.type) < 0
    ) {
      console.log('chart type is ' + params.type + ', making no changes.');
      return options;
    }
  
    options.seriesDefaults.fill.colors = ['#e1ba00', 'silver', 'peru'];
    options.seriesDefaults.fill.opacity = 0.8;
  
    options.seriesDefaults.stroke.colors = ['black', '#ff0000'];
    options.seriesDefaults.stroke.opacity = 0.8;
    options.seriesDefaults.stroke.width = 2;
  
    options.seriesDefaults.shadow.enabled = true;
    options.seriesDefaults.shadow.color = 'rgba(0, 0, 0, 0.3)';
    options.seriesDefaults.shadow.xOffset = 10;
    options.seriesDefaults.shadow.yOffset = 5;
    options.seriesDefaults.shadow.blur = 8;
  
    options.seriesDefaults.label.enabled = true;
    options.seriesDefaults.label.fontStyle = 'italic';
    options.seriesDefaults.label.fontWeight = 'bold';
    options.seriesDefaults.label.fontSize = 15;
    options.seriesDefaults.label.fontFamily = 'Arial, sans-serif';
    options.seriesDefaults.label.color = 'green';
    options.seriesDefaults.label.formatter = function(params) {
      return '<' + params.value + '>';
    };
  
    options.seriesDefaults.highlightStyle.fill = 'red';
    options.seriesDefaults.highlightStyle.stroke = 'yellow';
  
    options.seriesDefaults.tooltip.renderer = function(params) {
      var x = params.datum[params.xKey];
      var y = params.datum[params.yKey];
      return (
        '<u style="color: ' +
        params.color +
        '">' +
        (params.title || params.yName) +
        '</u><br><br><b>' +
        params.xName.toUpperCase() +
        ':</b> ' +
        x +
        '<br/><b>' +
        params.yName.toUpperCase() +
        ':</b> ' +
        y
      );
    };
  
    return options;
  }
  
  onFirstDataRendered(params) {
    var defaultSortModel = [
      { colId: 'division', sort: 'asc' },
      { colId: 'area', sort: 'asc' },
      { colId: 'clubName', sort: 'asc' }
    ];
    params.api.setSortModel(defaultSortModel);
    params.api.resetRowHeights();
    params.api.sizeColumnsToFit();
  }

  async componentDidMount() {
    Promise.all([
      fetch('https://a5slwb8wx6.execute-api.us-east-1.amazonaws.com/dev/events/110731167904', {retries: 4,retryDelay: 1000}),
      fetch('https://a5slwb8wx6.execute-api.us-east-1.amazonaws.com/dev/events/110731189970', {retries: 4,retryDelay: 2000}),
      fetch('https://a5slwb8wx6.execute-api.us-east-1.amazonaws.com/dev/events/110731193982', {retries: 4,retryDelay: 3000}),
      fetch('https://a5slwb8wx6.execute-api.us-east-1.amazonaws.com/dev/events/110731204012', {retries: 4,retryDelay: 2000}),
      fetch('https://a5slwb8wx6.execute-api.us-east-1.amazonaws.com/dev/events/110731218054', {retries: 4,retryDelay: 3000}),
      fetch('https://a5slwb8wx6.execute-api.us-east-1.amazonaws.com/dev/events/110731222066', {retries: 4,retryDelay: 2000}),
      fetch('https://a5slwb8wx6.execute-api.us-east-1.amazonaws.com/dev/events/114842057686', {retries: 4,retryDelay: 3000}),
      fetch('https://a5slwb8wx6.execute-api.us-east-1.amazonaws.com/dev/events/114842067716', {retries: 4,retryDelay: 2000})
  ]).then(function (responses) {
      // Get a JSON object from each of the responses
      return Promise.all(responses.map(function (response) {
        return response.json();
      }));
    }).then(data => data.reduce(function (answerObjects, response) {
        return Array.prototype.concat(answerObjects, response);
      }, [])
    ).then(async data => {
        var dataByOfficer = data.filter(s => s["division"] !== "Outside District 46").filter(s => clubData.filterInvalid(s))
        .filter(s => s["checked_in"] && new Date().getTime() > new Date(s["startTime"]).getTime())
        .reduce(
          function (dataByOfficer, singleRow) {
            let value = singleRow["first_name"];
            const role = singleRow["role"]
            const group = clubData.getClubNumber(singleRow["clubName"]);
            const attended = "1";

            if (singleRow["checked_in"]) {
                value = attended;
            }
            if (!dataByOfficer[group]) {
                dataByOfficer[group] = {
                    "division": singleRow["division"],
                    "area": singleRow["area"],
                    "clubName": singleRow["clubName"],
                    "signuptotal": 7,
                    "missing": 7,
                    "verified": 0
                };
            }
            if (!dataByOfficer[group][role] || value === attended){
                dataByOfficer[group][role] = value;
            }
            else {
                if (dataByOfficer[group][role] !== value && new Date().getTime() < new Date(singleRow["startTime"]).getTime()){
                  dataByOfficer[group][role] = dataByOfficer[group][role] + ',' + value;
                }
            }

            function calculateSignups(record) {
                let output = 0;
                if (record["President"] && record["President"].indexOf(attended) < 0) { output++; }
                if (record["Vice President of Education"] && record["Vice President of Education"].indexOf(attended) < 0) { output++; }
                if (record["Secretary"] && record["Secretary"].indexOf(attended) < 0) { output++; }
                if (record["Vice President of Membership"] && record["Vice President of Membership"].indexOf(attended) < 0) { output++; }
                if (record["Vice President of PR"] && record["Vice President of PR"].indexOf(attended) < 0) { output++; }
                if (record["Treasurer"] && record["Treasurer"].indexOf(attended) < 0) { output++; }
                if (record["Sergeant at Arms"] && record["Sergeant at Arms"].indexOf(attended) < 0) { output++; }
                return output;
            }

            function calculateVerifiedSignups(record) {
                let output = 0;
                if (record["President"] && record["President"].indexOf(attended) > -1) { output++; }
                if (record["Vice President of Education"] && record["Vice President of Education"].indexOf(attended) > -1) { output++; }
                if (record["Secretary"] && record["Secretary"].indexOf(attended) > -1) { output++; }
                if (record["Vice President of Membership"] && record["Vice President of Membership"].indexOf(attended) > -1) { output++; }
                if (record["Vice President of PR"] && record["Vice President of PR"].indexOf(attended) > -1) { output++; }
                if (record["Treasurer"] && record["Treasurer"].indexOf(attended) > -1) { output++; }
                if (record["Sergeant at Arms"] && record["Sergeant at Arms"].indexOf(attended) > -1) { output++; }
                return output;
            }

            dataByOfficer[group]["verified"] = calculateVerifiedSignups((dataByOfficer[group] || 0));
            dataByOfficer[group]["registered"] = calculateSignups((dataByOfficer[group] || 0));

            dataByOfficer[group]["missing"] = dataByOfficer[group]["signuptotal"] - ((dataByOfficer[group]["registered"] || 0) + (dataByOfficer[group]["verified"] || 0));
            dataByOfficer[group]["atleastone"] = calculateSignups(dataByOfficer[group]) > 0;
            dataByOfficer[group]["fourormore"] = calculateSignups(dataByOfficer[group]) > 3;
            dataByOfficer[group]["allseven"] = calculateSignups(dataByOfficer[group]) === 7;
            dataByOfficer[group]["verifiedfraction"] = calculateVerifiedSignups(dataByOfficer[group]) + '/7'
            dataByOfficer[group]["signups"] = calculateSignups(dataByOfficer[group]) + '/7'
            return dataByOfficer;
        }, {});
        
        const allClubs = await clubData.getLiveStaticClubData();
        allClubs.forEach(club => {
          const group = club.clubNumber;
          if (!(group in dataByOfficer)){
            dataByOfficer[group] = {
              "division" : club["division"],
              "area" : club["area"],
              "clubName" : club["clubName"],
              "signups" : "0/7",
              "verifiedfraction" : "0/7",
              "missing": 7,
              "verified": 0,
              "registered": 0,
              "signuptotal" : 7
            };
          }
          // handle re-districting
          dataByOfficer[group]["clubName"] = club["clubName"];
          dataByOfficer[group]["area"] = club["Area"];
          dataByOfficer[group]["division"] = club["Division"];
          dataByOfficer[group]["trained"] = club.trained;
        });

        return Object.keys(dataByOfficer).map(function(group){
            return dataByOfficer[group];
        });
    })
    .then(rowData => this.setState({rowData}))
    .catch(function (error) {
      // if there's an error, log it
      console.log(error);
    })
  }

  getHeight(){
    return window.innerHeight + "px";
  }

  render() {
    return (
      <div
        className="content ag-theme-alpine"
        style={{
        height: this.getHeight(),
        width: '100%' }}
      >
        <AgGridReact
          columnDefs={this.state.columnDefs}
          defaultColDef={this.state.defaultColDef}
          groupIncludeFooter={this.state.groupIncludeFooter}
          sideBar={this.state.sideBar}
          pivotMode={this.state.pivotMode}
          autoGroupColumnDef={this.state.autoGroupColumnDef}
          rowData={this.state.rowData}
          statusBar={this.state.statusBar}
          popupParent={this.state.popupParent}
          enableRangeSelection={this.state.enableRangeSelection}
          enableCharts={this.state.enableCharts}
          groupMultiAutoColumn={this.state.groupMultiAutoColumn}
          onGridReady={this.state.onGridReady}
          rowGroupPanelShow='always'>
        </AgGridReact>
      </div>
    );
  }
}

export default VerifiedOnly;