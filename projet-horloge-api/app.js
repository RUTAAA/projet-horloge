const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({ origin: "*" }));
app.listen(port, () => console.log(`listening here: http://localhost:${port}`));

const connection = mysql.createConnection({
    host: "mysql-projethorloge.alwaysdata.net",
    //user: "344916_read",
    user: "344916",
    password: "stjolorient",
    database: "projethorloge_euhlucasilestgreugreugneugneu",
    port: 3306,
});

function taboule(res, query) {
    connection.query(query, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200);
            res.send(result);
        }
    });
}
// UTILISATEURS

// get utilisateur by email
app.get("/utilisateurs/exists/:email", (req, res) => {
    const { email } = req.params;
    const query = "SELECT * FROM utilisateurs WHERE email='" + email + "'";
    taboule(res, query);
});

// add utilisateur
app.post("/utilisateurs/new", (req, res) => {
    const value = req.body;
    const query =
        "INSERT INTO `t_utilisateur`(`nom`, `prénom`, `adresse_mail`, `numéro_téléphone`, `nom_utilisateur`, `mot_de_passe`) VALUES ('" +
        value.nom +
        "','" +
        value.prenom +
        "','" +
        value.adresse +
        "','" +
        value.telephone +
        "','" +
        value.utilisateur +
        "','" +
        value.motDePasse +
        "')";
    taboule(res, query);
});

// STATIONS

// add station
app.get("/stations/new/:id_utilisateur", (req, res) => {
    const { id_utilisateur } = req.params;
    const query =
        "INSERT INTO `stations` (`id`, `id_horloge`, `id_utilisateur`) VALUES (NULL, NULL, '" +
        id_utilisateur +
        "')";
    taboule(res, query);
});

// CONFIGURATIONS

// get configuration by id_utilisateur
app.get("/configuration/:id_utilisateur", (req, res) => {
    const { id_utilisateur } = req.params;
    const query =
        "SELECT periodes.nom, periodes.debut, periodes.duree, periodes.couleur, 'periode' as type FROM periodes JOIN stations ON periodes.id_configuration = stations.id_configuration AND stations.id_utilisateur = " +
        id_utilisateur +
        " UNION SELECT evenements.nom, evenements.debut, evenements.duree, evenements.couleur, 'evenement' as type FROM evenements WHERE evenements.id_utilisateur = " +
        id_utilisateur +
        " ORDER BY debut ASC";
    taboule(res, query);
});
