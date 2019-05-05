import React, { Fragment } from 'react';
import IndexComponent from "./index/index.component";

export default function IndexPage() {
    return (
        <Fragment>
            <div className="container">
                <div className="row">
                    <div className="col" style={{textAlign: 'center'}}>
                        <h1>Escape Room Webclient</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <hr />
                    </div>
                </div>
            </div>
            <IndexComponent/>
        </Fragment>
    )
}
