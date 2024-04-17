// IMPORTS

const fs = require("fs");

// VARIABLES GLOBALES

const IPAPI = "10.0.200.57";
const portAPI = 5000;
const IDUtilisateur = 8;
const clefAPI = "hqbmqzpbw1dzgum7cbeo4zt1tla41tzgplpvywkd745fmwl6lwrt9cg3by";

// FONCTIONS

// fonction pour aller cherhcher les medias
async function getMedias() {
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
    }
}

// fonction pour afficher l'image
function afficherImage() {
    // Lisez le contenu de l'image depuis le fichier
    fs.readFile("/home/admineleve/Desktop/images/matin.jpeg", (err, data) => {
        if (err) {
            console.error("Erreur de lecture du fichier :", err);
            return;
        }
        // Affichez les données de l'image (c'est-à-dire affichez l'image)
        console.log(data);
    });
}

// SCRIPT

//afficherImage();
getMedias();
