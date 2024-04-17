// VARIABLES GLOBALES

const IPAPI = "10.4.4.4";
const portAPI = 5000;
const IDUtilisateur = 8;
const clefAPI = "hqbmqzpbw1dzgum7cbeo4zt1tla41tzgplpvywkd745fmwl6lwrt9cg3by";

// FONCTIONS

// fonction pour aller cherhcher les medias
async function getMedias() {
    try {
        const response = await fetch(
            `http://${IPAPI}:${portAPI}/medias/${IDUtilisateur}`,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "API-Key": clefAPI,
                },
            }
        );
        console.log("Réponse brute de l'API :", response); // Ajoutez cette ligne
        // Reponse API mis en json
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    } finally { // a enlever à la fin (test)
        let legendes = [];
        let medias = [];
        response.forEach((element) => {
            legendes.push(element.legende);
            medias.push(element.photo);
        });
        console.log([legendes, medias]);
    }
}

// Fonction pour convertir le buffer en URL base64
function bufferToBase64(buffer) {
    return Buffer.from(buffer).toString('base64');
}

// Fonction pour afficher l'image
async function afficherImage() {
    try {
        const medias = await getMedias();

        // Si des médias sont trouvés
        if (medias.length > 0) {
            // Prendre le premier média (ici, j'utilise seulement le premier)
            const premierMedia = medias[0];

            // Convertir le buffer de l'image en URL base64
            const imageURL = `data:image/jpeg;base64,${bufferToBase64(premierMedia.buffer)}`;

            // Créer un élément image
            const imageElement = document.createElement('img');

            // Définir l'URL de l'image
            imageElement.src = imageURL;

            // Définir la taille de l'image (par exemple, la moitié de la largeur de l'écran)
            imageElement.style.width = "50vw"; // 50% de la largeur de l'écran
            imageElement.style.height = "auto"; // Hauteur ajustée proportionnellement

            // Ajouter l'élément image au DOM pour l'afficher
            document.body.appendChild(imageElement);
        } else {
            console.log("Aucun média trouvé.");
        }
    } catch (error) {
        console.error(error);
    }
}

afficherImage();
//getMedias();
