import React, { Component } from 'react';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [{
        headerName: "Toastmasters Division", enableRowGroup: true, field: "division", sortable: true, sort: 'asc', filter: true, resizable: true
      },{
        headerName: "Toastmasters Area", enableRowGroup: true, field: "area", sortable: true, sort: 'asc', filter: true, resizable: true
      },{
        headerName: "Toastmasters Club Name", field: "clubName", sortable: true, sort: 'asc', filter: true, resizable: true
      },{
        headerName: "Officer Role Selected", enableRowGroup: true, field: "role", sortable: true, filter: true, resizable: true
      },{
        headerName: "Training Date", enableRowGroup: true, field: "startTime", 
        cellRenderer: (data) => {
          return data.value ? (new Date(data.value)).toLocaleDateString() : '';
        }, sortable: true, filter: true, resizable: true
      },{
        headerName: "First Name", field: "first_name", sortable: true, filter: true, resizable: true
      },{
        headerName: "Attended", enableRowGroup: true, field: "checked_in"
      }],
      statusBar: {
        statusPanels: [
            { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left' }
        ]
      }
    }
  }

  componentDidMount() {
    Promise.all([
      fetch('https://a5slwb8wx6.execute-api.us-east-1.amazonaws.com/dev/events/110731167904'),
      fetch('https://a5slwb8wx6.execute-api.us-east-1.amazonaws.com/dev/events/110731189970'),
      fetch('https://a5slwb8wx6.execute-api.us-east-1.amazonaws.com/dev/events/110731193982'),
      fetch('https://a5slwb8wx6.execute-api.us-east-1.amazonaws.com/dev/events/110731204012'),
      fetch('https://a5slwb8wx6.execute-api.us-east-1.amazonaws.com/dev/events/110731218054'),
      fetch('https://a5slwb8wx6.execute-api.us-east-1.amazonaws.com/dev/events/110731222066')
    ]).then(function (responses) {
      // Get a JSON object from each of the responses
      return Promise.all(responses.map(function (response) {
        return response.json();
      }));
    }).then(data => data.reduce(function (answerObjects, response) {
        return Array.prototype.concat(answerObjects, response);
      }, [])
    ).then(rowData => this.setState({rowData}))
    .catch(function (error) {
      // if there's an error, log it
      console.log(error);
    })
  }

  render() {
    return (
      <div
        className="content ag-theme-alpine"
        style={{
        height: '100%',
        width: '100%' 
      }
      }
      >
        <AgGridReact
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
          statusBar={this.state.statusBar}
          rowGroupPanelShow='always'>
        </AgGridReact>
      </div>
    );
  }
}

export default App;