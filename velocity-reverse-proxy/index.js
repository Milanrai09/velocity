const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 8000;
const BASE_PATH = 'https://velocity-buildserver.s3.ap-south-1.amazonaws.com/__outputs';

// Health check
app.get("/health", (req, res) => {
    res.send("ok");
});

// MAIN PROXY MIDDLEWARE
app.use(async (req, res) => {
    const hostname = req.hostname;
    const subdomain = hostname.split('.')[0];
    
    console.log("Hostname:", req.hostname);
    console.log("Subdomain:", subdomain);
    console.log("URL:", req.url);
    
    // Handle root path
    let path = req.url === "/" ? "/index.html" : req.url;
    
    // Construct the full S3 URL
    const s3Url = `${BASE_PATH}/${subdomain}${path}`;
    
    console.log("Fetching from S3:", s3Url);
    
    try {
        // Fetch from S3
        const response = await axios.get(s3Url, {
            responseType: 'arraybuffer',
            validateStatus: (status) => status < 500 // Accept 404, etc.
        });
        
        // Forward status code
        res.status(response.status);
        
        // Forward relevant headers
        if (response.headers['content-type']) {
            res.set('Content-Type', response.headers['content-type']);
        }
        if (response.headers['cache-control']) {
            res.set('Cache-Control', response.headers['cache-control']);
        }
        if (response.headers['etag']) {
            res.set('ETag', response.headers['etag']);
        }
        
        // Send the content
        res.send(response.data);
        
    } catch (error) {
        console.error("Error fetching from S3:", error.message);
        
        if (error.response) {
            // S3 returned an error
            res.status(error.response.status).send(`Error: ${error.response.statusText}`);
        } else {
            // Network or other error
            res.status(500).send("Proxy Error: " + error.message);
        }
    }
});

app.listen(PORT, () => console.log(`Reverse Proxy Running on ${PORT}`));
