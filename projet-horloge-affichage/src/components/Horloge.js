import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import PieChart from "react-native-pie-chart";
import { tailleHorloge, Donnees } from "../valeurs_gloables";

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
    const [couleursEvenements, setCouleursEvenements] = useState(["transparent"]);
    const [strokeEvenements, setStrokeEvenements] = useState([]);
    const [strokeWidthEvenements, setStrokeWidthEvenements] = useState([]);

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

        if (tempDureesPeriodes.length != 0 && tempCouleursPeriodes.length != 0) {
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
                style={{ position: "absolute", opacity: horlogeEvenementsOpacite }}
                series={dureesEvenements}
                sliceColor={couleursEvenements}
                stroke={strokeEvenements}
                strokeWidth={strokeWidthEvenements}
            ></PieChart>

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
