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

app.get("/enregister_station/:id_utilisateur", (req, res) => {
    const { id_utilisateur } = req.params;
    const query =
        "INSERT INTO `stations` (`id`, `id_horloge`, `id_utilisateur`) VALUES (NULL, NULL, '" +
        id_utilisateur +
        "')";
    taboule(res, query);
});

app.get("/configuration/:id_utilisateur", (req, res) => {
    const { id_utilisateur } = req.params;
    const query =
        "SELECT periodes.nom, periodes.debut, periodes.duree, periodes.couleur, 'periode' as type FROM periodes JOIN stations ON periodes.id_configuration = stations.id_configuration AND stations.id_utilisateur = " +
        id_utilisateur +
        " UNION SELECT evenements.nom, evenements.debut, evenements.duree, evenements.couleur, 'evenement' as type FROM evenements WHERE evenements.id_utilisateur = " +
        id_utilisateur;
    taboule(res, query);
});

app.get("/utilisateurs/exists/:email", (req, res) => {
    const { email } = req.params;
    const query =
        "SELECT COUNT(email) AS 'nombre' FROM utilisateurs WHERE email='" +
        email +
        "'";
    taboule(res, query);
});
