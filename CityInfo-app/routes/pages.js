const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

// router.get('/', authController.isLoggedIn, (req, res) => {
//   console.log("inside");
//   res.render('index');
// });

router.get('/', authController.isLoggedIn, (req, res) => {
  console.log("inside");
  console.log(req.user);
  res.render('MainPage', {
    user: req.user
  });
});

router.get('/profile', authController.isLoggedIn, (req, res) => {
  console.log("inside");
  console.log(req.user);
  if(req.user) {
    res.render('profile', {
      user: req.user
    });
  } else {
    res.redirect("/login");
  }
  
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/restaurants', authController.isLoggedIn, (req, res) => {
  res.render('restaurant', {
    user: req.user
  });
});

router.get('/mobility', authController.isLoggedIn, (req, res) => {
  res.render('mobility', {
    user: req.user
  });
});

router.get('/booking', authController.isLoggedIn, (req, res) => {
  res.render('booking', {
    user: req.user
  });
});

router.get('/shopping', authController.isLoggedIn, (req, res) => {
  res.render('shopping', {
    user: req.user
  });
});

router.get('/visiting', authController.isLoggedIn, (req, res) => {
  res.render('visiting', {
    user: req.user
  });
});

router.get('/events', authController.isLoggedIn, (req, res) => {
  res.render('./EventsWebpage/events', {
    user: req.user
  });
});

router.get('/about-us', authController.isLoggedIn, (req, res) => {
  res.render('./EventsWebpage/about-us', {
    user: req.user
  });
});

router.get('/contact-us', authController.isLoggedIn, (req, res) => {
  res.render('./EventsWebpage/contact-us', {
    user: req.user
  });
});

router.get('/events-main-page', authController.isLoggedIn, (req, res) => {
  res.render('./EventsWebpage/events-main-page', {
    user: req.user
  });
});

router.get('/events-november', authController.isLoggedIn, (req, res) => {
  res.render('./EventsWebpage/events-november', {
    user: req.user
  });
});

router.get('/events-december', authController.isLoggedIn, (req, res) => {
  res.render('./EventsWebpage/events-december', {
    user: req.user
  });
});

router.get('/events-january', authController.isLoggedIn, (req, res) => {
  res.render('./EventsWebpage/events-january', {
    user: req.user
  });
});

router.get('/terms-and-policy-of-use', authController.isLoggedIn, (req, res) => {
  res.render('./EventsWebpage/terms-and-policy-of-use', {
    user: req.user
  });
});

router.get('/privacy-policy', authController.isLoggedIn, (req, res) => {
  res.render('./EventsWebpage/privacy-policy', {
    user: req.user
  });
});

let days=["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];

for (let i=0; i<days.length; i++){
  router.get('/November'.concat(days[i]),function(req,res){
    res.render('./EventsWebpage/Events/November/'.concat(days[i])),{
      user: req.user
  };
});
  router.get('/December'.concat(days[i]),function(req,res){
    res.render('./EventsWebpage/Events/December/'.concat(days[i])),{
      user: req.user
    };
  });
  router.get('/January'.concat(days[i]),function(req,res){
    res.render('./EventsWebpage/Events/January/'.concat(days[i])),{
      user: req.user
    };
  });
}

module.exports = router;
