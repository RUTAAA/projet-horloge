import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import PieChart from "react-native-pie-chart";
import { tailleHorloge, Donnees } from "../valeurs_gloables";
import { Buffer } from "buffer";
import { posix } from "path";

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
const taillePictogrammes = 50;

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
                response[i].image =
                    "<svg " +
                    'height="' +
                    taillePictogrammes +
                    'px" width="' +
                    taillePictogrammes +
                    'px" fill="black" stroke="white"' +
                    Buffer.from(response[i].image).toString().split("<svg")[1];
            }

            setPictogrammes(response);
        }
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
            if (element.debut > x) {
                tempDureesEvenements.push(element.debut - x);
                tempCouleursEvenements.push("transparent");
                tempStrokeWidthEvenements.push(0);
                tempStrokeEvenements.push("transparent");
            }
            tempDureesEvenements.push(element.duree);
            tempCouleursEvenements.push(element.couleur);
            tempStrokeWidthEvenements.push(3);
            tempStrokeEvenements.push("black");
            x = element.debut + element.duree;
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

    function findRotation(debut, duree) {
        return ((debut + duree / 2) / (1440 / 100)) * (360 / 100);
    }

    function htmlSVG(IDPictogramme) {
        if (IDPictogramme !== null && pictogrammes !== undefined) {
            return pictogrammes.find((x) => x.id === IDPictogramme).image;
        }
        return "";
    }

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

            <FlatList
                style={styles.svgsList}
                data={evenements}
                renderItem={({ item }) => (
                    <div
                        style={{
                            position: "absolute",
                            height: tailleHorloge - tailleHorloge * 0.1,
                            left:
                                "calc(50% - " + taillePictogrammes / 2 + "px)",
                            width: taillePictogrammes + "px",
                            paddingTop: "10%",
                            backgroundColor: "transparent",
                            transform: `rotateZ(${findRotation(
                                item.debut,
                                item.duree
                            )}deg)`,
                        }}
                    >
                        <div
                            style={{
                                transform: `rotateZ(${-findRotation(
                                    item.debut,
                                    item.duree
                                )}deg)`,
                            }}
                            dangerouslySetInnerHTML={{
                                __html:
                                    item === undefined
                                        ? ""
                                        : htmlSVG(item.pictogramme),
                            }}
                        />
                    </div>
                )}
            />

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
    svgsList: {
        height: tailleHorloge,
        width: tailleHorloge,
        position: "absolute",
        backgroundColor: "transparent",
    },
});

export default Horloge;
