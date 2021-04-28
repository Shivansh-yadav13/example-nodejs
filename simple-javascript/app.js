const Express = require("express");
const Auth = require("@uniauth/express-middleware");
const app = Express();

/**
 * Initialize auth client
 */
const uniAuth = new Auth([
  {
    name: "server1",
    url: "http://localhost:5000",
    clientId: "605329470d94d352dbaa0fe3",
    clientSecret: "afda9a74-c018-4399-a504-732862bb3fc2",
    redirectUri: "http://localhost:3000/callback",
    processor: (profile, next) => {
      /**
       * operate with data received from user
       */
      console.log("received user profile > ", profile);
      next();
    },
    endpoint: {
      auth: "account/o/login",
      profile: "account/o/access",
    },
  },
]);

/** homepage */
app.get("/", (req, res) => {
  res.json({
    alive: true,
    login: "open /login to initiate auth",
  });
});

/** adding login */
app.get("/login", uniAuth.authenticate("server1"));

/** specify the url to receive callback */
app.get("/callback", uniAuth.callback("server1"), (req, res) => {
  res.json("user logged in");
});

/** listen for incoming connections */
app.listen(3000, () => console.log("Listening on http://localhost:3000"));

module.exports = app;
