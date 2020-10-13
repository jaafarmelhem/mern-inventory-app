import React, { Component } from 'react';
import axios from 'axios';

/**test command **/
export default class CreateDevice extends Component {

    constructor(props) {
        super(props);
        this.onChangeDeviceName = this.onChangeDeviceName.bind(this);
        this.onChangeDeviceDescription = this.onChangeDeviceDescription.bind(this);
        this.onChangeDeviceResponsible = this.onChangeDeviceResponsible.bind(this);
        this.onChangeDevicePriority = this.onChangeDevicePriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            device_name: '',
            device_description: '',
            device_responsible: '',
            device_priority: '',
            device_completed: false
        }
    }

    onChangeDeviceName(e) {
        this.setState({
            device_name: e.target.value
        });
    }

    onChangeDeviceDescription(e) {
        this.setState({
            device_description: e.target.value
        });
    }

    onChangeDeviceResponsible(e) {
        this.setState({
            device_responsible: e.target.value
        });
    }

    onChangeDevicePriority(e) {
        this.setState({
            device_priority: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`Device Name: ${this.state.device_name}`);
        console.log(`Device Description: ${this.state.device_description}`);
        console.log(`Device Responsible: ${this.state.device_responsible}`);
        console.log(`Device Priority: ${this.state.device_priority}`);
        
        const newDevice = {
            device_name: this.state.device_name,
            device_description: this.state.device_description,
            device_responsible: this.state.device_responsible,
            device_priority: this.state.device_priority,
            device_completed: this.state.device_completed
        };
        
        axios.post('http://localhost:4000/devices/add', newDevice)
            .then(res => console.log(res.data));

        this.setState({
            device_name: '',
            device_description: '',
            device_responsible: '',
            device_priority: '',
            device_completed: false
        })
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Create New Device</h3>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group"> 
                        <label>Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.device_name}
                                onChange={this.onChangeDeviceName}
                                />
                    </div>

                    <div className="form-group"> 
                        <label>Description: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.device_description}
                                onChange={this.onChangeDeviceDescription}
                                />
                    </div>
                    <div className="form-group">
                        <label>Responsible: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.device_responsible}
                                onChange={this.onChangeDeviceResponsible}
                                />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityLow" 
                                    value="Low"
                                    checked={this.state.device_priority==='Low'} 
                                    onChange={this.onChangeDevicePriority}
                                    />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityMedium" 
                                    value="Medium" 
                                    checked={this.state.device_priority==='Medium'} 
                                    onChange={this.onChangeDevicePriority}
                                    />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityHigh" 
                                    value="High" 
                                    checked={this.state.device_priority==='High'} 
                                    onChange={this.onChangeDevicePriority}
                                    />
                            <label className="form-check-label">High</label>
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Device" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
