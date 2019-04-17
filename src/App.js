import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import io from 'socket.io-client';
import { SocketProvider } from "./websocket/socket.provider";
import IndexPage from "./components/index.page";
import ConnectionPage from "./components/connection.page";
import 'bootstrap';
import ChatPage from "./components/chat.page";

class App extends Component {
    state = {
        socket : null,
        uri: '',
        connected: false,
        completedChat: false,
    };

    componentDidMount() {
    }

    updateUri = (uri) => this.setState({uri});

    connectSocket = (hostname, cb) => {
        try {
            this.setState({
                socket : io.connect(hostname, {
                    reconnectionAttempts : 4
                })
            }, () => {
                this.state.socket.on('connect', () => this.setState({connected: true}, () => cb()));
                this.state.socket.on('disconnect', () => this.setState({connected: false}, () => cb()));
                this.state.socket.on("mystery2-unlocked", () => {
                    this.setState({
                        completedChat : true,
                    });
                })
            });
        } catch (err) {
            console.error(err);
        }
    };

    render() {
        return (
            <div className="App">
                <SocketProvider socket={this.state.socket} connectToSocket={this.connectSocket} uri={this.state.uri} updateUri={this.updateUri} completedChat={this.state.completedChat}>
                    <Router>
                        <div>
                            <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{marginBottom: '8px'}}>
                                <Link to="/" className="navbar-brand">Escape Room</Link>
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon" />
                                </button>
                                <div className="collapse navbar-collapse" id="navbarNav">
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <Link to="/" className="nav-link">Home</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/settings" className="nav-link">Settings</Link>
                                        </li>
                                        {(this.state.connected && !this.state.completedChat) && <li className="nav-item">
                                            <Link to="/chat" className="nav-link">Chat</Link>
                                        </li>}
                                        {(this.state.connected && this.state.completedChat) && <li className="nav-item">
                                            <Link to="/mystery" className="nav-link">Mystery</Link>
                                        </li>}
                                    </ul>
                                </div>
                            </nav>

                            <Route path="/" exact component={IndexPage}/>
                            <Route path="/settings" component={ConnectionPage} />
                            {(this.state.connected) && <Route path="/chat" component={ChatPage} />}
                            {(this.state.connected && this.state.completedChat) && <Route path="/mystery" component={ChatPage} />}
                        </div>
                    </Router>
                </SocketProvider>
            </div>
        );
    }
}

export default App;
