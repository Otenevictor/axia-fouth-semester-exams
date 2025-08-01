const express = require('express');
const {  multipleFile, arrayFile, singleFile } = require('../controllers/upload.controller.js');
const upload = require('../utils/multer.js'); 
const route = express.Router(); // Create an Express Router instance


console.log('Upload route initialized'); // Log to confirm the route is loaded

const morefields = upload.fields([
    {name: "front", maxCount: 1},
    {name: "back", maxCount: 1},
    // {name: "video", maxCount: 1}
])

route.post('/singles', upload.single("dp"),  singleFile);
route.post('/arrays',  upload.array("dp", 3), arrayFile);
route.post('/multiple',  morefields, multipleFile);

module.exports = route;
