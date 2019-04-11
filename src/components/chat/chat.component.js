import React, { Component } from 'react';
import { withSocket } from "../../websocket/socket.provider";
import ChatMessage from "./chat-message.component";

class ChatComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
          history: [],
          chatInput: ''
        };
    }

    componentDidMount() {
        if(this.props.socket && this.props.socket.connected) {
            this.props.socket.on('chat', (responseMessage) => {
                this.setState(prevState => ({
                    history: [...prevState.history, {date: new Date(), message: responseMessage, isOwnMessage: false}]
                }));
            });
        }
        }

    handleInputChange = event => {
        const {value, name} = event.target;

        this.setState({
            [name] : value
        });

    };

    submitChatMessage = e => {
        e.preventDefault();
        if(this.state.chatInput && this.state.chatInput.length > 0) {
            this.props.socket.emit('chat', this.state.chatInput);
            this.setState(prevState => ({
                history: [...prevState.history, {date: new Date(), message: this.state.chatInput, isOwnMessage: true}]
            }), () => this.setState({chatInput : ''}));

        }
    };


    render() {
        return (
        <div className="container">
            {this.state.history.map(item => <ChatMessage key={item.message} isOwnMessage={item.isOwnMessage} message={item.message} date={item.date}/>)}
            <form onSubmit={this.submitChatMessage}>
                <div className="form-group row">
                    <div className="col">
                        <div className="input-group">
                            <input id="chatInput" name="chatInput" placeholder="Message" type="text" required="required" className="form-control" value={this.state.chatInput} onChange={this.handleInputChange}/>
                                <div className="input-group-append" onClick={this.submitChatMessage} style={{cursor: 'pointer'}}>
                                    <div className="input-group-text">
                                        <i className="fa fa-paper-plane" />
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        )
    }
}


export default withSocket(ChatComponent);
