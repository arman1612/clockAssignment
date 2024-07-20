import express from 'express';
import cors from 'cors'
import { db } from './configuration/database.js';
import passport from "passport";
import GoogleStrategy from "passport-google-oauth2";
import session from "express-session";
import 'dotenv/config';
const app=express();
const port =  8080;

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

db.connect().then(()=>{console.log("DB connected successfully")});

app.use(cors({
  origin: process.env.CLIENT_URL, 
  credentials: true
}));
app.use(express.json());

app.post("/register", async (req, res) => {
    try {
      const { email, password, userName } = req.body;
      const register = await db.query("INSERT INTO profile (email, password, username) VALUES ($1, $2, $3)", [email, password, userName]);
  
      if (register) {
        return res.status(200).json({ success: true });
      } else {
        return res.status(500).json({ success: false });
      }
  
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await db.query("SELECT * FROM profile WHERE email = $1", [email]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Email does not exist', success: false });
        }

        const profile = result.rows[0];
        if (profile.password !== password) {
            return res.status(401).json({ message: 'Incorrect password', success: false });
        }
        return res.status(200).json({ message: 'Login Successful', success: true });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", success: false });
    }
});

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/home",
  passport.authenticate("google", {
    successRedirect: `${process.env.CLIENT_URL}/home`,
    failureRedirect: `${process.env.CLIENT_URL}/register`,
  })
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET,
      callbackURL: process.env.CALLBACKURL,
      userProfileURL: process.env.USERPROFILEURL,
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const result = await db.query("SELECT * FROM profile WHERE email = $1", [profile.email]);
        
        if (result.rows.length === 0) {
          const newUser = await db.query(
            "INSERT INTO profile (email,username, password) VALUES ($1, $2,$3)",[profile.email,profile.email, "google"]);

          return cb(null, newUser.rows[0]);
        } else {
          return cb(null, result.rows[0]);
        }
      } catch (err) {
        return cb(err);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});


app.listen(port,()=>{
    console.log(`Server listening at port ${port}`)
})