import React, { Component } from 'react';
import io from "socket.io-client";

// SocketContext = {Provider, Consumer}
const SocketContext = React.createContext(null);

const reconnectionAttempts = 4;

export class SocketProvider extends Component {

    state = {
        socket : null,
        uri : '',
        connected : false,
        completedChat : false,
        completedImage: false,
        history: [],
        isConnecting: false,
        connectionAttempts: 0,
    };

    updateUri = (uri) => this.setState({uri});

    addMessage = (message, isOwnMessage, cb) => {

            this.setState(prevState => ({
                history : [...prevState.history, {date : new Date(), message, isOwnMessage}]
            }), () => {
                if (cb) cb()
            });

    };

    emptyHistory = () => this.setState({history : []});

    connectSocket = (hostname, historyCB) => {
        const forceRedirect = () => {
            console.log('Socket Connection State changed to', this.state.socket.connected);
            if (!this.state.socket.connected) {
                console.log('Attempting redirect to Settings...');
                historyCB();
            }
        };


        try {
            this.setState({
                socket : io.connect(hostname, {
                    reconnectionAttempts
                }),
                isConnecting: true
            }, () => {
                this.state.socket.on('connect_error', () => this.setState(prevState => {
                    if(prevState.connectionAttempts === reconnectionAttempts){
                        return {
                            isConnecting: false,
                            connectionAttempts: 0
                        }
                    }

                    return {
                        isConnecting: true,
                        connectionAttempts : prevState.connectionAttempts +1,
                    }
                }));

                this.state.socket.on('connect', () => this.setState({connected : true, isConnecting: false, connectionAttempts: 0}, () => {
                    forceRedirect();
                }));
                this.state.socket.on('disconnect', () => {
                    forceRedirect();
                    setTimeout(() =>requestAnimationFrame(()=>this.setState({connected : false, isConnecting: false, connectionAttempts: 0})), 1000);
                });

                this.state.socket.on("mystery2-unlocked", () => {
                    this.setState({
                        completedChat : true,
                    }, () => {
                        this.addMessage("New Mystery unlocked!", false);
                    });
                });

                this.state.socket.on("image-binary", (solved) => {
                    this.setState({
                        completedImage: Boolean(solved)
                    })
                });

                this.state.socket.on('chat', (responseMessage) => {
                    this.addMessage(responseMessage, false);
                });
            });
        } catch (err) {
            console.error(err);
        }
    };

    render() {
        return (
            <SocketContext.Provider value={{addMessage: this.addMessage, connectToSocket: this.connectSocket, updateUri: this.updateUri, emptyHistory: this.emptyHistory, ...this.state}} {...this.props}>
                {this.props.children}
            </SocketContext.Provider>
        );
    }
}

export function withSocket(Component) {
    class ComponentWithSocket extends React.Component {
        static displayName = `${Component.displayName || Component.name}`;


        render() {
            return (
                <SocketContext.Consumer>
                    { (contextValues) =>  <Component {...this.props}  {...contextValues} ref={this.props.onRef} /> }
                </SocketContext.Consumer>
            );
        }
    }

    return ComponentWithSocket;
}
