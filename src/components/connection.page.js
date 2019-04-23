import React from 'react';
import ConnectionFormComponent from "./connection/connection-form.component";
import ProgressComponent from "./connection/progress.component";

export default function ConnectionPage(props) {
    return (
        <div className="container">
            <div className="row">
                <div className="col offset-3">
                    <h3>Websocket Connection</h3>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <hr />
                </div>
            </div>

            <ConnectionFormComponent {...props}/>

            <ProgressComponent/>
        </div>
    )
}
