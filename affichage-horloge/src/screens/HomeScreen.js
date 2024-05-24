import React from "react";
import { StyleSheet, View } from "react-native";

import Test from "../components/Test";
import Horloge from "../components/Horloge";
import Moment from "../components/Moment";
import Jour from "../components/Jour";
import Heure from "../components/Heure";
import ListeEvenements from "../components/ListeEvenements";

const HomeScreen = () => {
    return (
        <>
            {/* <Test /> */}
            <View style={styles.left}>
                <Horloge />
            </View>
            <View style={styles.right}>
                <Jour />
                <Heure />
                <Moment />
                <ListeEvenements />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    left: {
        width: "60%",
        alignSelf: "center",
        justifyContent: "center",
    },
    right: {
        alignItems: "center",
        justifyContent: "center",
    },
});

export default HomeScreen;
