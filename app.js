require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");
const db = require("./api/database/mongoose-connection");
const errorController = require('./api/controllers/error');
const User = require("./api/models/user")

const app = express();

const store = new MongoDBStore({
  uri: process.env.MONGO_CONNECTION,
  collection: "sessions",
});

app.set("view engine", "ejs");

// Require Routes
const dictionaryRoute = require("./api/routes/dictionary");
const authRoutes = require('./api/routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(flash())

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  next();
});

// Use Routes
app.use("/", dictionaryRoute);
app.use(authRoutes);
app.use(errorController.get404);

db.connect();
app.listen(process.env.PORT, () => {
  console.log("Server Started");
});
