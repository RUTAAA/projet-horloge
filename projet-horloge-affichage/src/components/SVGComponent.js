import React from "react";

function SVGComponent({ svgString }) {
    return <div dangerouslySetInnerHTML={{ __html: svgString }} />;
}

export default SVGComponent;
