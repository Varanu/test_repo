const express = require('express');
const ratingController = require('../controllers/rating');
const authController = require('../controllers/auth');

const router = express.Router();


router.get('/', authController.isLoggedIn, (req, res) => {
    console.log("inside");
    console.log(req.user);
    res.render('rating', {
        user: req.user
    });
});
router.get('/evenimente', ratingController.getAllEvenimente);
router.get('/:id_eveniment', ratingController.getStartsByIdEveniment);

router.post('/restaurants/:id_restaurant/:rating_id', ratingController.setRatingsByIdRestaurant);
router.get('/restaurants/:id_restaurant/average', ratingController.getAverageRatingByIdRestaurant);
router.get('/restaurants/average', ratingController.getAllRatings);

router.get('/restaurants/:nume', ratingController.getIdRestaurant);
module.exports = router;