import React from 'react';
import ConnectionFormComponent from "./connection/connection-form.component";
import ProgressComponent from "./connection/progress.component";

export default function ConnectionPage(props) {
    return (
        <div className="container">
            <div className="row">
                <div className="col" style={{textAlign : 'center'}}>
                    <h3>Websocket Verbindung</h3>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <hr/>
                </div>
            </div>

            <ConnectionFormComponent {...props}/>

            <h3 style={{textAlign : 'center'}}>Fortschritt</h3>
            <ProgressComponent/>
        </div>
    )
}
