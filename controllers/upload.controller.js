const fs = require('fs/promises')
const cloudinary = require('../utils/cloudinary'); // Importing Cloudinaary configuration

console.log('Upload route initialized'); // Log to confirm the route is loaded


const singleFile = async (req, res, next) => {
    try {
        // Check if file exists
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        console.log('File details:', req.file);
        
        const response = await cloudinary.uploader.upload(req.file.path, {
            folder: "pdfs",
            resource_type: "auto"
        });
        
        console.log('Cloudinary response:', response);
        
        // Delete the file from local storage
        await fs.unlink(req.file.path);
        
        return res.status(200).json({ 
            message: 'Single file upload successful',
            url: response.secure_url 
        });
        
    } catch (error) {
        console.error('Upload error:', error);
        
        // Clean up file if it exists
        if (req.file && req.file.path) {
            try {
                await fs.unlink(req.file.path);
            } catch (unlinkError) {
                console.error('Error deleting file:', unlinkError);
            }
        }
        
        return res.status(500).json({ 
            error: 'Upload failed', 
            details: error.messageç
        });
    }
};

const arrayFile = async (req, res, next) => {
    try {
        // Check if files exist
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No files uploaded' });
        }

        console.log('Files details:', req.files);
        
        const uploadedFiles = [];
        
        for (const file of req.files) {
            const response = await cloudinary.uploader.upload(file.path, {
                folder: "pdfs",
                resource_type: "auto"
            });
            
            uploadedFiles.push(response.secure_url);
            
            // Delete the file from local storage
            await fs.unlink(file.path);
        }
        
        console.log('Cloudinary response:', uploadedFiles);
        
        return res.status(200).json({ 
            message: 'Array file upload successful',
            urls: uploadedFiles 
        });
        
    } catch (error) {
        console.error('Upload error:', error);
        
        // Clean up files if they exist
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                try {
                    await fs.unlink(file.path);
                } catch (unlinkError) {
                    console.error('Error deleting file:', unlinkError);
                }
            }
        }
        
        return res.status(500).json({ 
            error: 'Upload failed', 
            details: error.message
        });
    }
};

const multipleFile = async (req, res, next) => {
    try {
        // Check if files exist
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ error: 'No files uploaded' });
        }

        console.log('Files details:', req.files);
        
        const uploadedFiles = {};
        
        for (const [fieldName, files] of Object.entries(req.files)) {
            uploadedFiles[fieldName] = [];
            
            for (const file of files) {
                const response = await cloudinary.uploader.upload(file.path, {
                    folder: "pdfs",
                    resource_type: "auto"
                });
                
                uploadedFiles[fieldName].push(response.secure_url);
                
                // Delete the file from local storage
                await fs.unlink(file.path);
            }
        }
        
        console.log('Cloudinary response:', uploadedFiles);
        
        return res.status(200).json({ 
            message: 'Multiple file upload successful',
            urls: uploadedFiles 
        });
        
    } catch (error) {
        console.error('Upload error:', error);
        
        // Clean up files if they exist
        if (req.files) {
            for (const files of Object.values(req.files)) {
                for (const file of files) {
                    try {
                        await fs.unlink(file.path);
                    } catch (unlinkError) {
                        console.error('Error deleting file:', unlinkError);
                    }
                }
            }
        }
        
        return res.status(500).json({ 
            error: 'Upload failed', 
            details: error.message
        });
    }
};

// const arrayFile = (req, res) => {
//     console.log(req.files);
//     console.log(req.body);
//     return res.status(200).send({ message: 'Multiple file upload is working' });
// };
// const multipleFile= (req, res) => {
//     console.log(req.files);
//     console.log(req.body);
//     return res.status(200).send({ message: 'Multiple file upload is working' });
// };

module.exports = {  multipleFile, singleFile, arrayFile };
