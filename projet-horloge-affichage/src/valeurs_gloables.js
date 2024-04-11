import React, { useState, useEffect, createContext } from "react";


export const IDUtilisateur = 1;
export const clefAPI =
    "cehb78icef2as5tlcqs6vryfpbvmdndbme72j8daubjdj9nvfzi4dv0flf";
/*
export const IDUtilisateur = 8;
export const clefAPI =
    "hqbmqzpbw1dzgum7cbeo4zt1tla41tzgplpvywkd745fmwl6lwrt9cg3by";
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
            response = await fetch(
                `http://10.4.4.4:5000/configuration/${IDUtilisateur}`,
                {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                        "API-Key": clefAPI,
                    },
                }
            ).then((res) => {
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
        console.log(configuration);
    }, [configuration]);

    return [configuration, periodes, evenements];
}
