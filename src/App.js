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
    fetch('https://a5slwb8wx6.execute-api.us-east-1.amazonaws.com/dev/events')
    .then(result => result.json())
    .then(result => result["attendees"])
    .then(result => result.map(attendee => {
      let answerObjects = attendee.answers;
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
      return attendee;
    }))
    .then(rowData => this.setState({rowData}))
  }

  render() {
    return (
      <div
        className="content ag-theme-alpine"
        style={{
        height: '500px',
        width: '1200px' 
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