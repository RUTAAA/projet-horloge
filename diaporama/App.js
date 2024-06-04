import { StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image } from "react-native";
import { Buffer } from "buffer";

const IPAPI = "10.4.4.4";
const portAPI = 5000;
const IDUtilisateur = 8;
const clefAPI = "hse4o46fgthl7ieos0uwxbxtzgsjg4juk17vjdkeu674hxwar1fiy9a8";

export default function App() {
    const [medias, setMedias] = useState([]);
    const [images, setImages] = useState([]);
    const [opacities, setOpacities] = useState([]);
    const [currentImage, setCurrentImage] = useState(0);

    // fonction pour aller chercher les medias
    const getMedias = async () => {
        try {
            response = await fetch(
                `http://${IPAPI}:${portAPI}/medias/${IDUtilisateur}`,
                {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                        "API-Key": clefAPI,
                    },
                }
            ).then((res) => {
                return res.json();
            });
        } catch (error) {
            console.error(error);
            return;
        } finally {
            response.forEach((media) => {
                media.photo = bufferToBase64(media.photo);
            });
            setMedias(response);
        }
    };

    // Fonction pour convertir le buffer en URL base64
    const bufferToBase64 = (buffer) => {
        return (
            "data:image/png;base64," + Buffer.from(buffer).toString("base64")
        );
    };

    // Pour faire la liste d'images en React
    const updateImages = async () => {
        await getMedias();
        if (medias !== undefined) {
            var tempOpacities = new Array(medias.length).fill(0);
            tempOpacities[currentImage] = 1;
            setOpacities(tempOpacities);

            var tempImages = [];
            for (let i = 0; i < opacities.length; i++) {
                tempImages.push(
                    <Image
                        key={medias[i].id}
                        style={[styles.photos, { opacity: opacities[i] }]}
                        source={medias[i].photo}
                    />
                );
            }
            setImages(tempImages);
        }
    };

    // Applique le CSS aux images pour positionner la currentImage
    const applyCurrentImage = async () => {
        await updateImages();
        if (opacities.length != 0) {
            currentImage < images.length - 1
                ? setCurrentImage(currentImage + 1)
                : setCurrentImage(0);
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            applyCurrentImage();
        }, 5000);
        return () => clearInterval(intervalId); //This is important
    }, [medias]);

    return <View style={styles.container}>{images}</View>;
}

const styles = StyleSheet.create({
    container: {
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
    },
    photos: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        maxHeight: "100vh",
        aspectRatio: 1,
        transition: "1s ease",
    },
});
