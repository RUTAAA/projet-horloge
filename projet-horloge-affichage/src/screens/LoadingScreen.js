import React from "react";
import { StyleSheet, View } from "react-native";

const LoadingScreen = () => {
    return <View style={styles.chargement}></View>;
};

const styles = StyleSheet.create({
    chargement: {
        backgroundColor: "black",
    },
});

export default LoadingScreen;
