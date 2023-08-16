import React from 'react';
import "./CloseButton.css"
function CloseButton({ closeModal }) {
    return (
        <button className="CloseButton" onClick={closeModal}>
            <img className ="CloseButtonImg" src="img/dding/closeButton.png" alt="CloseButton Icon" />
            <span className="CloseButtonText">Close</span>
        </button>
    );
}

export default CloseButton;
