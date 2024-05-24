import React, { useState, useEffect } from "react";

export default function App() {
    const [pictogrammes, setPictogrammes] = useState([]);

    const getPictogrammes = async () => {
        var response = [""];
        try {
            response = await fetch(`http://10.4.4.4:5000/pictogrammes`, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((res) => {
                return res.json();
            });
        } catch (error) {
            //console.error(error);
        } finally {
            // PAS FINI ICI

            response.forEach((pictogramme) => {
                pictogramme.image.toString();
            });

            setPictogrammes(response);
        }
    };

    getPictogrammes();
    useEffect(() => {
        console.log(pictogrammes);
    }, [pictogrammes]);

    return <></>;
}
