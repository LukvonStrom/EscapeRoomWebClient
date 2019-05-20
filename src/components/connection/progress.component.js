import React, { Component, Fragment } from "react";
import { withSocket } from "../../websocket/socket.provider";

class ProgressComponent extends Component {

    state = {
        progress : 0
    };

    relevantProps = ["connected", "completedChat", "completedImage"];

    reCalcProgress = () => {
        let progress = 0;
        this.relevantProps.forEach(prop => progress += (this.props[prop] ? (100 / this.relevantProps.length) : 0));
        this.setState({progress});
    };

    componentDidMount() {
        this.reCalcProgress();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        for (let relevantProp of this.relevantProps) {
            if (this.props[relevantProp] !== prevProps[relevantProp]) {
                this.reCalcProgress();
                return;
            }
        }
    }

    render() {
        return (
            <Fragment>
                <div className="row">
                    <div className="col">
                        <div className="progress">
                            <div className={"progress-bar progress-bar-striped progress-bar-animated " + (this.state.progress === 100 ? "bg-success" : "")}
                                 role="progressbar"
                                 style={{width : `${this.state.progress}%`}}/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <ul>
                            {this.props.connected && <li>Verbunden via Websocket.</li>}
                            {(this.props.connected && this.props.completedChat) && <li>Chat-Rätsel gelöst.</li>}
                            {(this.props.connected && this.props.completedImage) && <li>Bilderrätsel gelöst.</li>}
                        </ul>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default withSocket(ProgressComponent);
