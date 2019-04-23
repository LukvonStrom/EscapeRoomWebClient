import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { SocketProvider } from "./websocket/socket.provider";
import 'bootstrap';
import RoutesComponent from "./components/routes.component";
import NavComponent from "./components/nav.component";

class App extends Component {

    render() {
        return (
            <div className="App">
                <Router>
                        <SocketProvider>
                            <div>
                                <NavComponent/>

                                <RoutesComponent/>
                            </div>
                        </SocketProvider>
                </Router>
            </div>
        );
    }
}

export default App;
