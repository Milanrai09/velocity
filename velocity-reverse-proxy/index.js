const express = require('express');
const httpProxy = require('http-proxy');
const app = express();
const PORT = process.env.PORT || 8000;

// Create proxy with proper configuration for HTTPS
const proxy = httpProxy.createProxy({
    changeOrigin: true,
    secure: true,
    followRedirects: true
});

// Health check BEFORE proxy middleware
app.get("/health", (req, res) => {
    res.send("ok");
});

// Rewrite the request path to include subdomain
proxy.on('proxyReq', (proxyReq, req) => {
    const hostname = req.hostname;
    const subdomain = hostname.split('.')[0];
    
    // Handle root path
    let path = req.url === "/" ? "/index.html" : req.url;
    
    // Rewrite the path to include subdomain folder
    const newPath = `/__outputs/${subdomain}${path}`;
    proxyReq.path = newPath;
    
    console.log("Hostname:", hostname);
    console.log("Subdomain:", subdomain);
    console.log("Original URL:", req.url);
    console.log("Rewritten path:", newPath);
    console.log("Full target:", `https://velocity-buildserver.s3.ap-south-1.amazonaws.com${newPath}`);
});

// Handle proxy response
proxy.on('proxyRes', (proxyRes, req, res) => {
    console.log("Response status:", proxyRes.statusCode);
    console.log("Content-Type:", proxyRes.headers['content-type']);
});

// ERROR HANDLER
proxy.on('error', (err, req, res) => {
    console.error("Proxy Error:", err.message);
    console.error("Error Code:", err.code);
    console.error("Stack:", err.stack);
    
    if (!res.headersSent) {
        res.status(502).send("Bad Gateway: Unable to reach S3. Error: " + err.message);
    }
});

// MAIN PROXY MIDDLEWARE (Catch-all route)
app.use((req, res) => {
    // Proxy to S3 base domain only
    proxy.web(req, res, { 
        target: 'https://velocity-buildserver.s3.ap-south-1.amazonaws.com',
        changeOrigin: true,
        secure: true
    });
});

app.listen(PORT, () => {
    console.log(`Reverse Proxy Running on ${PORT}`);
    console.log(`Health check available at http://localhost:${PORT}/health`);
});
