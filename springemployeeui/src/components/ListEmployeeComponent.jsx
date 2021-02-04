import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class ListEmployeeComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            employees: []
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    componentDidMount() {
        EmployeeService.getAllEmployees().then((res) => {
            this.setState({ employees: res.data });
        })
    }

    addEmployee() {
        // step 6
        this.props.history.push('/add-employee/_add');
    }

    editEmployee(id) {
        // step 7
        this.props.history.push(`/add-employee/${id}`);
    }

    deleteEmployee(id) {
        EmployeeService.deleteEmployee(id).then(res => 
            this.setState({ employees: this.state.employees.filter(e => e.id !== id) }));
    }

    viewEmployee(id) {
        this.props.history.push(`/view-employee/${id}`);
    }

    render() {
        return (
            <div>
                <h2 className="text-center mt-2">Employees List</h2>
                <div className="row mb-2">
                    <button className="btn btn-primary" onClick={this.addEmployee}>Add Employee</button>
                </div>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Employee First Name</th>
                                <th>Employee Last Name</th>
                                <th>Employee Email ID</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employees.map(
                                    employee =>
                                        <tr key={employee.id}>
                                            <td>{employee.firstName}</td>
                                            <td>{employee.lastName}</td>
                                            <td>{employee.emailId}</td>
                                            <td>
                                                <button className="btn btn-info btn-sm" onClick={() => this.editEmployee(employee.id)}>Update</button>
                                                <button className="btn btn-danger btn-sm ml-2" onClick={() => this.deleteEmployee(employee.id)}>Delete</button>
                                                <button className="btn btn-success btn-sm ml-2" onClick={() => this.viewEmployee(employee.id)}>View</button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListEmployeeComponent;