const db = require('../model/db');

exports.getAllEvenimente = (req, res) =>{
    db.start.query('SELECT * FROM Evenimente', (error, results) => {
        if(error){
            console.log("Eroare getAllEvenimente" + error);
            res.send("Eroare getAllEvenimente");
        }
        else {
            res.send(results);
        }
    });
}

exports.getStartsByIdEveniment = (req, res) => {
    let id = req.params.id_eveniment;
    db.start.query('SELECT * FROM RatingsEvenimente WHERE id_e = ?', id, (error, results) => {
        if(error){
            console.log("Eroare getIdEveniment" + error);
            res.send("Eroare getIdEveniment");
        }
        if (results.length > 0 && !error) {
            res.send(results);
        } else {
            res.send("Nu exista id-ul");
        }
    });
};

exports.setRatingsByIdRestaurant = (req, res) => {
    let id_r = req.params.id_restaurant;
    let rating = req.params.rating_id;
    if (rating === "1") {
        db.start.query('UPDATE RatingsRestaurants SET rating_1 = rating_1 + 1 WHERE id_r = ?', id_r, (error, results) => {
            if (error) {
                console.log("Eroare setRatingsByIdRestaurant" + error);
                res.send("Eroare setRatingsByIdRestaurant");
            } else {
                res.send("Rating added");
            }
        });
    }
    if (rating === "2") {
        db.start.query('UPDATE RatingsRestaurants SET rating_2 = rating_2 + 1 WHERE id_r = ?', id_r, (error, results) => {
            if (error) {
                console.log("Eroare setRatingsByIdRestaurant" + error);
                res.send("Eroare setRatingsByIdRestaurant");
            } else {
                res.send("Rating added");
            }
        });
    }
    if (rating === "3") {
        db.start.query('UPDATE RatingsRestaurants SET rating_3 = rating_3 + 1 WHERE id_r = ?', id_r, (error, results) => {
            if (error) {
                console.log("Eroare setRatingsByIdRestaurant" + error);
                res.send("Eroare setRatingsByIdRestaurant");
            } else {
                res.send("Rating added");
            }
        });
    }
    if (rating === "4") {
        db.start.query('UPDATE RatingsRestaurants SET rating_4 = rating_4 + 1 WHERE id_r = ?', id_r, (error, results) => {
            if (error) {
                console.log("Eroare setRatingsByIdRestaurant" + error);
                res.send("Eroare setRatingsByIdRestaurant");
            } else {
                res.send("Rating added");
            }
        });
    }
    if (rating === "5") {
        db.start.query('UPDATE RatingsRestaurants SET rating_5 = rating_5 + 1 WHERE id_r = ?', id_r, (error, results) => {
            if (error) {
                console.log("Eroare setRatingsByIdRestaurant" + error);
                res.send("Eroare setRatingsByIdRestaurant");
            } else {
                res.send("Rating added");
            }
        });
    }
};

exports.getAverageRatingByIdRestaurant = (req, res) => {
    let id_r = req.params.id_restaurant;
    db.start.query('SELECT * FROM RatingsRestaurants WHERE id_r = ?', id_r, (error, results) => {
        if(error){
            console.log("Eroare getAverageRatingByIdRestaurant" + error);
            res.send("Eroare getAverageRatingByIdRestaurant");
        }
        if (results.length > 0 && !error) {
            res.json({
                rating1: results[0].rating_1,
                rating2: results[0].rating_2,
                rating3: results[0].rating_3,
                rating4: results[0].rating_4,
                rating5: results[0].rating_5
            });
        } else {
            res.send("Nu exista id-ul");
        }
    });
}

exports.getAllRatings = (req, res) => {
    db.start.query('SELECT RatingsRestaurants.id_r, rating_1, rating_2, rating_3, rating_4, rating_5, Restaurants.nume FROM RatingsRestaurants INNER JOIN Restaurants ON Restaurants.id_r = RatingsRestaurants.id_r', (error, results) => {
        if(error){
            console.log("Eroare getAllRatings" + error);
            res.send("Eroare getAllRatings");
        }
        if (results.length > 0 && !error) {
            res.json({
                results
            });
        } else {
            res.send("Nu exista id-ul");
        }
    });
}

exports.getIdRestaurant = (req, res) => {
    let nume = req.params.nume;
    db.start.query('SELECT id_r FROM Restaurants WHERE nume = ?', nume, (error, results) => {
        if(error){
            console.log("Eroare getIdRestaurant" + error);
            res.send("Eroare getIdRestaurant");
        }
        if (results.length > 0 && !error) {
            res.json({
                id_r: results[0].id_r
            });
        } else {
            res.send("Nu exista id-ul");
        }
    });
}