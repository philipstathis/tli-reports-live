import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import '../assets/css/HomeReport.css';
const clubData = require('../variables/clubData');

class DivisionReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columnDefs: [{
                headerName: "Toastmasters Division",
                field: "division",
                sort: 'asc',
                chartDataType: 'category'
            }, {
                headerName: "All 7 Officers",
                field: "allseven",
                chartDataType: 'series',
                width:100
            }, {
                headerName: "Four or More",
                field: "fourormore",
                chartDataType: 'series',
                width:100
            }, {
                headerName: "Clubs with at least One",
                field: "atleastone",
                chartDataType: 'series'
            },{
                headerName: 'Four or More / Total Clubs (%)',
                colId: 'registration-percent',
                chartDataType: 'series',
                valueGetter: function(params) {
                  return Math.round((params.getValue("fourormore") * 7 / params.getValue("signuptotal")) * 100) + '%';
                },
            },{
                headerName: 'Clubs with at least One / Total Clubs (%)',
                colId: 'registration-percent',
                chartDataType: 'series',
                valueGetter: function(params) {
                  return Math.round((params.getValue("atleastone") * 7 / params.getValue("signuptotal")) * 100) + '%';
                },
            }, {
                headerName: "Training Verified",
                field: "verified",
                chartDataType: 'series',
                hide:true
            }, {
                headerName: "Registered But Not Confirmed",
                field: "registered",
                chartDataType: 'series',
                hide:true
            }, {
                headerName: "Not Registered",
                field: "missing",
                chartDataType: 'series',
                hide:true
            }, {
                headerName: "Total",
                field: "signuptotal",
                chartDataType: 'series',
                hide:true
            }
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
                resizable: true,
                width:150
            },
            popupParent: document.body,
            onGridReady: this.onFirstDataRendered,
        };
    }

    onFirstDataRendered(params) {
        var defaultSortModel = [
            { colId: 'division', sort: 'asc' }
        ];
        params.api.setSortModel(defaultSortModel);
        params.api.resetRowHeights();
        params.api.sizeColumnsToFit();
    }

    componentDidMount() {
        Promise.all([
            fetch('https://a5slwb8wx6.execute-api.us-east-1.amazonaws.com/dev/events/110731167904', {retries: 3,retryDelay: 1000}),
            fetch('https://a5slwb8wx6.execute-api.us-east-1.amazonaws.com/dev/events/110731189970', {retries: 3,retryDelay: 1000}),
            fetch('https://a5slwb8wx6.execute-api.us-east-1.amazonaws.com/dev/events/110731193982', {retries: 3,retryDelay: 1000}),
            fetch('https://a5slwb8wx6.execute-api.us-east-1.amazonaws.com/dev/events/110731204012', {retries: 3,retryDelay: 1000}),
            fetch('https://a5slwb8wx6.execute-api.us-east-1.amazonaws.com/dev/events/110731218054', {retries: 3,retryDelay: 1000}),
            fetch('https://a5slwb8wx6.execute-api.us-east-1.amazonaws.com/dev/events/110731222066', {retries: 3,retryDelay: 1000}),
            fetch('https://a5slwb8wx6.execute-api.us-east-1.amazonaws.com/dev/events/114842057686', {retries: 3,retryDelay: 1000}),
            fetch('https://a5slwb8wx6.execute-api.us-east-1.amazonaws.com/dev/events/114842067716', {retries: 3,retryDelay: 1000})
        ]).then(function (responses) {
            // Get a JSON object from each of the responses
            return Promise.all(responses.map(function (response) {
                return response.json();
            }));
        }).then(data => data.reduce(function (answerObjects, response) {
            return Array.prototype.concat(answerObjects, response);
        }, [])
        ).then(data => {
            var dataByOfficer = data.filter(s => s["division"] !== "Outside District 46")
                .reduce(
                function (dataByOfficer, singleRow) {
                    let value = singleRow["first_name"];
                    const role = singleRow["role"]
                    const group = singleRow["clubName"];
                    const attended = "ATTENDED";

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
                        if (record["President"] && record["President"] !== attended) { output++; }
                        if (record["Vice President of Education"] && record["Vice President of Education"] !== attended) { output++; }
                        if (record["Secretary"] && record["Secretary"] !== attended) { output++; }
                        if (record["Vice President of Membership"] && record["Vice President of Membership"] !== attended) { output++; }
                        if (record["Vice President of PR"] && record["Vice President of PR"] !== attended) { output++; }
                        if (record["Treasurer"] && record["Treasurer"] !== attended) { output++; }
                        if (record["Sergeant at Arms"] && record["Sergeant at Arms"] !== attended) { output++; }
                        return output;
                    }

                    function calculateVerifiedSignups(record) {
                        let output = 0;
                        if (record["President"] === attended) { output++; }
                        if (record["Vice President of Education"]=== attended) { output++; }
                        if (record["Secretary"] === attended) { output++; }
                        if (record["Vice President of Membership"] === attended) { output++; }
                        if (record["Vice President of PR"] === attended) { output++; }
                        if (record["Treasurer"] === attended) { output++; }
                        if (record["Sergeant at Arms"] === attended) { output++; }
                        return output;
                    }

                    dataByOfficer[group]["verified"] = calculateVerifiedSignups(dataByOfficer[group]);
                    dataByOfficer[group]["registered"] = calculateSignups(dataByOfficer[group]);

                    dataByOfficer[group]["missing"] = dataByOfficer[group]["signuptotal"] - ((dataByOfficer[group]["registered"] || 0) + (dataByOfficer[group]["verified"] || 0));
                    const totalSignups = dataByOfficer[group]["verified"] + dataByOfficer[group]["registered"];
                    dataByOfficer[group]["atleastone"] = totalSignups > 0;
                    dataByOfficer[group]["fourormore"] = totalSignups > 3;
                    dataByOfficer[group]["allseven"] = totalSignups === 7;
                    return dataByOfficer;
                }, {});

            const allClubs = clubData.getStaticClubData();
            allClubs.forEach(club => {
                const group = club["clubName"];
                if (!(group in dataByOfficer)) {
                    dataByOfficer[group] = {
                        "division": club["division"],
                        "area": club["area"],
                        "clubName": club["clubName"],
                        "registered": 0,
                        "missing": 7,
                        "verified": 0,
                        "signuptotal": 7,
                        "atleastone": 0,
                        "fourormore": 0,
                        "allseven": 0
                    };
                }
            });

            var dataByDivision = Object.keys(dataByOfficer).map(db => dataByOfficer[db]).reduce(function (dataByDivision, singleRow) {
                const group = singleRow["division"];

                if (!dataByDivision[group]) {
                    dataByDivision[group] = {
                        "division": group
                    };
                }

                dataByDivision[group]["verified"] = (dataByDivision[group]["verified"] || 0) + singleRow["verified"];
                dataByDivision[group]["registered"] = (dataByDivision[group]["registered"] || 0) + singleRow["registered"];
                dataByDivision[group]["missing"] = (dataByDivision[group]["missing"] || 0) + singleRow["missing"];
                dataByDivision[group]["signuptotal"] = (dataByDivision[group]["signuptotal"] || 0) + singleRow["signuptotal"];
                
                dataByDivision[group]["atleastone"] = (dataByDivision[group]["atleastone"] || 0) + singleRow["atleastone"];
                dataByDivision[group]["fourormore"] = (dataByDivision[group]["fourormore"] || 0) + singleRow["fourormore"];
                dataByDivision[group]["allseven"] = (dataByDivision[group]["allseven"] || 0) + singleRow["allseven"];
                
                return dataByDivision;
            }, {});

            const divisionRows = Object.keys(dataByDivision).map(group => dataByDivision[group]);

            const totalRow = divisionRows.reduce((totalRow, d) => {
                totalRow["division"] = ":Total:";
                totalRow["verified"] = (totalRow["verified"] || 0) + d["verified"];
                totalRow["registered"] =(totalRow["registered"] || 0) + d["registered"];
                totalRow["missing"] = (totalRow["missing"] || 0) + d["missing"];
                totalRow["signuptotal"] = (totalRow["signuptotal"] || 0) + d["signuptotal"];
                totalRow["atleastone"] = (totalRow["atleastone"] || 0) + d["atleastone"];
                totalRow["fourormore"] = (totalRow["fourormore"] || 0) + d["fourormore"];
                totalRow["allseven"] = (totalRow["allseven"] || 0) + d["allseven"];
                return totalRow;
            }, {});

            return Array.prototype.concat(divisionRows, totalRow);
        })
            .then(rowData => this.setState({ rowData }))
            .catch(function (error) {
                // if there's an error, log it
                console.log(error);
            })
    }

    getHeight() {
        return 320 + "px";
    }

    createChartContainer = chartRef => {
        if (currentChartRef) {
            currentChartRef.destroyChart();
        }
        var eChart = chartRef.chartElement;
        var eParent = document.querySelector('#myChart');
        eParent.appendChild(eChart);
        currentChartRef = chartRef;
    };

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
                popupParent={this.state.popupParent}
                rowData={this.state.rowData}
                enableRangeSelection={true}
                enableCharts={true}
                processChartOptions={this.state.processChartOptions}
                createChartContainer={this.createChartContainer}
                onGridReady={this.onFirstDataRendered.bind(this)}
            />
          </div>
        );
    }
}
var currentChartRef;
export default DivisionReport;