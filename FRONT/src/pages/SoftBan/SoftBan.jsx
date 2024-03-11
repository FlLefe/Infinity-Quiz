import React from 'react';
import "./SoftBan.scss";

{/* SoftBan Page for rate limiter */}

export default function SoftBan (){
    return (
    <div className="softBanContainer">
        <h2>Vous avez effectué beaucoup de requêtes dans un délai très court.</h2>
        <p>Veuillez patienter 15 minutes avant de pouvoir à nouveau utiliser l'applcation.</p>
    </div>
    )
}