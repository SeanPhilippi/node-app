const path = require('path');
// mainModule refers to the main module the app started in, filename gets the filename,
// dirName gives the directory name of a path given to it
module.exports = path.dirname(process.mainModule.filename);