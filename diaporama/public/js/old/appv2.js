// IMPORTS

const fs = require("fs");

// VARIABLES GLOBALES

const IPAPI = "10.4.4.4";
const portAPI = 5000;
const IDUtilisateur = 8;
const clefAPI = "hqbmqzpbw1dzgum7cbeo4zt1tla41tzgplpvywkd745fmwl6lwrt9cg3by";

temps_image = 300000; // Change après 30 secondes
temps_veille = 6000000; // Arrêter après 10 minute

// FONCTIONS

// Fonction pour aller chercher les medias dans la BDD
async function getMediasFromDB() {
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
            // Reponse API mis en json
        ).then((res) => {
            return res.json();
        });
    } catch (error) {
        console.error(error);
    } finally {
        let legendes = [];
        let medias = [];
        response.forEach((element) => {
            legendes.push(element.legende);
            medias.push(element.photo);
        });
        console.log([legendes, medias]);
        // Lancer le diaporama avec les images récupérées
        lancerDiaporama(legendes, medias);
    }
}

// Fonction pour lancer le diaporama
function lancerDiaporama(legendes, medias) {
    let index = 0;

    // Afficher la première image
    afficherImage(legendes[index], medias[index]);

    // Définir l'intervalle pour changer les images (toutes les 5 secondes dans cet exemple)
    const intervalID = setInterval(() => {
        // Passer à l'image suivante
        index = (index + 1) % medias.length;
        // Afficher l'image suivante
        afficherImage(legendes[index], medias[index]);
    }, temps_image);

    // Arrêter le diaporama après un certain temps (par exemple, 1 minute)
    setTimeout(() => {
        clearInterval(intervalID); // Arrêter l'intervalle
        console.log("Diaporama arrêté après 1 minute.");
    }, temps_veille);
}

// Fonction pour afficher une image
function afficherImage(legende, media) {
    // Ici, vous pouvez afficher l'image comme vous le souhaitez
    console.log(`Légende : ${legende}`);
    console.log(`Image : ${media}`);
}

// SCRIPT

getMediasFromDB();

//10.0.19.7
