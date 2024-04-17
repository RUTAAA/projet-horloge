import { StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { Buffer } from "buffer";

import SVGComponent from "./SVGComponent";

Logo =
    '<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M20,11H10c-2.206,0-4,1.794-4,4v4c0,2.757,2.243,5,5,5h8c2.757,0,5-2.243,5-5v-4c0-2.206-1.794-4-4-4Zm-1,5c0,2.206-1.794,4-4,4s-4-1.794-4-4v-1c0-.553,.448-1,1-1s1,.447,1,1v1c0,1.103,.897,2,2,2s2-.897,2-2v-1c0-.553,.448-1,1-1s1,.447,1,1v1Zm0-7c0-2.206-1.794-4-4-4h-1v-.5c0-2.481-2.019-4.5-4.5-4.5S5,2.019,5,4.5v.5h-1C1.794,5,0,6.794,0,9v5c0,2.414,1.721,4.435,4,4.899v-3.899c0-3.309,2.691-6,6-6h9ZM7,4.5c0-1.379,1.122-2.5,2.5-2.5s2.5,1.121,2.5,2.5v.5H7v-.5Z"/></svg>';

function Test() {
    const [pictogrammes, setPictogrammes] = useState();

    const getPictogrammes = async () => {
        var response = [""];
        try {
            response = await fetch(`http://10.4.4.4:5000/pictogrammes`, {
                method: "GET",
                mode: "cors",
            }).then((res) => {
                return res.json();
            });
        } catch (error) {
            //console.error(error);
        } finally {
            response.forEach((pictogramme) => {
                pictogramme.image = Buffer.from(pictogramme.image)
                    .toString()
                    .split("?>")[1];
            });
            setPictogrammes(response);
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            getPictogrammes();
        }, 1000);
        return () => clearInterval(intervalId);
    }, [pictogrammes]);

    return (
        <div>
            <SVGComponent
                svgString={
                    pictogrammes === undefined ? null : pictogrammes[0].image
                }
            />
        </div>
    );
}

const styles = StyleSheet.create({});

export default Test;
