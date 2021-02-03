import React from "react";
import Item from "./ListItem";
import API from "../API";
import {IMAGES_URL} from "../constants";
import Modal from "../photo-view/Modal";

class List extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            isLoading: false,
            images: {},
            fullImage: {},
        };
    }

    render() {
        return (
            <div className="image-list-wrapper">
                <Modal data={this.state.fullImage}
                       isOpen={this.state.modalOpen}
                       onClose={() => this.closeModal()}
                       onPrevImage={() => this.getPrevImage()}
                       onNextImage={() => this.getNextImage()}/>

                <ul className="image-list">
                    {this.state.images?.pictures?.map((photo: any) =>
                        <Item onClick={() => this.setFullImage(photo.id)} photo={photo} key={photo.id}/>
                    )}
                </ul>

                <div className="paginator">
                    <button disabled={this.state.images.page === 1}
                            className="page-control"
                            onClick={() => this.getPrevPage()}>
                        &#10094;
                    </button>

                    <span>{this.state.images.page}</span>
                    <span>&nbsp;/ {this.state.images.pageCount}</span>

                    <button disabled={this.state.images.page === this.state.images.pageCount}
                            className="page-control"
                            onClick={() => this.getNextPage()}>
                        &#10095;
                    </button>
                </div>
            </div>
        )
    }

    async componentDidMount(): Promise<void> {
        this.setState({
            images: (await API.get(IMAGES_URL)).data
        })
    }

    async getPrevPage(): Promise<void> {
        this.setState({
            images: (await API.get(IMAGES_URL, {
                params: {
                    page: this.state.images.page - 1,
                }
            })).data
        })
    }

    async getNextPage(): Promise<void> {
        this.setState({
            images: (await API.get(IMAGES_URL, {
                params: {
                    page: this.state.images.page + 1,
                }
            })).data
        })
    }

    async getImageFullInfo(id: string): Promise<void> {
        this.setState({
            fullImage: (await API.get(`${IMAGES_URL}/${id}`)).data
        })
    }

    async setFullImage(id: string): Promise<void> {
        this.setState({fullImageId: id, modalOpen: true});
        await this.getImageFullInfo(id);
    }

    closeModal(): void {
        this.setState({modalOpen: false});
    }

    async getPrevImage(): Promise<void> {
        const images = this.state.images.pictures;
        const index = images.indexOf(images.find((image: any) => image.id === this.state.fullImage.id));
        if (index === 0) {
            return;
        }
        await this.getImageFullInfo(images[index === 0 ? index : index - 1].id);
    }

    async getNextImage(): Promise<void> {
        const images = this.state.images.pictures;
        const index = images.indexOf(images.find((image: any) => image.id === this.state.fullImage.id));
        if (index === images.length - 1) {
            return;
        }
        await this.getImageFullInfo(images[index === images.length ? index : index + 1].id);
    }
}

export default List;