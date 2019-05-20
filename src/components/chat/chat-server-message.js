import React, { Fragment } from "react";
import { Spring } from "react-spring/renderprops-universal";
import { CopyToClipboard } from 'react-copy-to-clipboard';


export default function ChatServerMessage(props) {
    return (
        <Fragment>
            <div className="row">
                <div className="col d-flex justify-content-start">
                    <CopyToClipboard text={props.message}
                                     onCopy={() => alert(`${props.message} kopiert.`)}>
                        <h3 style={{minWidth : '8vw', maxWidth : '25vw', cursor : 'pointer'}}>

                            <Spring
                                from={{opacity : 0}}
                                to={{opacity : 1}}
                                config={{duration : 3500}}>
                                {style => <span className="badge badge-info" style={style}>
                                    <p style={{
                                        display : 'block',
                                        textAlign : 'left',
                                        whiteSpace : 'normal'
                                    }}>
                                        {props.message}
                                    </p>

                                    <p className="d-flex justify-content-end"
                                       style={{fontSize : '1rem', marginBottom : '8px', marginTop : '8px'}}>
                                        {props.date.toLocaleString().split(', ')[1]}
                                    </p>
                        </span>}
                            </Spring>

                        </h3>
                    </CopyToClipboard>
                </div>
            </div>
        </Fragment>
    )
}
