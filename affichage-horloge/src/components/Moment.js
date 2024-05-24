import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { bigFontSize, Donnees } from "../valeurs_gloables";

const Moment = () => {
    const [configuration, periodes, evenements] = Donnees();
    const [periodeActuelle, setPeriodeActuelle] = useState();

    function trouverMoment(array) {
        if (array === undefined) {
            return;
        }
        let now = new Date().getHours() * 60 + new Date().getMinutes();
        for (let i = 0; i < array.length; i++) {
            if (array[i].debut <= now && now <= array[i].debut + array[i].duree) {
                return i;
            }
        }
    }

    function formaterNom(nom) {
        if (nom === undefined) {
            return;
        } else {
            return (nom.charAt(0).toUpperCase() + nom.slice(1)).replace("_", " ");
        }
    }

    useEffect(() => {
        setPeriodeActuelle(trouverMoment(periodes));
    }, [configuration]);

    return (
        <View style={styles.container}>
            <Text style={styles.periode}>
                {formaterNom(
                    periodeActuelle === undefined || periodes === undefined
                        ? ""
                        : periodes[periodeActuelle].nom
                )}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
    },
    periode: {
        fontSize: bigFontSize * 1.5,
        fontWeight: "bold",
    },
});

export default Moment;
