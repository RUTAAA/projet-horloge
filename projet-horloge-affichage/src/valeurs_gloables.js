import React, { useState, useEffect, createContext } from "react";

export const IDUtilisateur = 1;
export const clefAPI = "";
export const tailleHorloge = 800;
export const bigFontSize = tailleHorloge * 0.05;

export function Donnees() {
    const [configuration, setConfiguration] = useState([]);
    const [periodes, setPeriodes] = useState([]);
    const [evenements, setEvenements] = useState([]);

    const getConfiguration = async () => {
        var response = [""];
        try {
            response = await (
                await fetch(`http://10.0.200.35:5000/configuration/${IDUtilisateur}`)
            ).json();
        } catch (error) {
            //console.error(error);
        } finally {
            let tempPeriodes = [];
            let tempEvenements = [];
            response.forEach((element) => {
                if (element.type == "periode") {
                    tempPeriodes.push(element);
                } else {
                    tempEvenements.push(element);
                }
            });

            setConfiguration(response);
            setPeriodes(tempPeriodes);
            setEvenements(tempEvenements);
        }
    };

    useEffect(() => {
        getConfiguration();
    }, [configuration]);

    return [configuration, periodes, evenements];
}
