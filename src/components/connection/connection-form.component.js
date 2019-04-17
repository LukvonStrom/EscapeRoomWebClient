import React, { Component } from 'react';
import { withSocket } from "../../websocket/socket.provider";

class ConnectionFormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connected : false,
            connectionAddress : "localhost",
            connectionPort : 80,
        }
    }

    handleInputChange = event => {
        const {value, name} = event.target;

        this.setState({
            [name] : value
        }, () => {
            this.props.updateUri(`${this.state.connectionAddress}:${this.state.connectionPort}`);
        });

    };

    handleConnectionChange = () => this.setState({
        connected : this.props.socket ? this.props.socket.connected : false,
    });

    componentDidMount() {
        if (this.props.socket) {
            this.handleConnectionChange();
        }
        if (this.props.uri) {
            const explodedUri = this.props.uri.split(':');
            this.setState({connectionAddress : explodedUri[0], connectionPort : +explodedUri[1]});
        }
    }

    connect = () => {
        this.props.connectToSocket(`${this.state.connectionAddress}:${this.state.connectionPort}`, () => {
            if (!this.props.socket.connected) {
                this.props.history.push('/settings');
                return;
            }
            this.handleConnectionChange();

        });
    };


    render() {
        return (
            <div className="row">
                <div className="col">
                    <form>
                        {this.state.connected && <div className="alert alert-success" role="alert">
                            <i className="fa fa-check-circle"/> Verbunden!
                        </div>}
                        <div className="form-group row">
                            <label htmlFor="hostname" className="col-3 col-form-label">Hostname</label>
                            <div className="col-9">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <i className="fa fa-server"/>
                                        </div>
                                    </div>
                                    <input
                                        id="hostname"
                                        name="connectionAddress"
                                        placeholder="localhost"
                                        type="text"
                                        aria-describedby="hostnameHelpBlock"
                                        required="required"
                                        className="form-control"
                                        value={this.state.connectionAddress}
                                        onChange={this.handleInputChange}/>
                                </div>
                                <span id="hostnameHelpBlock" className="form-text text-muted">The Hostname of the Websocket Server</span>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-3 col-form-label" htmlFor="port">Port</label>
                            <div className="col-9">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <i className="fa fa-sort-numeric-down"/>
                                        </div>
                                    </div>
                                    <input
                                        id="port"
                                        name="connectionPort"
                                        placeholder="80"
                                        type="number"
                                        className="form-control"
                                        aria-describedby="portHelpBlock"
                                        required="required"
                                        value={this.state.connectionPort}
                                        onChange={this.handleInputChange}/>
                                </div>
                                <span id="portHelpBlock" className="form-text text-muted">The Port of the Websocket Server</span>
                            </div>
                        </div>
                        {!this.state.connected && <div className="form-group row">
                            <div className="offset-3 col-9">
                                <button name="submit" type="button" className="btn btn-primary" onClick={this.connect}>Verbinden</button>
                            </div>
                        </div>}
                    </form>
                </div>
            </div>)
    }
}

export default withSocket(ConnectionFormComponent);


