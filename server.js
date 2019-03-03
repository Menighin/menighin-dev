const express = require('express');
const serveStatic = require('serve-static');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

app.use(serveStatic(__dirname + "/dist"));

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));