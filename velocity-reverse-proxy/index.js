const express = require('express');
const httpProxy = require('http-proxy');
const app = express();
const PORT = process.env.PORT || 8000;

// Create proxy
const proxy = httpProxy.createProxy({
    changeOrigin: true,
    secure: true
});

// Health check
app.get("/health", (req, res) => {
    res.send("ok");
});

// Rewrite the request path to include project ID
proxy.on('proxyReq', (proxyReq, req) => {
    // Extract project ID from path: /testing123/... or from subdomain
    let projectId;
    
    // Check if using path-based (e.g., /testing123/index.html)
    const pathMatch = req.url.match(/^\/([^\/]+)(\/.*)?$/);
    if (pathMatch && pathMatch[1] !== 'health') {
        projectId = pathMatch[1];
        const filePath = pathMatch[2] || '/index.html';
        const newPath = `/__outputs/${projectId}${filePath}`;
        proxyReq.path = newPath;
        
        console.log("Path-based routing");
        console.log("Project ID:", projectId);
        console.log("File path:", filePath);
        console.log("Rewritten path:", newPath);
    } 
    // Fallback to subdomain-based (for localhost)
    else {
        const hostname = req.hostname;
        const subdomain = hostname.split('.')[0];
        let path = req.url === "/" ? "/index.html" : req.url;
        const newPath = `/__outputs/${subdomain}${path}`;
        proxyReq.path = newPath;
        
        console.log("Subdomain-based routing");
        console.log("Subdomain:", subdomain);
        console.log("Rewritten path:", newPath);
    }
    
    console.log("Full target:", `https://velocity-buildserver.s3.ap-south-1.amazonaws.com${proxyReq.path}`);
});

// Handle proxy response
proxy.on('proxyRes', (proxyRes, req, res) => {
    console.log("Response status:", proxyRes.statusCode);
});

// ERROR HANDLER
proxy.on('error', (err, req, res) => {
    console.error("Proxy Error:", err.message);
    if (!res.headersSent) {
        res.status(502).send("Bad Gateway: " + err.message);
    }
});

// MAIN PROXY MIDDLEWARE
app.use((req, res) => {
    proxy.web(req, res, { 
        target: 'https://velocity-buildserver.s3.ap-south-1.amazonaws.com',
        changeOrigin: true,
        secure: true
    });
});

app.listen(PORT, () => {
    console.log(`Reverse Proxy Running on ${PORT}`);
    console.log(`Usage:`);
    console.log(`  - Subdomain (localhost): http://testing123.localhost:${PORT}/`);
    console.log(`  - Path-based (Render): https://your-app.onrender.com/testing123/`);
});
