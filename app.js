const express = require('express');
const app = express();
//const {config, engine} = require('express-edge');
const engine = require('express-edge');
const { showHomePage, createPost, storePost, showPost, displayMessage} = require('./controllers/PostController');
const { createUser, storeUser, showLoginPage, loginUser, logoutUser } = require('./controllers/UserController');
const authMiddleware = require('./middlewares/auth');
const redirectIfAuthenticated = require('./middlewares/redirectIfAuthenticated');
const expressfileUpload = require('express-fileupload');
const session = require('express-session');
const MongoStore = require('connect-mongo');
// const { default: edge }= require("edge.js");
const { default: edge }= require("edge.js");
const flash = require('connect-flash');

const db = require('./db');
const User = require('./models/User')

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(expressfileUpload());
app.use(engine);
app.set('views', `${__dirname}/views`);
app.use(session({
    secret: "secret",
    cookie: {maxAge : 60000 },
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/lwf-backend',
    }),

})); 

app.use(flash());

// app.use("*", async (req, res, next) => {
//     const { userId } = req.session;
//     if (userId){
//         const user = await User.findById(userId);
//     edge.global =("user", user);
//     edge.global = ("userId", req.session.userId);
//     // edge.GLOBALS.user = user;
//     // edge.GLOBALS.userId = req.session.userId;
    
//     }
//     next();
// });
app.use("*", async (req, res, next) => {
    const user = await User.findById(req.session.userId);
    edge.global("userId", req.session.userId);
    edge.global("user", user);
    // edge.GLOBALS.user = user;
    // edge.GLOBALS.auth = req.session.userId;
    next(); 
  });

app.get("/", showHomePage);
app.get("/posts/new", redirectIfAuthenticated, createPost);
app.post("/posts/store", storePost);
app.get("/posts/:id", showPost);
app.get("/auth/register", createUser);
app.post("/auth/register", storeUser);
app.get("/auth/login", authMiddleware, showLoginPage);
app.post("/auth/login", loginUser);
app.get("/auth/logout", logoutUser);
app.get("/display-message", displayMessage);

app.listen(2000, () => {
    console.log("The server has started on port 3000");
}); 