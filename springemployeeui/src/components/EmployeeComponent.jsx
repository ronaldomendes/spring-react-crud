import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class EmployeeComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            emailId: ''
        }

        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailIdHandler = this.changeEmailIdHandler.bind(this);
        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
    }

    // step 3
    componentDidMount() {

        // step 4
        if (this.state.id === '_add') {
            return;
        } else {
            EmployeeService.getEmployeeById(this.state.id).then(res => {
                let employee = res.data;
                this.setState({ firstName: employee.firstName, lastName: employee.lastName, emailId: employee.emailId })
            });
        }
    }

    changeFirstNameHandler = event => this.setState({ firstName: event.target.value });
    changeLastNameHandler = event => this.setState({ lastName: event.target.value });
    changeEmailIdHandler = event => this.setState({ emailId: event.target.value });

    saveOrUpdateEmployee = event => {
        event.preventDefault();
        let employee = { firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId };
        console.log(`employee => ${JSON.stringify(employee)}`);

        // step 5
        if (this.state.id === '_add') {
            EmployeeService.createEmployee(employee).then(res => this.props.history.push('/employees'));
        } else {
            EmployeeService.updateEmployee(employee, this.state.id).then(res => this.props.history.push('/employees'));
        }
    }

    cancel() {
        this.props.history.push('/employees');
    }

    getTitle() {
        return (this.state.id === '_add') ? <h3 className="text-center mt-3">Add Employee</h3> : <h3 className="text-center mt-3">Update Employee</h3>;
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 mt-5">
                            {this.getTitle()}
                            <div className="card-body">
                                <form action="">
                                    <div className="form-group">
                                        <label htmlFor="">First name:</label>
                                        <input type="text" placeholder="First name" name="firstName" className="form-control"
                                            value={this.state.firstName} onChange={this.changeFirstNameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Last name:</label>
                                        <input type="text" placeholder="Last name" name="lastName" className="form-control"
                                            value={this.state.lastName} onChange={this.changeLastNameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">E-mail Address:</label>
                                        <input type="email" placeholder="E-mail Address" name="emailId" className="form-control"
                                            value={this.state.emailId} onChange={this.changeEmailIdHandler} />
                                    </div>

                                    <button className="btn btn-success" onClick={this.saveOrUpdateEmployee}>Save</button>
                                    <button className="btn btn-danger ml-2" onClick={this.cancel.bind(this)}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EmployeeComponent;