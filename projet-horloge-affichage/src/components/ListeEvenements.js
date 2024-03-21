import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { bigFontSize, Donnees } from "../valeurs_gloables";

const ListeEvenements = () => {
    const [configuration, periodes, evenements] = Donnees();
    const [evenementActuel, setEvenementActuel] = useState();
    const [evenementSuivant, setEvenementSuivant] = useState();

    function trouverMoment(array) {
        if (array === undefined) {
            return;
        }
        let now = new Date().getHours() * 60 + new Date().getMinutes();
        for (let i = 0; i < array.length; i++) {
            if (now < array[i].debut) {
                setEvenementSuivant(i);
                break;
            }
        }
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
    function formaterHeure(minutes) {
        if (minutes === undefined) {
            return;
        }
        let h = Math.floor(minutes / 60) == 0 ? "00" : Math.floor(minutes / 60);
        let m = minutes - h * 60 == 0 ? "00" : minutes - h * 60;
        return h + "H" + m;
    }

    useEffect(() => {
        setEvenementActuel(trouverMoment(evenements));
    }, [configuration]);

    return (
        <View style={styles.container}>
            <Text style={styles.actuel}>
                {formaterHeure(
                    evenementActuel === undefined || evenements === undefined
                        ? undefined
                        : evenements[evenementActuel].debut
                )}
                {evenementActuel === undefined ? "" : " - "}
                {formaterNom(
                    evenementActuel === undefined || evenements === undefined
                        ? ""
                        : evenements[evenementActuel].nom
                )}
            </Text>
            <FlatList
                data={evenements.slice(evenementSuivant, evenements.length)}
                renderItem={({ item }) => (
                    <Text style={styles.liste}>
                        {formaterHeure(item.debut)} - {formaterNom(item.nom)}
                    </Text>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
    },
    actuel: {
        fontSize: bigFontSize,
        fontWeight: "bold",
    },
    liste: {
        fontSize: bigFontSize,
    },
});

export default ListeEvenements;
