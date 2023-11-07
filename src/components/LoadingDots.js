import React from "react";
import './css/LoadingDots.css';

const LoadingDots = () => (
    <div className="ls">
        <div className="loading">
            <div className="loading__dot"></div>
            <div className="loading__dot"></div>
            <div className="loading__dot"></div>
        </div>
    </div>
);

export default LoadingDots;