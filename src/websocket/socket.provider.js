import React, {Component} from 'react';

// SocketContext = {Provider, Consumer}
const SocketContext = React.createContext(null);

export class SocketProvider extends Component {

    render() {

        return (
            <SocketContext.Provider value={{socket: this.props.socket, connectToSocket: this.props.connectToSocket, uri: this.props.uri, updateUri: this.props.updateUri}}>
                {this.props.children}
            </SocketContext.Provider>
        );
    }
}

export function withSocket(Component) {
    class ComponentWithSocket extends React.Component {
        static displayName = `${Component.displayName ||
        Component.name}`;


        render() {
            return (
                <SocketContext.Consumer>
                    { ({socket, connectToSocket, uri, updateUri}) =>  <Component {...this.props}  connectToSocket={connectToSocket} socket={socket} uri={uri} updateUri={updateUri} ref={this.props.onRef} /> }
                </SocketContext.Consumer>
            );
        }
    }

    return ComponentWithSocket;
}
