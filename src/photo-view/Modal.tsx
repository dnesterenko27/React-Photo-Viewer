import React from "react";
import './Modal.css';

export default class Modal extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            isOpen: false,
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.props.isOpen &&
                <div className="modal-overlay">
                    <div className="modal-body">
                        <div className="controls">
                            <button className="image-control"
                                    onClick={() => this.prevImage()}>
                                &#8249;
                            </button>

                            <button className="image-control"
                                    onClick={() => this.nextImage()}>
                                &#8250;
                            </button>
                        </div>
                        <button className="close-btn" onClick={() => this.close()}>x</button>
                        <img className="full-image"
                             src={this.props.data.full_picture}
                             alt={this.props.data.author}/>
                        <div className="info-overlay">
                            <p className="info">Author: {this.props.data.author}</p>
                            <p className="info">Camera: {this.props.data.camera}</p>
                            <p className="info">Hashtags: {this.props.data.tags}</p>
                            <button className="share-btn"
                                    onClick={() => this.copyToClipboard(this.props.data.full_picture)}>
                                Share Image URL
                            </button>
                        </div>
                    </div>
                </div>
                }
            </React.Fragment>
        );
    }

    close(): void {
        this.setState({isOpen: false});
        this.props.onClose();
    }

    prevImage(): void {
        this.props.onPrevImage();
    }

    nextImage(): void {
        this.props.onNextImage();
    }

    copyToClipboard(text: string): void {
        navigator.clipboard.writeText(text);
        window.alert('URL copied to clipboard');
    }
}