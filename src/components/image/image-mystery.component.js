import React, { Component, Fragment } from 'react';
import { withSocket } from "../../websocket/socket.provider";

class ImageMysteryComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            solutionInput : ''
        };
    }

    handleInputChange = event => {
        const {value, name} = event.target;

        this.setState({
            [name] : value
        });

    };

    submitSolution = e => {
        e.preventDefault();
        if (this.state.solutionInput && this.state.solutionInput.length > 0 && this.props.connected) {
            this.props.socket.emit('image-binary', this.state.solutionInput);
            this.setState({solutionInput : ''});
        }
    };

    clearSolution = e => {
        e.preventDefault();
        if (this.state.solutionInput && this.state.solutionInput.length > 0) {
            this.setState({solutionInput : ''});
        }

    };


    render() {
        return (
            <Fragment>
                {this.props.completedImage && <div className="alert alert-success" role="alert" style={{marginBottom : '8px'}}>
                    <i className="fa fa-check-circle"/> Webrätsel erledigt, bitte jetzt mit Rätsel 4 der Desktopapp fortfahren.
                </div>}
                <div className="container" style={{marginTop : '8px', marginBottom : '8px', textAlign : 'center', fontWeight : 'bold'}}>
                    <p>Für Informationen, was hier zu tun ist, Rätsel 3 in der Desktopapp lesen.</p>
                </div>
                <div className="container">
                    <form onSubmit={this.submitSolution}>
                        <div className="form-group row">
                            <div className="col">
                                <div className="input-group">
                                    <input id="solutionInput"
                                           name="solutionInput"
                                           placeholder="Lösung f&uuml;r das Bilderr&auml;tsel"
                                           type="text"
                                           required="required"
                                           className="form-control"
                                           value={this.state.solutionInput}
                                           onChange={this.handleInputChange}
                                           disabled={this.props.completedImage || !this.props.connected}/>
                                    {this.state.solutionInput.length > 0 && <button className="btn bg-transparent" style={{marginLeft : '-40px', zIndex : '100'}} type="button" onClick={this.clearSolution}>
                                        <i className="fa fa-times"/>
                                    </button>}
                                    <div className="input-group-append" onClick={this.submitSolution} style={{cursor : (this.props.completedImage) ? 'not-allowed' : 'pointer'}}>
                                        <div className="input-group-text">
                                            <i className="fa fa-arrow-right"/>
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


export default withSocket(ImageMysteryComponent);
