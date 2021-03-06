import React, { Component, Fragment } from "react";
import { withSocket } from "../websocket/socket.provider";
import IndexPage from "./index.page";
import ConnectionPage from "./connection.page";
import { Route } from "react-router-dom";
import ChatPage from "./chat.page";
import ImageMysteryPage from "./image-mystery.page";

class RoutesComponent extends Component {


    render() {
        return (
            <Fragment>
                <Route path="/" exact component={IndexPage}/>
                <Route path="/settings" component={ConnectionPage}/>
                {(this.props.connected) && <Route path="/chat" component={ChatPage}/>}
                {(this.props.connected && this.props.completedChat) && <Route path="/image-mystery" component={ImageMysteryPage}/>}
            </Fragment>
        )
    }
}


export default withSocket(RoutesComponent);
