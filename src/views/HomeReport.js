import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import '../assets/css/HomeReport.css';
class HomeReport extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
                {
                    headerName: 'Registration (%)',
                    colId: 'registration-percent',
                    chartDataType: 'series',
                    valueGetter: function(params) {
                      return params.getValue("fat");
                    },
                },
                {
                    headerName: 'Registration (%)',
                    colId: 'registration-percent',
                    chartDataType: 'series',
                    valueGetter: function(params) {
                      return params.getValue("fat");
                    },
                },
                {
                    headerName: 'Registration (%)',
                    colId: 'registration-percent',
                    chartDataType: 'series',
                    valueGetter: function(params) {
                      return params.getValue("fat");
                    },
                },
                {
                    field: 'country',
                    chartDataType: 'category'
                },
                {
                    field: 'sugar',
                    chartDataType: 'series',
                },
                {
                    field: 'fat',
                    chartDataType: 'series',
                },
                {
                    field: 'weight',
                    chartDataType: 'series',
                },
                {
                    headerName: 'Registration (%)',
                    colId: 'registration-percent',
                    chartDataType: 'series',
                    valueGetter: function(params) {
                      return params.getValue("fat");
                    },
                }
            ],
            defaultColDef: {
                editable: true,
                sortable: true,
                flex: 1,
                minWidth: 100,
                filter: true,
                resizable: true,
            },
            popupParent: document.body,
            rowData: createRowData(),
        };
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    };

    onFirstDataRendered = params => {
        var createRangeChartParams = {
            cellRange: {
                columns: ['country', 'sugar', 'fat', 'weight'],
            },
            chartContainer: document.querySelector('#myChart'),
            chartType: 'bubble',
            suppressChartRanges: true,
        };
        currentChartRef = params.api.createRangeChart(createRangeChartParams);
    };

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
                <div id="myChart" className="ag-theme-alpine my-chart"></div>
                <div className="wrapper">
                    <div
                        id="myGrid"
                        style={{
                            height: '100%',
                            width: '100%',
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
                            createChartContainer={this.createChartContainer}
                            onGridReady={this.onFirstDataRendered.bind(this)}
                            // onChartOptionsChanged={this.onChartOptionsChanged.bind(this)}
                            // onFirstDataRendered={this.onFirstDataRendered.bind(this)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

var currentChartRef;
function createRowData() {
    var countries = [
        'Ireland',
        'Spain',
        'United Kingdom',
        'France',
        'Germany',
        'Luxembourg',
        'Sweden',
        'Norway',
        'Italy',
        'Greece',
        'Iceland',
        'Portugal',
        'Malta',
        'Brazil',
        'Argentina',
        'Colombia',
        'Peru',
        'Venezuela',
        'Uruguay',
        'Belgium',
    ];
    return countries.map(function (country) {
        return {
            country: country,
            sugar: Math.floor(Math.floor(Math.random() * 50)),
            fat: Math.floor(Math.floor(Math.random() * 100)),
            weight: Math.floor(Math.floor(Math.random() * 200)),
        };
    });
}

export default HomeReport;