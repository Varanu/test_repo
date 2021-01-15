const express = require('express');
const markAsFavoriteController = require('../controllers/favorite');
const authController = require('../controllers/auth');
const db = require('../model/db');

const router = express.Router();


router.get('/', authController.isLoggedIn, (req, res) => {
    console.log("inside");
    console.log(req.user);
    res.render('rating', {
        user: req.user
    });
});

router.post('/restaurants/:id_user/:id_restaurant', markAsFavoriteController.addFavoriteRestaurantsForAnUser);

router.delete('/restaurants/:id_user/:id_restaurant', markAsFavoriteController.deleteFavoriteRestaurantForAUser);

router.get('/restaurants/:id_user', markAsFavoriteController.getFavoriteRestaurantsForAnUser);

router.get('/restaurants/restaurantName/:id_r', markAsFavoriteController.getNameOfRestaurantForAnId);

module.exports = router;