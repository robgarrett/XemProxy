import express from "express";
import compression from "compression";
import app from "./app.js";
import path from "path";
import nocache from "nocache";
import { fileURLToPath } from "url";
import versions from "./version.js";

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// eslint-disable-next-line no-process-env
const port = process.env.PORT || 8111;
const expressApp = express();

// Middleware setup.
expressApp.use(compression());
expressApp.use(express.json());
expressApp.use(express.urlencoded({ extended: false }));
expressApp.use(nocache());

// Serve static files from the dist folder.
expressApp.use(express.static(__dirname));

// Handlers.
expressApp.all("*", app);

expressApp.listen(port, err => {
    console.log(`XemProxy version ${versions.GLOBAL_VERSION}`);
    console.log("Listening on port " + port);
    if (err) {
        console.error(err);
    }
});
