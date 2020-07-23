import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import '../assets/css/HomeReport.css';
import DivisionReport from 'views/DivisionReport.js';

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
            rowEndIndex: 4,
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
            fetch('https://a5slwb8wx6.execute-api.us-east-1.amazonaws.com/dev/events/110731167904', {retries: 3,retryDelay: 1000}),
            fetch('https://a5slwb8wx6.execute-api.us-east-1.amazonaws.com/dev/events/110731189970', {retries: 3,retryDelay: 1000}),
            fetch('https://a5slwb8wx6.execute-api.us-east-1.amazonaws.com/dev/events/110731193982', {retries: 3,retryDelay: 1000}),
            fetch('https://a5slwb8wx6.execute-api.us-east-1.amazonaws.com/dev/events/110731204012', {retries: 3,retryDelay: 1000}),
            fetch('https://a5slwb8wx6.execute-api.us-east-1.amazonaws.com/dev/events/110731218054', {retries: 3,retryDelay: 1000}),
            fetch('https://a5slwb8wx6.execute-api.us-east-1.amazonaws.com/dev/events/110731222066', {retries: 3,retryDelay: 1000})
        ]).then(function (responses) {
            // Get a JSON object from each of the responses
            return Promise.all(responses.map(function (response) {
                return response.json();
            }));
        }).then(data => data.reduce(function (answerObjects, response) {
            return Array.prototype.concat(answerObjects, response);
        }, [])
        ).then(data => {
            var dataByOfficer = data.filter(s => s["division"] !== "Outside District 46").reduce(
                function (dataByOfficer, singleRow) {
                    const value = singleRow["first_name"];
                    const role = singleRow["role"]
                    const group = singleRow["clubName"];

                    if (!dataByOfficer[group]) {
                        dataByOfficer[group] = {
                            "division": singleRow["division"],
                            "area": singleRow["area"],
                            "clubName": singleRow["clubName"],
                            "signuptotal": 7,
                            "verified": 0
                        };
                    }
                    if (!dataByOfficer[group][role]) {
                        dataByOfficer[group][role] = value;
                    }
                    else {
                        if (dataByOfficer[group][role] !== value) {
                            dataByOfficer[group][role] = dataByOfficer[group][role] + ',' + value;
                        }
                    }

                    function calculateSignups(record) {
                        let output = 0;
                        if (record["President"]) { output++; }
                        if (record["Vice President of Education"]) { output++; }
                        if (record["Secretary"]) { output++; }
                        if (record["Vice President of Membership"]) { output++; }
                        if (record["Vice President of PR"]) { output++; }
                        if (record["Treasurer"]) { output++; }
                        if (record["Sergeant at Arms"]) { output++; }
                        return output;
                    }

                    if (singleRow["checked_in"]) {
                        dataByOfficer[group]["verified"] = (dataByOfficer[group]["verified"] || 0) + 1;
                    }
                    else {
                        if (new Date().getTime() < new Date(singleRow["startTime"]).getTime()){
                            dataByOfficer[group]["registered"] = calculateSignups(dataByOfficer[group]);
                        }
                    }
                    dataByOfficer[group]["missing"] = dataByOfficer[group]["signuptotal"] - (dataByOfficer[group]["registered"] || 0) - (dataByOfficer[group]["verified"] || 0);
                    return dataByOfficer;
                }, {});

            const allClubs = this.getStaticClubData();
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

            return Object.keys(dataByDivision).map(group => dataByDivision[group]);
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

    getStaticClubData() {
        return [
            { "division": "A", "area": "11", "clubName": "Hudson River Toastmasters (8558)" },
            { "division": "A", "area": "11", "clubName": "IBM Westchester Toastmasters (648356)" },
            { "division": "A", "area": "11", "clubName": "Peekskill Toastmasters (3171395)" },
            { "division": "A", "area": "11", "clubName": "Northern Westchester Toastmasters (3797112)" },
            { "division": "A", "area": "12", "clubName": "BASF Tarrytown Toastmasters (3638279)" },
            { "division": "A", "area": "12", "clubName": "Siemens Tarrytown Speechineers (5762149)" },
            { "division": "A", "area": "12", "clubName": "Regeneron Toastmasters (5829986)" },
            { "division": "A", "area": "12", "clubName": "WSP-BCM Toastmasters (7176388)" },
            { "division": "A", "area": "13", "clubName": "Westchester Toastmasters (863)" },
            { "division": "A", "area": "13", "clubName": "Speakers With Authority (5463)" },
            { "division": "A", "area": "13", "clubName": "United We Stand Toastmasters Club (9938)" },
            { "division": "A", "area": "13", "clubName": "Westchester Advanced Club (695803)" },
            { "division": "A", "area": "14", "clubName": "Cross Westchester Toastmasters (9976)" },
            { "division": "A", "area": "14", "clubName": "PepsiCo Valhalla Toastmasters Club (828089)" },
            { "division": "A", "area": "14", "clubName": "Legends For Life! (889516)" },
            { "division": "A", "area": "15", "clubName": "Pepsico Toastmasters Club (7230)" },
            { "division": "A", "area": "15", "clubName": "Swiss Toast Club (716600)" },
            { "division": "A", "area": "15", "clubName": "Priceless Speakers (1199057)" },
            { "division": "A", "area": "15", "clubName": "The Toast of Purchase (5864849)" },
            { "division": "B", "area": "21", "clubName": "La Voz Latina Toastmasters (1488421)" },
            { "division": "B", "area": "21", "clubName": "Monroe College Toastmasters (2218018)" },
            { "division": "B", "area": "21", "clubName": "Bronx Advanced Speakers (3337790)" },
            { "division": "B", "area": "21", "clubName": "Mount Vernon Toast (5341900)" },
            { "division": "B", "area": "22", "clubName": "Toast Of The Bronx Club (3035)" },
            { "division": "B", "area": "22", "clubName": "Co-op City Toastmasters Club (3824)" },
            { "division": "B", "area": "22", "clubName": "Einstein Toastmasters (1500422)" },
            { "division": "B", "area": "22", "clubName": "Montefiore Toastmasters (4080286)" },
            { "division": "B", "area": "23", "clubName": "Bronx Toastmasters Club (6615)" },
            { "division": "B", "area": "23", "clubName": "MI Toastmasters (1322088)" },
            { "division": "B", "area": "23", "clubName": "Consumer Reports Toastmasters (3640336)" },
            { "division": "B", "area": "23", "clubName": "IAC Applications Toastmasters (6426850)" },
            { "division": "B", "area": "23", "clubName": "MIT Toastmasters (6576008)" },
            { "division": "B", "area": "24", "clubName": "TIC Toastmasters Club (2676)" },
            { "division": "B", "area": "24", "clubName": "Harlem Toastmasters (8594)" },
            { "division": "B", "area": "24", "clubName": "TORCH Toastmasters (1168440)" },
            { "division": "B", "area": "24", "clubName": "Columbia University Toastmasters  (3890961)" },
            { "division": "B", "area": "25", "clubName": "Douglas Elliman /west Side Toasties (595443)" },
            { "division": "B", "area": "25", "clubName": "West Side Talkers (1180341)" },
            { "division": "B", "area": "25", "clubName": "Fordham Lincoln Center (4776065)" },
            { "division": "B", "area": "25", "clubName": "DE Squared (5580612)" },
            { "division": "C", "area": "31", "clubName": "Pacers Toastmasters Club (2608)" },
            { "division": "C", "area": "31", "clubName": "AB Toastmasters (1588600)" },
            { "division": "C", "area": "31", "clubName": "g-Toastmasters (5589856)" },
            { "division": "C", "area": "31", "clubName": "Macquarie New York (7291924)" },
            { "division": "C", "area": "32", "clubName": "Ringers Toastmasters Club (7890)" },
            { "division": "C", "area": "32", "clubName": "Excellent Toastmasters (1410471)" },
            { "division": "C", "area": "32", "clubName": "BNP Paribas Toastmasters (3332242)" },
            { "division": "C", "area": "32", "clubName": "State Street New York Toastmasters (3916690)" },
            { "division": "C", "area": "32", "clubName": "French/Bilingual Toastmasters of NY (7315453)" },
            { "division": "C", "area": "33", "clubName": "Leadership Roundtable  (1636)" },
            { "division": "C", "area": "33", "clubName": "Bryant Park Toastmasters Club (2895)" },
            { "division": "C", "area": "33", "clubName": "CFA NY Toastmasters (965817)" },
            { "division": "C", "area": "33", "clubName": "The Empire Eagles (5371277)" },
            { "division": "C", "area": "33", "clubName": "Barclays New York Toastmasters (5418945)" },
            { "division": "C", "area": "34", "clubName": "SEC Roughriders Club (1876)" },
            { "division": "C", "area": "34", "clubName": "Traffic Club (2286)" },
            { "division": "C", "area": "34", "clubName": "Mazars USA LLP (1166775)" },
            { "division": "C", "area": "34", "clubName": "Marsh McLennan Companies NY (2078496)" },
            { "division": "C", "area": "35", "clubName": "Deloitte Tri-State Toastmasters  (1244840)" },
            { "division": "C", "area": "35", "clubName": "Midtown's Best @ Morgan Stanley (1700500)" },
            { "division": "C", "area": "35", "clubName": "MS Midtown Complex (4677031)" },
            { "division": "C", "area": "35", "clubName": "The Big Toast NYC (7419138)" },
            { "division": "C", "area": "36", "clubName": "BlackRock Speaks NY (2884725)" },
            { "division": "C", "area": "36", "clubName": "The World's Leading Toastmasters (4315364)" },
            { "division": "C", "area": "36", "clubName": "Speak Up Swiss Re (6547516)" },
            { "division": "C", "area": "36", "clubName": "Crowe Club Masters (7264044)" },
            { "division": "C", "area": "36", "clubName": "Dewan Shai (7376563)" },
            { "division": "D", "area": "41", "clubName": "Knickerbocker Toastmasters Club (137)" },
            { "division": "D", "area": "41", "clubName": "Roosevelt Island Club (4121)" },
            { "division": "D", "area": "41", "clubName": "East Side Toastmasters Club (6138)" },
            { "division": "D", "area": "41", "clubName": "Yorkville Evening Stars - YES (5425506)" },
            { "division": "D", "area": "41", "clubName": "New York Storytellers (6606660)" },
            { "division": "D", "area": "42", "clubName": "Humorous Toastmasters (1296797)" },
            { "division": "D", "area": "42", "clubName": "730 Toastmasters (1387307)" },
            { "division": "D", "area": "42", "clubName": "Bloomberg New York Toastmasters (3618250)" },
            { "division": "D", "area": "42", "clubName": "Gotham Speakers Toastmasters Club (3966637)" },
            { "division": "D", "area": "42", "clubName": "Geller and Company (7708987)" },
            { "division": "D", "area": "43", "clubName": "JPMorgan Toastmasters NYC (3793452)" },
            { "division": "D", "area": "43", "clubName": "KPMG NYO Toastmasters Club (4405755)" },
            { "division": "D", "area": "43", "clubName": "Capital One 299 Park Toastmasters (6038149)" },
            { "division": "D", "area": "43", "clubName": "Wafra Toastmasters (6931829)" },
            { "division": "D", "area": "43", "clubName": "TD NYC Toastmasters Club (7702911)" },
            { "division": "D", "area": "44", "clubName": "Mount Sinai Toastmasters (1023495)" },
            { "division": "D", "area": "44", "clubName": "Metnyc (1213823)" },
            { "division": "D", "area": "44", "clubName": "Stagecoach Speakers, NYC (4748139)" },
            { "division": "D", "area": "44", "clubName": "Societe Generale Toastmasters, USA (6765848)" },
            { "division": "D", "area": "44", "clubName": "CBRE ()" },
            { "division": "D", "area": "45", "clubName": "Nichibei Toastmasters Club (6394)" },
            { "division": "D", "area": "45", "clubName": "World Voices Club (643436)" },
            { "division": "D", "area": "45", "clubName": "Advanced Debaters (3313240)" },
            { "division": "D", "area": "45", "clubName": "Persuasive Toastmasters (4634928)" },
            { "division": "D", "area": "45", "clubName": "Toastmasters Int'l Club - Elsevier NYC (6660424)" },
            { "division": "D", "area": "46", "clubName": "Global Expression Club (5596)" },
            { "division": "D", "area": "46", "clubName": "Pfree Speech Toastmasters Club (7883)" },
            { "division": "D", "area": "46", "clubName": "Travelers NYC (3433011)" },
            { "division": "D", "area": "46", "clubName": "A+E Networks NYC (6501985)" },
            { "division": "D", "area": "46", "clubName": "Speaking Easy (7560123)" },
            { "division": "E", "area": "51", "clubName": "Voices of Bank America Club (5328)" },
            { "division": "E", "area": "51", "clubName": "Times Toastmasters (1548645)" },
            { "division": "E", "area": "51", "clubName": "Legg Mason Toastmasters - NY Chapter (5821058)" },
            { "division": "E", "area": "51", "clubName": "The Durst Organization Employees NYC (6732803)" },
            { "division": "E", "area": "51", "clubName": "Acuris New York Toastmasters (7580325)" },
            { "division": "E", "area": "52", "clubName": "EY NYC Toastmasters (2560548)" },
            { "division": "E", "area": "52", "clubName": "Toastmasters NYC Microsoft (6021925)" },
            { "division": "E", "area": "52", "clubName": "Synechron NY Toastmasters (7327389)" },
            { "division": "E", "area": "52", "clubName": "NY WAM-OI Toastmasters (7450958)" },
            { "division": "E", "area": "53", "clubName": "Greenspeakers Club (3172)" },
            { "division": "E", "area": "53", "clubName": "NYC Equitable Toastmasters Club (3507)" },
            { "division": "E", "area": "53", "clubName": "Fung Academy Toastmasters New York (5271044)" },
            { "division": "E", "area": "53", "clubName": "Amazon NYC Toastmasters Club (7226903)" },
            { "division": "E", "area": "54", "clubName": "Vanderbilt Club (3061)" },
            { "division": "E", "area": "54", "clubName": "Lexington Toastmasters (1254058)" },
            { "division": "E", "area": "54", "clubName": "Jade Toastmasters Club (1721565)" },
            { "division": "E", "area": "54", "clubName": "Midtown Masters (4672690)" },
            { "division": "E", "area": "54", "clubName": "Jacobs Toast (6943827)" },
            { "division": "E", "area": "55", "clubName": "Extraordinary Talkers (735)" },
            { "division": "E", "area": "55", "clubName": "PwC NY Toastmasters (1393205)" },
            { "division": "E", "area": "55", "clubName": "FactMasters (1526129)" },
            { "division": "E", "area": "55", "clubName": "Toastmasters @ MSK (1551020)" },
            { "division": "E", "area": "55", "clubName": "CPG Toastmasters (4565093)" },
            { "division": "E", "area": "56", "clubName": "Metro New York (451)" },
            { "division": "E", "area": "56", "clubName": "Graybar Club (1436)" },
            { "division": "E", "area": "56", "clubName": "New York Toastmasters Club (1949)" },
            { "division": "E", "area": "56", "clubName": "TempMasters (7112110)" },
            { "division": "E", "area": "56", "clubName": "Girl Scouts of the USA (7202219)" },
        ];
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
                    Club Registration Status Report - Detailed reporting can be found <a href="/tli-reports-live">here</a>
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