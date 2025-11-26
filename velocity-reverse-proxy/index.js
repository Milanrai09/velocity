const express = require('express');
const httpProxy = require('http-proxy');

const app = express();
const PORT = process.env.PORT || 8000;

const BASE_PATH = 'https://velocity-buildserver.s3.ap-south-1.amazonaws.com/__outputs';

const proxy = httpProxy.createProxy();

// MAIN PROXY MIDDLEWARE
app.use((req, res) => {
    const hostname = req.hostname;
    const subdomain = hostname.split('.')[0];  // e.g. myapp.domain.com → "myapp"

    const target = `${BASE_PATH}/${subdomain}/`;  // ✔ Ensure trailing slash

    proxy.web(req, res, { 
        target,
        changeOrigin: true,
        autoRewrite: true,
        ignorePath: false
    });
});
app.get("/health", (req, res) => res.send("ok"));

// REWRITE "/" to "/index.html"
proxy.on('proxyReq', (proxyReq, req) => {
    if (req.url === "/") {
        proxyReq.path = "/index.html";
    }
});

// ERROR HANDLER
proxy.on('error', (err, req, res) => {
    console.error("Proxy Error:", err.message);
    res.status(500).send("Proxy Error");
});

app.listen(PORT, () => console.log(`Reverse Proxy Running on ${PORT}`));
