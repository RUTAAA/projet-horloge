import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { bigFontSize } from "../valeurs_gloables";

const Jour = () => {
    const semaine = [
        "Dimanche",
        "Lundi",
        "Mardi",
        "Mercredi",
        "Jeudi",
        "Vendredi",
    ];
    const mois = [
        "janvier",
        "février",
        "mars",
        "avril",
        "mai",
        "juin",
        "juillet",
        "août",
        "septembre",
        "octobre",
        "novembre",
        "décembre",
    ];
    const [jour, setJour] = useState(
        semaine[new Date().getDay()] +
            " " +
            new Date().getDate() +
            " " +
            mois[new Date().getMonth()] +
            " " +
            new Date().getFullYear()
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setJour(
                semaine[new Date().getDay()] +
                    " " +
                    new Date().getDate() +
                    " " +
                    mois[new Date().getMonth()] +
                    " " +
                    new Date().getFullYear()
            );
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.texte}>{jour}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
    },
    texte: {
        fontSize: bigFontSize,
    },
});

export default Jour;
