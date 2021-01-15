const db = require('../model/db');

exports.getFavoriteRestaurantsForAnUser = (req, res) => {
    //return restaurants id marked as favorite for an user 
    let id = req.params.id_user;
    db.start.query('SELECT Restaurants.id_r, Restaurants.nume, Restaurants.adresa, Restaurants.link, RatingsRestaurants.rating_1, RatingsRestaurants.rating_2, RatingsRestaurants.rating_3, RatingsRestaurants.rating_4, RatingsRestaurants.rating_5 FROM Restaurants INNER JOIN UsersRestaurants ON UsersRestaurants.id_r = Restaurants.id_r INNER JOIN RatingsRestaurants ON RatingsRestaurants.id_r = Restaurants.id_r WHERE UsersRestaurants.id_u = ?', id, (error, results) => {
        if(error){
            console.log("Eroare getUserId" + error);
            res.send("Eroare getUserId");
        }
        if (results.length > 0 && !error) {
            res.send(results);
        } else {
            res.send("Nu exista id-ul");
        }
    });
};

exports.deleteFavoriteRestaurantForAUser = (req, res) =>{
    let id_u = req.params.id_user;
    let id_r = req.params.id_restaurant;
    console.log(" DELETE (markAsFavorite.js): " + id_u + "  " + id_r);
    db.start.query('DELETE FROM UsersRestaurants WHERE id_r = ? AND id_u = ?', [id_r, id_u], (error, results) => {
        if(error){
            console.log("Eroare deleteFavoriteRestaurantForAUser " + error);
            res.send("Eroare deleteFavoriteRestaurantForAUser ");
        }
        if (results.length > 0 && !error) {
            res.send(results);
        } else {
            res.send("Nu exista id-ul");
        }
    });
}

exports.addFavoriteRestaurantsForAnUser = (req, res) =>{
    //insert for an user a new resaturant marked as a favorite
    let id_u = req.params.id_user;
    let id_r = req.params.id_restaurant;

    console.log(" ADD FAVORITE (markAsFavorite.js): "+id_u + "  " + id_r);
    db.start.query("INSERT INTO UsersRestaurants VALUES (null,"+ id_u +", " + id_r +")", (error, results) => {
        if(error){
            console.log("Eroare addFavoriteRestaurantsForAnUser " + error);
            res.send("Eroare addFavoriteRestaurantsForAnUser ");
        }
        if (results.length > 0 && !error) {
            res.send(results);
        } else {
            res.send("Nu exista id-ul");
        }
    });
};
exports.getNameOfRestaurantForAnId = (req, res) => {
    //return name of restaurant for a given ID 
    let id = req.params.id_r;
    db.start.query('SELECT nume, adresa, link FROM Restaurants WHERE id_r = ?', id, (error, results) => {
        if(error){
            console.log("Eroare RestaurantId" + error);
            res.send("Eroare RestaurantId");
        }
        if (results.length > 0 && !error) {
            res.send(results);
        } else {
            res.send("Nu exista id-ul");
        }
    });
};
