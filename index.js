import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import db from "./database/db.js";
import session from "express-session";
import MySQLStore from "express-mysql-session";
import LanguageRoute from "./routes/LanguageRoute.js";

dotenv.config();


const app = express();

const uploadDir = path.join(__dirname, "uploads");
if (!require("fs").existsSync(uploadDir)) {
    require("fs").mkdirSync(uploadDir);
}

app.use(express.static(uploadDir));

app.get("/", (req, res) => {
    res.send("Api Ready");
});


const sessionStore = new (MySQLStore(session))({
    // Optional configuration options
}, db);

app.use(session({
    key: '2343434dfdsgdsgdfafhjyuoupkhhgngnndaawdwrsvdb', 
    secret: '2343434dfdsgdsgdfafhjyuoupkhhgngnndaawdwrsvdb',
    store: sessionStore, // Use MySQL session store
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use(
    cors({
        credentials: true,
        origin: ["http://localhost:5000"],
    })
);


app.use(express.json());
app.use(LanguageRoute);

app.listen(5000, () => {
    console.log("Server Running", 5000);
});
