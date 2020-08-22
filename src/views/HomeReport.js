import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import '../assets/css/HomeReport.css';
import DivisionReport from 'views/DivisionReport.js';
const clubData = require('../variables/clubData');

class HomeReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columnDefs: [{
                headerName: "Toastmasters Division",
                field: "division",
                sort: 'asc',
                chartDataType: 'category'
            }, {
                headerName: "Training Verified",
                field: "verified",
                chartDataType: 'series'
            }, {
                headerName: "Registered But Not Trained Yet",
                field: "registered",
                chartDataType: 'series'
            }, {
                headerName: "Not Registered",
                field: "missing",
                chartDataType: 'series'
            }, {
                headerName: "Total",
                field: "signuptotal",
                chartDataType: 'series'
            }
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
                resizable: true,
                width:150
            },
            popupParent: document.body,
            processChartOptions: this.processChartOptions,
            onGridReady: this.onFirstDataRendered,
        };
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
        options.seriesDefaults.label.formatter = function (params) {
            return '<' + params.value + '>';
        };

        options.seriesDefaults.highlightStyle.fill = 'red';
        options.seriesDefaults.highlightStyle.stroke = 'yellow';

        options.seriesDefaults.tooltip.renderer = function (params) {
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
            { colId: 'division', sort: 'asc' }
        ];
        params.api.setSortModel(defaultSortModel);
        params.api.resetRowHeights();
        var cellRange = {
            rowStartIndex: 0,
            rowEndIndex: 5,
            columns: ['division', 'registered', 'missing', 'verified'],
        };

        var createRangeChartParams = {
            cellRange: cellRange,
            chartType: 'normalizedColumn',
            chartPalette: 'flat',
            suppressChartRanges: true,
            chartContainer: document.querySelector('#myChart'),
            processChartOptions: function (params) {
                var opts = params.options;
                opts.title.enabled = true;
                opts.title.text = 'Club Officer Training Status Report by Division';

                opts.seriesDefaults.label.enabled = true;
                opts.seriesDefaults.label.formatter = function (params) {
                    return Math.round(params.value);
                };

                if (opts.xAxis) {
                    opts.xAxis.label.rotation = 0;
                    opts.xAxis.title.text = "Number of Officers in Bar";
                    opts.xAxis.title.enabled = true;
                }
                if (opts.yAxis) {
                    opts.yAxis.title.text = "% of Total";
                    opts.yAxis.title.enabled = true;
                }
                return opts;
            },
        };

        params.api.createRangeChart(createRangeChartParams);
    }

    componentDidMount() {
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
        ).then(data => {
            var dataByOfficer = data.filter(s => s["division"] !== "Outside District 46")
            .filter(s => clubData.filterInvalid(s))
            .filter(s => s["checked_in"] || new Date().getTime() < new Date(s["startTime"]).getTime())
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
                    
                    dataByOfficer[group]["verified"] = calculateVerifiedSignups(dataByOfficer[group]);
                    dataByOfficer[group]["registered"] = calculateSignups(dataByOfficer[group]);

                    dataByOfficer[group]["missing"] = dataByOfficer[group]["signuptotal"] - ((dataByOfficer[group]["registered"] || 0) + (dataByOfficer[group]["verified"] || 0));
                    return dataByOfficer;
                }, {});

            const allClubs = clubData.getLatestStaticClubData();
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
                        "signuptotal": 7
                    };
                }
                
                // handle re-districting
                dataByOfficer[group]["area"] = club["area"];
                dataByOfficer[group]["division"] = club["division"];
            });

            var dataByDivision = Object.keys(dataByOfficer).map(db => dataByOfficer[db]).reduce(function (dataByDivision, singleRow) {
                const group = singleRow["division"];

                if (!dataByDivision[group]) {
                    dataByDivision[group] = {
                        "division": group
                    };
                }

                dataByDivision[group]["verified"] = parseInt((dataByDivision[group]["verified"] || 0) + singleRow["verified"]);
                dataByDivision[group]["registered"] = parseInt((dataByDivision[group]["registered"] || 0) + singleRow["registered"]);
                dataByDivision[group]["missing"] = parseInt((dataByDivision[group]["missing"] || 0) + singleRow["missing"]);
                dataByDivision[group]["signuptotal"] = parseInt((dataByDivision[group]["signuptotal"] || 0) + singleRow["signuptotal"]);
                return dataByDivision;
            }, {});

            const divisionRows = Object.keys(dataByDivision).map(group => dataByDivision[group]);

            const totalRow = divisionRows.reduce((totalRow, d) => {
                totalRow["division"] = ":Total:";
                totalRow["verified"] = (totalRow["verified"] || 0) + d["verified"];
                totalRow["registered"] =(totalRow["registered"] || 0) + d["registered"];
                totalRow["missing"] = (totalRow["missing"] || 0) + d["missing"];
                totalRow["signuptotal"] = (totalRow["signuptotal"] || 0) + d["signuptotal"];
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
        return (window.innerHeight / 3) + "px";
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
            <div style={{ width: '100%', height: '100%' }}>
                <p style={{
                    "marginLeft":"50px",
                    "textTransform":"uppercase",
                    "fontSize":"1rem"
                }}>
                    Toastmasters District 46: TLI Club Officer Training Status Report
                </p>
                <div id="myChart" className="ag-theme-alpine my-chart"></div>
                <p style={{
                    "marginLeft":"50px",
                    "textTransform":"uppercase",
                    "fontSize":"1rem"
                }}>
                    Club Verified and Scheduled Attendance Status Report - Detailed reporting can be found <a href="/tli-reports-live">here</a>
                </p>
                <DivisionReport/>
                <div style={{display: "none"}}>
                    <div
                        id="myGrid"
                        style={{
                            height: this.getHeight(),
                            width: "100%",
                        }}
                        className="ag-theme-alpine"
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
                </div>
        </div>);
    }
}
var currentChartRef;
export default HomeReport;