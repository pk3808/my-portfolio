import React from 'react';

const Snow = () => {
    console.log("Rendering Snow");
    
    return (
        <div className="snow-container">
            {Array.from({ length: 50 }).map((_, index) => (
                <div key={index} className="snowflake">❄</div>
            ))}
            <h1 className="snow-text">Snowfall</h1>
        </div>
    );
};

export default Snow;
