import React from "react";
import './css/ImageCard.css';

const ImageCard = ({ imageUrl }) => {
    return (
        <div className="photoCard">
            <img className="photoCard_img" alt="" src={imageUrl} width={300} />
        </div>
    );
};

export default ImageCard;