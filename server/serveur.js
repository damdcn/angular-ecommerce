const express = require('express');
const app = express();
const jwt = require("jsonwebtoken");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Gestion des CORS
app.use(function (req, res, next) {
    res.setHeader('Content-type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});
//app.use(require("cors")); // (méthode alternative de gestion des CORS)
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectId;
const url = "mongodb://localhost:27017";
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    let db = client.db("ECOMMERCE");
    /* Liste des produits */
    app.get("/produits/search", (req, res) => {
        console.log("/produits/search");
        try {
            db.collection("produits").find().toArray((err, documents) => {
                res.end(JSON.stringify(documents));
            });
        } catch (e) {
            console.log("Erreur sur /produits/search : " + e);
            res.end(JSON.stringify([]));
        }
    });

    app.get("/produits/search/:filtervalue", (req, res) => {
        console.log("/produits/search  " + req.params.filtervalue);
        let item = req.params.filtervalue;
        try {
            db.collection("produits").find({ "name": { $regex: '.*' + item + '*.' } }).toArray((err, documents) => {
                res.end(JSON.stringify(documents));
            });
        } catch (e) {
            console.log("Erreur sur /produits/search/:filtervalue : " + e);
            res.end(JSON.stringify([]));
        }
    });

    app.get("/produits/searchid/:filtervalue", (req, res) => {
        console.log("/produits/searchid  " + req.params.filtervalue);
        let item = req.params.filtervalue;
        try {
            var ObjectId = require('mongodb').ObjectID;
            db.collection("produits").find({ "_id": ObjectId(item) }).toArray((err, documents) => {
                res.end(JSON.stringify(documents));
            });
        } catch (e) {
            console.log("Erreur sur /produits/searchid/:filtervalue : " + e);
            res.end(JSON.stringify([]));
        }
    });


    app.get("/cart/:user", (req, res) => {
        try {
            db.collection("panier").find({ "email": req.params.user }).toArray((err, documents) => {
                res.end(JSON.stringify(documents));
            });
        } catch (e) {
            console.log("Erreur sur /cart : " + e);
            res.end(JSON.stringify([]));
        }
    });

    app.post("/cart", (req, res) => {
        console.log("/cart avec " + JSON.stringify(req.body));
        item = req.body;
        try {
            //ajoute un element si n'existe pas et incremente la quantité si existe
            if (req.body.product.nom != undefined) {
                db.collection("panier").updateOne({ "email": item.user }, { $push: { "panier": { "nom": item.product.nom, "qty": 1, "prix": parseInt(item.product.price) } } });
                //db.collection("panier").insertOne({ "nom": req.body.product.nom, "qty": 1, "prix": parseInt(req.body.product.prix) });
                res.end(JSON.stringify(
                    {
                        "nom": item.nom,
                        "prix": item.prix,
                        "message": "ajout de produit effectué"
                    }));

            }
            else {
                db.collection("panier").updateOne({ "email": item.user }, { $push: { "panier": { "nom": item.product.name, "qty": 1, "prix": parseInt(item.product.price) } } });
                //db.collection("panier").insertOne({ "nom": req.body.product.name, "qty": 1, "prix": parseInt(req.body.product.price) });
                res.end(JSON.stringify(
                    {
                        "nom": item.product.name,
                        "prix": item.product.price,
                        "message": "ajout de produit effectué"
                    }));
            }
        } catch (e) {
            res.end(JSON.stringify({ "message": "problème sur l'ajout de produits : " + e }));
            console.log(e);
        }

    });
    app.post("/cart/remove", (req, res) => {
        console.log("/cart/remove avec " + JSON.stringify(req.body));
        item = req.body;
        try {
            db.collection("panier").deleteOne({ "email": item.user }, { $pull: { "panier": { "nom": item.product.nom, "qty": 1, "prix": parseInt(item.product.price) } } });
            //db.collection("panier").deleteOne({ "nom": req.body.product.nom, "qty": 1, "prix": parseInt(req.body.product.prix) });
            res.end(JSON.stringify(
                {
                    "nom": item.nom,
                    "prix": item.prix,
                    "message": "delete de produit effectué"
                }));

        } catch (e) {
            res.end(JSON.stringify({ "message": "problème sur la suppression de produits : " + e }));
            console.log(e);
        }
    });

    app.post("/cart/clear", (req, res) => {
        console.log("/cart/clear de " + JSON.stringify(req.body.user));
        user = req.body.user;
        try {
            db.collection("panier").updateOne({"email": user}, {"$set": {"panier": []}})
            res.end(JSON.stringify(
                {
                    "message": "clear de panier effectué"
                }));

        } catch (e) {
            res.end(JSON.stringify({ "message": "problème sur le clear de panier : " + e }));
            console.log(e);
        }
    });

    app.get("/categories", (req,res) => {
        console.log("/categories");
        categories = [];
        try {
            db.collection("produits").find().toArray((err, documents) => {
            for (let doc of documents) {
                if (!categories.includes(doc.type)) categories.push(doc.type); 
            }
            res.end(JSON.stringify(categories));
            });
        } catch(e) {
            console.log("Erreur sur /categories : " + e);
            res.end(JSON.stringify([]));
        }
    });

    /* Connexion */
    app.post("/membre/connexion", (req, res) => {
        try {
            db.collection("membres")
                .find(req.body)
                .toArray((err, documents) => {
                    if (documents != undefined && documents.length == 1) {
                        //res.end(JSON.stringify({"resultat": 1, "message": "Authentification réussie"}));
                        const payload = {
                            email: req.body.email,
                            password: req.body.password
                        }; // Create JWT Payload

                        // Sign Token
                        jwt.sign(
                            payload,
                            'SECRET-KEY',
                            { expiresIn: 60 * 5 },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    expiresIn: 60 * 5,
                                    token: "Bearer " + token
                                });
                            }
                        );
                    } else res.end(JSON.stringify({ "resultat": 0, "message": "Email et/ou mot de passe incorrect" }));
                });
        } catch (e) {
            res.end(JSON.stringify({ "resultat": 0, "message": e }));
        }
    });
    /* Inscription */
    app.post("/membre/inscription", (req, res) => {
        user = req.body;
        console.log("/inscription de "+user.email)
        try {
            db.collection("membres").insertOne(user);
            db.collection("panier").insertOne({ "email": user.email, "panier": [] });
            res.end(JSON.stringify({ "resultat": 1, "message": "Inscription réalisé avec succès !" }));
        } catch (e) {
            res.end(JSON.stringify({ "resultat": 0, "message": e }));
        }
    });
});
app.listen(8889);
