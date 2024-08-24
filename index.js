const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

// Serve static files from the current directory
app.use(express.static('.'));

// Route for the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Route for all other requests
app.get('*', (req, res) => {
  const filePath = path.join(__dirname, req.path);
  const htmlFilePath = filePath.endsWith('.html') ? filePath : `${filePath}.html`;

  res.sendFile(htmlFilePath, (err) => {
    if (err) {
      // If the file is not found, serve the custom 404 page
      res.status(404).sendFile(path.join(__dirname, '404.html'), (error404) => {
        if (error404) {
          // If 404.html also doesn't exist, return a plain text 404 message
          res.status(404).send('404 Not Found');
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});