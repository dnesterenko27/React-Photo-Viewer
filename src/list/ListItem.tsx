import React from "react";
import {PhotoProps} from "../interfaces";

export default function Item({photo, onClick}: PhotoProps) {
    return (
        <li onClick={() => onClick()} className="image">
            <img alt="image" src={photo.cropped_picture}/>
        </li>
    )
}
