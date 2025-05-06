// backend/multerConfig.js
const multer = require('multer');
const path = require('path');

// Set storage destination and file naming conventions
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads');  // Ensure this points to your correct 'uploads' folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp for unique file names
    }
});

// File filter to allow only image files
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

// Initialize multer with storage and file filter
const upload = multer({ storage, fileFilter });

module.exports = upload; // Export to use in routes
