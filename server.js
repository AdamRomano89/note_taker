const express = require('express');
const path = require('path');

//Intializing server
const app = express();

// Regisering Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

// Register The Routes
app.use("/", require('./routes/htmlRoutes'));

// Register The API Routes
app.use("/api", require('./routes/apiRoutes'));

// getting the server up
const PORT = process.env.PORT || 5500;
app.listen(PORT, ()=>console.log(`Server is up and running on port ${PORT}`));
