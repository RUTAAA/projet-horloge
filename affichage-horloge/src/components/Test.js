import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { Buffer } from "buffer";

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
            for (let i = 0; i < response.length; i++) {
                response[i].image = Buffer.from(response[i].image)
                    .toString()
                    .split("?>\n")[1];
            }

            setPictogrammes(response);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            getPictogrammes();
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <FlatList
            data={pictogrammes}
            renderItem={({ item }) => (
                <div
                    dangerouslySetInnerHTML={{
                        __html: item === undefined ? "" : item.image,
                    }}
                />
            )}
        />
    );
}
