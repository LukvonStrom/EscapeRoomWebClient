import React from "react";
import ImageMysteryComponent from "./image/image-mystery.component";

export default function ImageMysteryPage(props) {
    return (
        <div className="container">
            <div className="row">
                <div className="col d-flex justify-content-center">
                    <h3>Image Mystery</h3>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <hr/>
                </div>
            </div>

            <ImageMysteryComponent {...props}/>
        </div>
    )
}
