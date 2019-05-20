import React from 'react';
import ChatComponent from "./chat/chat.component";

export default function ChatPage(props) {
    return (
        <div className="container">
            <div className="row">
                <div className="col" style={{textAlign : 'center'}}>
                    <h3>Chat</h3>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <hr/>
                </div>
            </div>

            <ChatComponent {...props}/>
        </div>
    )
}
