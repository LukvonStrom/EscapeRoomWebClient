import React, { Component } from "react";
import { withSocket } from "../websocket/socket.provider";
import { Link, withRouter } from "react-router-dom";

class NavComponent extends Component {

    appendActive = (path) =>{
        if(this.props.location && this.props.location.pathname === path){
            return " active";
        }
        return "";
    };

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
                            <Link to="/" className={"nav-link" + this.appendActive("/")}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/settings" className={"nav-link" + this.appendActive("/settings")}>Settings</Link>
                        </li>
                        <li className="nav-item">
                            {(this.props.connected && !this.props.completedChat) ?
                                <Link to="/chat" className={"nav-link" + this.appendActive("/chat")}>Chat</Link>
                                :
                                <a href="/" className="nav-link disabled">Chat</a>}
                        </li>
                        <li className="nav-item">
                            {(this.props.connected && this.props.completedChat) ?
                                <Link to="/image-mystery" className={"nav-link" + this.appendActive("/image-mistery")}>Image Mystery</Link>
                                :
                                <a href="/" className="nav-link disabled">Image Mystery</a>
                            }
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}


export default withRouter(withSocket(NavComponent));
