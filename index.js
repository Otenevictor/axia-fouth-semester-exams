const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file


const mongoose = require('mongoose');

// Importing the user routes
const uploadRoutes = require('./routes/upload.route'); // Importing upload routes




mongoose.connect(process.env.MONGO_URL,) // Modified line
    .then(() => {
        // This block will execute if the connection is successful
        console.log('Connected to MongoDB successfully!');
    })
    .catch((err) => {
        console.error('Database connection error:', err);
    });

// Middleware to parse JSON bodies
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 4000; // Use PORT from environment variables or default to 5000



app.use("/", uploadRoutes); // Use the upload routes

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
