import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Device = props => (
    <tr>
        <td className={props.device.device_completed ? 'completed' : ''}>{props.device.device_description}</td>
        <td className={props.device.device_completed ? 'completed' : ''}>{props.device.device_responsible}</td>
        <td className={props.device.device_completed ? 'completed' : ''}>{props.device.device_priority}</td>
        <td>
            <Link to={"/edit/"+props.device._id}>Edit</Link>
        </td>
    </tr>
)

export default class DevicesList extends Component {

    constructor(props) {
        super(props);
        this.state = {devices: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/devices/')
            .then(response => {
                this.setState({ devices: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    deviceList() {
        return this.state.devices.map(function(currentDevice, i){
            return <Device device={currentDevice} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Devices List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.deviceList() }
                    </tbody>
                </table>
            </div>
        )
    }
}
