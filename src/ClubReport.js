import React, { Component } from 'react';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

class ClubReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [{
        headerName: "Toastmasters Division", field: "division", sort: 'asc', 
      },{
        headerName: "Toastmasters Area", field: "area",  sort: 'asc'
      },{
        headerName: "Toastmasters Club Name", field: "clubName", sortable: true, sort: 'asc'
      },{
        headerName: "Signed Up", field: "signups"
      },{
        headerName: "President", field: "President"
      },{
        headerName: "Vice President of Education", field: "Vice President of Education"
      },{
        headerName: "Secretary", field: "Secretary"
      },{
        headerName: "Vice President of Membership", field: "Vice President of Membership"
      },{
        headerName: "Vice President of PR", field: "Vice President of PR"
      },{
        headerName: "Treasurer", field: "Treasurer"
      },{
        headerName: "Sergeant at Arms", field: "Sergeant at Arms"
      }],
      statusBar: {
        statusPanels: [
            { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left' }
        ]
      },
      defaultColDef: {
        enableRowGroup: true,
        sortable: true,
        filter: true,
        resizable: true
      },
      groupIncludeFooter: true,
      sideBar: true,
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
    ).then(data => {
        var dataByOfficer = data.filter(s => s["division"] !== "Outside District 46").reduce(
          function(dataByOfficer, singleRow){
            const value = singleRow["first_name"];
            const role = singleRow["role"]
            const group = singleRow["clubName"];

            if (!dataByOfficer[group]){
                dataByOfficer[group] = {
                    "division" : singleRow["division"],
                    "area" : singleRow["area"],
                    "clubName" : singleRow["clubName"]
                };
            }
            if (!dataByOfficer[group][role]){
                dataByOfficer[group][role] = value;
            }
            else {
                if (dataByOfficer[group][role] !== value){
                  dataByOfficer[group][role] = dataByOfficer[group][role] + ',' + value;
                }
            }

            function calculateSignups(record) {
              let output = 0;
              if (record["President"]) { output++;}
              if (record["Vice President of Education"]) { output++;}
              if (record["Secretary"]) { output++;}
              if (record["Vice President of Membership"]) { output++;}
              if (record["Vice President of PR"]) { output++;}
              if (record["Treasurer"]) { output++;}
              if (record["Sergeant at Arms"]) { output++;}
              return output;
            }

            dataByOfficer[group]["signups"] = calculateSignups(dataByOfficer[group]) + '/7'
            return dataByOfficer;
          }, {});
        
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
          defaultColDef={this.state.defaultColDef}
          autoGroupColumnDef={this.state.autoGroupColumnDef}
          rowData={this.state.rowData}
          statusBar={this.state.statusBar}
          rowGroupPanelShow='always'>
        </AgGridReact>
      </div>
    );
  }
}

export default ClubReport;