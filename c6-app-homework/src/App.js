import React from 'react';

class App extends React.Component {
  constructor(){
    super();

    this.state = {
      editingId: -1,
      first_name: '',
      last_name: '',
      avg_grade: 0,
      students: []
    };

    this.fetchStudents();
  }

  fetchStudents = () => {
    fetch('http://localhost:9000/api/v1/students')
      .then(res => res.json())
      .then(data => {
        this.setState({
          students: data
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  addStudent = () => {
    let firstName = this.state.first_name;
    let lastName = this.state.last_name;
    let avgGrade = this.state.avg_grade;
    fetch(
      'http://localhost:9000/api/v1/students',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          avg_grade: avgGrade,
        }),
      }
    )
    .then(res => {
      if(res.ok){
        // We need to get the generated id of the added student
        // and without changing the response to the request on the server
        // we will have to get all students again as we don't have any unique
        // data we could use to filter the db to get only one instead of all
        this.fetchStudents();
        alert('Student saved!');
      }
    })
    .catch(err => {
      console.error(err);
    });
  };

  deleteStudent = (id) => {
    fetch(
      `http://localhost:9000/api/v1/students/${id}`, {
        method: 'DELETE'
      }
    ).then(() => {
      this.setState(prevState => {
        return {
          ...prevState,
          students: prevState.students.filter(x => x._id !== id)
        }
      })
    }).catch(err => {
      console.error(err);
    });
  };

  editStudent = () => {
    let firstName = this.state.first_name;
    let lastName = this.state.last_name;
    let avgGrade = this.state.avg_grade;
    fetch(
      `http://localhost:9000/api/v1/students/${this.state.editingId}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          avg_grade: avgGrade,
        })
      }
    ).then(() => {
      this.setState(prevState => {
        var student = prevState.students.filter(x => x._id === this.state.editingId)[0];
        var index = prevState.students.indexOf(student);
        prevState.students[index].first_name = firstName;
        prevState.students[index].last_name = lastName;
        prevState.students[index].avg_grade = avgGrade;
        return {
          ...prevState,
          editingId: -1,
          first_name: "",
          last_name: "",
          avg_grade: 0
        }
      })
    }).catch(err => {
      console.error(err);
    });
  };

  enterEditMode = (id) => {
    this.setState(prevState => {
      var student = prevState.students.filter(x => x._id === id)[0];
      return {
        ...prevState,
        editingId: id,
        first_name: student.first_name,
        last_name: student.last_name,
        avg_grade: student.avg_grade
      }
    });
  } 

  inputOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <>
      <div>
          <input type="text" name="first_name" placeholder="First name" value={this.state.first_name} onChange={this.inputOnChange}/>
          <input type="text" name="last_name" placeholder="Last name" value={this.state.last_name} onChange={this.inputOnChange}/>
          <input type="number" name="avg_grade" placeholder="Avgerage grade" value={this.state.avg_grade} onChange={this.inputOnChange}/>
          {this.state.editingId !== -1 ? <button onClick={this.editStudent}>Finish Editing</button> : <button onClick={this.addStudent}>Add student</button>}
      </div>
      <hr/>
      <table border="1" width="50%">
        <thead>
        <tr>
          <th>First name</th>
          <th>Last name</th>
          <th>Avg grade</th>
          <th>Delete</th>
          <th>Edit</th>
        </tr>
        </thead>
        <tbody>
      {this.state.students.map((v) => {
          return (
            <tr key={v._id}>
              <td>{v.first_name}</td>
              <td>{v.last_name}</td>
              <td>{v.avg_grade}</td>
              <td>
                <button onClick={() => this.deleteStudent(v._id)}>Delete</button>
              </td>
              <td>
                <button onClick={() => this.enterEditMode(v._id)}>Edit</button>
              </td>
            </tr>
           )
         })
        }
        </tbody>
      </table>
      </>
    );
  }
}

export default App;
