import React, { Fragment } from "react";
import { Spring } from "react-spring/renderprops-universal";

export default function ChatMessage(props) {
    const styleClass = `col d-flex ${(props.isOwnMessage) ? 'justify-content-end' : 'justify-content-start'}`;

    const messageClass = props.isOwnMessage ? 'badge badge-success' : 'badge badge-info';

    return (
        <Fragment>
            <div className="row">
                <div className={styleClass}>
                    <h3 style={{minWidth : '8vw', maxWidth : '25vw'}}>
                        <Spring
                            from={{opacity : 0}}
                            to={{opacity : 1}}
                            config={{duration : 3500}}>
                            {style => <span className={messageClass} style={style}>
                        <p style={{
                            display : 'block',
                            textAlign : 'left',
                            whiteSpace : 'normal'
                        }}>{props.message}</p>
                        <p className="d-flex justify-content-end" style={{fontSize : '1rem', marginBottom : '8px', marginTop : '8px'}}>{props.date.toLocaleString().split(', ')[1]}</p>
                        </span>}</Spring>
                    </h3>
                </div>
            </div>
        </Fragment>
    )
}
