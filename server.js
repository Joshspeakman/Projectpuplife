var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var passport = require("./config/passport"); //(passport);
// Sets up the Express App
// =============================================================
var app = express();

var PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing

var db = require("./models");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// // Static directory to be served
app.use(express.static("client/build"));

app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// to keep track of our user's login status
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);

// Routes
// =============================================================
var router = require("./routes/api/dogs.js")(app);
//app.use(router);
// Starts the server to begin listening
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
