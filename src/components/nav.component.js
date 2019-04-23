import React, { Component } from "react";
import { withSocket } from "../websocket/socket.provider";
import { Link } from "react-router-dom";

class NavComponent extends Component {


    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{marginBottom : '8px'}}>
                <Link to="/" className="navbar-brand">Escape Room</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/settings" className="nav-link">Settings</Link>
                        </li>
                        <li className="nav-item">
                            {(this.props.connected && !this.props.completedChat) ?
                                <Link to="/chat" className="nav-link">Chat</Link>
                                :
                                <a href="/" className="nav-link disabled">Chat</a>}
                        </li>
                        <li className="nav-item">
                            {(this.props.connected && this.props.completedChat) ?
                                <Link to="/mystery" className="nav-link">Mystery</Link>
                                :
                                <a href="/" className="nav-link disabled">Mystery</a>
                            }
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}


export default withSocket(NavComponent);
