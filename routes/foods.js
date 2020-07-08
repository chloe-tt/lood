const express = require('express');
const router = express.Router();
const connection = require("../config");

//1. Lister tous les plats
router.get('/', (req,res) => {
    connection.query('SELECT * FROM food', (err, results) => {
        if(err) {
            res.status(500).send('Erreur lors de la récupération de tous les plats');
        };
        res.json(results);
    });
});

//2. Afficher un plat
router.get('/:id', (req, res) => {
    const idFood = req.params.id
    connection.query("SELECT * FROM food WHERE idfood = ?", [idFood], (err, results) => {
      if (err) {
        console.log(err);
        res.status(404).send("Erreur lors de l'affichage du plat");
      } else {
        res.status(200).json(results);
      }
    })
});


//3. Envoyer si l'utilisateur aime un plat ou non (création jointure)
router.post('/:idFood/:idUser', (req, res) => {
    const { idFood, idUser } = req.params;
    connection.query('INSERT INTO fooduser (id_user, id_food) VALUES(?, ?)', [idUser, idFood], (err, results) => {
        if (err) {
            res.status(500).json("Erreur lors de la création de jointure d'un plat avec un utilisateur");
          } else {
            res.sendStatus(200);
          };
    });
});

// 4. Lister les utilisateurs qui aiment le même plat
router.get('/:id/users', (req, res) => {
    const {id} = req.params;
    connection.query('SELECT * FROM food AS f JOIN fooduser AS fu ON f.id = fu.id_food JOIN user AS u ON fu.id_user = u.id WHERE f.id = ?',  [id], (err, results) => {
        if (err) {
            console.log(err);
            res.status(404).send("Erreur lors de l'affichage des utilisateurs qui aiment le même plat");
          } else {
            res.status(200).json(results);
          };
    });
});

module.exports = router;