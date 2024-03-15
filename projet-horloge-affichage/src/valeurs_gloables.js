import React, { useState, useEffect, createContext } from "react";

export const IDUtilisateur = 1;
export const clefAPI = "cn9p5v1j0h7wmfi7dyenz3v2rdzr30l6lug5qk1rq25jq9mucmdwvw5sbm7m";
/* 
export const IDUtilisateur = 4;
export const clefAPI =
    "zz3fc0b6ka69tug804l2h7ubh814jrbrxa6e62bh5kteyw4wvf72gz5uf15osiraii8v";
 */
export const tailleHorloge = 800;
export const bigFontSize = tailleHorloge * 0.05;

export function Donnees() {
    const [configuration, setConfiguration] = useState([]);
    const [periodes, setPeriodes] = useState([]);
    const [evenements, setEvenements] = useState([]);

    const getConfiguration = async () => {
        var response = [""];
        try {
            response = await fetch(`http://10.0.200.35:5000/configuration/${IDUtilisateur}`, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "API-Key": clefAPI,
                },
            }).then((res) => {
                return res.json();
            });
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
