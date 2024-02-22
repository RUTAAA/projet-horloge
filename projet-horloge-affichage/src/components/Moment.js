import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { bigFontSize, Donnees } from "../valeurs_gloables";

const Moment = () => {
    const [configuration, periodes, evenements] = Donnees();
    const [nomsPeriodes, setNomsPeriodes] = useState([]);
    const [dureesPeriodes, setDureesPeriodes] = useState([]);
    const [periodeActuelle, setPeriodeActuelle] = useState();

    function trouverPeriode(durees) {
        let now = new Date().getHours() * 60 + new Date().getMinutes();
        let n = 0;
        for (let i = 0; i < durees.length; i++) {
            if (n <= now) {
                n += durees[i];
            } else {
                return i - 1;
            }
        }
    }

    function formaterNom(nom) {
        if (nom === undefined) {
            return;
        } else {
            return (nom.charAt(0).toUpperCase() + nom.slice(1)).replace(
                "_",
                " "
            );
        }
    }

    const getPeriodes = async (rep) => {
        var noms = [];
        var durees = [];
        rep.forEach((periode) => {
            noms.push(periode.nom);
            durees.push(periode.duree);
        });
        if (noms.length != 0 && durees.length != 0) {
            setNomsPeriodes(noms);
            setDureesPeriodes(durees);
        }
    };

    useEffect(() => {
        getPeriodes(periodes);
        setPeriodeActuelle(trouverPeriode(dureesPeriodes));
    }, [configuration]);

    return (
        <View style={styles.container}>
            <Text style={styles.texte}>
                {formaterNom(nomsPeriodes[periodeActuelle])}
            </Text>
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

export default Moment;
