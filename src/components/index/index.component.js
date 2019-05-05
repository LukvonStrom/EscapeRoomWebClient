import React, { Component } from 'react';

export default class IndexComponent extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col" style={{textAlign: 'center'}}>
                        <p>Wilkommen in der Webapp zum Escape Room.</p>
                        <p>Bitte benutze die Navigation um zu den Einstellungen und von einem R&auml;tsel zum anderen zu gelangen.</p>
                        <p>Die neuen Seiten schalten sich <b>automatisch</b> frei, es lohnt sich also nachzuschauen, wenn ein Rätsel geschafft ist.</p>
                    </div>
                </div>
            </div>
        )
    }
}
