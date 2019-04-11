import React from "react";

export default function ChatMessage(props) {
    const styleClass = `col d-flex ${(props.isOwnMessage) ? 'justify-content-end' : 'justify-content-start'}`;

    const messageClass = props.isOwnMessage ? 'badge badge-success' : 'badge badge-info';

    return (
        <div className="row">
            <div className={styleClass}>
                <h3 style={{minWidth: '8vw', maxWidth: '25vw'}}>
                    <span className={messageClass}>
                        <p style={{display: 'block',
                            textAlign: 'left',
                            whiteSpace: 'normal'}}>{props.message}</p>
                        <p className="d-flex justify-content-end" style={{fontSize: '1rem', marginBottom: '8px', marginTop: '8px'}}>{props.date.toLocaleString().split(', ')[1]}</p>
                    </span>
                </h3>
            </div>
        </div>
    )
}
