import React, { Component, Fragment } from 'react';
import { withSocket } from "../../websocket/socket.provider";
import ChatMessage from "./chat-message.component";

class ChatComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history : [],
            chatInput : '',
            unlockedNext : false
        };
    }

    componentDidMount() {
        if (this.props.socket && this.props.socket.connected) {
            this.props.socket.on('chat', (responseMessage) => {
                this.setState(prevState => ({
                    history : [...prevState.history, {date : new Date(), message : responseMessage, isOwnMessage : false}]
                }));
            });

            this.props.socket.on("mystery2-unlocked", () => {
                this.setState(prevState => ({
                    history : [...prevState.history, {date : new Date(), message : "New Mystery unlocked!", isOwnMessage : false}],
                    unlockedNext : true,
                }));
            })
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
        if (this.state.chatInput && this.state.chatInput.length > 0) {
            this.props.socket.emit('chat', this.state.chatInput);
            this.setState(prevState => ({
                history : [...prevState.history, {date : new Date(), message : this.state.chatInput, isOwnMessage : true}]
            }), () => this.setState({chatInput : ''}));

        }
    };
    clearChatMessage = e => {
        e.preventDefault();
        if (this.state.chatInput && this.state.chatInput.length > 0) {
            this.setState({chatInput: ''});
        }

    };


    render() {
        return (
            <Fragment>
                {this.state.unlockedNext && <div className="alert alert-success" role="alert" style={{marginBottom: '8px'}}>
                    <i className="fa fa-check-circle"/> Unlocked next Mystery!
                </div>}
                {this.state.history.length > 0 && <Fragment><div className="container">
                    <div className="row">
                        <div className="col offset-10" style={{marginBottom: '8px'}}>
                            <button className="btn btn-primary" onClick={() => this.setState({history : [], unlockedNext : false})}>Delete Chat</button>
                        </div>
                    </div>
                </div>
                <hr /></Fragment>}
                <div className="container">

                    {this.state.history.map(item => <ChatMessage
                        key={item.message}
                        isOwnMessage={item.isOwnMessage}
                        message={item.message}
                        date={item.date}/>)}
                    <form onSubmit={this.submitChatMessage}>
                        <div className="form-group row">
                            <div className="col">
                                <div className="input-group">
                                    <input id="chatInput" name="chatInput" placeholder="Message" type="text" required="required" className="form-control" value={this.state.chatInput} onChange={this.handleInputChange}/>
                                    {this.state.chatInput.length > 0 && <button className="btn bg-transparent" style={{marginLeft: '-40px', zIndex: '100'}} type="button" onClick={this.clearChatMessage}>
                                        <i className="fa fa-times"/>
                                    </button>}
                                    <div className="input-group-append" onClick={this.submitChatMessage} style={{cursor : 'pointer'}}>
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
