import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class ViewEmployeeComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            employee: {}
        }
    }

    componentDidMount() {
        EmployeeService.getEmployeeById(this.state.id).then(res => this.setState({ employee: res.data }));
    }

    goBack() {
        this.props.history.push('/employees');
    }

    render() {
        return (
            <div>
                <div className="card col-md-6 offset-md-3 mt-5">
                    <h3 className="text-center mt-2">View Employee Details</h3>
                    <div className="card-body">
                        <div className="row">
                            <label htmlFor="" className="font-weight-bold mr-1">First Name:</label>
                            <div> { this.state.employee.firstName }</div>
                        </div>
                        <div className="row">
                            <label htmlFor="" className="font-weight-bold mr-1">Last Name:</label>
                            <div> { this.state.employee.lastName }</div>
                        </div>
                        <div className="row">
                            <label htmlFor="" className="font-weight-bold mr-1">E-mail Address:</label>
                            <div> { this.state.employee.emailId }</div>
                        </div>
                    </div>
                    <button className="btn btn-primary mb-3" onClick={this.goBack.bind(this)}>Back</button>
                </div>
            </div>
        );
    }
}

export default ViewEmployeeComponent;