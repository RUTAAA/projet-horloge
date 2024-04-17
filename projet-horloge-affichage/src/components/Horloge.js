import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import PieChart from "react-native-pie-chart";
import { tailleHorloge, Donnees } from "../valeurs_gloables";
import { Buffer } from "buffer";
import SVGComponent from "./SVGComponent";
import { constrainedMemory } from "process";

const padding = 50;
const tailleLabel = tailleHorloge * 0.075;
const horlogePeriodesTaille = tailleHorloge;
const horlogeEvenementsTaille = horlogePeriodesTaille * 0.9;
const horlogePeriodesTrouTaille = 0.2;
const horlogeEvenementsTrouTaille = 0.2 / 0.9;
const horlogePeriodesTrouCouleur = "#ffffff";
const horlogeEvenementsTrouCouleur = "#ffffff00";
const horlogePeriodesOpacite = 0.5;
const horlogeEvenementsOpacite = 1;

function Horloge() {
    const [rotation, setRotation] = useState({
        deg: (new Date().getHours() * 60 + new Date().getMinutes()) / 4,
    });
    const [configuration, periodes, evenements] = Donnees();
    const [dureesPeriodes, setDureesPeriodes] = useState([1]);
    const [couleursPeriodes, setCouleursPeriodes] = useState(["transparent"]);
    const [dureesEvenements, setDureesEvenements] = useState([1]);
    const [couleursEvenements, setCouleursEvenements] = useState([
        "transparent",
    ]);
    const [strokeEvenements, setStrokeEvenements] = useState([]);
    const [strokeWidthEvenements, setStrokeWidthEvenements] = useState([]);

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

    const getPictogramme = (idPictogramme) => {
        return '<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M20,11H10c-2.206,0-4,1.794-4,4v4c0,2.757,2.243,5,5,5h8c2.757,0,5-2.243,5-5v-4c0-2.206-1.794-4-4-4Zm-1,5c0,2.206-1.794,4-4,4s-4-1.794-4-4v-1c0-.553,.448-1,1-1s1,.447,1,1v1c0,1.103,.897,2,2,2s2-.897,2-2v-1c0-.553,.448-1,1-1s1,.447,1,1v1Zm0-7c0-2.206-1.794-4-4-4h-1v-.5c0-2.481-2.019-4.5-4.5-4.5S5,2.019,5,4.5v.5h-1C1.794,5,0,6.794,0,9v5c0,2.414,1.721,4.435,4,4.899v-3.899c0-3.309,2.691-6,6-6h9ZM7,4.5c0-1.379,1.122-2.5,2.5-2.5s2.5,1.121,2.5,2.5v.5H7v-.5Z"/></svg>';

        /* if (idPictogramme == null || pictogrammes === undefined) {
            console.log("test");
            return "";
        } */
        /* if (idPictogramme == null) {
            console.log("testa");
            return "<svg></svg>";
        }
        pictogrammes.forEach((pictogramme) => {
            if (pictogramme.id == idPictogramme) {
                console.log("testb");
                //return pictogramme.image;
                return '<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M20,11H10c-2.206,0-4,1.794-4,4v4c0,2.757,2.243,5,5,5h8c2.757,0,5-2.243,5-5v-4c0-2.206-1.794-4-4-4Zm-1,5c0,2.206-1.794,4-4,4s-4-1.794-4-4v-1c0-.553,.448-1,1-1s1,.447,1,1v1c0,1.103,.897,2,2,2s2-.897,2-2v-1c0-.553,.448-1,1-1s1,.447,1,1v1Zm0-7c0-2.206-1.794-4-4-4h-1v-.5c0-2.481-2.019-4.5-4.5-4.5S5,2.019,5,4.5v.5h-1C1.794,5,0,6.794,0,9v5c0,2.414,1.721,4.435,4,4.899v-3.899c0-3.309,2.691-6,6-6h9ZM7,4.5c0-1.379,1.122-2.5,2.5-2.5s2.5,1.121,2.5,2.5v.5H7v-.5Z"/></svg>';
            }
        }); */
    };

    const getPeriodes = async (periodes, evenements) => {
        var tempDureesPeriodes = [];
        var tempCouleursPeriodes = [];
        periodes.forEach((element) => {
            tempDureesPeriodes.push(element.duree);
            tempCouleursPeriodes.push(element.couleur);
        });

        var tempDureesEvenements = [];
        var tempCouleursEvenements = [];
        var tempStrokeEvenements = [];
        var tempStrokeWidthEvenements = [];
        var x = 0;
        evenements.forEach((element) => {
            if (element.debut >= x) {
                tempDureesEvenements.push(element.debut - x);
                tempCouleursEvenements.push("transparent");
                tempStrokeWidthEvenements.push(0);
                tempStrokeEvenements.push("transparent");
                x = element.debut + element.duree;
            }
            tempDureesEvenements.push(element.duree);
            tempCouleursEvenements.push(element.couleur);
            tempStrokeWidthEvenements.push(3);
            tempStrokeEvenements.push("black");
        });
        if (x < 1440) {
            tempDureesEvenements.push(1440 - x);
            tempCouleursEvenements.push("transparent");
        }

        if (
            tempDureesPeriodes.length != 0 &&
            tempCouleursPeriodes.length != 0
        ) {
            setDureesPeriodes(tempDureesPeriodes);
            setCouleursPeriodes(tempCouleursPeriodes);
        }
        if (
            tempDureesEvenements.length != 0 &&
            tempCouleursEvenements.length != 0 &&
            tempStrokeEvenements.length != 0 &&
            tempStrokeWidthEvenements.length != 0
        ) {
            setDureesEvenements(tempDureesEvenements);
            setCouleursEvenements(tempCouleursEvenements);
            setStrokeEvenements(tempStrokeEvenements);
            setStrokeWidthEvenements(tempStrokeWidthEvenements);
        }
    };

    useEffect(() => {
        getPeriodes(periodes, evenements);
        getPictogrammes();
        setRotation({
            deg: (new Date().getHours() * 60 + new Date().getMinutes()) / 4,
        });
    }, [configuration]);

    return (
        <View style={styles.container}>
            <PieChart
                widthAndHeight={horlogePeriodesTaille}
                coverRadius={horlogePeriodesTrouTaille}
                coverFill={horlogePeriodesTrouCouleur}
                style={{ opacity: horlogePeriodesOpacite }}
                series={dureesPeriodes}
                sliceColor={couleursPeriodes}
            ></PieChart>
            <PieChart
                widthAndHeight={horlogeEvenementsTaille}
                coverRadius={horlogeEvenementsTrouTaille}
                coverFill={horlogeEvenementsTrouCouleur}
                style={{
                    position: "absolute",
                    opacity: horlogeEvenementsOpacite,
                }}
                series={dureesEvenements}
                sliceColor={couleursEvenements}
                stroke={strokeEvenements}
                strokeWidth={strokeWidthEvenements}
            ></PieChart>

            <View
                style={{
                    position: "absolute",
                }}
            >
                {/* <SVGComponent
                    key={"ihbgpuofbdpougbpoug"}
                    svgString={
                        '<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M20,11H10c-2.206,0-4,1.794-4,4v4c0,2.757,2.243,5,5,5h8c2.757,0,5-2.243,5-5v-4c0-2.206-1.794-4-4-4Zm-1,5c0,2.206-1.794,4-4,4s-4-1.794-4-4v-1c0-.553,.448-1,1-1s1,.447,1,1v1c0,1.103,.897,2,2,2s2-.897,2-2v-1c0-.553,.448-1,1-1s1,.447,1,1v1Zm0-7c0-2.206-1.794-4-4-4h-1v-.5c0-2.481-2.019-4.5-4.5-4.5S5,2.019,5,4.5v.5h-1C1.794,5,0,6.794,0,9v5c0,2.414,1.721,4.435,4,4.899v-3.899c0-3.309,2.691-6,6-6h9ZM7,4.5c0-1.379,1.122-2.5,2.5-2.5s2.5,1.121,2.5,2.5v.5H7v-.5Z"/></svg>'
                    }
                /> */}
                {evenements.map((evenement) => {
                    if (evenement.pictogramme != null)
                        console.log(evenement.pictogramme);
                    console.log("evenement.pictogramme");
                    return <Text>crajvg</Text>;
                })}
            </View>

            <View
                style={[
                    styles.absoluteContainer,
                    {
                        width: tailleHorloge * 0.015,
                        transform: `rotateZ(${rotation.deg}deg)`,
                    },
                ]}
            >
                <View style={styles.aiguille} />
            </View>
            <View style={styles.absoluteContainer}>
                <Text
                    style={[
                        styles.labels,
                        {
                            left: tailleHorloge / 2 - tailleLabel / 2,
                            top: -tailleLabel,
                        },
                    ]}
                >
                    0
                </Text>
                <Text
                    style={[
                        styles.labels,
                        {
                            left: tailleHorloge - tailleLabel * 2,
                            top: tailleLabel,
                        },
                    ]}
                >
                    3
                </Text>
                <Text
                    style={[
                        styles.labels,
                        {
                            left: tailleHorloge,
                            top: tailleHorloge / 2 - tailleLabel / 2,
                        },
                    ]}
                >
                    6
                </Text>
                <Text
                    style={[
                        styles.labels,
                        {
                            left: tailleHorloge - tailleLabel * 2,
                            top: tailleHorloge - tailleLabel * 2,
                        },
                    ]}
                >
                    9
                </Text>
                <Text
                    style={[
                        styles.labels,
                        {
                            left: tailleHorloge / 2 - tailleLabel / 2,
                            top: tailleHorloge,
                        },
                    ]}
                >
                    12
                </Text>
                <Text
                    style={[
                        styles.labels,
                        {
                            left: tailleLabel,
                            top: tailleHorloge - tailleLabel * 2,
                        },
                    ]}
                >
                    15
                </Text>
                <Text
                    style={[
                        styles.labels,
                        {
                            left: -tailleLabel,
                            top: tailleHorloge / 2 - tailleLabel / 2,
                        },
                    ]}
                >
                    18
                </Text>
                <Text
                    style={[
                        styles.labels,
                        {
                            left: tailleLabel,
                            top: tailleLabel,
                        },
                    ]}
                >
                    21
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: padding,
    },
    absoluteContainer: {
        height: tailleHorloge,
        width: tailleHorloge,
        position: "absolute",
        backgroundColor: "transparent",
    },
    aiguille: {
        top: "2%",
        height: "43%",
        width: "100%",
        backgroundColor: "black",
    },
    labels: {
        width: tailleLabel,
        height: tailleLabel,
        position: "absolute",
        textAlign: "center",
        fontSize: tailleLabel * 0.7,
        lineHeight: tailleLabel,
    },
});

export default Horloge;
