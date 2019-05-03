import React, { Component, Fragment } from 'react';

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {hasError : false, errorMessage : ''};
    }

    triggerError = (error) => {
        console.error(error);
    };

    static getDerivedStateFromError(error) {
        return { hasError: true, errorMessage : error.message };
    }

    componentDidCatch(error, info) {
        console.log('Error Boundary');
        this.triggerError(error);
        console.log(info);
    }

    render() {
        if (this.state.hasError) {
            return (<Fragment>
                    <div className="container" style={{minWidth: '100%', marginLeft: 0, marginRight: 0, marginBottom: '8px', marginTop: '8px'}}>
                        <div className="row" style={{paddingRight: 0}}>
                            <div className="col">
                                <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{marginBottom: 0}}>
                                    Error: {this.state.errorMessage}
                                    <button type="button" className="close" onClick={() => this.setState({hasError: false})}>
                                        <i className="fa fa-times"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.props.children}
                </Fragment>
            )
        }

        return this.props.children;
    }
}
