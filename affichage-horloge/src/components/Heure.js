import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { tailleHorloge } from "../valeurs_gloables";

const Heure = () => {
    const [heure, setHeure] = useState("");

    function getHeure() {
        var h = new Date().getHours() + "h";
        var m = new Date().getMinutes();
        m = m.toString();
        if (m.length == 1) {
            h += "0" + m.slice(0);
        } else {
            h += m;
        }
        return h;
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            setHeure(getHeure());
        }, 1000);
        return () => clearInterval(intervalId); //This is important
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.texte}>{heure}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
    },
    texte: {
        fontSize: tailleHorloge * 0.15,
        fontFamily: "RubikMonoOne",
    },
});

export default Heure;
