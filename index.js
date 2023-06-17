const express = require('express');
const app = express();
const port = 3000;


function handleRootURL(req, res) {
    res.send('Hello, World!');
};


function onServerStart() {
    console.log('Server is running on http://localhost:'+port);
}

function handleSearchRequest(req, res) {
    let response = {'data':{}};
    for(key in req.query) {
        console.log(key + " : " + req.query[key]);
        response['data'][key] = req.query[key];
    }
    response['status'] = true;
    res.json(response);
}

// Get Request with Params and JSON Response
app.get('/search', handleSearchRequest);

// Root URL
app.get('/', handleRootURL);

// Start the server
app.listen(port, onServerStart);