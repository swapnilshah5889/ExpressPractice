const express = require('express');
const app = express();
const port = 3000;


// Root URL
app.get('/', (req, res) => {
    res.send('Hello, World!');
});


// Get Request with Params and JSON Response
app.get('/search', (req, res) => {
    let response = {'data':{}};
    for(key in req.query) {
        console.log(key + " : " + req.query[key]);
        response['data'][key] = req.query[key];
    }
    response['status'] = true;
    res.json(response);
});
  
// Start the server
app.listen(port, () => {
    console.log('Server is running on http://localhost:'+port);
});