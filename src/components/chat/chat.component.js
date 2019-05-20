import React, { Component, Fragment } from 'react';
import { withSocket } from "../../websocket/socket.provider";
import ChatMessage from "./chat-message.component";
import ChatServerMessage from "./chat-server-message";

class ChatComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatInput : ''
        };
    }

    handleInputChange = event => {
        const {value, name} = event.target;

        this.setState({
            [name] : value
        });

    };

    submitChatMessage = e => {
        e.preventDefault();
        if (this.state.chatInput && this.state.chatInput.length > 0 && !this.props.completedChat && (!this.props.history || !this.props.history.some(chatMessage => (chatMessage.message === this.state.chatInput)))) {
            console.log(!this.props.history, this.props.history);
            this.props.socket.emit('chat', this.state.chatInput);
            this.props.addMessage(this.state.chatInput, true, () => this.setState({chatInput : ''}));
        }
    };
    clearChatMessage = e => {
        e.preventDefault();
        if (this.state.chatInput && this.state.chatInput.length > 0) {
            this.setState({chatInput : ''});
        }

    };


    render() {
        return (
            <Fragment>
                {this.props.completedChat && <div className="alert alert-success" role="alert" style={{marginBottom : '8px'}}>
                    <i className="fa fa-check-circle"/> N&auml;chstes R&auml;tsel freigeschalten!
                </div>}
                {this.props.history.length > 0 && <Fragment>
                    <div className="container">
                        <div className="row">
                            <div className="col offset-9" style={{marginBottom : '8px'}}>
                                <button className="btn btn-primary" onClick={this.props.emptyHistory}>Chat l&ouml;schen</button>
                            </div>
                        </div>
                    </div>
                    <hr/>
                </Fragment>}
                <div className="container">

                    {this.props.history.map((item, index) => (item.isOwnMessage) ?
                        <ChatMessage
                            key={index}
                            message={item.message}
                            date={item.date}/>
                        :
                        <ChatServerMessage
                            key={item.message}
                            message={item.message}
                            date={item.date}/>)}

                    <form onSubmit={this.submitChatMessage}>
                        <div className="form-group row">
                            <div className="col">
                                <div className="input-group">
                                    <input id="chatInput"
                                           name="chatInput"
                                           placeholder="Nachricht"
                                           type="text"
                                           required="required"
                                           className="form-control"
                                           value={this.state.chatInput}
                                           onChange={this.handleInputChange}
                                           disabled={this.props.completedChat}/>
                                    {this.state.chatInput.length > 0 && <button className="btn bg-transparent" style={{marginLeft : '-40px', zIndex : '100'}} type="button" onClick={this.clearChatMessage}>
                                        <i className="fa fa-times"/>
                                    </button>}
                                    <div className="input-group-append" onClick={this.submitChatMessage} style={{cursor : (this.props.completedChat) ? 'not-allowed' : 'pointer'}}>
                                        <div className="input-group-text">
                                            <i className="fa fa-paper-plane"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </Fragment>
        )
    }
}


export default withSocket(ChatComponent);
