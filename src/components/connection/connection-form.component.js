import React, { Component } from 'react';
import { withSocket } from "../../websocket/socket.provider";

class ConnectionFormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connectionAddress : "10.3.141.1",
            connectionPort : 80,
        };
    }

    handleInputChange = event => {
        const {value, name} = event.target;

        this.setState({
            [name] : value
        }, () => {
            this.props.updateUri(`${this.state.connectionAddress}:${this.state.connectionPort}`);
        });

    };

    componentDidMount() {
        if (this.props.uri) {
            const explodedUri = this.props.uri.split(':');
            this.setState({connectionAddress : explodedUri[0], connectionPort : +explodedUri[1]});
        }
    }

    connect = () => {
        this.props.connectToSocket(`${this.state.connectionAddress}:${this.state.connectionPort}`, () => this.props.history.push('/settings'));
    };


    render() {
        return (
            <div className="row">
                <div className="col">
                    <form>
                        {this.props.connected && <div className="alert alert-success" role="alert">
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
                                <span id="hostnameHelpBlock" className="form-text text-muted">Der Hostname/die IP des Websocket Servers</span>
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
                                        onChange={this.handleInputChange}
                                        onKeyPress={event => event.key === "Enter" ? this.connect() : ""}/>
                                </div>
                                <span id="portHelpBlock" className="form-text text-muted">Der Port des Websocket Servers</span>
                            </div>
                        </div>
                        {!this.props.connected && <div className="form-group row">
                            <div className="offset-3 col-9">
                                {!this.props.isConnecting && <button name="submit" type="button" className="btn btn-primary" onClick={this.connect}>Verbinden</button>}

                                {this.props.isConnecting &&
                                <button className="btn btn-primary" type="button" disabled>
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" style={{marginRight : '4px', marginBottom : '2px'}}/>
                                    Verbinden... Versuch {this.props.connectionAttempts}/4
                                </button>}

                            </div>
                        </div>}

                    </form>
                </div>
            </div>)
    }
}

export default withSocket(ConnectionFormComponent);


