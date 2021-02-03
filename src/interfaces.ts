export interface Photo {
    id: string;
    cropped_picture: string;
}

export interface FullPhoto extends Photo {
    full_picture: string;
    author: string;
    camera: string;
    tags: string;
}

export interface ListProps {
    photos: Photo[];
}

export interface PhotoProps {
    photo: Photo;
    onClick: Function;
}
