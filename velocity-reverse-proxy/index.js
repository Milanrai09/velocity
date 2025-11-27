const express = require('express');
const httpProxy = require('http-proxy');
const app = express();
const PORT = process.env.PORT || 8000;
const BASE_PATH = 'https://velocity-buildserver.s3.ap-south-1.amazonaws.com/__outputs';

// Create proxy with secure option enabled
const proxy = httpProxy.createProxy({
    secure: true,  // Enable SSL/TLS verification
    changeOrigin: true
});

// MAIN PROXY MIDDLEWARE with health check skip
app.use((req, res) => {
    // OPTION B: Skip proxy for health endpoint
    if (req.path === '/health') {
        return res.send("ok");
    }
    
    const hostname = req.hostname;
    const subdomain = hostname.split('.')[0];
    
    console.log("Hostname:", req.hostname);
    console.log("Subdomain:", subdomain);
    console.log("URL:", req.url);
    
    // Handle root path
    let path = req.url === "/" ? "/index.html" : req.url;
    
    // Construct the full target URL
    const target = `${BASE_PATH}/${subdomain}${path}`;
    
    console.log("Proxying to:", target);
    
    proxy.web(req, res, { 
        target,
        changeOrigin: true,
        secure: true
    });
});

// ERROR HANDLER
proxy.on('error', (err, req, res) => {
    console.error("Proxy Error:", err.message);
    if (!res.headersSent) {
        res.status(500).send("Proxy Error: " + err.message);
    }
});

app.listen(PORT, () => console.log(`Reverse Proxy Running on ${PORT}`));
