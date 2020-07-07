import React, { Component } from 'react';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [{
        headerName: "First Name", field: "profile.first_name", sortable: true, filter: true
      }, {
        headerName: "Officer Role Selected", field: "answers.role"
      },{
        headerName: "Toastmasters Club Name", field: "answers.clubName"
      },{
        headerName: "Toastmasters Club Number", field: "answers.clubNumber"
      }, {
        headerName: "Attended", field: "checked_in"
      }],
    }
  }

  componentDidMount() {
    Promise.all([
      fetch('https://a5slwb8wx6.execute-api.us-east-1.amazonaws.com/dev/events/110731167904'),
      fetch('https://a5slwb8wx6.execute-api.us-east-1.amazonaws.com/dev/events/110731189970'),
      fetch('https://a5slwb8wx6.execute-api.us-east-1.amazonaws.com/dev/events/110731193982'),
      fetch('https://a5slwb8wx6.execute-api.us-east-1.amazonaws.com/dev/events/110731204012'),
      fetch('https://a5slwb8wx6.execute-api.us-east-1.amazonaws.com/dev/events/110731218054'),
      fetch('https://a5slwb8wx6.execute-api.us-east-1.amazonaws.com/dev/events/110731222066'),
      fetch('https://a5slwb8wx6.execute-api.us-east-1.amazonaws.com/dev/events/111884208680'), // TLI Dry Run
    ]).then(function (responses) {
      // Get a JSON object from each of the responses
      return Promise.all(responses.map(function (response) {
        return response.json();
      }));
    }).then(data => data.reduce(function (answerObjects, response) {
        return Array.prototype.concat(answerObjects, response["attendees"].map(attendee => {
          answerObjects = attendee.answers;
          if (answerObjects){
            let roleAnswer = answerObjects.find(obj => {
              return obj["question_id"] === "34234268";
            });
            if (roleAnswer) {
              answerObjects["role"] = roleAnswer["answer"]
            }
            let clubName = answerObjects.find(obj => {
              return obj["question_id"] === "34370854";
            });
            if (clubName) { answerObjects["clubName"] = clubName["answer"] }
            let clubNumber = answerObjects.find(obj => {
              return obj["question_id"] === "34370856";
            });
            if (clubNumber) { answerObjects["clubNumber"] = clubNumber["answer"] }
          }
          return attendee;
        }));
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
          rowData={this.state.rowData}>
        </AgGridReact>
      </div>
    );
  }
}

export default App;